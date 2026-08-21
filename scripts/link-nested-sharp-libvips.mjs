// Package managers hoist `@img/sharp-libvips-<platform>` to the root when every
// sharp copy in the tree wants the same version of it, but they must still nest
// `@img/sharp-<platform>` when the sharp versions themselves differ. sharp's
// prebuilt binding loads libvips through an RPATH sibling lookup rather than
// Node resolution, so a nested binding with no sibling libvips fails to dlopen:
//
//   IMAGES_TRANSFORM_ERROR 9523: The Sharp library is not available
//
// which surfaces as a 500 from `/_image` in `astro dev`, since miniflare's local
// Cloudflare Images binding imports sharp on the host. Link the hoisted copy
// into each nested `@img` that is missing it.

import { existsSync, readdirSync, readFileSync, symlinkSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';

const root = join(process.cwd(), 'node_modules');
if (!existsSync(root)) process.exit(0);

const readJson = (path) => {
    try {
        return JSON.parse(readFileSync(path, 'utf8'));
    } catch {
        return null;
    }
};

// Collect every `@img` directory in the tree, plus the packages inside them.
const imgDirs = [];
const walk = (dir, depth) => {
    if (depth > 6) return;
    let entries;
    try {
        entries = readdirSync(dir, { withFileTypes: true });
    } catch {
        return;
    }
    for (const entry of entries) {
        if (!entry.isDirectory() && !entry.isSymbolicLink()) continue;
        if (entry.name === '@img') {
            imgDirs.push(join(dir, entry.name));
            continue;
        }
        if (entry.name.startsWith('.')) continue;
        const child = join(dir, entry.name);
        // Descend through packages, scopes, and their nested node_modules.
        if (entry.name === 'node_modules' || !entry.name.startsWith('@')) {
            walk(entry.name === 'node_modules' ? child : join(child, 'node_modules'), depth + 1);
        } else {
            walk(child, depth + 1);
        }
    }
};
walk(root, 0);

// Index the libvips packages available anywhere in the tree, keyed by name+version.
const providers = new Map();
for (const imgDir of imgDirs) {
    for (const name of readdirSync(imgDir)) {
        if (!name.startsWith('sharp-libvips-')) continue;
        const pkg = readJson(join(imgDir, name, 'package.json'));
        if (pkg?.version) providers.set(`${name}@${pkg.version}`, join(imgDir, name));
    }
}

let linked = 0;
for (const imgDir of imgDirs) {
    // The sharp that owns this `@img` directory declares the libvips version.
    const owner = readJson(join(dirname(imgDir), 'sharp', 'package.json'));
    if (!owner?.optionalDependencies) continue;

    for (const name of readdirSync(imgDir)) {
        if (!name.startsWith('sharp-') || name.startsWith('sharp-libvips-')) continue;

        const libvipsName = name.replace(/^sharp-/, 'sharp-libvips-');
        const target = join(imgDir, libvipsName);
        if (existsSync(target)) continue;

        const wanted = owner.optionalDependencies[`@img/${libvipsName}`];
        if (!wanted) continue;

        const source = providers.get(`${libvipsName}@${wanted}`);
        // Only link an exact version match; a mismatched libvips is worse than none.
        if (!source || !existsSync(source)) continue;

        try {
            symlinkSync(relative(imgDir, source), target, 'junction');
            statSync(target); // Confirm the link resolves before reporting it.
            console.log(`linked @img/${libvipsName}@${wanted} -> ${relative(root, target)}`);
            linked++;
        } catch (error) {
            console.warn(`could not link @img/${libvipsName}: ${error.message}`);
        }
    }
}

if (linked === 0) console.log('nested sharp libvips: nothing to link');

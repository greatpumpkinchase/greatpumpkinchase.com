#!/bin/sh

# Build the site
yarn build

# Deploy the site to Surge
surge ./dist staging.greatpumpkinchase.com

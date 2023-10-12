<template>
    <div>
        <p v-if="availableTickets !== undefined">Available Tickets: {{ availableTickets }}</p>
        <p v-else>Loading...</p>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';

    let availableTickets;

    async function getTicketsAvailable() {
        const response = await fetch('/api/getTicketsAvailable');
        const data = await response.json();

        return data;
    }

    onMounted(async () => {
        availableTickets = await getTicketsAvailable();
    });
</script>

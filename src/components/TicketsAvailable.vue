<template>
    <div>
        <p v-if="availableTickets !== undefined">Available Tickets: <strong>{{ availableTickets }}</strong></p>
        <p v-else>Loading...</p>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';

    let availableTickets = ref(undefined);

    async function getTicketsAvailable() {
        const response = await fetch('/api/getTicketsAvailable');
        const data = await response.json();

        return data;
    }

    onMounted(async () => {
        availableTickets.value = await getTicketsAvailable();
    });
</script>

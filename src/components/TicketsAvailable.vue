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
        const response = await fetch('/api/getTicketsAvailable.json');
        const data = await response.json();

        return data.body.tickets_available;
    }

    onMounted(async () => {
        availableTickets.value = await getTicketsAvailable();
    });
</script>

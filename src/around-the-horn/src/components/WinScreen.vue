<template>
    <div v-if="winner === 'player'">
        <div>You win!</div>
        <v-btn @click="$emit('next', 'continue')">Go Next!</v-btn>
    </div>
    <div v-else>
        <div>Game over!</div>
        <v-btn @click="$emit('next', 'end')">Back Home</v-btn>
    </div>
</template>

<script>
export default {
    name: "WinScreen",

    component: {},

    props: ["playerTeamObject", "opponentTeamObject", "winner"],


    data() {
        return {

        };
    },
    methods: {

    },
};
</script>

<style scoped></style>
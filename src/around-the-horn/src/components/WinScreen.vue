<template>
    <div v-if="winner === 'player'">
        <div>You win!</div>
        <v-btn @click="$emit('next', 'continue')">Go Next!</v-btn>
    </div>
    <div v-else class="d-flex flex-column justify-center align-center text-center">
        <div class="text-h1 my-12">Game over!</div>
        <div class="text-h3">Final Game: <span class="font-weight-bold">{{ stages[gameStatus].game }}</span></div>
        <div class="text-h4 mb-8"> {{ stages[gameStatus].value + 1 }}/15</div>
        <v-btn @click="$emit('next', 'end')">Start Over</v-btn>
    </div>
</template>

<script>
import { playerStages } from '@/pages/NameData';
export default {
    name: "WinScreen",

    component: {},

    props: ["playerTeamObject", "opponentTeamObject", "winner", "lastGameObject", "gameStatus"],


    data() {
        return {
            stages: playerStages
        };
    },
    methods: {

    },
};
</script>

<style scoped></style>
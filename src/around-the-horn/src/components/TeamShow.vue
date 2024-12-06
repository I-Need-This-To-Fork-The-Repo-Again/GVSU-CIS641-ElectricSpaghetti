<template>
    <v-row>
        <v-col  :order="playerTeamObject.home ? 'last' : 'first'" class="ma-8" align-self="center">
            <div class=" my-2 text-center text-h2">{{ playerTeamObject.name }}</div>
            <v-table>
                <thead>
                    <th class="border-b-sm">#</th>
                    <th class="border-b-sm">NAME</th>
                    <th class="border-b-sm">POS</th>
                    <th class="border-b-sm">STR</th>
                    <th class="border-b-sm">CON</th>
                    <th class="border-b-sm">SPD</th>
                    <th class="border-b-sm">VIS</th>
                    <th class="border-b-sm">LUC</th>
                </thead>
                <tbody>
                    <tr v-for="player in playerTeam" :key="player.number">
                        <td style="text-align: center;">{{ player.number }}</td>
                        <td class="border-s-sm" style="text-align: center;">{{ player.name }}</td>
                        <td class="border-s-sm" style="text-align: center;">{{ player.position }}</td>
                        <td class="border-s-md" style="text-align: center;">{{ player.stats.str }}</td>
                        <td style="text-align: center;">{{ player.stats.con }}</td>
                        <td style="text-align: center;">{{ player.stats.spd }}</td>
                        <td style="text-align: center;">{{ player.stats.vis }}</td>
                        <td style="text-align: center;">{{ player.stats.luc }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-col>
        <v-col cols="4" class="ma-8 text-center" align-self="center">
            <div class="text-h2">{{ stages[gameStatus].game }}</div>
            <div class="text-h4 my-2 mb-4">Game {{ gameStatus + 1 }}/15</div>
            <div v-if="opponentTeamObject.home" class="pa-4" style="border: 1px solid white; border-radius: 10px;">
                <div class="text-h3">{{ playerTeamObject.name }} ({{ playerTeamObject.initials }})</div>
                <div class="text-h4 my-2">at</div>
                <div class="text-h3">{{ opponentTeamObject.name }} ({{ opponentTeamObject.initials }})</div>
                <v-btn class="mt-6" @click="$emit('start-game')">Play Ball!</v-btn>
            </div>
            <div v-else class="pa-4" style="border: 1px solid white; border-radius: 10px;">
                <div class="text-h3">{{ opponentTeamObject.name }} ({{ opponentTeamObject.initials }})</div>
                <div class="text-h4 my-2">at</div>
                <div class="text-h3">{{ playerTeamObject.name }} ({{ playerTeamObject.initials }})</div>
                <v-btn class="mt-6" @click="$emit('start-game')">Play Ball!</v-btn>
            </div>
        </v-col>
        <v-col :order="opponentTeamObject.home ? 'last' : 'first'" class="ma-8" align-self="center">
            <div class=" my-2 text-center text-h2">{{ opponentTeamObject.name }}</div>
            <v-table>
                <thead>
                    <th class="border-b-sm">#</th>
                    <th class="border-b-sm">NAME</th>
                    <th class="border-b-sm">POS</th>
                    <th class="border-b-sm">STR</th>
                    <th class="border-b-sm">CON</th>
                    <th class="border-b-sm">SPD</th>
                    <th class="border-b-sm">VIS</th>
                    <th class="border-b-sm">LUC</th>
                </thead>
                <tbody>
                    <tr v-for="opponent in opponentTeam" :key="opponent.number">
                        <td style="text-align: center;">{{ opponent.number }}</td>
                        <td class="border-s-sm" style="text-align: center;">{{ opponent.name }}</td>
                        <td class="border-s-sm" style="text-align: center;">{{ opponent.position }}</td>
                        <td class="border-s-md" style="text-align: center;">{{ opponent.stats.str }}</td>
                        <td style="text-align: center;">{{ opponent.stats.con }}</td>
                        <td style="text-align: center;">{{ opponent.stats.spd }}</td>
                        <td style="text-align: center;">{{ opponent.stats.vis }}</td>
                        <td style="text-align: center;">{{ opponent.stats.luc }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-col>
    </v-row>
    <v-row>
        <v-col class="mx-8">
            <v-table>
                <thead>
                    <th :style="{
                        color: index < gameStatus ? 'grey' : index === gameStatus ? 'green' : 'white',
                        borderRight: (index + 1) % 3 === 0 && index !== 14 ? '1px solid grey' : 'none'
                    }"
                        v-for="(stage, index) in stages" class="border-b-sm text-h5">{{ index + 1 }}</th>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-center" :style="{
                            color: index < gameStatus ? 'grey' : index === gameStatus ? 'green' : 'white',
                            borderRight: (index + 1) % 3 === 0 && index !== 14 ? '1px solid grey' : 'none'
                        }" v-for="(stage, index) in stages" :key="index">
                            {{ stage.game }}
                        </td>
                    </tr>

                </tbody>
            </v-table>
        </v-col>
    </v-row>
</template>

<script>
import { playerStages } from '@/pages/NameData';

export default {
    name: "TeamShow",

    props: ["playerTeam", "playerTeamObject", "opponentTeam", "opponentTeamObject", "gameStatus"],

    component: {},

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
<template>
    <v-row>
        <v-col>
            <v-table>
                <thead>
                    <th>#</th>
                    <th>NAME</th>
                    <th>POS</th>
                    <th>STR</th>
                    <th>CON</th>
                    <th>SPD</th>
                    <th>VIS</th>
                    <th>LUC</th>
                </thead>
                <tbody>
                    <tr v-for="player in playerTeam" :key="player.number">
                        <td>{{ player.number }}</td>
                        <td>{{ player.name }}</td>
                        <td>{{ player.position }}</td>
                        <td>{{ player.stats.str }}</td>
                        <td>{{ player.stats.con }}</td>
                        <td>{{ player.stats.spd }}</td>
                        <td>{{ player.stats.vis }}</td>
                        <td>{{ player.stats.luc }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-col>
        <v-col>
            <div>{{playerTeamObject.name}}</div>
            <div>vs.</div>
            <div>{{opponentTeamObject.name}}</div>
            <v-btn @click="$emit('start-game')">Play Ball!</v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: "TeamShow",

    props: ["playerTeam", "playerTeamObject", "opponentTeamObject"],

    component: {},

    data() {
        return {

        };
    },
    methods: {

    },
};
</script>

<style scoped></style>
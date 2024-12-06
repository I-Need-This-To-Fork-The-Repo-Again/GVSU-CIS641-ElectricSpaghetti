<template>
    <div v-if="winner === 'player'">
        <v-row>
            <v-col cols="4" class="ma-8">
                <div class="text-h2 text-center">Victory!</div>
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
                <div class="d-flex flex-column justify-center align-center text-center">
                    <div class="text-h4 mb-8"> Round {{ stages[gameStatus].value + 1 }}/15</div>
                    <div class="text-h3">Final Score:</div>
                    <div class="text-h3" v-if="playerTeamObject.home"> {{ opponentTeamObject.initials }} {{
                        lastGameObject.opponentScore }} - {{ lastGameObject.playerScore }} {{ playerTeamObject.initials
                        }}
                    </div>
                    <div class="text-h3 mb-8" v-else> {{ playerTeamObject.initials }} {{ lastGameObject.playerScore }} -
                        {{
                            lastGameObject.opponentScore }} {{ opponentTeamObject.initials }}</div>
                    <div v-if="lastGameObject.playerScore === lastGameObject.opponentScore"> Tie goes to the player</div>
                    <div v-if="lastGameObject.playerScore - 10 > lastGameObject.opponentScore"> Won by mercy rule</div>
                    
                </div>
            </v-col>
            <v-col cols="7" class="ma-8">
                <div class="d-flex flex-column justify-center align-center text-center">
                    <div class="text-h1 my-12">Training Facility</div>
                    <div class="mt-8"><span :style="{ color: error ? 'red' : 'white' }">You must apply each stat change
                            to
                            a player.</span> Players can have multiple stat changes applied. Max in each stat is 99.
                    </div>
                    <div class="mb-8">
                        <span style="color: grey" class="mx-2">Common - 65%</span>
                        <span style="color: green" class="mx-2">Uncommon - 22%</span>
                        <span style="color: aqua" class="mx-2">Rare - 11%</span>
                        <span style="color: purple" class="mx-2">Legendary - 5%</span>
                        <span style="color: orange" class="mx-2">Mythic - 2%</span>
                    </div>
                    <div>
                        <v-row>
                            <v-col v-for="(option, index) in statChangeOptions" :key="option.type"
                                class="d-flex justify-center align-center">
                                <div :style="{ border: `5px solid ${option.color}`, borderRadius: '10px', width: '300px', height: '300px' }"
                                    class="d-flex flex-column justify-between align-center text-center">
                                    <div class="text-h4 mt-2" :style="{ color: option.color }">{{ option.type }}</div>

                                    <div class="d-flex flex-column justify-center flex-grow-1">
                                        <div v-for="change in option.changes" :key="change.text" class="text-h5">
                                            {{ change.value > 0 ? "+" + change.value : change.value }} {{ change.text }}
                                        </div>
                                    </div>

                                    <v-select v-model="chosenPlayers[index]" class="mb-4" dense :items="playerTeam"
                                        item-title="name" :item-value="(player) => playerTeam.indexOf(player)"
                                        style="width: 90%; max-height: 50px;">
                                    </v-select>
                                </div>
                            </v-col>
                        </v-row>
                    </div>
                    <v-btn class="mt-8" @click="applyAndContinue()">Go Next!</v-btn>
                </div>
            </v-col>
        </v-row>

    </div>
    <div v-else class="d-flex flex-column justify-center align-center text-center">
        <div class="text-h1 my-12">Game over!</div>
        <div class="text-h3">Final Game: <span class="font-weight-bold">{{ stages[gameStatus].game }}</span></div>
        <div class="text-h4 mb-8"> Round {{ stages[gameStatus].value + 1 }}/15</div>
        <div class="text-h3">Final Score:</div>
        <div class="text-h3" v-if="playerTeamObject.home"> {{ opponentTeamObject.initials }} {{
            lastGameObject.opponentScore }} - {{ lastGameObject.playerScore }} {{ playerTeamObject.initials }}</div>
        <div class="text-h3 mb-8" v-else> {{ playerTeamObject.initials }} {{ lastGameObject.playerScore }} - {{
            lastGameObject.opponentScore }} {{ opponentTeamObject.initials }}</div>
            <div v-if="lastGameObject.playerScore < lastGameObject.opponentScore - 10"> Lost by mercy rule</div>

        <v-btn @click="$emit('next', 'end')">Start Over</v-btn>
    </div>
</template>

<script>
import { playerStages } from '@/pages/NameData';
export default {
    name: "WinScreen",

    component: {},

    props: ["playerTeamObject", "playerTeam", "opponentTeamObject", "winner", "lastGameObject", "gameStatus"],


    data() {
        return {
            stages: playerStages,
            newPlayerTeam: this.playerTeam,
            statChangeOptions: null,
            chosenPlayers: [null, null, null],
            error: false,
        };
    },

    mounted() {
        this.generateStatChangeOptions()
    },

    methods: {
        generateStatChangeOptions: function () {
            var statChangeOptions = []
            for (let i = 0; i < 3; i++) {
                let rarityCheck = Math.floor(Math.random() * 100)
                if (rarityCheck < 60) { //60% to get common
                    statChangeOptions.push(this.generateCommon())
                }
                else if (rarityCheck < 82) { //22% to get uncommon
                    statChangeOptions.push(this.generateUncommon())
                }
                else if (rarityCheck < 93) { //11% to get rare
                    statChangeOptions.push(this.generateRare())
                }
                else if (rarityCheck < 98) { //5% chance to legendary
                    statChangeOptions.push(this.generateLegendary())
                }
                else { //2% chance to get mythic
                    statChangeOptions.push(this.generateMythic())
                }
            }

            console.log(statChangeOptions)
            this.statChangeOptions = statChangeOptions
        },

        generateCommon: function () { //+1 stat small, -1 stat small
            let increasedStat = Math.floor(Math.random() * 5)
            var decreasedStat = Math.floor(Math.random() * 5)
            while (increasedStat === decreasedStat) {
                decreasedStat = Math.floor(Math.random() * 5)
            }

            let increasedStatChange = this.createStatChange(increasedStat, Math.floor(Math.random() * 10) + 5)
            let decreasedStatChange = this.createStatChange(decreasedStat, (Math.floor(Math.random() * -10) - 5))

            return { type: "Common", color: "grey", changes: [increasedStatChange, decreasedStatChange] }
        },

        generateUncommon: function () { //+1 stat large, -1 stat small
            let increasedStat = Math.floor(Math.random() * 5)
            var decreasedStat = Math.floor(Math.random() * 5)
            while (increasedStat === decreasedStat) {
                decreasedStat = Math.floor(Math.random() * 5)
            }

            let increasedStatChange = this.createStatChange(increasedStat, Math.floor(Math.random() * 20) + 5)
            let decreasedStatChange = this.createStatChange(decreasedStat, (Math.floor(Math.random() * -10) - 5))

            return { type: "Uncommon", color: "green", changes: [increasedStatChange, decreasedStatChange] }
        },

        generateRare: function () { //+2 stat large, -1 stat small
            let increasedStat1 = Math.floor(Math.random() * 5)
            var increasedStat2 = Math.floor(Math.random() * 5)
            var decreasedStat = Math.floor(Math.random() * 5)
            while (increasedStat1 === decreasedStat) {
                decreasedStat = Math.floor(Math.random() * 5)
            }
            while (increasedStat2 === increasedStat1 || increasedStat2 === decreasedStat) {
                increasedStat2 = Math.floor(Math.random() * 5)
            }

            let increasedStatChange1 = this.createStatChange(increasedStat1, Math.floor(Math.random() * 20) + 5)
            let increasedStatChange2 = this.createStatChange(increasedStat2, Math.floor(Math.random() * 20) + 5)
            let decreasedStatChange = this.createStatChange(decreasedStat, (Math.floor(Math.random() * -10) - 5))

            return { type: "Rare", color: "aqua", changes: [increasedStatChange1, increasedStatChange2, decreasedStatChange] }
        },

        generateLegendary: function () { //+3 stat large
            let increasedStat1 = Math.floor(Math.random() * 5)
            var increasedStat2 = Math.floor(Math.random() * 5)
            var increasedStat3 = Math.floor(Math.random() * 5)
            while (increasedStat1 === increasedStat3) {
                increasedStat3 = Math.floor(Math.random() * 5)
            }
            while (increasedStat2 === increasedStat1 || increasedStat2 === increasedStat3) {
                increasedStat2 = Math.floor(Math.random() * 5)
            }

            let increasedStatChange1 = this.createStatChange(increasedStat1, Math.floor(Math.random() * 30) + 5)
            let increasedStatChange2 = this.createStatChange(increasedStat2, Math.floor(Math.random() * 30) + 5)
            let increasedStatChange3 = this.createStatChange(increasedStat3, Math.floor(Math.random() * 30) + 5)

            return { type: "Legendary", color: "purple", changes: [increasedStatChange1, increasedStatChange2, increasedStatChange3] }
        },

        generateMythic: function () { //+5 stat large
            let strChange = this.createStatChange(0, Math.floor(Math.random() * 30) + 5)
            let conChange = this.createStatChange(1, Math.floor(Math.random() * 30) + 5)
            let spdChange = this.createStatChange(2, Math.floor(Math.random() * 30) + 5)
            let visChange = this.createStatChange(3, Math.floor(Math.random() * 30) + 5)
            let lucChange = this.createStatChange(4, Math.floor(Math.random() * 30) + 5)

            return { type: "Mythic", color: "orange", changes: [strChange, conChange, spdChange, visChange, lucChange] }
        },

        createStatChange: function (statNum, statValue) {
            let statsMap = ["str", "con", "spd", "vis", "luc"]
            let statsWord = ["Strength", "Contact", "Speed", "Vision", "Luck"]
            return { stat: statsMap[statNum], value: statValue, text: statsWord[statNum] }

        },

        applyAndContinue: function () {
            console.log(this.chosenPlayers)
            if (this.chosenPlayers[0] === null || this.chosenPlayers[1] === null || this.chosenPlayers[2] === null) { //player not chosen for each
                this.error = false
                this.error = true
                return
            }
            else {
                this.statChangeOptions.forEach((option, index) => {
                    option.changes.forEach(change => {
                        switch (change.stat) {
                            case "str":
                                this.newPlayerTeam[this.chosenPlayers[index]].stats.str =
                                    Math.max(1, Math.min(99, this.newPlayerTeam[this.chosenPlayers[index]].stats.str + change.value));
                                return;
                            case "con":
                                this.newPlayerTeam[this.chosenPlayers[index]].stats.con =
                                    Math.max(1, Math.min(99, this.newPlayerTeam[this.chosenPlayers[index]].stats.con + change.value));
                                return;
                            case "spd":
                                this.newPlayerTeam[this.chosenPlayers[index]].stats.spd =
                                    Math.max(1, Math.min(99, this.newPlayerTeam[this.chosenPlayers[index]].stats.spd + change.value));
                                return;
                            case "vis":
                                this.newPlayerTeam[this.chosenPlayers[index]].stats.vis =
                                    Math.max(1, Math.min(99, this.newPlayerTeam[this.chosenPlayers[index]].stats.vis + change.value));
                                return;
                            case "luc":
                                this.newPlayerTeam[this.chosenPlayers[index]].stats.luc =
                                    Math.max(1, Math.min(99, this.newPlayerTeam[this.chosenPlayers[index]].stats.luc + change.value));
                                return;
                        }

                    })
                });

                console.log(this.newPlayerTeam)
                this.$emit('next', {stage: "continue", newTeam: this.newPlayerTeam})
            }
        }
    },
};
</script>

<style scoped></style>
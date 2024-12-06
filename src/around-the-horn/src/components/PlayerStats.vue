<template>
    <div v-if="outcomePercentages">
        <v-row>
            <v-col>
                <div class="d-flex justify-center">
                    <v-img v-if="gameObject.top" rel="preload" max-width="50" src="../assets/Inning.png"></v-img>
                    <v-img v-else rel="preload" max-width="50" src="../assets/empty_inning.png"></v-img>
                </div>
                <div class="text-h2 text-center">{{ gameObject.inning }}</div>
                <div class="d-flex justify-center">
                    <v-img v-if="!gameObject.top" :style="`transform: rotate(180deg);`" rel="preload" max-width="50"
                        src="../assets/Inning.png"></v-img>
                    <v-img v-else rel="preload" :style="`transform: rotate(180deg);`" max-width="50"
                        src="../assets/empty_inning.png"></v-img>
                </div>
            </v-col>
            <v-col cols="10">
                <v-table density="compact">
                    <tbody>
                        <tr>
                            <td colspan="3">{{ player.name }}</td>
                        </tr>
                        <tr>
                            <td>STR: {{ player.stats.str }}</td>
                            <td>Strikeout: {{ outcomePercentages.K }}%</td>
                            <td>Single: {{ outcomePercentages["1B"] }}%</td>
                        </tr>
                        <tr>
                            <td>CON: {{ player.stats.con }}</td>
                            <td>Flyout: {{ outcomePercentages.FO }}%</td>
                            <td>Double: {{ outcomePercentages["2B"] }}%</td>
                        </tr>
                        <tr>
                            <td>SPD: {{ player.stats.spd }}</td>
                            <td>Lineout: {{ outcomePercentages.LO }}%</td>
                            <td>Triple: {{ outcomePercentages["3B"] }}%</td>
                        </tr>
                        <tr>
                            <td>VIS: {{ player.stats.vis }}</td>
                            <td>Groundout: {{ outcomePercentages.GO }}%</td>
                            <td>Home Run: {{ outcomePercentages.HR }}%</td>
                        </tr>
                        <tr>
                            <td>LUC: {{ player.stats.luc }}</td>
                            <td></td>
                            <td>Walk: {{ outcomePercentages.BB }}%</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import GameLogic from '@/pages/GameLogic';

export default {
    name: 'ScoreBoard',

    props: ['player', 'gameObject'],

    mixins: [GameLogic],

    data() {
        return {
            
        };
    },

    mounted() {

    },

    computed: {
        outcomePercentages: function() {
            return this.determineHitOutcome(this.player.stats)
        }
    }
}
</script>
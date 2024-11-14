<template>
    <GameScreen 
    v-if="playerTeam && opponentTeam" 
    :playerTeam="playerTeam" 
    :opponentTeam="opponentTeam"
    :playerTeamObject="playerTeamObject" 
    :opponentTeamObject="opponentTeamObject" />
</template>

<script>
import GameScreen from '../components/GameScreen.vue';
import { baseballCities, baseballTeamNames, firstNames, lastNames } from './NameData'
import { playerTestTeam, opponentTestTeam } from '../pages/TestData';

export default {
    //before first game, show team
    //show bracket and matchup
    //show game
    //if win
    //show win screen/shop
    //back to bracket and matchup
    //if lose
    //show loss screen
    //back to title

    name: "GameController",

    components: { GameScreen },

    data() {
        return {
            playerTeam: null,
            opponentTeam: null,
            playerTeamObject: null,
            opponentTeamObject: null,
        };
    },

    mounted() {
        this.playerTeam = this.generateTeam(100)
        this.playerTeamObject = this.generateTeamObject()
        this.opponentTeam = this.generateTeam(100)
        this.opponentTeamObject = this.generateTeamObject()
        // this.playerTeam = playerTestTeam
    },

    // this.playerObject = {
    //     initials: "PLA",
    //     home: false,
    //     hitter: 0,
    //     runs: 0,
    //     hits: 0,
    //     inningScore: [0, 0, 0]
    //   };

    //   this.opponentObject = {
    //     initials: "OPP",
    //     home: true,
    //     hitter: 0,
    //     runs: 0,
    //     hits: 0,
    //     inningScore: [0, 0, 0]
    //   }

    methods: {
        generateTeam: function (playerStatTotal) {
            let team = []
            let positions = ["DH", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF"]
            let chosenNumbers = []
            for (let i = 0; i < 9; i++) {
                let player = {}
                player.name = firstNames[Math.floor(Math.random() * firstNames.length)] + " " + lastNames[Math.floor(Math.random() * lastNames.length)]

                const randomIndex = Math.floor(Math.random() * positions.length);
                const item = positions[randomIndex];
                positions.splice(randomIndex, 1);
                player.position = item

                let number = -1
                while (chosenNumbers.includes(number) || number === -1) {
                    number = Math.floor(Math.random() * 100);
                }
                chosenNumbers.push(number)
                player.number = number

                let stats = [0, 0, 0, 0, 0]
                let statNum = playerStatTotal
                while (statNum > 0) {
                    let statAdd = Math.floor(Math.random() * 5);
                    let amountAdd = Math.floor(Math.random() * 5);
                    if (statNum < amountAdd) {
                        stats[statAdd] = stats[statAdd] + statNum
                        statNum = 0
                    }
                    else {
                        stats[statAdd] = stats[statAdd] + amountAdd
                        statNum = statNum - amountAdd
                    }
                }

                player.stats = {
                    str: stats[0],
                    con: stats[1],
                    spd: stats[2],
                    vis: stats[3],
                    luc: stats[4],
                }

                player.items = null;

                team.push(player)
            }
            return team
        },

        generateTeamObject: function () {
            let teamObject = {}
            teamObject.hitter = 0
            teamObject.hits = 0
            teamObject.runs = 0
            teamObject.inningScore = [0, 0, 0]

            teamObject.name = baseballCities[Math.floor(Math.random() * baseballCities.length)] + " " + baseballTeamNames[Math.floor(Math.random() * baseballTeamNames.length)]
            teamObject.initials = teamObject.name.slice(0, 3).toUpperCase()
            teamObject.home = false

            return teamObject
        }
    },
};
</script>

<style scoped></style>
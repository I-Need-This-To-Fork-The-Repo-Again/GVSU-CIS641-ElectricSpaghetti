<template>
    <div v-if="playerTeam && opponentTeam">
        <TeamShow v-if="state === 'teamView'" :playerTeam="playerTeam" :opponentTeam="opponentTeam"
            :playerTeamObject="playerTeamObject" :opponentTeamObject="opponentTeamObject" @start-game="startGame()" />
        <GameScreen v-else-if="state === 'game'" :playerTeam="playerTeam" :opponentTeam="opponentTeam"
            :playerTeamObject="playerTeamObject" :opponentTeamObject="opponentTeamObject"
            @game-over="gameOver($event)" />
        <WinScreen v-else-if="state === 'end'" :playerTeamObject="playerTeamObject"
            :opponentTeamObject="opponentTeamObject" :winner="winner" @next="next($event)" />
    </div>
</template>

<script>
import GameScreen from '../components/GameScreen.vue';
import { baseballCities, baseballTeamNames, firstNames, lastNames } from './NameData'
import { playerTestTeam, opponentTestTeam } from '../pages/TestData';
import TeamShow from '@/components/TeamShow.vue';
import WinScreen from '@/components/WinScreen.vue';

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

    components: { GameScreen, TeamShow, WinScreen },

    props: {
        teamName: {
            type: String,
            required: true,
        },
        teamInitials: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            playerTeam: null,
            opponentTeam: null,
            playerTeamObject: null,
            opponentTeamObject: null,
            state: "teamView",
            winner: null,
        };
    },

    mounted() {
        console.log(this.teamName)
        this.initializeRun()
        this.initializeNewGame()
    },

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

        generateTeamObject: function (name, initials) {
            let teamObject = {}
            teamObject.hitter = 0
            teamObject.hits = 0
            teamObject.runs = 0
            teamObject.inningScore = [0, 0, 0]
            if (name) {
                teamObject.name = name
                teamObject.initials = initials
            }
            else {
                teamObject.name = baseballCities[Math.floor(Math.random() * baseballCities.length)] + " " + baseballTeamNames[Math.floor(Math.random() * baseballTeamNames.length)]
                teamObject.initials = teamObject.name.slice(0, 3).toUpperCase()
            }
            teamObject.home = false

            return teamObject
        },

        initializeRun: function () {
            // this.playerTeam = this.generateTeam(100)
            this.playerTeam = playerTestTeam
        },

        initializeNewGame: function (oppStat) {
            this.opponentTeam = this.generateTeam(oppStat)
            this.opponentTeamObject = this.generateTeamObject()
            this.playerTeamObject = this.generateTeamObject(this.teamName, this.teamInitials)

            let home = Math.floor(Math.random() * 2) + 1
            console.log(home)
            if (home === 1) {
                this.playerTeamObject.home = true
                this.opponentTeamObject.home = false
            }
            else {
                this.playerTeamObject.home = false
                this.opponentTeamObject.home = true
            }
        },

        startGame: function () {
            console.log("run")
            this.state = "game"
        },

        gameOver: function (winner) {
            this.winner = winner
            this.state = "end"
        },

        next: function (result) {
            if (result === "continue") {
                console.log("hit")
                this.initializeNewGame(100)
                this.state = "teamView"
                console.log(this.state)
            }
            else {
                this.$router.push({
                    path: "/",
                });
            }
        },

        computed: {

        }
    },
};
</script>

<style scoped></style>
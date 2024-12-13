<template>
  <v-container v-if="playerObject && opponentObject && playerTeam && opponentTeam && gameObject">
    <v-row rows="6">
      <v-col :order="playerObject.home ? 'last' : 'first'">
        <div class="text-center text-h4">{{playerObject.name}} - {{ playerObject.initials }}</div>
      </v-col>
      <v-col cols="6">
        <div class="text-h2 text-center">{{ stages[gameStatus].game }}</div>
      </v-col>
      <v-col :order="opponentObject.home ? 'last' : 'first'">
        <div class="text-center text-h4">{{opponentObject.name}} - {{ opponentObject.initials }}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col :order="playerObject.home ? 'last' : 'first'">
        <PlayerList :teamList="playerTeam" />
      </v-col>
      <v-col cols="6">
        <FieldShow :game-object="gameObject" />
      </v-col>
      <v-col :order="opponentObject.home ? 'last' : 'first'">
        <PlayerList :teamList="opponentTeam" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ScoreBoard :gameObject="gameObject" :homeObject="getHomeTeam" :awayObject="getAwayTeam" />
      </v-col>
      <v-col cols="6">
        <PlayerStats :player="hittingTeam[hittingObject.hitter]" :otherPlayer="notHittingTeam[hittingObject.hitter]" :gameObject="gameObject" />
        <v-btn block class="my-4" variant="tonal" size="x-large" @click="hit(hittingTeam, notHittingTeam, hittingObject, gameObject)">Hit</v-btn>
      </v-col>
      <v-col>
        <v-virtual-scroll :height="200" :items="gameLog" ref="scrollBox">
          <template v-slot:default="{ item }">
            <div class="mx-4">{{ item }}</div>
          </template>
        </v-virtual-scroll>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { playerTestTeam, opponentTestTeam } from '../pages/TestData';
import GameplayMixin from '../pages/GameplayMixin';
import PlayerList from '@/components/PlayerList.vue';
import ScoreBoard from '@/components/ScoreBoard.vue';
import FieldShow from './FieldShow.vue';
import GameLogic from '../pages/GameLogic';
import PlayerStats from './PlayerStats.vue';
import { playerStages } from '@/pages/NameData';

export default {
  name: 'GameScreen',

  props: ['playerTeam', 'opponentTeam', 'playerTeamObject', 'opponentTeamObject', 'gameStatus'],

  data() {
    return {
      playerTeam: this.playerTeam, //will eventually be brought in or generated, depending on game status
      playerObject: this.playerTeamObject, //populated
      opponentTeam: this.opponentTeam, //randomly generated
      opponentObject: this.opponentTeamObject, //populated
      gameObject: null, //populated
      gameLog: [],
      stages: playerStages
    }
  },

  mounted() {
    this.initializeGame()
    console.log(this.gameObject)
    console.log(this.playerObject)
    console.log(this.opponentObject)
  },

  components: { ScoreBoard, PlayerList, FieldShow, PlayerStats },

  mixins: [GameplayMixin, GameLogic],

  methods: {
    goToHome: function () {
      this.$router.push("/")
    },

    initializeGame: function () {
      this.gameObject = {
        inning: 1,
        top: true,
        outs: 0,
        baseStatus: {
          first: false,
          second: false,
          third: false,
        },
      };
    },

    hit: function (team, otherTeam, teamObject, gameObject) {
      //generate buckets given stats (apply items)
      //get random number
      //let random number decide hit type
      //perform hit
      console.log(otherTeam[teamObject.hitter].stats)
      let probabilities = this.determineHitOutcome(team[teamObject.hitter].stats, otherTeam[teamObject.hitter].stats);
      console.log(probabilities)
      let type = this.getRandomOutcome(probabilities);
      console.log(type)
      let outcome = this.chooseHitType(type, gameObject, teamObject)
      this.gameLog.unshift("- " + team[teamObject.hitter].name + " " + outcome)
      this.nextBatter(teamObject)
      this.checkWin(gameObject, this.playerObject, this.opponentObject)
    }
  },

  computed: {
    currentBatter: function () {
      return this.hittingTeam[this.hittingObject.hitter].name

    },

    hittingTeam: function () {
      if (this.gameObject.top) {
        if (!this.playerObject.home) { //player away in top, hitting
          return this.playerTeam
        }
        else { //opponent is away in top, hitting
          return this.opponentTeam
        }
      }
      else {
        if (this.playerObject.home) { //player home in bottom, hitting
          return this.playerTeam
        }
        else { //opponent is home in bottom, hitting
          return this.opponentTeam
        }
      }
    },

    notHittingTeam: function() {
      console.log("hit")
      if (this.gameObject.top) {
        if (!this.playerObject.home) { //player away in top, hitting
          return this.opponentTeam
        }
        else { //opponent is away in top, hitting
          return this.playerTeam
        }
      }
      else {
        if (this.playerObject.home) { //player home in bottom, hitting
          return this.opponentTeam
        }
        else { //opponent is home in bottom, hitting
          return this.playerTeam
        }
      }
    },

    hittingObject: function () {
      if (this.gameObject.top) {
        if (!this.playerObject.home) { //player away in top, hitting
          return this.playerObject
        }
        else { //opponent is away in top, hitting
          return this.opponentObject
        }
      }
      else {
        if (this.playerObject.home) { //player home in bottom, hitting
          return this.playerObject
        }
        else { //opponent is home in bottom, hitting
          return this.opponentObject
        }
      }
    },

    getHomeTeam: function () {
      if (this.playerObject.home)
        return this.playerObject
      else
        return this.opponentObject
    },

    getAwayTeam: function () {
      if (!this.playerObject.home)
        return this.playerObject
      else
        return this.opponentObject
    },
  },

  watch: {
    gameLog() {
      this.$nextTick(() => {
        this.scrollBox.scrollTo({ bottom: 0 });
      });
    }
  }
}
</script>
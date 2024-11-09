<template>
  <v-container v-if="playerObject && opponentObject">
    <v-row rows="6">
      <v-col :order="playerObject.home ? 'last' : 'first'">
        <div class="text-center text-h4">Player Team - {{ playerObject.initials }}</div>
      </v-col>
      <v-col cols="6">
        <div class="text-center text-h3">AAA - Semifinals</div>
      </v-col>
      <v-col :order="opponentObject.home ? 'last' : 'first'">
        <div class="text-center text-h4">Opponent Team - {{ opponentObject.initials }}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col :order="playerObject.home ? 'last' : 'first'">
        <PlayerList :teamList="playerTeam" />
      </v-col>
      <v-col cols="6">
        <v-row>
          <v-col>
            <div v-if="gameObject.baseStatus.third"> ■ </div>
            <div v-else> □ </div>
          </v-col>
          <v-col>
            <div v-if="gameObject.baseStatus.second"> ■ </div>
            <div v-else> □ </div>
          </v-col>
          <v-col>
            <div v-if="gameObject.baseStatus.first"> ■ </div>
            <div v-else> □ </div>
          </v-col>
        </v-row>
        <div>Outs: {{ gameObject.outs }}</div>
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
        <v-select v-model="selectedOutcome" :items="outcomes" label="Select Outcome" outlined></v-select>
        <v-btn @click="hit(selectedOutcome, hittingObject, gameObject)">Hit</v-btn>
      </v-col>
      <v-col>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { playerTestTeam, opponentTestTeam } from './TestData';
import GameplayMixin from './GameplayMixin';
import PlayerList from '@/components/PlayerList.vue';
import ScoreBoard from '@/components/ScoreBoard.vue';

export default {
  name: 'GameScreen',

  data() {
    return {
      playerTeam: playerTestTeam, //will eventually be brought in or generated, depending on game status
      playerObject: null, //populated
      opponentTeam: opponentTestTeam, //randomly generated
      opponentObject: null, //populated
      gameObject: null, //populated
      selectedOutcome: null, // This will store the selected option's value
      outcomes: [
        { title: 'Strike Out', value: 'K' },
        { title: 'Line Out', value: 'LO' },
        { title: 'Ground Out', value: 'GO' },
        { title: 'Fly Out', value: 'FO' },
        { title: 'Single', value: '1B' },
        { title: 'Double', value: '2B' },
        { title: 'Triple', value: '3B' },
        { title: 'Home Run', value: 'HR' },
        { title: 'Walk', value: 'BB' }
      ]
    }
  },

  mounted() {
    this.initializeGame()
    console.log(this.gameObject)
    console.log(this.playerObject)
  },

  mixins: [GameplayMixin],

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

      this.playerObject = {
        initials: "PLA",
        home: true,
        hitter: 0,
        runs: 0,
        hits: 0,
        inningScore: [0, 0, 0]
      };

      this.opponentObject = {
        initials: "OPP",
        home: false,
        hitter: 0,
        runs: 0,
        hits: 0,
        inningScore: [0, 0, 0]
      }
    },

    hit: function (type, teamObject, gameObject) {
      //generate buckets given stats (apply items)
      //get random number
      //let random number decide hit type
      //perform hit
      this.chooseHitType(type, gameObject, teamObject)
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
  }
}
</script>
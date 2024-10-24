<template>
  <div v-if="playerObject">
    <h1>GameScreen</h1>
    <v-table theme="dark">
      <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Number
          </th>
          <th class="text-left">
            Position
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="player in playerTeam" :key="player.number">
          <td>{{ player.name }}</td>
          <td>{{ player.number }}</td>
          <td>{{ player.position }}</td>
        </tr>
      </tbody>
    </v-table>
    <div>Current Hitter: {{ playerTeam[playerObject.hitter].name }}</div>
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
    <div> Runs: {{ playerObject.runs }}</div>
    <div> Hits: {{ playerObject.hits }}</div>
    <div> Outs: {{ gameObject.outs }}</div>
    <v-select
      v-model="selectedOutcome" 
      :items="outcomes"  
      label="Select Outcome"
      outlined></v-select>
    <v-btn @click="hit(selectedOutcome, playerObject, gameObject)">Hit</v-btn>
    <v-btn @click="goToHome()">Back</v-btn>
  </div>
</template>

<script>
import testTeam from './TestData';
import GameplayMixin from './GameplayMixin';

export default {
  name: 'GameScreen',

  data() {
    return {
      playerTeam: testTeam, //will eventually be brought in or generated, depending on game status
      playerObject: null, //populated
      opponentTeam: null, //randomly generated
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
        { title: 'Home Run', value: 'HR' }
      ]
    }
  },

  mounted() {
    console.log(testTeam)
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
        hitter: 0,
        runs: 0,
        hits: 0,
      };

      this.opponentObject = {
        hitter: 0,
        runs: 0,
        hits: 0,
      }
    },

    hit: function (type, teamObject, gameObject) {
      //generate buckets given stats (apply items)
      //get random number
      //let random number decide hit type
      //perform hit
      this.chooseHitType(type, gameObject, teamObject)
      this.nextBatter(teamObject)
    }
  }
}
</script>
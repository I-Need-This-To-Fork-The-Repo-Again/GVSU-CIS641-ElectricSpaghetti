export default {
  methods: {
    determineHitOutcome: function (player, opp) { //zero idea if this is gonna be balanced or not but we can figure that out later
      let probabilities = {
        "K": 22,
        "FO": 22,
        "LO": 12,
        "GO": 12,
        "1B": 8,
        "2B": 6,
        "3B": 3,
        "HR": 2,
        "BB": 3
      };

      probabilities["2B"] += (player.str - opp.str) * 0.2;
      probabilities["HR"] += (player.str - opp.str) * 0.4;
      probabilities["K"] -= (player.str - opp.str) * 0.4;
      probabilities["FO"] -= (player.str - opp.str) * 0.2;
  
      probabilities["1B"] += (player.con - opp.con) * 0.4;
      probabilities["2B"] += (player.con - opp.con) * 0.2;
      probabilities["GO"] -= (player.con - opp.con) * 0.2;
      probabilities["LO"] -= (player.con - opp.con) * 0.4;
      probabilities["K"] -= (player.con - opp.con) * 0.2;
      probabilities["HR"] += (player.con - opp.con) * 0.2;

      probabilities["BB"] += (player.vis - opp.vis) * 0.4;
      probabilities["K"] -= (player.vis - opp.vis) * 0.4;

      probabilities["3B"] += (player.spd - opp.spd) * 0.2;
      probabilities["GO"] -= (player.spd - opp.spd) * 0.2;
      probabilities["K"] -= (player.spd - opp.spd) * 0.2;
      probabilities["1B"] += (player.spd - opp.spd) * 0.2;

      probabilities["BB"] += (player.luc - opp.luc) * 0.2;
      probabilities["1B"] += (player.luc - opp.luc) * 0.2;
      probabilities["3B"] += (player.luc - opp.luc) * 0.2;
      probabilities["GO"] -= (player.luc - opp.luc) * 0.2;
      probabilities["FO"] -= (player.luc - opp.luc) * 0.4;

      let total = Object.values(probabilities).reduce((sum, prob) => sum + prob, 0);
      Object.keys(probabilities).forEach(key => {
        probabilities[key] = Math.round((probabilities[key] / total) * 100);
        if(probabilities[key] < 0) {
          probabilities[key] = 0
        }
      });

      return probabilities;
    },

    getRandomOutcome: function (probabilities) {
      let rand = Math.random() * 100;

      let cumulativeProb = 0;
      for (let outcome in probabilities) {
        cumulativeProb += probabilities[outcome];
        if (rand <= cumulativeProb) {
          return outcome;
        }
      }
      return "FO";
    },

  },

}

export default {
  methods: {
    determineHitOutcome: function (player) { //zero idea if this is gonna be balanced or not but we can figure that out later
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

      probabilities["2B"] += player.str * 0.1;
      probabilities["HR"] += player.str * 0.2;
      probabilities["K"] -= player.str * 0.2;
      probabilities["FO"] -= player.str * 0.1;
  
      probabilities["1B"] += player.con * 0.2;
      probabilities["2B"] += player.con * 0.1;
      probabilities["GO"] -= player.con * 0.1;
      probabilities["LO"] -= player.con * 0.2;
      probabilities["K"] -= player.con * 0.1;
      probabilities["HR"] += player.con * 0.1;

      probabilities["BB"] += player.vis * 0.2;
      probabilities["K"] -= player.vis * 0.2;

      probabilities["3B"] += player.spd * 0.1;
      probabilities["GO"] -= player.spd * 0.1;
      probabilities["K"] -= player.spd * 0.1;
      probabilities["1B"] += player.spd * 0.1;

      probabilities["BB"] += player.luc * 0.1;
      probabilities["1B"] += player.luc * 0.1;
      probabilities["3B"] += player.luc * 0.1;
      probabilities["GO"] -= player.luc * 0.1;
      probabilities["FO"] -= player.luc * 0.2;

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

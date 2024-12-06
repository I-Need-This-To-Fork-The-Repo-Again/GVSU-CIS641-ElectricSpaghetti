export default {
  methods: {
    determineHitOutcome: function (player, opp) {
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

      let normalizedStats = {
        str: Math.min(Math.max(player.str - opp.str, 0), 99),
        con: Math.min(Math.max(player.con - opp.con, 0), 99),
        spd: Math.min(Math.max(player.spd - opp.spd, 0), 99),
        vis: Math.min(Math.max(player.vis - opp.vis, 0), 99),
        luc: Math.min(Math.max(player.luc - opp.luc, 0), 99)
      };

      // Adjust probabilities based on stats
      probabilities["2B"] += normalizedStats.str * 0.2;
      probabilities["HR"] += normalizedStats.str * 0.4;
      probabilities["K"] -= normalizedStats.str * 0.4;
      probabilities["FO"] -= normalizedStats.str * 0.2;

      probabilities["1B"] += normalizedStats.con * 0.4;
      probabilities["2B"] += normalizedStats.con * 0.2;
      probabilities["GO"] -= normalizedStats.con * 0.2;
      probabilities["LO"] -= normalizedStats.con * 0.4;
      probabilities["K"] -= normalizedStats.con * 0.2;
      probabilities["HR"] += normalizedStats.con * 0.2;

      probabilities["BB"] += normalizedStats.vis * 0.4;
      probabilities["K"] -= normalizedStats.vis * 0.4;

      probabilities["3B"] += normalizedStats.spd * 0.2;
      probabilities["GO"] -= normalizedStats.spd * 0.2;
      probabilities["K"] -= normalizedStats.spd * 0.2;
      probabilities["1B"] += normalizedStats.spd * 0.2;

      probabilities["BB"] += normalizedStats.luc * 0.2;
      probabilities["1B"] += normalizedStats.luc * 0.2;
      probabilities["3B"] += normalizedStats.luc * 0.2;
      probabilities["GO"] -= normalizedStats.luc * 0.2;
      probabilities["FO"] -= normalizedStats.luc * 0.4;

      // Normalize to percentages
      let total = Object.values(probabilities).reduce((sum, prob) => sum + prob, 0);
      Object.keys(probabilities).forEach(key => {
        probabilities[key] = Math.max(3, Math.round((probabilities[key] / total) * 100)); // Minimum 3%
      });

      // Ensure total is exactly 100%
      let adjustedTotal = Object.values(probabilities).reduce((sum, prob) => sum + prob, 0);
      let diff = 100 - adjustedTotal;

      if (diff !== 0) {
        // Distribute the difference to maintain sum of 100%
        let keys = Object.keys(probabilities);
        for (let i = 0; diff !== 0; i = (i + 1) % keys.length) {
          if (diff > 0) {
            probabilities[keys[i]]++;
            diff--;
          } else if (probabilities[keys[i]] > 3) {
            probabilities[keys[i]]--;
            diff++;
          }
        }
      }

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

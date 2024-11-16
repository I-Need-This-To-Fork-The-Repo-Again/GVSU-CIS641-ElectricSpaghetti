
// function generateTeam() { //creates team with generated players, all with stats between 50 and 100
//   const team = [];
//   for (let i = 0; i < 9; i++) {
//     team.push({
//       contact: Math.floor(Math.random() * 50) + 50,
//       strength: Math.floor(Math.random() * 50) + 50,
//       vision: Math.floor(Math.random() * 50) + 50,
//       speed: Math.floor(Math.random() * 50) + 50,
//       luck: Math.floor(Math.random() * 50) + 50,
//       equippedItem: null,
//     });
//   }
//   return {
//     players: team,
//     hitter: 0,
//     runs: 0,
//     hits: 0,
//     inningscore: [0, 0, 0],
//     home: false,
//   };
// }
export default {
  data() {
    return {
      hitThreshold: {
        "K": 75,
        "FO": 250,
        "LO": 350,
        "GO": 600,
        "1B": 800,
        "2B": 900,
        "3B": 950,
        "HR": 995
      }
    }
  },

  methods: {



    determineHitOutcome: function (batter) { //zero idea if this is gonna be balanced or not but we can figure that out later
      let randomNumber = Math.random() * 1000;
      let contactMod = batter.stats.con + (batter.equippedItem ? batter.equippedItem.contactMod || 0 : 0);
      let strengthMod = batter.stats.str + (batter.equippedItem ? batter.equippedItem.strengthMod || 0 : 0);
      let visionMod = batter.stats.vis + (batter.equippedItem ? batter.equippedItem.visionMod || 0 : 0);
      let speedMod = batter.stats.spd + (batter.equippedItem ? batter.equippedItem.speedMod || 0 : 0);
      let luckMod = batter.stats.luc + (batter.equippedItem ? batter.equippedItem.luckMod || 0 : 0);

      if (randomNumber < (this.hitThreshold.K - (contactMod / 2.5)) + (visionMod / 15) + (luckMod / 20)) { //number < 50 = strikeout
        if (this.checkItemEffect(batter, "K")) { return }
        return "K";
      } else if (randomNumber < (this.hitThreshold.FO - (contactMod / 3)) + (visionMod / 10) + (luckMod / 20)) { //number < 200 = flyout
        if (this.checkItemEffect(batter, "FO")) { return }
        return "FO";
      } else if (randomNumber < (this.hitThreshold.LO - (contactMod / 3)) + (visionMod / 10) + (luckMod / 20)) { //number < 300 = lineout
        if (this.checkItemEffect(batter, "LO")) { return }
        return "LO";
      } else if (randomNumber < (this.hitThreshold.GO - (contactMod / 4)) + (visionMod / 10) + (luckMod / 20)) { //number < 600 = groundout
        if (this.checkItemEffect(batter, "GO")) { return }
        return "GO";
      } else if (randomNumber < (this.hitThreshold["1B"] + (strengthMod / 8) - (visionMod / 15) - (speedMod / 12) + (luckMod / 25))) { //number < 800 = single
        if (this.checkItemEffect(batter, "1B")) { return }
        return "1B";
      } else if (randomNumber < (this.hitThreshold["2B"] + (strengthMod / 6) - (visionMod / 15) + (speedMod / 10) + (luckMod / 25))) { //number < 900 = double
        if (this.checkItemEffect(batter, "2B")) { return }
        return "2B";
      } else if (randomNumber < (this.hitThreshold["3B"] + (strengthMod / 5) - (visionMod / 15) + (speedMod / 8) + (luckMod / 20))) { //number < 950 = triple
        if (this.checkItemEffect(batter, "3B")) { return }
        return "3B";
      } else if (randomNumber < (this.hitThreshold.HR + (strengthMod / 4) - (visionMod / 20) + (luckMod / 18))) { //number < 975 = homer
        if (this.checkItemEffect(batter, "HR")) { return }
        return "HR";
      }
      else {
        if (this.checkItemEffect(batter, "BB")) { return }
        return "BB"; //walk
      }
    },

    getOutcomeChances: function(batter) {
      let contactMod = batter.stats.con + (batter.equippedItem ? batter.equippedItem.contactMod || 0 : 0);
      let strengthMod = batter.stats.str + (batter.equippedItem ? batter.equippedItem.strengthMod || 0 : 0);
      let visionMod = batter.stats.vis + (batter.equippedItem ? batter.equippedItem.visionMod || 0 : 0);
      let speedMod = batter.stats.spd + (batter.equippedItem ? batter.equippedItem.speedMod || 0 : 0);
      let luckMod = batter.stats.luc + (batter.equippedItem ? batter.equippedItem.luckMod || 0 : 0);

      let chances = {}
      chances.K = (this.hitThreshold.K - (contactMod / 2.5)) + (visionMod / 15) + (luckMod / 20)
      chances.FO = (this.hitThreshold.FO - (contactMod / 3)) + (visionMod / 10) + (luckMod / 20)
      chances.LO = (this.hitThreshold.LO - (contactMod / 3)) + (visionMod / 10) + (luckMod / 20)
      chances.GO = (this.hitThreshold.GO - (contactMod / 4)) + (visionMod / 10) + (luckMod / 20)
      chances["1B"] = (this.hitThreshold["1B"] + (strengthMod / 8) - (visionMod / 15) - (speedMod / 12) + (luckMod / 25))
      chances["2B"] = (this.hitThreshold["2B"] + (strengthMod / 6) - (visionMod / 15) + (speedMod / 10) + (luckMod / 25))
      chances["3B"] = (this.hitThreshold["3B"] + (strengthMod / 5) - (visionMod / 15) + (speedMod / 8) + (luckMod / 20))
      chances.HR = (this.hitThreshold.HR + (strengthMod / 4) - (visionMod / 20) + (luckMod / 18))

      return chances
    },

   getOutcomePercentages: function(batter) {
      let outcomeChances = this.getOutcomeChances(batter)
      let percentages = {}
      // Math.round((num + Number.EPSILON) * 100) / 100
      percentages.K = Math.round((outcomeChances.K / 10 + Number.EPSILON) * 100) / 100
      percentages.FO = Math.round(((outcomeChances.FO - outcomeChances.K) / 10 + Number.EPSILON) * 100) / 100
      percentages.LO = Math.round(((outcomeChances.LO - outcomeChances.FO) / 10 + Number.EPSILON) * 100) / 100
      percentages.GO = Math.round(((outcomeChances.GO - outcomeChances.LO) / 10 + Number.EPSILON) * 100) / 100
      percentages["1B"] = Math.round(((outcomeChances["1B"] - outcomeChances.GO) / 10 + Number.EPSILON) * 100) / 100
      percentages["2B"] = Math.round(((outcomeChances["2B"] - outcomeChances["1B"]) / 10 + Number.EPSILON) * 100) / 100
      percentages["3B"] = Math.round(((outcomeChances["3B"] - outcomeChances["2B"]) / 10 + Number.EPSILON) * 100) / 100
      percentages["HR"] = Math.round(((outcomeChances.HR - outcomeChances["3B"]) / 10 + Number.EPSILON) * 100) / 100
      percentages["BB"] = Math.max(0, Math.round(((1000 - outcomeChances.HR) / 10) * 100) / 100);

      return percentages
    },

    endGame: function (winner) {
      console.log("That's The Ball Game!", winner, "Tournament Won!"); //for testing
      if (winner == "player") {
        this.tournamentsWon += 1;
        this.presentItems();
        this.presentMementos();
      }
      if (this.tournamentsWon === 3) {
        this.winRun();
      }
    },

    winRun: function () {
      console.log("Victory!") //for testing
    },

    generateItems: function () { //will add more later, serves as a placeholder for all items in the game
      let availableItems = [
        { name: "Corked Bat", strengthmod: 25, ejectionChance: 0.02 },
        //add more items later
      ];
    },

    equipItem: function (item, player) { //equip selected item to current player
      player.equippedItem = item;
      this.equippedItems.push(item)
      this.availableItems = this.availableItems.filter(x => x.name !== item.name)
    },

    unequipItem: function (player) { //this will be changed, not exactly sure how to remove the item once it's been used so doing an unequip for now
      this.availableItems.push(player.equippedItem)
      player.equippedItem = null;
    },

    checkItemEffect: function (batter, hitType) { //not sure the logic to eject a player, will add later
      const item = batter.equippedIem
      if (item) {
        switch (item.name) {
          case "Corked Bat":
            if (Math.random() < item.ejectionChance) {
              console.log("YOU'RE OUTTA HERE!") //for testing
              //add the logic here
              this.strikeout(this.gameObject)
              return true; //causes a strikeout if a player is ejected
            }
            break;
        }
      }
      return false
    },

    presentItems: function () { //after a tournament is won, the player will be presented items and mementos
      if (this.tournamentsWon % 3 == 0 && this.tournamentsWon != 0) {
        this.generateItems()
        console.log("Take your pick", this.availableItems); //for testing
        this.presentMementos()
      }
    },

    presentMementos: function () { //
      if (this.tournamentsWon % 3 == 0 && this.tournamentsWon != 0) {
        this.generateMementos()
        console.log("Fun for the whole team", this.availableMementos) //for testing
      }
    },

    generateMementos: function () { //add more mementos
      this.availableMementos = [
        { name: "Rally Cap", effect: "Each player has a 1% higher chance to hit a home run. If a player gets a hit, this chance doubles. If a player strikes out or hits a home run, this chance resets." }
        //add more mementos here
      ]
    },

    chooseMemento: function (memento) { //add more mementos
      this.choseMementos.push(memento)
      this.availableMementos = this.availableMementos.filter(x => x.name !== memento.name)
      switch (memento.name) {
        case "Rally Cap":
          this.applyRallyCap()
          break;
        //add more mementos here
      }
    },

    applyRallyCap: function () { //do this for all additional mementos
      //I'll add the logic later
    },
    //apply all mementos

    performItemFunction: function (item) {
      switch (item) {
        case "corked_bat":
          this.corked_bat()
          return;
      }
    },

    corked_bat: function () {
      //test
    },
  },

}

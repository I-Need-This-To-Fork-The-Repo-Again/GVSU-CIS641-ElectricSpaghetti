import GameplayMixin from '/GameplayMixin.js';

const gameLogic = {
  mixins: [GameplayMixin],
  data: () {
    playerTeam: {},
    opponentTeam: {},
    game: {
      inning: 1,
      top: true,
      outs: 0,
      baseStatus: {
      first: false,
      second: false,
      third: false,
    },
    }
    availableItems: [],
    equippedItems: [],
    availableMementos: [],
    chosenMementos: [],
    tournamentsWon: 0,
  };
},
  
  methods: {
    generateTeam() { //creates team with generated players, all with stats between 50 and 100
      const team = [];
      for (let i = 0; i < 9; i++) {
        team.push({
        contact: Math.floor(Math.random()*50) + 50,
        strength: Math.floor(Math.random()*50) + 50,
        vision: Math.floor(Math.random()*50) + 50,
        speed: Math.floor(Math.random()*50) + 50,
        luck: Math.floor(Math.random()*50) + 50,
        equippedItem: null,
        });
      }
      return {
        players: team,
        hitter: 0,
        runs: 0,
        hits: 0,
        inningscore: [0, 0, 0],
        home: false,
      };
},

determineHitOutcome(batter) { //zero idea if this is gonna be balanced or not but we can figure that out later
  let randomNumber = Math.random()*1000;
  let contactMod = batter.contact + (batter.equippedItem ? batter.equippedItem.contactMod || 0 : 0);
  let strengthMod = batter.strength + (batter.equippedItem ? batter.equippedItem.strengthMod || 0 : 0);
  let visionMod = batter.vision + (batter.equippedItem ? batter.equippedItem.visionMod || 0 : 0);
  let speedMod = batter.speed + (batter.equippedItem ? batter.equippedItem.speedMod || 0 : 0);
  let luckMod = batter.luck + (batter.equippedItem ? batter.equippedItem.luckMod || 0 : 0);

  if (randomNumber < (75 - (contactMod/2.5)) + (visionMod/15) + (luckMod/20)) { //number < 50 = strikeout
    if (this.checkItemEffect(batter, "K")) {return}
    return "K";
  } else if (randomNumber < (250 - (contactMod/3)) + (visionMod/10) + (luckMod/20)) { //number < 200 = flyout
    if (this.checkItemEffect(batter, "FO")) {return}
    return "FO";
  } else if (randomNumber < (350 - (contactMod/3)) + (visionMod/10) + (luckMod/20)) { //number < 300 = lineout
    if (this.checkItemEffect(batter, "LO")) {return}
    return "LO";
  } else if (randomNumber < (600 - (contactMod/4)) + (visionMod/10) + (luckMod/20)) { //number < 600 = groundout
    if (this.checkItemEffect(batter, "GO")) {return}
    return "GO";
  } else if (randomNumber < (800 + (strengthMod/8) - (visionMod/15) - (speedMod/12) + (luckMod/25))) { //number < 800 = single
    if (this.checkItemEffect(batter, "1B")) {return}
    return "1B";
  } else if (randomNumber < (900 + (strengthMod/6) - (visionMod/15) + (speedMod/10) + (luckMod/25))) { //number < 900 = double
    if (this.checkItemEffect(batter, "2B")) {return}
    return "2B";
  } else if (randomNumber < (950 + (strengthMod/5) - (visionMod/15) + (speedMod/8) + (luckMod/20))) { //number < 950 = triple
    if (this.checkItemEffect(batter, "3B")) {return}
    return "3B";
  } else if (randomNumber < (995 + (strengthMod/4) - (visionMod/20) + (luckMod/18))) { //number < 975 = homer
    if (this.checkItemEffect(batter, "HR")) {return}
    return "HR";
  } 
  else {
    if (this.checkItemEffect(batter, "BB")) {return}
      return "BB"; //walk
  }
},








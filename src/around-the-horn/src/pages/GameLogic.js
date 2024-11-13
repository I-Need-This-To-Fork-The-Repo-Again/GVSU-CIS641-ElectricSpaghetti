
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

let hitThreshold = {
  "K": 75,
}

function determineHitOutcome(batter) { //zero idea if this is gonna be balanced or not but we can figure that out later
  let randomNumber = Math.random() * 1000;
  let contactMod = batter.contact + (batter.equippedItem ? batter.equippedItem.contactMod || 0 : 0);
  let strengthMod = batter.strength + (batter.equippedItem ? batter.equippedItem.strengthMod || 0 : 0);
  let visionMod = batter.vision + (batter.equippedItem ? batter.equippedItem.visionMod || 0 : 0);
  let speedMod = batter.speed + (batter.equippedItem ? batter.equippedItem.speedMod || 0 : 0);
  let luckMod = batter.luck + (batter.equippedItem ? batter.equippedItem.luckMod || 0 : 0);

  if (randomNumber < (hitThreshold.K - (contactMod / 2.5)) + (visionMod / 15) + (luckMod / 20)) { //number < 50 = strikeout
    if (this.checkItemEffect(batter, "K")) { return }
    return "K";
  } else if (randomNumber < (250 - (contactMod / 3)) + (visionMod / 10) + (luckMod / 20)) { //number < 200 = flyout
    if (this.checkItemEffect(batter, "FO")) { return }
    return "FO";
  } else if (randomNumber < (350 - (contactMod / 3)) + (visionMod / 10) + (luckMod / 20)) { //number < 300 = lineout
    if (this.checkItemEffect(batter, "LO")) { return }
    return "LO";
  } else if (randomNumber < (600 - (contactMod / 4)) + (visionMod / 10) + (luckMod / 20)) { //number < 600 = groundout
    if (this.checkItemEffect(batter, "GO")) { return }
    return "GO";
  } else if (randomNumber < (800 + (strengthMod / 8) - (visionMod / 15) - (speedMod / 12) + (luckMod / 25))) { //number < 800 = single
    if (this.checkItemEffect(batter, "1B")) { return }
    return "1B";
  } else if (randomNumber < (900 + (strengthMod / 6) - (visionMod / 15) + (speedMod / 10) + (luckMod / 25))) { //number < 900 = double
    if (this.checkItemEffect(batter, "2B")) { return }
    return "2B";
  } else if (randomNumber < (950 + (strengthMod / 5) - (visionMod / 15) + (speedMod / 8) + (luckMod / 20))) { //number < 950 = triple
    if (this.checkItemEffect(batter, "3B")) { return }
    return "3B";
  } else if (randomNumber < (995 + (strengthMod / 4) - (visionMod / 20) + (luckMod / 18))) { //number < 975 = homer
    if (this.checkItemEffect(batter, "HR")) { return }
    return "HR";
  }
  else {
    if (this.checkItemEffect(batter, "BB")) { return }
    return "BB"; //walk
  }
}

// function startGame() {
//   this.playerTeam = this.generateTeam();
//   this.opponentTeam = this.generateTeam();
//   this.playerTeam.home = Math.random() < 0.5 ? true : false;
//   this.opponentTeam.home = !this.playerTeam.home
//   this.gameObject = {
//     inning: 1,
//     top: true,
//     outs: 0,
//     baseStatus: {
//       first: false,
//       second: false,
//       third: false,
//     },
//   };
//   this.generateItems();
//   console.log("Batter Up!"); //for testing
// }

// function continueGame() {
//   let currentTeam = this.gameObject.top ? this.opponentTeam : this.playerTeam;
//   let batter = currentTeam.players[currentTeam.hitter];

//   const hitType = this.determineHitOutcome(batter);
//   this.chooseHitType(hitType, this.gameObject, currentTeam);
//   this.nextBatter(currentTeam);
//   this.checkWin(this.gameObject, this.playerTeam, this.opponentTeam);
// }

function endGame(winner) {
  console.log("That's The Ball Game!", winner, "Tournament Won!"); //for testing
  if (winner == "player") {
    this.tournamentsWon += 1;
    this.presentItems();
    this.presentMementos();
  }
  if (this.tournamentsWon === 3) {
    this.winRun();
  }
}

function winRun() {
  console.log("Victory!") //for testing
}

function generateItems() { //will add more later, serves as a placeholder for all items in the game
  let availableItems = [
    { name: "Corked Bat", strengthmod: 25, ejectionChance: 0.02 },
    //add more items later
  ];
}

function equipItem(item, player) { //equip selected item to current player
  player.equippedItem = item;
  this.equippedItems.push(item)
  this.availableItems = this.availableItems.filter(x => x.name !== item.name)
}

function unequipItem(player) { //this will be changed, not exactly sure how to remove the item once it's been used so doing an unequip for now
  this.availableItems.push(player.equippedItem)
  player.equippedItem = null;
}

function checkItemEffect(batter, hitType) { //not sure the logic to eject a player, will add later
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
}

function presentItems() { //after a tournament is won, the player will be presented items and mementos
  if (this.tournamentsWon % 3 == 0 && this.tournamentsWon != 0) {
    this.generateItems()
    console.log("Take your pick", this.availableItems); //for testing
    this.presentMementos()
  }
}

function presentMementos() { //
  if (this.tournamentsWon % 3 == 0 && this.tournamentsWon != 0) {
    this.generateMementos()
    console.log("Fun for the whole team", this.availableMementos) //for testing
  }
}

function generateMementos() { //add more mementos
  this.availableMementos = [
    { name: "Rally Cap", effect: "Each player has a 1% higher chance to hit a home run. If a player gets a hit, this chance doubles. If a player strikes out or hits a home run, this chance resets." }
    //add more mementos here
  ]
}

function chooseMemento(memento) { //add more mementos
  this.choseMementos.push(memento)
  this.availableMementos = this.availableMementos.filter(x => x.name !== memento.name)
  switch (memento.name) {
    case "Rally Cap":
      this.applyRallyCap()
      break;
    //add more mementos here
  }
}

function applyRallyCap() { //do this for all additional mementos
  //I'll add the logic later
}
//apply all mementos

function performItemFunction(item) {
  switch(item) {
    case "corked_bat":
      this.corked_bat()
      return;
  }
}

function corked_bat() {
  //test
}

export default GameLogic;





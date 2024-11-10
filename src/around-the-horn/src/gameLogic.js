import GameplayMixin from '/GameplayMixin.js';

const gameLogic = {
  mixins: [GameplayMixin],
  data: () => ({
    playerTeam: null,
    opponentTeam: null,
    game: null,
    inventory: [], //player item inventory
    mementos: [], //team mementos
    currentTournament: 1,
  }),
  methods: {
    newGame() {
      this.playerTeam = this.generateTeam();
      this.startTournament: 1,
    }),
    startTournament() {
      this.currentTournament++;
      this.opponentTeam = this.generateTeam();
      this.game = this.createGame(this.playerTeam, this.opponentTeam, true);
    },

    generateTeam() { //creates team with generated players
      const team = {
        players: [],
        hitter: 0,
        runs: 0,
        hits: 0,
        inningscore: [0, 0, 0],
      };
      for (let i = 0; i < 9; i++) {
        team.players.push(this.generatePlayer());
      }
      return team;
    },

    generatePlayer() { //sets player stats between 50 and 100, item is null at start
      return {
        contact: Math.floor(Math.random()*50) + 50,
        strength: Math.floor(Math.random()*50) + 50,
        vision: Math.floor(Math.random()*50) + 50,
        speed: Math.floor(Math.random()*50) + 50,
        luck: Math.floor(Math.random()*50) + 50,
        item: null,
      };
    },

    createGame(homeTeam, awayTeam, playerisHome) {
      return {
        
      }
    }
  }
}








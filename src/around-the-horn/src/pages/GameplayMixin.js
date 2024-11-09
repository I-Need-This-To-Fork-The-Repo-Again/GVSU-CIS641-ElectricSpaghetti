export default {
    data: function () {
        return {};
    },

    methods: {
        nextBatter: function (teamObject) {
            if (teamObject.hitter === 8) {
                teamObject.hitter = 0
            }
            else {
                teamObject.hitter = teamObject.hitter + 1
            }
        },

        chooseHitType: function (type, gameObject, teamObject) {
            switch (type) {
                case "K":
                    return this.strikeout(gameObject);
                case "FO":
                    return this.flyout(gameObject, teamObject);
                case "LO":
                    return this.lineout(gameObject);
                case "GO":
                    return this.groundout(gameObject, teamObject);
                case "1B":
                    return this.single(gameObject, teamObject);
                case "2B":
                    return this.double(gameObject, teamObject);
                case "3B":
                    return this.triple(gameObject, teamObject);
                case "HR":
                    return this.homeRun(gameObject, teamObject);
                case "BB":
                    return this.walk(gameObject, teamObject)
            }
        },

        strikeout: function (gameObject) {
            console.log("K")
            this.addOut(gameObject)
        },

        lineout: function (gameObject) {
            console.log("LO")
            this.addOut(gameObject)
        },

        flyout: function (gameObject, teamObject) {
            console.log("FO")
            if (gameObject.baseStatus.third && gameObject.outs < 2) { //if runner on third and inning isnt about to end (tag up)
                gameObject.baseStatus.third = false
                this.addRun(gameObject, teamObject, 1)
            }
            this.addOut(gameObject)
        },

        groundout: function (gameObject, teamObject) {
            console.log("GO")
            if (gameObject.baseStatus.first && gameObject.baseStatus.second && gameObject.baseStatus.third) {
                //bases loaded = dp and runner on second and third
                if (gameObject.outs < 1) {
                    gameObject.baseStatus.first = false
                }
                if (gameObject.outs < 2) {
                    this.addOut(gameObject)
                }
                this.addOut(gameObject)
            }
            else if (gameObject.baseStatus.first && gameObject.baseStatus.second) {
                //runner on second and first= dp + runner on third
                if (gameObject.outs < 1) {
                    gameObject.baseStatus.first = false
                    gameObject.baseStatus.second = false
                    gameObject.baseStatus.third = true
                }
                if (gameObject.outs < 2) {
                    this.addOut(gameObject)
                }
                this.addOut(gameObject)
            }
            else if (gameObject.baseStatus.first && gameObject.baseStatus.third) {
                //runner on first and third = dp + runner scores, bases empty
                if (gameObject.outs < 1) {
                    this.addRun(gameObject, teamObject, 1)
                    gameObject.baseStatus.first = false
                    gameObject.baseStatus.third = false
                }
                if (gameObject.outs < 2) {
                    this.addOut(gameObject)
                }
                this.addOut(gameObject)
            }
            else if (gameObject.baseStatus.second && gameObject.baseStatus.third) {
                //runner on second and third = out + runner scores, runner on third
                if (gameObject.outs < 2) {
                    gameObject.baseStatus.second = false
                    this.addRun(gameObject, teamObject, 1)
                }
                this.addOut(gameObject)
            }
            else if (gameObject.baseStatus.first) {
                //runner on first = dp, bases empty
                if (gameObject.outs < 2) {
                    this.addOut(gameObject)
                }
                this.addOut(gameObject)
            }
            else if (gameObject.baseStatus.second) {
                //runner on second = out, runner on third
                if (gameObject.outs < 2) {
                    gameObject.baseStatus.second = false
                    gameObject.baseStatus.third = true
                }
                this.addOut(gameObject)
            }
            else if (gameObject.baseStatus.third) {
                //runner on third = out + runner scores, bases empty
                if (gameObject.outs > 2) {
                    gameObject.baseStatus.third = false
                    this.addRun(gameObject, teamObject, 1)
                }
                this.addOut(gameObject)
            }
            else {
                //none on = out, bases empty
                this.addOut(gameObject)
            }
        },

        single: function (gameObject, teamObject) {
            if(gameObject.baseStatus.third) {
                //score run, remove third
                this.addRun(gameObject, teamObject, 1)
                gameObject.baseStatus.third = false
            }
            if(gameObject.baseStatus.second) {
                //score run, remove second
                this.addRun(gameObject, teamObject, 1)
                gameObject.baseStatus.second = false
            }
            if(gameObject.baseStatus.first) {
                //runner to third
                gameObject.baseStatus.third = true
            }
            //runner to first, add hit
            gameObject.baseStatus.first = true
            teamObject.hits = teamObject.hits + 1
        },

        double: function (gameObject, teamObject) {
            if(gameObject.baseStatus.third) {
                //score run, remove third
                this.addRun(gameObject, teamObject, 1)
                gameObject.baseStatus.third = false
            }
            if(gameObject.baseStatus.second) {
                //score run, remove second
                this.addRun(gameObject, teamObject, 1)
                gameObject.baseStatus.second = false
            }
            if(gameObject.baseStatus.first) {
                //score run, remove first
                this.addRun(gameObject, teamObject, 1)
                gameObject.baseStatus.first = false
            }
            //runner to second, add hit
            gameObject.baseStatus.second = true
            teamObject.hits = teamObject.hits + 1
        },

        triple: function (gameObject, teamObject) {
            if(gameObject.baseStatus.third) {
                //score run, remove third
                this.addRun(gameObject, teamObject, 1)
                gameObject.baseStatus.third = false
            }
            if(gameObject.baseStatus.second) {
                //score run, remove second
                this.addRun(gameObject, teamObject, 1)
                gameObject.baseStatus.second = false
            }
            if(gameObject.baseStatus.first) {
                //score run, remove first
                this.addRun(gameObject, teamObject, 1)
                gameObject.baseStatus.first = false
            }
            //runner to third, add hit
            gameObject.baseStatus.third = true
            teamObject.hits = teamObject.hits + 1
        },

        homeRun: function (gameObject, teamObject) {
            //score run for each runner + batter
            this.addRun(gameObject, teamObject, 1 + [gameObject.baseStatus.first, gameObject.baseStatus.second, gameObject.baseStatus.third].filter(Boolean).length)
            gameObject.baseStatus.first = false
            gameObject.baseStatus.second = false
            gameObject.baseStatus.third = false
            teamObject.hits = teamObject.hits + 1
        },

        walk: function (gameObject, teamObject) {
            if (gameObject.baseStatus.first && gameObject.baseStatus.second && gameObject.baseStatus.third) {
                //bases loaded = score run
                this.addRun(gameObject, teamObject,)
            }
            else if ([gameObject.baseStatus.first, gameObject.baseStatus.second, gameObject.baseStatus.third].filter(Boolean).length === 2 ) {
                //any two runners on base = bases loaded
                gameObject.baseStatus.first = true
                gameObject.baseStatus.second = true
                gameObject.baseStatus.third = true
            }
            else if (gameObject.baseStatus.first) {
                //runner on first = first and second
                gameObject.baseStatus.second = true
            }
            else if (gameObject.baseStatus.second) {
                //runner on second = first and second
                gameObject.baseStatus.first = true
            }
            else if (gameObject.baseStatus.third) {
                //runner on third = first and third
                gameObject.baseStatus.first = true
            }
            else {
                //none on = first
                gameObject.baseStatus.first = true
            }
        },

        addOut: function (gameObject) {
            gameObject.outs = gameObject.outs + 1
            if (gameObject.outs > 2) { //if 3 outs (inning over)
                gameObject.outs = 0
                if (!gameObject.top) { //if ending bottom of inning
                    gameObject.inning = gameObject.inning + 1
                    gameObject.top = true
                    gameObject.baseStatus.first = false
                    gameObject.baseStatus.second = false
                    gameObject.baseStatus.third = false
                }
                else { //if ending top of inning
                    gameObject.top = false
                    gameObject.baseStatus.first = false
                    gameObject.baseStatus.second = false
                    gameObject.baseStatus.third = false
                }
            }
        },

        addRun: function (gameObject, teamObject, num) {
            teamObject.runs += num
            teamObject.inningScore[gameObject.inning - 1] += num
        },

        checkWin: function (gameObject, teamObject, opponentObject) {
            if(gameObject.inning === 3) { //if in third inning
                if(gameObject.top === false && teamObject.home === true && teamObject.runs > opponentObject.runs) { //if player team is home and winning in bottom three
                    //player win
                    console.log("player win")
                }
                else if(gameObject.top === false && teamObject.home === false && teamObject.runs < opponentObject.runs) { //if player is away and losing in bottom three
                    //opp win
                    console.log("opp win")
                }
            }
            else if(gameObject.inning === 4) { //third inning ends
                if(teamObject.runs > opponentObject.runs) { //player winning after three
                    //player win
                    console.log("player win")
                }
                else if(teamObject.runs < opponentObject.runs) { //opp winning after three
                    //opp win
                    console.log("opp win")
                }
            }
        }
    },

    computed: {},
};

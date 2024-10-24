export default {
	data: function () {
		return {};
	},

	methods: {
		nextBatter: function(teamObject) {
            if(teamObject.hitter === 8) {
                teamObject.hitter = 0
            } 
            else {
                teamObject.hitter = teamObject.hitter + 1
            }
        },

        chooseHitType: function(type, gameObject, teamObject) {
            switch(type) {
                case "K":
                    return this.strikeout(gameObject);
                case "FO":
                    return this.flyout(gameObject, teamObject);
                case "LO":
                    return this.lineout(gameObject, teamObject);
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
            }
        },

        strikeout: function(gameObject) {
            console.log("K")
            gameObject.outs = gameObject.outs + 1
        },

        lineout: function(gameObject, teamObject) {

        },

        flyout: function(gameObject, teamObject) {

        },

        groundout: function(gameObject, teamObject) {

        },

        single: function(gameObject, teamObject) {

        },

        double: function(gameObject, teamObject) {

        },

        triple: function(gameObject, teamObject) {

        },

        homeRun: function(gameObject, teamObject) {

        },
	},

	computed: {},
};

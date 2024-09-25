Team name: Electric Spaghetti

Team members: Cameron Schneider, Nick Carter

# Introduction

This project will consist of a web-based video game demo. The game is a baseball based roguelike, and is unnamed as of now.

The game is based on a simple wheel/random number generator system to decide what outcome a player's at-bat will have. A team will be randomly generated, including 9 players with randomly generated stats. These stats will determine how likely each outcome will be when the player is at-bat. For instance, a player with more Slugging will have a higher chance of hitting home runs/doubles, and a player with lower contact will strike out more often.

The structure of the game will consist of single-elimination, tournament-style brackets. The player must coach their team through three games in each bracket (imagine an 8 team bracket). After each game, the player will have the option to choose between several given stat changes for their team (+5 Slugging, -3 Contact). They can also choose items for their players to hold, which have stronger upsides, stronger downsides, and can be moved between player (Corked Bat: +25 Slugging, 2% chance to be ejected every at-bat). After completing a tournament, the player can choose between several "team defining" buffs called mementos, which are significantly stronger with less direct downsides or activation criteria. (Rally: Each player has a 1% higher chance to hit a home run. If a player gets a hit, this chance doubles. If a player strikes out or hits a home run, this chance resets). Once they choose their buffs, they move on to the next tournament. Once the player wins 8 tournaments, they win the run.

The demo will include a working set of visuals (likely no animations). It will also include an account system allowing players to save their games and see a run-log.

In this demo, the player will only be able to play through 3 tournaments, and the numbers of items, buffs, and mementos will be lower. This demo works as a proof of concept.

# Anticipated Technologies

Front-End made in Javascript Vue
Firebase Firestore backend

# Method/Approach

* Draw up front-end mock ups to get full team on the same page about visuals and layout
* Plan back-end data structures. How we will store account data, team data, player data, etc.
* Begin implementation. Begin by generating a team with stats. Write algorithms to determine how each stat impacts the random wheel. Write logic for each outcome from the wheel. Implement Victory conditions and progression systems. etc.
* Set-up authentication for accounts.
* The game is intended to be modular, so that items, buffs, and mementos can easily be added, removed, and changed. Must keep this in mind

# Estimated Timeline

Timeline is very vague for now, will be refined more in the future.

We will be splitting work into two week sprints, starting on Monday, September 30th and ending on Sunday, December 8th.

#### Sprint 1: 9/30/24 - 10/13/24
* Draw Mock-Ups of webpage. Begin getting environment set up. Plan data structures, and get back-end set up. Understand how to interface between front and back end.
#### Sprint 2: 10/14/24 - 10/27/24
* Begin generating teams and designing UI. Begin research on how to design the algorithms for the RNG wheel. Begin implementation for accounts and authentication.
#### Sprint 3: 10/28/24 - 11/10/24
* Complete research on RNG wheel and begin implementing algorithms to control the wheel. Begin implementing logic for outcomes, score tracking, state-of-game tracking, etc.
#### Sprint 4: 11/11/24 - 11/24/24
* Wire up front-end to these algorithms. Should be the first playable version of the game. Work on progression systems, buff/item/memento selection, and victory conditions.
#### Sprint 5: 11/25/24 - 12/8/24
* Add items, bug test, add polish. Complete authentication, game-saving, and run log. Work on project presentation.

## Due Date: Dec 9, 2024


# Anticipated Problems

* Making a web game in Vue instead of a game engine will take away from the time it takes to learn a game development environment, but may add to the time it takes to make the game. It will likely look worse as well.
* The algorithms to generate the outcomes will be difficult to make, and will likely be the host of many, many bugs.
* We need to consider all web-based interactions, such as refreshing the page, going back/forth, closing and reopening the browser. We want to make the game feel seamless to play.
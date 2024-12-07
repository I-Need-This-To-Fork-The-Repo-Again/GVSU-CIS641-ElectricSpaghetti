# **Overview**
This document will show a list of requirements that must be met for each individual feature within the product. These requirements are split between Functional and Non-Functional. After the requirements section is the change management plan. This describes how we would train, incorporate, and debug for the client.
# **Software Requirements**
This section contains the requirements, both Functional and Non-Functional. Each type of requirement has 5 categories, each category with 5 requirements specific to that category. This gives us a total of 50 requirements, 25 Funcitonal and 25 Non-Functional.
## Functional Requirements
### RNG At-Bats
| ID | Requirement |
| :-------------: | :----------: |
| FR1 | When a runner is on first and there are less than two outs, a ground out shall become a double play. |
| FR2 | When a runner is on third and there are less than two outs, a fly out shall advance the runner from third. |
| FR3 | When a runner is on second, a double shall score a run and remove the scored runner from second base. |
| FR4 | When a runner is on third, a single shall score a run and remove the runner from third base. |
| FR5 | When there are two outs and the batter gets out, player shall choose stat increase and play next round. |
### Player Stats
| ID | Requirement |
| :-------------: | :----------: |
| FR6 | RNG buckets shall differ between players with different stats. |
| FR7 | Chances of outcome shall be determined by affected stats. |
| FR8 | CPU stats shall scale for each run to incorporate rouge-like gameplay elements. |
| FR9 | Stats shall be random at the start of each run. |
| FR10 | A stat shall provide increased/decreased chances of a certain at-bat outcome. |
### Website Details
| ID | Requirement |
| :-------------: | :----------: |
| FR11 | A new game shall start when the new game button is pressed. |
| FR12 | Team details shall be displayed on either side of the diamond. |
| FR13 | Bases shall be highlited if a runner is on. |
| FR14 | A victory screen shall be displayed after each tournament win. |
| FR15 | A game over screen shall be displayed if the player loses the tournament. |
### Teams and Players
| ID | Requirement |
| :-------------: | :----------: |
| FR16 | Players shall be randomly generated for each team. |
| FR17 | Player names shall not be repeated within the same team. |
| FR18 | Teams shall be randomized for each tournament. |
| FR19 | Difficulty for each CPU team shall be determined by stats for each tournament. |
| FR20 | Difficulty for each CPU team shall scale as the player progresses. |
### Overall Stats
| ID | Requirement |
| :-------------: | :----------: |
| FR21 | Common stat increases shall have one stat increase and one stat decrease. |
| FR22 | Mythic stat increases shall have a stat increase for all five stats. |
| FR23 | Stats shall determine the outcome for at-bats. |
| FR24 | Each oppenent stat will be subtracted from the affected stat to generate the outcome percentage. |
| FR25 | Stats for opposing teams will increase as each tournament progresses. |
## Non-Functional Requirements
### RNG At-Bats
| ID | Requirement |
| :-------------: | :----------: |
| NFR1 | An expected outcome shall happen when a player performs an at-bat. |
| NFR2 | Outcomes for each at-bat shall be consistent with each type of hit/out. |
| NFR3 | Percentages for each outcome shall be accurate. |
| NFR4 | Percentages for each outcome will directly correlate to the associated stats. |
| NFR5 | The outcome of each at-bat shall be displayed accurately and promptly. |
### Stats
| ID | Requirement |
| :-------------: | :----------: |
| NFR6 | The opposing teams shall be at a similar stat level to the player. |
| NFR7 | Stats shall be randomly calculated at the beginning of each game. |
| NFR8 | Stats shall create a unique gameplay experience each game. |
| NFR9 | Stats shall not exceed the maximum/minimum caps to ensure consistency. |
| NFR10 | Stats shall improve but not guarantee probabilities of specific outcomes. |
### Website Details
| ID | Requirement |
| :-------------: | :----------: |
| NFR11 | The game shall be replayable with each separate run. |
| NFR12 | The game shall perform quickly and accurately in a browser. |
| NFR13 | The game shall be playable on most all major browsers. |
| NFR14 | The game shall be playable on different platforms such as Windows, macOS, etc. |
| NFR15 | The game UI shall be intuitive and easy to navigate. |
### Code
| ID | Requirement |
| :-------------: | :----------: |
| NFR16 | The game code shall allow future updates with minimal impact or downtime. |
| NFR17 | The game code shall have proper documentation for the developers in the future. |
| NFR18 | The game code shall properly log errors for easy debugging. |
| NFR19 | The stat calculation code shall carry out the proper equations within a required range. |
| NFR20 | The game code shall allow the developer to easily modify existing features to balance difficulty. |
### Performance of Game
| ID | Requirement |
| :-------------: | :----------: |
| NFR21 | The game shall run smoothly and quickly. |
| NFR22 | The game shall have a consistent up-time. |
| NFR23 | The game shall not require intensive hardware to play. |
| NFR24 | The game shall operate accurately. |
| NFR25 | The game shall be accessible to anyone with a browser and internet connection. |

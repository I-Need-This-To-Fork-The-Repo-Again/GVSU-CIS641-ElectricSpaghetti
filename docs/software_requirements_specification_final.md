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
| FR5 | When the bases are loaded, a home run will score four runs and clear the bases. |
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
# **Change management plan**
This section contains the change management plan for our project. We will include how to train users to play/use our game, how we ensure it will integrate into existing ecosystems/software, and how we will ensure that issues are resolved promptly.
### *How will we train people to use it?*
* Around the Horn is simple and intuitive, so much so that you only press a singular button for the core gameplay mechanic (hitting). By providing clear instructions on naming your team, playing the game, and selecting the desired player for post-game stat changes, Around the Horn will be easy for any customer to learn. An easy demo of the game will provide a comprehensive overview of how to play the game. Because it is a roguelike, it is up to the customer/players to determine how to properly strategize. The simplicity of our game ensures that the customer will be able to pick it up very quickly without having to understand complex gameplay rules or mechanics.
### *How will we ensure it integrates withing their ecosystem/software?*
* Since Around the Horn is based in a web-browser, as long as they have a browser, it will integrate. We provide clear instructions on how to correctly install any software that is needed to visualize the game, and the rest occurs in the browser. No massive downloads, no GPU or power CPU required. Just the browser of their choice and a few steps to get the game up and running.
### *How will we ensure that any discovered issues are resolved?*
* With a very small development team, the customer will be able to reach out directly to the developers to notify them of any bugs or errors. If discovered, the developers will be able to promptly assess the errors and make corrections to the code where necessary. Since the game is a simple web-based interface, it is most likely that the errors will revolve around the stat modifiers and difficulty curve. With this in mind, the developers can actively stress test and check edge cases to find any possible bugs and patch them even before the customer is able to discover it themselves.
# **Traceability links**
This section will contain all of our traceability between our requirements and artifacts. This section is split up into three sections: one table for use case diagrams, one table for class diagrams, and one table for activity diagrams.
## Use Case Diagram Traceability
| Artifact ID | Artifact Name | Requirement ID |
| :-------------: | :----------: | :----------: |
| UseCase1 | Move Player | FR5 |
| … | … | … |
## Class Diagram Traceability
| Artifact Name | Requirement ID |
| :-------------: |:----------: |
| classPlayer | NFR3, FR5 |
| … | … | … |
## Activity Diagram Traceability
<In this case, it makes more sense (I think, feel free to disagree) to link
to the file and to those requirements impacted>
| Artifact ID | Artifact Name | Requirement ID |
| :-------------: | :----------: | :----------: |
| <filename> | Handle Player Input | FR1-5, NFR2 |
| … | … | … |
# **Software Artifacts**
This section will contain all of the software artifacts that we developed for this project.
* [At-Bat Use Case](../artifacts/At-Bat_Use_Case.drawio.png)

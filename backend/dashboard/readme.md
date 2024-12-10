Bas(e)stats is a dashboard web application focused on baseball performance analysis, specifically comparing offensive and defensive statistics of a team (likely the New York Yankees). The backend will be built with Java 21 using Spring Boot, and it will collect data through web scraping via JSoup. The database will be SQLite for storing team statistics.

On the frontend, React will be used to display interactive graphs and data comparisons. The application will analyze key metrics such as batting performance (home runs, RBIs, batting average) and defensive performance (fielding percentage, runs allowed, pitching stats) to give insights into the team's season progress.



The **batting** table is related to the **defensive statistics** of players. Here’s the explanation of each column in the table, which is focused on defense:

### Explanation of the columns:

1. **Name**: The name of the player.
2. **Age**: The player's age during the season.
3. **G**: Games played, meaning the number of games in which the player participated.
4. **GS**: Games as a starter, but in the context of batters, it might not have much impact. It's a measure of how many games the player played as a starter.
5. **CG**: Complete games (for pitchers), which is an indicator of how many games the pitcher finished without being replaced. This may not be relevant for batters.
6. **Inn**: Innings played (for pitchers), which may not be relevant for batters.
7. **Ch**: Defensive changes, the number of times a player enters the game to change the defense.
8. **PO**: Putouts, the number of times a player has eliminated a runner by themselves (e.g., catching a fly ball or making an out at first base).
9. **A**: Assists, the number of times the player has made a pass or throw that results in an out.
10. **E**: Errors committed by the player in defense.
11. **DP**: Double plays, the number of times the player has been part of a double play.
12. **Fld%**: **Fielding Percentage**, a measure of how effective a player is in defense. It is calculated as:  
   \[
   Fld\% = \frac{PO + A}{PO + A + E}
   \]
   Meaning how many outs the player made versus their errors.
13. **Rtot**: Total Runs, the total number of runs the player has avoided or created through their defensive ability (also known as **"Total Runs"** in some contexts).
14. **Rtot/yr**: Total Runs per year, a measure of how many "runs" a player is expected to save in an average season.
15. **Rdrs**: **Defensive Runs Above Average**, a measure of how many runs a player has saved above the average for a player in their position.
16. **Rdrs/yr**: **Defensive Runs Above Average per year**, the average number of runs a player has saved above the average during a season.
17. **Rgood**: Number of runs saved that are considered "good" or "effective," as part of an exceptional defensive play.
18. **RF/9**: **Range Factor per 9 Innings**, measures how much ground a player covers defensively per 9 innings played.
19. **RF/G**: **Range Factor per game**, measures how much ground a player covers defensively per game.
20. **PB**: **Passed Balls**, the number of times a catcher failed to stop a pitch, allowing a runner to advance.
21. **WP**: **Wild Pitches**, the number of times a pitcher throws a pitch that is out of control and the catcher cannot catch.
22. **SB**: **Stolen Bases**, the number of bases a player has stolen.
23. **CS**: **Caught Stealing**, the number of times a player was caught attempting to steal a base.
24. **CS%**: **Catch Stealing Percentage**, the proportion of stolen base attempts that were successfully stopped. It is calculated as:
   \[
   CS\% = \frac{CS}{SB + CS}
   \]
   How many stealing attempts the player successfully stopped.
25. **lgCS%**: **League Average Catch Stealing Percentage**, the average stolen base prevention percentage in the league, used as a comparison for the player.
26. **PO**: **Putouts** (repeated from column 8).
27. **Pos Summary**: Summary of the position the player most frequently played during the season.
28. **Name-additional**: Additional information about the player's name, such as a nickname or a variant of the name.

### Summary:
This table seems to be more focused on **defensive statistics** of players. Some of the columns mentioned are related to **defensive performance**, such as **Putouts (PO)**, **Assists (A)**, **Errors (E)**, **Double Plays (DP)**, **Fielding Percentage (Fld%)**, and advanced metrics like **Defensive Runs (Rdrs)** and **Range Factor (RF)**.

Concepts like **Rtot**, **Rdrs**, and **RF** are important to understand how players contribute defensively by preventing runs.


Here’s an explanation of each column from the **pitching** table provided, explaining what each metric represents:

### 1. **Rk**: 
   - **Rank**: The rank of the player in the list, typically based on a specific metric (e.g., WAR, IP, etc.).

### 2. **Player**: 
   - The name of the pitcher.

### 3. **Age**: 
   - The age of the player during the season.

### 4. **IP**: 
   - **Innings Pitched**: The total number of innings the pitcher has thrown.

### 5. **G**: 
   - **Games**: The total number of games the pitcher has participated in.

### 6. **GS**: 
   - **Games Started**: The number of games in which the pitcher started the game as the starting pitcher.

### 7. **R**: 
   - **Runs Allowed**: The total number of earned and unearned runs the pitcher has given up.

### 8. **RA9**: 
   - **Runs Allowed per 9 Innings**: The number of runs allowed per 9 innings pitched. This is a rate statistic that standardizes the pitcher’s runs allowed over a 9-inning game.

### 9. **RA9opp**: 
   - **Runs Allowed per 9 Innings by Opponents**: The number of runs allowed per 9 innings pitched by the opposing team, essentially how effective the pitcher was against the opponents.

### 10. **RA9def**: 
   - **Runs Allowed per 9 Innings by Defense**: The number of runs allowed per 9 innings that can be attributed to defensive failures (i.e., errors, misplays).

### 11. **RA9role**: 
   - **Runs Allowed per 9 Innings by Role**: The number of runs allowed per 9 innings, adjusted based on the pitcher’s role (starter or reliever).

### 12. **RA9extras**: 
   - **Runs Allowed per 9 Innings in Extra Innings**: The number of runs allowed per 9 innings pitched in extra innings, where the game goes beyond the usual 9 innings.

### 13. **PPFp**: 
   - **Pitches per 9 Innings Pitched**: The average number of pitches thrown per 9 innings. This indicates how efficient the pitcher is at getting batters out.

### 14. **RA9avg**: 
   - **RA9 Average**: The average number of runs allowed per 9 innings across all pitchers in the league, used as a comparative measure for the pitcher.

### 15. **RAA**: 
   - **Runs Above Average**: This statistic indicates how many fewer runs a pitcher has allowed compared to the league average.

### 16. **WAA**: 
   - **Wins Above Average**: A statistic that reflects how many wins a pitcher has contributed above the average pitcher. It’s an overall measure of a pitcher’s effectiveness.

### 17. **gmLI**: 
   - **Game Leverage Index**: A measure of the game situations in which the pitcher has been used. It indicates how high-leverage (pressure-packed) the games were when the pitcher appeared.

### 18. **WAAadj**: 
   - **Adjusted Wins Above Average**: An adjustment to the **WAA** statistic, factoring in the game leverage and other factors, giving a more refined measurement of the pitcher’s value.

### 19. **WAR**: 
   - **Wins Above Replacement**: A key advanced statistic that reflects how many wins a pitcher has contributed to their team compared to a replacement-level pitcher (i.e., a freely available pitcher who is average or below).

### 20. **RAR**: 
   - **Runs Above Replacement**: The number of runs a pitcher has saved above a replacement-level pitcher, similar to **WAR**, but focuses on the number of runs rather than wins.

### 21. **waaWL%**: 
   - **Wins Above Average Adjusted for Win-Loss Percentage**: A measure that adjusts **WAA** by the pitcher’s team’s win-loss percentage, reflecting the pitcher’s effectiveness in the context of their team’s performance.

### 22. **162WL%**: 
   - **162-Game Win-Loss Percentage**: The pitcher’s projected win-loss percentage over a full, 162-game season. This is typically used to give context to pitchers' statistics over the course of a full season.

### 23. **Awards**: 
   - **Awards**: Any significant awards or accolades the pitcher has earned, such as All-Star selections, Cy Young Award, or other recognitions.

### 24. **Player-additional**: 
   - **Additional Information about the Player**: This column contains any additional details about the player, such as team changes, injuries, or other pertinent data not captured in the other columns.

---

### **Summary:**
This table is focused on **pitching statistics**, with advanced metrics like **Runs Above Average (RAA)**, **Wins Above Average (WAA)**, **WAR**, and more, providing a deeper understanding of a pitcher’s performance beyond traditional stats. It accounts for not just how many runs a pitcher allows but also compares their performance against league averages, their team, and various situations during the game.
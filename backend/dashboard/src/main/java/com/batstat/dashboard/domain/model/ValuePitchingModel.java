package com.batstat.dashboard.domain.model;

import com.opencsv.bean.CsvBindByName;

/**
 * Here's a block of text explaining the ValuePitching class:
 *
 * """
 * #### **`ValuePitching` Class:**
 * - **`playerName`**: The name of the pitcher.
 * - **`inningsPitched`**: The total number of innings the pitcher has thrown.
 * - **`strikeouts`**: The number of batters the pitcher has struck out.
 * - **`earnedRuns`**: The number of earned runs allowed by the pitcher.
 * - **`era`**: Earned Run Average, calculated as **(Earned Runs / Innings Pitched) x 9**, indicating the average number of earned runs a pitcher allows per 9 innings.
 * - **`whip`**: Walks + Hits per Inning Pitched, a measure of a pitcher’s ability to prevent batters from reaching base.
 * """
 */          


public class ValuePitchingModel {

    @CsvBindByName(column = "Player")
    private String playerName;
    @CsvBindByName(column = "G")
    private int gamesPlayed;
    @CsvBindByName(column = "IP")
    private double inningsPitched;       
    @CsvBindByName(column = "R")
    private int earnedRuns;
    @CsvBindByName(column = "RA9")
    private double era; // Earned Run Average
    @CsvBindByName(column = "RAA")
    private double raa; // Walks + Hits per Inning Pitched
    @CsvBindByName(column = "WAA")
    private double waa; // number of victories under the average

    // Constructors
    public ValuePitchingModel() {}


    public ValuePitchingModel(String playerName, int gamesPlayed, double inningsPitched, int earnedRuns,
                         double era, double raa, double waa) {
        this.playerName = playerName;
        this.gamesPlayed = gamesPlayed;
        this.inningsPitched = inningsPitched;
        this.earnedRuns = earnedRuns;
        this.era = era;
        this.raa = raa;
        this.waa = waa;
    }

    // Getters and Setters
    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public int getGamesPlayed() {
        return gamesPlayed;
    }

    public void setGamesPlayed(int gamesPlayed) {
        this.gamesPlayed = gamesPlayed;
    }

    public double getInningsPitched() {
        return inningsPitched;
    }

    public void setInningsPitched(double inningsPitched) {
        this.inningsPitched = inningsPitched;
    }

    public int getEarnedRuns() {
        return earnedRuns;
    }

    public void setEarnedRuns(int earnedRuns) {
        this.earnedRuns = earnedRuns;
    }

    public double getEra() {
        return era;
    }

    public void setEra(double era) {
        this.era = era;
    }

    public double getRaa() {
        return raa;
    }

    public void setRaa(double raa) {
        this.raa = raa;
    }

    public double getWaa() {
        return waa;
    }

    public void setWaa(double waa) {
        this.waa = waa;
    }
}

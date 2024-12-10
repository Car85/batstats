package com.batstat.dashboard.domain.model;

import com.opencsv.bean.CsvBindByName;


public class ValueBattingModel {


    @CsvBindByName(column = "Player")
    private String playerName;
    @CsvBindByName(column = "HR")
    private double homeRuns;
    @CsvBindByName(column = "WAR")
    private double war; // wins over average
    @CsvBindByName(column = "G")
    private double gamesPlayed;
    @CsvBindByName(column = "R")
    private double runScored;
    @CsvBindByName(column = "H")
    private double hits;
    @CsvBindByName(column = "SB")
    private double stolenBases; // On-Base Plus Slugging

    // Constructors
    
    public ValueBattingModel() {}



    public ValueBattingModel(String playerName, double homeRuns, double war, double gamesPlayed, 
    double runScored, double hits, double stolenBases) {
        this.playerName = playerName;
        this.homeRuns = homeRuns;
        this.war = war;
        this.gamesPlayed = gamesPlayed;
        this.runScored = runScored;
        this.hits = hits;
        this.stolenBases = stolenBases;
    }

    // Getters and Setters
    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public double getHomeRuns() {
        return homeRuns;
    }

    public void setHomeRuns(double homeRuns) {
        this.homeRuns = homeRuns;
    }

    public double getWar() {
        return war;
    }

    public void setWar(double war) {
        this.war = war;
    }

    public double getGamesPlayed() {
        return gamesPlayed;
    }

    public void setGamesPlayed(double gamesPlayed) {
        this.gamesPlayed = gamesPlayed;
    }

    public double getHits() {
        return hits;
    }

    public void setHits(double hits) {
        this.hits = hits;
    }

    public double getStolenBases() {
        return stolenBases;
    }

    public void setStolenBases(double stolenBases) {
        this.stolenBases = stolenBases;
    }

    public double getRunScored() {
        return runScored;
    }

    public void setRunScored(double runScored) {
        this.runScored = runScored;
    }
}

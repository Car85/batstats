package com.batstat.dashboard.infrastructure.persistence.entity;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class ValuePitchingEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;

    private String playerName;
    private int gamesPlayed;
    private double inningsPitched;    
    private int earnedRuns;
    private double era; // Earned Run Average
    private double whip; // Walks + Hits per Inning Pitched
    private double waa; // number of victories under the average


    public ValuePitchingEntity() {
        this.id = UUID.randomUUID();  // Generating UUID when the object is created
    }
   
    public ValuePitchingEntity(String playerName, int gamesPlayed, double inningsPitched, int earnedRuns,
                         double era, double whip, double waa) {
        this.id = UUID.randomUUID();  // Generating UUID when the object is created
        this.playerName = playerName;
        this.gamesPlayed = gamesPlayed;
        this.inningsPitched = inningsPitched;
        this.earnedRuns = earnedRuns;
        this.era = era;
        this.whip = whip;
        this.waa = waa;
    }
    


    // Getters and Setters

     public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public int getGamesPlayed() {
        return gamesPlayed;
    }

    public void setGamesPlayed(int gamesPlayed) {
        this.gamesPlayed = gamesPlayed;
    }


    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
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

    public double getWhip() {
        return whip;
    }

    public void setWhip(double whip) {
        this.whip = whip;
    }

    public double getWaa() {
        return waa;
    }

    public void setWaa(double waa) {
        this.waa = waa;
    }
}
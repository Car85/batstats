package com.batstat.dashboard.infrastructure.persistence.entity;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class ValueBattingEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    private UUID id;

    private String playerName;
    private int homeRuns;
    private int rbi;
    private double battingAverage;
    private double onBasePercentage;
    private double sluggingPercentage;
    private double ops;

     // Constructors
    public ValueBattingEntity() {
        this.id = UUID.randomUUID();  // Generating UUID when the object is created
    }

    public ValueBattingEntity(String playerName, int homeRuns, int rbi, double battingAverage, 
                            double onBasePercentage, double sluggingPercentage, double ops) {
        this.id = UUID.randomUUID();  // Generating UUID when the object is created
        this.playerName = playerName;
        this.homeRuns = homeRuns;
        this.rbi = rbi;
        this.battingAverage = battingAverage;
        this.onBasePercentage = onBasePercentage;
        this.sluggingPercentage = sluggingPercentage;
        this.ops = ops;
    }

    // Getters and Setters
    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public int getHomeRuns() {
        return homeRuns;
    }

    public void setHomeRuns(int homeRuns) {
        this.homeRuns = homeRuns;
    }

    public int getRbi() {
        return rbi;
    }

    public void setRbi(int rbi) {
        this.rbi = rbi;
    }

    public double getBattingAverage() {
        return battingAverage;
    }

    public void setBattingAverage(double battingAverage) {
        this.battingAverage = battingAverage;
    }

    public double getOnBasePercentage() {
        return onBasePercentage;
    }

    public void setOnBasePercentage(double onBasePercentage) {
        this.onBasePercentage = onBasePercentage;
    }

    public double getSluggingPercentage() {
        return sluggingPercentage;
    }

    public void setSluggingPercentage(double sluggingPercentage) {
        this.sluggingPercentage = sluggingPercentage;
    }

    public double getOps() {
        return ops;
    }

    public void setOps(double ops) {
        this.ops = ops;
    }

}

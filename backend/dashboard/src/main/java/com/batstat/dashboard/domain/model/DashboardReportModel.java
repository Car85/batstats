package com.batstat.dashboard.domain.model;

import java.time.LocalDateTime;

public class DashboardReportModel {

    private String id;
    private String name;
    private String type;
    private String configuration;
    private LocalDateTime createdAt;

    public DashboardReportModel() {}

    public DashboardReportModel(String id, String name, String type, String configuration, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.configuration = configuration;
        this.createdAt = createdAt;
    }

    // Getters y setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getConfiguration() {
        return configuration;
    }

    public void setConfiguration(String configuration) {
        this.configuration = configuration;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}

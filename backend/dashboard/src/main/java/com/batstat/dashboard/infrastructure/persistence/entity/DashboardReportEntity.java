package com.batstat.dashboard.infrastructure.persistence.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "dashboard_report_entity")
public class DashboardReportEntity {


    @Id
    @Column(name = "id", nullable = false, updatable = false)
    private UUID id;

    private String name;
    private String type;
    private String configuration;
    @Column(nullable = false, columnDefinition = "DATETIME")
    private LocalDateTime createdAt;

    public DashboardReportEntity(){}

    public DashboardReportEntity(UUID id, String name, String type, String configuration, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.configuration = configuration;
        this.createdAt = createdAt;


    }

    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
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

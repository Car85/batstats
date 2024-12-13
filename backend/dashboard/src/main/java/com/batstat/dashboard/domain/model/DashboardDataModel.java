package com.batstat.dashboard.domain.model;

import java.time.LocalDateTime;

public record DashboardDataModel(

String name,
String description,
LocalDateTime date,
String jsonData

) {

    public DashboardDataModel(String name, String description, String jsonData) {
        this(name, description, LocalDateTime.now(), jsonData);
    }
}

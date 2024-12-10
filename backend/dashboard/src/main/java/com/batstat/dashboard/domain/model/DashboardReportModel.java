package com.batstat.dashboard.domain.model;

import java.time.LocalDateTime;

public record DashboardReportModel(
    String name,
    String type,
    String configuration,
    LocalDateTime createdAt ) {}

package com.batstat.dashboard.infrastructure.persistence.factory;

import org.springframework.stereotype.Component;

import com.batstat.dashboard.infrastructure.persistence.entity.DashboardReportEntity;

@Component
public interface ReportEntityFactory {

        DashboardReportEntity createEntity();


}

package com.batstat.dashboard.infrastructure.persistence.factory.impl;

import com.batstat.dashboard.infrastructure.persistence.entity.DashboardReportEntity;
import com.batstat.dashboard.infrastructure.persistence.factory.ReportEntityFactory;

public class ReportEntityFactoryImpl implements ReportEntityFactory {

    @Override
    public DashboardReportEntity createEntity() {        
        return new DashboardReportEntity();
    }

}

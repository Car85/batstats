package com.batstat.dashboard.application.mapper;

import org.springframework.stereotype.Component;

import com.batstat.dashboard.domain.model.DashboardReportModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardReportEntity;

@Component
public class ReportEntityToModel implements EntityToModel<DashboardReportEntity, DashboardReportModel>{

    @Override
    public DashboardReportModel convertToModel(DashboardReportEntity entity) {
        return new DashboardReportModel(
            entity.getId() != null ? entity.getId().toString() : null,
            entity.getName(),
            entity.getType(),
            entity.getConfiguration(),
            entity.getCreatedAt()
        );
    }

}

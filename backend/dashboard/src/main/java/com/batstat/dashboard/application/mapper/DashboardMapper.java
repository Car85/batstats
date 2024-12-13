package com.batstat.dashboard.application.mapper;

import com.batstat.dashboard.domain.model.DashboardReportModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardReportEntity;

import org.springframework.stereotype.Component;

@Component
public class DashboardMapper {

    public DashboardReportEntity toEntity(DashboardReportModel model) {
        return new DashboardReportEntity(
            model.name(),
            model.type(),
            model.configuration(),
            model.createdAt()
        );
    }

    public DashboardReportModel toModel(DashboardReportEntity entity) {
        return new DashboardReportModel(
            entity.getName(),
            entity.getType(),
            entity.getConfiguration(),
            entity.getCreatedAt()
        );
    }
}

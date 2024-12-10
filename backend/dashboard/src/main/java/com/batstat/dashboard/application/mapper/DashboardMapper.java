package com.batstat.dashboard.application.mapper;

import com.batstat.dashboard.domain.model.DashboardReportModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardEntity;


import org.springframework.stereotype.Component;

@Component
public class DashboardMapper {

    public DashboardEntity toEntity(DashboardReportModel model) {
        return new DashboardEntity(
            model.name(),
            model.type(),
            model.configuration(),
            model.createdAt()
        );
    }

    public DashboardReportModel toModel(DashboardEntity entity) {
        return new DashboardReportModel(
            entity.getName(),
            entity.getType(),
            entity.getConfiguration(),
            entity.getCreatedAt()
        );
    }
}

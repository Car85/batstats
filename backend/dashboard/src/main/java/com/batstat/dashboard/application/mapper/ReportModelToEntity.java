package com.batstat.dashboard.application.mapper;


import java.util.UUID;

import org.springframework.stereotype.Component;

import com.batstat.dashboard.domain.model.DashboardReportModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardReportEntity;
import com.batstat.dashboard.infrastructure.persistence.factory.ReportEntityFactory;

@Component
public class ReportModelToEntity implements ModelToEntity<DashboardReportModel, DashboardReportEntity>{
 

   private final ReportEntityFactory entityFactory;

    public ReportModelToEntity(ReportEntityFactory entityFactory) {
        this.entityFactory = entityFactory;
    }

    @Override
    public DashboardReportEntity convertToEntity(DashboardReportModel model) {
        DashboardReportEntity entity = entityFactory.createEntity();
        entity.setId(model.getId() != null ? UUID.fromString(model.getId()) : null);
        entity.setName(model.getName());
        entity.setType(model.getType());
        entity.setConfiguration(model.getConfiguration());
        entity.setCreatedAt(model.getCreatedAt());
        return entity;
    }

}

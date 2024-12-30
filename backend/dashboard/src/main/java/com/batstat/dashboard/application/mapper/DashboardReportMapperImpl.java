package com.batstat.dashboard.application.mapper;

import com.batstat.dashboard.domain.model.DashboardReportModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardReportEntity;
import com.batstat.dashboard.infrastructure.persistence.factory.ReportEntityFactory;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class DashboardReportMapperImpl implements DashboardReportMapper {

    private final ReportEntityFactory entityFactory;

    public DashboardReportMapperImpl(ReportEntityFactory entityFactory) {
        this.entityFactory = entityFactory;
    }

    @Override
    public DashboardReportEntity toEntity(DashboardReportModel model) {
        DashboardReportEntity entity = entityFactory.createEntity();
        entity.setId(model.getId() != null ? UUID.fromString(model.getId()) : null);
        entity.setName(model.getName());
        entity.setType(model.getType());
        entity.setConfiguration(model.getConfiguration());
        entity.setCreatedAt(model.getCreatedAt());
        return entity;
    }

    @Override
    public DashboardReportModel toModel(DashboardReportEntity entity) {
        return new DashboardReportModel(
            entity.getId() != null ? entity.getId().toString() : null,
            entity.getName(),
            entity.getType(),
            entity.getConfiguration(),
            entity.getCreatedAt()
        );
    }
}

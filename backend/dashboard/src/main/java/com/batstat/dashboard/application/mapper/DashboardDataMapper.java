package com.batstat.dashboard.application.mapper;

import org.springframework.stereotype.Component;

import com.batstat.dashboard.domain.model.DashboardDataModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardDataEntity;

@Component
public class DashboardDataMapper {


      public DashboardDataEntity toEntity(DashboardDataModel model) {
        return new DashboardDataEntity(
            model.name(),
            model.description(),
            model.date(),
            model.jsonData()
        );
    }

    public DashboardDataModel toModel(DashboardDataEntity entity) {
        return new DashboardDataModel(
            entity.getName(),
            entity.getDescription(),
            entity.getDate(),
            entity.getJsonData()
        );
    }

}

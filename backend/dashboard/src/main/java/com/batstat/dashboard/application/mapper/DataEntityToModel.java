package com.batstat.dashboard.application.mapper;

import org.springframework.stereotype.Component;

import com.batstat.dashboard.domain.model.DashboardDataModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardDataEntity;

@Component
public class DataEntityToModel  implements EntityToModel<DashboardDataEntity, DashboardDataModel>{

    @Override
    public DashboardDataModel convertToModel(DashboardDataEntity entity) {        
        return new DashboardDataModel(
            entity.getName(),
            entity.getDescription(),
            entity.getDate(),
            entity.getJsonData()
        );        
    }
}

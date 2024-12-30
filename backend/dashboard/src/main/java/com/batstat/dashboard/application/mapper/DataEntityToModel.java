package com.batstat.dashboard.application.mapper;

import com.batstat.dashboard.domain.model.DashboardDataModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardDataEntity;

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

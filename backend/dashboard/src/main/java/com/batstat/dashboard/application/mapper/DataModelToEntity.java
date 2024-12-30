package com.batstat.dashboard.application.mapper;

import org.springframework.stereotype.Component;

import com.batstat.dashboard.domain.model.DashboardDataModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardDataEntity;

@Component
public class DataModelToEntity implements ModelToEntity<DashboardDataModel, DashboardDataEntity>{
 

@Override
public DashboardDataEntity convertToEntity(DashboardDataModel model) {
    return new DashboardDataEntity(
        model.name(),
        model.description(),
        model.date(),
        model.jsonData()
    );
}


}

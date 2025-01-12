package com.batstat.dashboard.application.service;

import org.springframework.stereotype.Service;

import com.batstat.dashboard.mapper.DataModelToEntity;
import com.batstat.dashboard.domain.model.DashboardDataModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardDataEntity;
import com.batstat.dashboard.infrastructure.persistence.repository.DashboardDataRepository;

@Service
public class SQLiteDataCommandService implements com.batstat.dashboard.application.port.incoming.DataCommandService
{

    private final DashboardDataRepository repository;
    private final DataModelToEntity mapper;

    public SQLiteDataCommandService(DashboardDataRepository repository, DataModelToEntity mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public void saveData(DashboardDataModel data) {
        DashboardDataEntity entity = mapper.convertToEntity(data);
        repository.save(entity);    
    }

}

package com.batstat.dashboard.application.service;

import org.springframework.stereotype.Service;

import com.batstat.dashboard.application.mapper.DataModelToEntity;
import com.batstat.dashboard.application.port.incoming.DashboardDataService;
import com.batstat.dashboard.domain.model.DashboardDataModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardDataEntity;
import com.batstat.dashboard.infrastructure.persistence.repository.DashboardDataRepository;

@Service
public class DashboardDataServiceImplement implements DashboardDataService{

    private final DashboardDataRepository repository;
    private final DataModelToEntity mapper;

    public DashboardDataServiceImplement(DashboardDataRepository repository, DataModelToEntity mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public void saveData(DashboardDataModel data) {
        DashboardDataEntity entity = mapper.convertToEntity(data);
        repository.save(entity);    
    }

}

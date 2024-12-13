package com.batstat.dashboard.application.service;

import org.springframework.stereotype.Service;

import com.batstat.dashboard.application.mapper.DashboardDataMapper;
import com.batstat.dashboard.application.port.incoming.DashboardDataServiceInterface;
import com.batstat.dashboard.domain.model.DashboardDataModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardDataEntity;
import com.batstat.dashboard.infrastructure.persistence.repository.DashboardReportRepository;

@Service
public class DashboardDataServiceImplement implements DashboardDataServiceInterface{

    private final DashboardReportRepository repository;
    private final DashboardDataMapper mapper;

    public DashboardDataServiceImplement(DashboardReportRepository repository, DashboardDataMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public void saveData(DashboardDataModel data) {
        DashboardDataEntity entity = mapper.toEntity(data);
        repository.saveDataEntity(entity);    
    }

}

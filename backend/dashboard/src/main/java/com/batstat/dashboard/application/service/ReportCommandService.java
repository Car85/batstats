package com.batstat.dashboard.application.service;


import org.springframework.stereotype.Service;

import com.batstat.dashboard.application.mapper.ReportModelToEntity;
import com.batstat.dashboard.domain.model.DashboardReportModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardReportEntity;
import com.batstat.dashboard.infrastructure.persistence.repository.DashboardReportRepository;

@Service
public class ReportCommandService implements com.batstat.dashboard.application.port.incoming.ReportCommandService{

    private final DashboardReportRepository repository;
    private final ReportModelToEntity mapper;

    public ReportCommandService(DashboardReportRepository repository, ReportModelToEntity mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }


    @Override
    public void saveReport(DashboardReportModel reportModel) {
        
        DashboardReportEntity entity = mapper.convertToEntity(reportModel);
        repository.save(entity);    
    
    }
   
   
}
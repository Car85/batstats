package com.batstat.dashboard.application.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.batstat.dashboard.application.mapper.DashboardMapper;
import com.batstat.dashboard.application.port.incoming.DashboardReportServiceInterface;
import com.batstat.dashboard.domain.model.DashboardReportModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardReportEntity;
import com.batstat.dashboard.infrastructure.persistence.repository.DashboardReportRepository;

@Service
public class DashboardReportServiceImplement implements DashboardReportServiceInterface{

    private final DashboardReportRepository repository;
    private final DashboardMapper mapper;

    public DashboardReportServiceImplement(DashboardReportRepository repository, DashboardMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public void saveReport(DashboardReportModel reportModel) {
        
        DashboardReportEntity entity = mapper.toEntity(reportModel);
        repository.saveReportEntity(entity);    
    
    }

    public DashboardReportModel getReport(UUID id) {
        DashboardReportEntity entity = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Report not found"));
        return mapper.toModel(entity);
    }

    @Override
    public List<DashboardReportModel> getAllReports() {
    List<DashboardReportEntity> list_reports = repository.findAll();       
      
    return list_reports.stream()
       .map(mapper::toModel)
       .collect(Collectors.toList());
        
    }
   
}

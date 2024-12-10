package com.batstat.dashboard.application.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.batstat.dashboard.application.mapper.DashboardMapper;
import com.batstat.dashboard.application.port.incoming.DashboardServiceInterface;
import com.batstat.dashboard.domain.model.DashboardReportModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardEntity;
import com.batstat.dashboard.infrastructure.persistence.repository.DashboardReportRepository;

@Service
public class DashboardServiceImplement implements DashboardServiceInterface{

    private final DashboardReportRepository repository;
    private final DashboardMapper mapper;

    public DashboardServiceImplement(DashboardReportRepository repository, DashboardMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public void saveReport(DashboardReportModel reportModel) {
        
        DashboardEntity entity = mapper.toEntity(reportModel);
        repository.save(entity);    
    
    }

    public DashboardReportModel getReport(UUID id) {
        DashboardEntity entity = repository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Report not found"));
        return mapper.toModel(entity);
    }

    @Override
    public List<DashboardReportModel> getAllReports() {
    List<DashboardEntity> list_reports = repository.findAll();       
      
    return list_reports.stream()
       .map(mapper::toModel)
       .collect(Collectors.toList());
        
    }

}

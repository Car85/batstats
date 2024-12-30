package com.batstat.dashboard.application.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.batstat.dashboard.application.mapper.ReportEntityToModel;
import com.batstat.dashboard.domain.model.DashboardReportModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardReportEntity;
import com.batstat.dashboard.infrastructure.persistence.repository.DashboardReportRepository;

public class SqliteReportQueryService implements com.batstat.dashboard.application.port.incoming.ReportQueryService{

     private final DashboardReportRepository repository;
    private final ReportEntityToModel mapper;

    public SqliteReportQueryService(DashboardReportRepository repository, ReportEntityToModel mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public DashboardReportModel getReportById(UUID id) {
        return repository.findById(id)
                .map(mapper::convertToModel)
                .orElseThrow(() -> new IllegalArgumentException("Report not found"));
    }

    @Override
    public List<DashboardReportModel> getAllReports() {
        List<DashboardReportEntity> list_reports = repository.findAll();       
        return list_reports.stream()
           .map(mapper::convertToModel)
           .collect(Collectors.toList());
    }

  

}

package com.batstat.dashboard.application.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.batstat.dashboard.application.mapper.ReportEntityToModel;
import com.batstat.dashboard.domain.model.DashboardReportModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardReportEntity;
import com.batstat.dashboard.infrastructure.persistence.repository.DashboardReportRepository;

@Service
public class ReportQueryService implements com.batstat.dashboard.application.port.incoming.ReportQueryService{

    private final DashboardReportRepository repository;
    private final ReportEntityToModel mapper;

    public ReportQueryService(DashboardReportRepository repository, ReportEntityToModel mapper) {
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
        List<DashboardReportEntity> listReports = repository.findAll();       
        return listReports.stream()
           .map(mapper::convertToModel)
           .collect(Collectors.toList());
    }

  

}

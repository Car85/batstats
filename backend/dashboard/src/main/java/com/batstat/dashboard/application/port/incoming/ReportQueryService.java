package com.batstat.dashboard.application.port.incoming;

import java.util.List;
import java.util.UUID;

import com.batstat.dashboard.domain.model.DashboardReportModel;

public interface ReportQueryService {

    DashboardReportModel getReportById(UUID id);
    List<DashboardReportModel> getAllReports();

}

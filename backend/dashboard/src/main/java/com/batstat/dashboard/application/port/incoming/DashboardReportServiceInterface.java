package com.batstat.dashboard.application.port.incoming;

import java.util.List;

import com.batstat.dashboard.domain.model.DashboardReportModel;

public interface DashboardReportServiceInterface {

    void saveReport(DashboardReportModel report);

    List<DashboardReportModel> getAllReports();


}

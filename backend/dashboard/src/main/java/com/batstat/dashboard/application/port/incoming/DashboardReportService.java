package com.batstat.dashboard.application.port.incoming;


import com.batstat.dashboard.domain.model.DashboardReportModel;

public interface DashboardReportService {

    void saveReport(DashboardReportModel report);



}

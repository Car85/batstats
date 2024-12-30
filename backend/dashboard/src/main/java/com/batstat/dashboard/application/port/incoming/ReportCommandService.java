package com.batstat.dashboard.application.port.incoming;


import com.batstat.dashboard.domain.model.DashboardReportModel;

public interface ReportCommandService {

    void saveReport(DashboardReportModel report);

}

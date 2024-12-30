package com.batstat.dashboard.web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.batstat.dashboard.application.port.incoming.ReportCommandService;
import com.batstat.dashboard.domain.model.DashboardReportModel;

@RestController
@RequestMapping("/batstats/report/command")
public class ReportCommandController {

    private final ReportCommandService service;

    public ReportCommandController(ReportCommandService service) {
        this.service = service;
    }

    @PostMapping("/save-report")
    public ResponseEntity<String> saveReport(@RequestBody DashboardReportModel report) {
        service.saveReport(report);
        return ResponseEntity.ok("Report saved successfully");
    }
}

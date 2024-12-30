package com.batstat.dashboard.web.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.batstat.dashboard.application.port.incoming.ReportQueryService;
import com.batstat.dashboard.domain.model.DashboardReportModel;

@RestController
@RequestMapping("/batstats/report/query")
public class ReportQueryController {

    private final ReportQueryService service;

    public ReportQueryController(ReportQueryService service) {
        this.service = service;
    }

    @GetMapping("/getAllReports")
    public ResponseEntity<List<DashboardReportModel>> getAllReports() {
        List<DashboardReportModel> reports = service.getAllReports();
        return ResponseEntity.ok(reports);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DashboardReportModel> getReportById(@PathVariable UUID id) {
        DashboardReportModel report = service.getReportById(id);
        if (report == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(report);
    }
}

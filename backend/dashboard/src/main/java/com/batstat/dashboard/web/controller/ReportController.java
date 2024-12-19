package com.batstat.dashboard.web.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.batstat.dashboard.application.port.incoming.DashboardReportServiceInterface;
import com.batstat.dashboard.domain.model.DashboardReportModel;

@RestController
@RequestMapping("/batstats/report")
public class ReportController {
    
    private final DashboardReportServiceInterface service;

    public ReportController(DashboardReportServiceInterface service) {
        this.service = service;
    }

    @PostMapping("/save-report")
    public ResponseEntity<String> saveReport(@RequestBody DashboardReportModel report) {
        service.saveReport(report);
        return ResponseEntity.ok("Report saved successfully");
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


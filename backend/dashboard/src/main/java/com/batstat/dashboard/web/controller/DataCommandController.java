package com.batstat.dashboard.web.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.batstat.dashboard.application.port.incoming.DataCommandService;
import com.batstat.dashboard.domain.model.DashboardDataModel;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/batstats/data/command")
public class DataCommandController {

    private final DataCommandService service;

    public DataCommandController(DataCommandService service) {
        this.service = service;
    }


    @PostMapping("/save-data")
    public ResponseEntity<String> saveJson(@RequestBody DashboardDataModel data){

    service.saveData(data);

    return ResponseEntity.ok("Data saved successfully");

}
}

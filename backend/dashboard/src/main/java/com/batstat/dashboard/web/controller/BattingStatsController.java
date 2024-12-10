package com.batstat.dashboard.web.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.batstat.dashboard.application.port.outgoing.BattingStatsServiceInterface;
import com.batstat.dashboard.domain.model.ValueBattingModel;


@RestController
@RequestMapping("/batstats")
public class BattingStatsController {

    private final BattingStatsServiceInterface battingStatsService;

    public BattingStatsController(BattingStatsServiceInterface battingStatsService) {
        this.battingStatsService = battingStatsService;
    }

    @GetMapping("/batting")
    public List<ValueBattingModel> getBattingStats() {
        return battingStatsService.transformYankeesPlayersCsvValueBatting();
    }
  
}


package com.batstat.dashboard.web.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.batstat.dashboard.application.port.outgoing.PitchingStatsServiceInterface;
import com.batstat.dashboard.domain.model.ValuePitchingModel;

@RestController
@RequestMapping("/batstats")
public class PitchingStatsController {

    private final PitchingStatsServiceInterface pitchingStatsService;

    public PitchingStatsController(PitchingStatsServiceInterface pitchingStatsService) {
        this.pitchingStatsService = pitchingStatsService;
    }


    @GetMapping("/pitching")
    public List<ValuePitchingModel> getMethodName() {
        return pitchingStatsService.transformYankeesPlayersCsvValuePitching();
    }
    
    
}

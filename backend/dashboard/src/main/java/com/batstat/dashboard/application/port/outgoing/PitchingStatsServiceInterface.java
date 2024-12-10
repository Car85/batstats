package com.batstat.dashboard.application.port.outgoing;

import java.util.List;

import com.batstat.dashboard.domain.model.ValuePitchingModel;

public interface PitchingStatsServiceInterface {

       // public List<ValuePitchingModel> scrapeYankeesPlayersStatsValuePitching();
        public List<ValuePitchingModel> transformYankeesPlayersCsvValuePitching();


    
} 
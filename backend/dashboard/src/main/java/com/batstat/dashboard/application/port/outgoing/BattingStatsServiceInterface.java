package com.batstat.dashboard.application.port.outgoing;

import java.util.List;

import com.batstat.dashboard.domain.model.ValueBattingModel;

public interface BattingStatsServiceInterface {

    public List<ValueBattingModel> scrapeYankeesPlayersStatsValueBatting();
    public List<ValueBattingModel> transformYankeesPlayersCsvValueBatting();


}

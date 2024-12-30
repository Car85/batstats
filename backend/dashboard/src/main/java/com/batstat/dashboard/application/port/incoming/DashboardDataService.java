package com.batstat.dashboard.application.port.incoming;

import com.batstat.dashboard.domain.model.DashboardDataModel;

public interface DashboardDataService {

    void saveData(DashboardDataModel data);

}

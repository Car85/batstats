package com.batstat.dashboard.application.port.incoming;

import com.batstat.dashboard.domain.model.DashboardDataModel;

public interface DataCommandService {

    void saveData(DashboardDataModel data);

}

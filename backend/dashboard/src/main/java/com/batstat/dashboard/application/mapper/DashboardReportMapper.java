package com.batstat.dashboard.application.mapper;

import com.batstat.dashboard.domain.model.DashboardReportModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardReportEntity;

public interface DashboardReportMapper {

        DashboardReportEntity toEntity(DashboardReportModel model);
        DashboardReportModel toModel(DashboardReportEntity entity);


}

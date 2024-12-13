package com.batstat.dashboard.infrastructure.persistence.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.batstat.dashboard.infrastructure.persistence.entity.DashboardReportEntity;

@Repository
public interface DashboardReportRepository  extends JpaRepository<DashboardReportEntity, UUID>{

    DashboardReportEntity save(DashboardReportEntity report);

}

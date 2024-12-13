package com.batstat.dashboard.infrastructure.persistence.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.batstat.dashboard.infrastructure.persistence.entity.DashboardDataEntity;


@Repository
public interface DashboardDataRepository  extends JpaRepository<DashboardDataEntity, UUID>{

    DashboardDataEntity save(DashboardDataEntity data);

}




package com.batstat.dashboard.application.service;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.batstat.dashboard.mapper.ReportModelToEntity;
import com.batstat.dashboard.domain.model.DashboardReportModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardReportEntity;
import com.batstat.dashboard.infrastructure.persistence.repository.DashboardReportRepository;

@ExtendWith(MockitoExtension.class)
class ReportCommandServiceTest {



    @Mock
    private DashboardReportRepository repository;

    @Mock
    private ReportModelToEntity mapper;

    @InjectMocks
    private SQLiteReportCommandService service;

    @Test
    void testSaveReport() {
        // Arrange
        DashboardReportModel mockModel = new DashboardReportModel();
        DashboardReportEntity mockEntity = new DashboardReportEntity();

        when(mapper.convertToEntity(mockModel)).thenReturn(mockEntity);

        // Act
        service.saveReport(mockModel);

        // Assert
        verify(mapper).convertToEntity(mockModel);
        verify(repository).save(mockEntity);
    }
}



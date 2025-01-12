package com.batstat.dashboard.application.service;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;

import com.batstat.dashboard.mapper.DataModelToEntity;
import com.batstat.dashboard.domain.model.DashboardDataModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardDataEntity;
import com.batstat.dashboard.infrastructure.persistence.repository.DashboardDataRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


@ExtendWith(MockitoExtension.class)
class DataCommandServiceTest {

    @Mock
    private DashboardDataRepository repository;

    @Mock
    private DataModelToEntity mapper;

    @InjectMocks
    private SQLiteDataCommandService service;

    @Test
    void testSaveData() {
        // Arrange
        DashboardDataModel mockModel = new DashboardDataModel(
            "Test Name",
            "Test Description",
            LocalDateTime.now(),
            "{\"key\": \"value\"}"
        );

        DashboardDataEntity mockEntity = new DashboardDataEntity();
        mockEntity.setName("Test Name");
        mockEntity.setDescription("Test Description");
        mockEntity.setDate(LocalDateTime.now());
        mockEntity.setJsonData("{\"key\": \"value\"}");

        when(mapper.convertToEntity(mockModel)).thenReturn(mockEntity);

        // Act
        service.saveData(mockModel);

        // Assert
        verify(mapper).convertToEntity(mockModel);
        verify(repository).save(mockEntity);
    }
}

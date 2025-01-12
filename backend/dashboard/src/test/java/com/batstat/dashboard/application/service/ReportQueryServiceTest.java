package com.batstat.dashboard.application.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.batstat.dashboard.mapper.ReportEntityToModel;
import com.batstat.dashboard.domain.model.DashboardReportModel;
import com.batstat.dashboard.infrastructure.persistence.entity.DashboardReportEntity;
import com.batstat.dashboard.infrastructure.persistence.repository.DashboardReportRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@ExtendWith(MockitoExtension.class)
class ReportQueryServiceTest {

    @Mock
    private DashboardReportRepository repository;

    @Mock
    private ReportEntityToModel mapper;

    @InjectMocks
    private SQLiteReportQueryService service;

    @Test
    void testGetReportById() {
        // Arrange
        UUID id = UUID.randomUUID();
        DashboardReportEntity mockEntity = new DashboardReportEntity();
        mockEntity.setId(id);
        mockEntity.setName("Test Report");

        DashboardReportModel mockModel = new DashboardReportModel();
        mockModel.setId(id.toString());
        mockModel.setName("Test Report");

        when(repository.findById(id)).thenReturn(Optional.of(mockEntity));
        when(mapper.convertToModel(mockEntity)).thenReturn(mockModel);

        // Act
        DashboardReportModel result = service.getReportById(id);

        // Assert
        assertNotNull(result);
        assertEquals("Test Report", result.getName());
        verify(repository).findById(id);
        verify(mapper).convertToModel(mockEntity);
    }

    @Test
    void testGetReportByIdNotFound() {
        // Arrange
        UUID id = UUID.randomUUID();
        when(repository.findById(id)).thenReturn(Optional.empty());

        // Act & Assert
        Exception exception = assertThrows(IllegalArgumentException.class, () -> service.getReportById(id));
        assertEquals("Report not found", exception.getMessage());
        verify(repository).findById(id);
        verifyNoInteractions(mapper);
    }

    @Test
    void testGetAllReports() {
        // Arrange
        DashboardReportEntity entity1 = new DashboardReportEntity();
        entity1.setId(UUID.randomUUID());
        entity1.setName("Report 1");

        DashboardReportEntity entity2 = new DashboardReportEntity();
        entity2.setId(UUID.randomUUID());
        entity2.setName("Report 2");

        List<DashboardReportEntity> entities = Stream.of(entity1, entity2).collect(Collectors.toList());

        DashboardReportModel model1 = new DashboardReportModel();
        model1.setId(entity1.getId().toString());
        model1.setName("Report 1");

        DashboardReportModel model2 = new DashboardReportModel();
        model2.setId(entity2.getId().toString());
        model2.setName("Report 2");

        when(repository.findAll()).thenReturn(entities);
        when(mapper.convertToModel(entity1)).thenReturn(model1);
        when(mapper.convertToModel(entity2)).thenReturn(model2);

        // Act
        List<DashboardReportModel> results = service.getAllReports();

        // Assert
        assertEquals(2, results.size());
        assertEquals("Report 1", results.get(0).getName());
        assertEquals("Report 2", results.get(1).getName());
        verify(repository).findAll();
        verify(mapper).convertToModel(entity1);
        verify(mapper).convertToModel(entity2);
    }

}

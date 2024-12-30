package com.batstat.dashboard.application.mapper;


public interface ModelToEntity<M, E> {
    E convertToEntity(M model);
}

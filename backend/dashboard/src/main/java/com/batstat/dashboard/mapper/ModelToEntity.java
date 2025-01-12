package com.batstat.dashboard.mapper;


public interface ModelToEntity<M, E> {
    E convertToEntity(M model);
}

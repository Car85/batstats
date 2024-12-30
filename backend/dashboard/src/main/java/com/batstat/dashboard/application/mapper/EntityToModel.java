package com.batstat.dashboard.application.mapper;

public interface EntityToModel<E, M> {
    M convertToModel(E entity);
}

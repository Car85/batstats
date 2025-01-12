package com.batstat.dashboard.mapper;

public interface EntityToModel<E, M> {
    M convertToModel(E entity);
}

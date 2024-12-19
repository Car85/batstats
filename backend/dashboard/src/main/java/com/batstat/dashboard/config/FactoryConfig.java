package com.batstat.dashboard.config;

import com.batstat.dashboard.infrastructure.persistence.factory.ReportEntityFactory;
import com.batstat.dashboard.infrastructure.persistence.factory.impl.ReportEntityFactoryImpl;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FactoryConfig {

    @Bean
    public ReportEntityFactory reportEntityFactory() {
        return new ReportEntityFactoryImpl();
    }
}

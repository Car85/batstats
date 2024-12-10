package com.batstat.dashboard.application.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.batstat.dashboard.application.port.outgoing.PitchingStatsServiceInterface;
import com.batstat.dashboard.domain.model.ValuePitchingModel;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;

@Service
public class PitchingStatsServiceImplement implements PitchingStatsServiceInterface{

    @Value("${yankees.stats.pitching.csv}")
    private Resource pitchingCsv;

  

    @Override
    public List<ValuePitchingModel> transformYankeesPlayersCsvValuePitching() {
       
       try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(pitchingCsv.getInputStream(), StandardCharsets.UTF_8))) {
            
            CsvToBean<ValuePitchingModel> csvToBean = new CsvToBeanBuilder<ValuePitchingModel>(reader)
                .withType(ValuePitchingModel.class)
                .withIgnoreLeadingWhiteSpace(true)
                .build();
            
            return csvToBean.parse();    

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

    }
 
}


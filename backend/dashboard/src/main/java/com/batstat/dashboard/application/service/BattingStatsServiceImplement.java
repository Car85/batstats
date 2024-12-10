package com.batstat.dashboard.application.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.core.io.Resource;


import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.batstat.dashboard.application.port.outgoing.BattingStatsServiceInterface;
import com.batstat.dashboard.domain.model.ValueBattingModel;

@Service
public class BattingStatsServiceImplement implements BattingStatsServiceInterface {

    @Value("${yankees.stats.url}")
    private String url;

    @Value("${yankees.stats.batting.csv}")
    private Resource battingCsv;

    @Override
    public List<ValueBattingModel> scrapeYankeesPlayersStatsValueBatting() {
        Document htmlPage;
        Elements tables;
        List<ValueBattingModel> battingStats = new ArrayList<>();

        try {
            htmlPage = Jsoup.connect(url).get(); 
            tables = htmlPage.select("players_standard_batting");
        
             battingStats = tables.stream()
                .map(table -> table.select("tr").stream()  
                    .skip(1)  
                    .map(row -> {
                        Elements cells = row.select("th, td");
                        if (cells.size() >= 7) {
                            String playerName = cells.get(1).text();  // El nombre del jugador está en la primera celda
                            int war = Integer.parseInt(cells.get(4).text());
                            int gamesPlayed = Integer.parseInt(cells.get(5).text());
                            int runScored = Integer.parseInt(cells.get(8).text());
                            int hits = Integer.parseInt(cells.get(9).text());
                            int homeRuns = Integer.parseInt(cells.get(12).text());  // Asumiendo que las estadísticas están en las celdas 1, 2, ...
                            int stolenBases = Integer.parseInt(cells.get(14).text());

                            return new ValueBattingModel(playerName, homeRuns, war, gamesPlayed, runScored, hits, stolenBases);
                        }
                        return null;  
                    })
                    .filter(Objects::nonNull) 
                    .collect(Collectors.toList()) 
                )
                .flatMap(List::stream)
                .collect(Collectors.toList());

                battingStats.forEach(System.out::println);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return battingStats;
    }

    @Override
    public List<ValueBattingModel> transformYankeesPlayersCsvValueBatting() {
       
       try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(battingCsv.getInputStream(), StandardCharsets.UTF_8))) {
            
            CsvToBean<ValueBattingModel> csvToBean = new CsvToBeanBuilder<ValueBattingModel>(reader)
                .withType(ValueBattingModel.class)
                .withIgnoreLeadingWhiteSpace(true)
                .build();
            
            return csvToBean.parse();    

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

    }
 
}

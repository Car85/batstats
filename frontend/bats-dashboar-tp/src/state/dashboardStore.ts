import { create } from 'zustand';
import { Data } from 'plotly.js';
import { BarLayout, MatrixDataState, PlotYaout } from '@/types/Types';

type ChartState<T> = {
  data: Data[];
  layout: T;
};

type DashboardStore = {
  rawData: string[][];
  loadDataset: (data: string[][]) => void;

  lineChart: ChartState<Partial<Plotly.Layout>> | null;
  setLineChart: (state: ChartState<Partial<Plotly.Layout>>) => void;

  boxPlot: ChartState<PlotYaout> | null;
  setBoxPlot: (state: ChartState<PlotYaout>) => void;

  barChart: ChartState<BarLayout> | null;
  setBarChart: (state: ChartState<BarLayout>) => void;

  correlation: MatrixDataState;
  setCorrelation: (state: MatrixDataState) => void;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  rawData: [],
  loadDataset: (data) =>
    set({
      rawData: data,
      lineChart: null,
      boxPlot: null,
      barChart: null,
      correlation: { data },
    }),

  lineChart: null,
  setLineChart: (state) => set({ lineChart: state }),

  boxPlot: null,
  setBoxPlot: (state) => set({ boxPlot: state }),

  barChart: null,
  setBarChart: (state) => set({ barChart: state }),

  correlation: {},
  setCorrelation: (state) => set({ correlation: state }),
}));

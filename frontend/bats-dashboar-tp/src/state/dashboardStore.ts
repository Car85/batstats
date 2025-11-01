import { create } from 'zustand';
import { Data } from 'plotly.js';
import { BarLayout, MatrixDataState, PlotYaout } from '@/types/Types';

type ChartState<T> = {
  data: Data[];
  layout: T;
};

type DashboardStore = {
  rawData: string[][];
  setRawData: (data: string[][]) => void;

  lineChart: ChartState<Partial<Plotly.Layout>> | null;
  setLineChart: (state: ChartState<Partial<Plotly.Layout>>) => void;

  boxPlot: ChartState<PlotYaout> | null;
  setBoxPlot: (state: ChartState<PlotYaout>) => void;

  barChart: ChartState<BarLayout> | null;
  setBarChart: (state: ChartState<BarLayout>) => void;

  correlation: MatrixDataState;
  setCorrelation: (state: MatrixDataState) => void;

  reset: () => void;
};

export const useDashboardStore = create<DashboardStore>((set) => ({
  rawData: [],
  setRawData: (data) => set({ rawData: data }),

  lineChart: null,
  setLineChart: (state) => set({ lineChart: state }),

  boxPlot: null,
  setBoxPlot: (state) => set({ boxPlot: state }),

  barChart: null,
  setBarChart: (state) => set({ barChart: state }),

  correlation: {},
  setCorrelation: (state) => set({ correlation: state }),

  reset: () =>
    set({
      rawData: [],
      lineChart: null,
      boxPlot: null,
      barChart: null,
      correlation: {},
    }),
}));

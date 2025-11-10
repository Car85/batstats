import { create } from 'zustand';
import { Data } from 'plotly.js';
import { BarLayout, PlotYaout } from '@/types/Types';

type ChartState<T> = { data: Data[]; layout: T } | null;

type DashboardStore = {
  rawData: string[][];
  setRawData: (data: string[][]) => void;

  lineChart: ChartState<Partial<Plotly.Layout>>;
  setLineChart: (state: NonNullable<DashboardStore['lineChart']>) => void;

  boxPlot: ChartState<PlotYaout>;
  setBoxPlot: (state: NonNullable<DashboardStore['boxPlot']>) => void;

  barChart: ChartState<BarLayout>;
  setBarChart: (state: NonNullable<DashboardStore['barChart']>) => void;

  correlation: { data?: string[][] };
  setCorrelation: (state: { data?: string[][] }) => void;

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

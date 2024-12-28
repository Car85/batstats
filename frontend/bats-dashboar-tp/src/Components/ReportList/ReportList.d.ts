import { Dispatch, SetStateAction } from 'react';
import 'react-pivottable/pivottable.css';
import { PivotState, BoxPlotState } from '../../types/Types';
interface ReportsListProps {
    setPivotState: Dispatch<SetStateAction<PivotState>>;
    setBoxPlotState: Dispatch<SetStateAction<BoxPlotState>>;
}
declare function ReportsList({ setPivotState, setBoxPlotState }: Readonly<ReportsListProps>): import("react/jsx-runtime").JSX.Element;
export default ReportsList;

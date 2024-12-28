import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Plotly from 'react-plotly.js';
const BoxPlot = ({ data }) => {
    const [categoricalColumn, setCategoricalColumn] = useState(null);
    const [numericColumn, setNumericColumn] = useState(null);
    const [tooltipColumn, setTooltipColumn] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    if (!data || data.length === 0) {
        return _jsx("p", { children: "No data available" });
    }
    const headers = data[0];
    const rows = data.slice(1);
    const handleCategoricalChange = (event) => {
        setCategoricalColumn(event.target.value);
        setSelectedCategories([]);
    };
    const handleNumericChange = (event) => {
        setNumericColumn(event.target.value);
    };
    const handleTooltipChange = (event) => {
        setTooltipColumn(event.target.value);
    };
    const handleCategoryChange = (event) => {
        const options = Array.from(event.target.selectedOptions, (option) => option.value);
        setSelectedCategories(options);
    };
    const boxPlotData = () => {
        if (!categoricalColumn || !numericColumn)
            return [];
        const groupedData = {};
        rows.forEach((row) => {
            const category = row[headers.indexOf(categoricalColumn)];
            const numericValue = Number(row[headers.indexOf(numericColumn)]);
            const tooltipValue = String(row[headers.indexOf(tooltipColumn)]);
            if (!selectedCategories.length || selectedCategories.includes(category)) {
                if (!groupedData[category]) {
                    groupedData[category] = { values: [], tooltips: [] };
                }
                groupedData[category].values.push(numericValue);
                groupedData[category].tooltips.push(`${category}, ${numericValue}, ${tooltipColumn}: ${tooltipValue}`);
            }
        });
        return Object.entries(groupedData).map(([key, { values, tooltips }]) => ({
            y: values,
            type: 'box',
            name: key,
            text: tooltips,
            hoverinfo: 'text',
        }));
    };
    return (_jsxs("div", { children: [_jsx("h2", { children: "Dynamic Box Plot" }), _jsxs("div", { children: [_jsx("label", { htmlFor: "categoricalColumn", children: "Select Categorical Column:" }), _jsxs("select", { id: "categoricalColumn", value: categoricalColumn || '', onChange: handleCategoricalChange, children: [_jsx("option", { value: "", children: "--Select Categorical Column--" }), headers.map((header) => (_jsx("option", { value: header, children: header }, header)))] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "numericColumn", children: "Select Numeric Column:" }), _jsxs("select", { id: "numericColumn", value: numericColumn || '', onChange: handleNumericChange, children: [_jsx("option", { value: "", children: "--Select Numeric Column--" }), headers.map((header) => (_jsx("option", { value: header, children: header }, header)))] })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "tooltipColumn", children: "Select Tooltip Column:" }), _jsxs("select", { id: "tooltipColumn", value: tooltipColumn || '', onChange: handleTooltipChange, children: [_jsx("option", { value: "", children: "--Select Tooltip Column--" }), headers.map((header) => (_jsx("option", { value: header, children: header }, header)))] })] }), categoricalColumn && (_jsxs("div", { children: [_jsx("label", { htmlFor: "categoryFilter", children: "Select Specific Categories:" }), _jsx("select", { id: "categoryFilter", multiple: true, value: selectedCategories, onChange: handleCategoryChange, children: Array.from(new Set(rows.map((row) => row[headers.indexOf(categoricalColumn)]))).map((category) => (_jsx("option", { value: category, children: category }, category))) }), _jsx("button", { type: "button", onClick: () => setSelectedCategories([]), style: {
                            marginLeft: '10px',
                            padding: '5px 10px',
                            backgroundColor: '#f8f9fa',
                            border: '1px solid #ccc',
                        }, children: "Deselect All Categories" })] })), categoricalColumn && numericColumn && (_jsx(Plotly, { data: boxPlotData(), layout: {
                    title: 'Box Plot: Dynamic Analysis',
                    yaxis: { title: numericColumn },
                    xaxis: { title: categoricalColumn },
                } }))] }));
};
export default BoxPlot;

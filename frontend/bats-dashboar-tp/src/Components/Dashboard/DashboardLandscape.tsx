import PivotTable from "react-pivottable/PivotTable";
import BoxPlot from "../BoxPlot/Boxplot";
import BarChart from "../Barchart/BarChart";
import CorrelationMatrix from "../CorrelationMatrix/CorrelationMatrix";

const DashboardLandscape = ({ pivotState, boxPlotState, barChartState, correlationMatrixState }) => {
    const exportAsImageOrPDF = async (format) => {
      const dashboardElement = document.getElementById("dashboard-container");
  
      const canvas = await html2canvas(dashboardElement);
      const image = canvas.toDataURL("image/png");
  
      if (format === "image") {
        const link = document.createElement("a");
        link.href = image;
        link.download = "dashboard.png";
        link.click();
      } else if (format === "pdf") {
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(image, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("dashboard.pdf");
      }
    };
  
    return (
      <div>
        <button onClick={() => exportAsImageOrPDF("image")}>Export as Image</button>
        <button onClick={() => exportAsImageOrPDF("pdf")}>Export as PDF</button>
  
        <div
          id="dashboard-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            padding: "20px",
          }}
        >
          <div>
            <PivotTable data={pivotState?.data || []} state={pivotState} />
          </div>
          <div>
            <BoxPlot data={boxPlotState.data} state={boxPlotState} />
          </div>
          <div>
            <BarChart data={barChartState.data} state={barChartState} />
          </div>
          <div>
            <CorrelationMatrix data={correlationMatrixState} />
          </div>
        </div>
      </div>
    );
  };

  export default DashboardLandscape;
  
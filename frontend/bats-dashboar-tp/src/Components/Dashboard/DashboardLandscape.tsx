import BoxPlot from "../BoxPlot/Boxplot";
import BarChart from "../Barchart/BarChart";
import LineChart from "../LineChart/LineChart";
import CorrelationMatrix from "../CorrelationMatrix/CorrelationMatrix";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface DashboardProps {
  lineChartState: any;
  boxPlotState: any;
  barChartState: any;
  correlationMatrixState: any;
}

const DashboardLandscape = ({
  lineChartState,
  boxPlotState,
  barChartState,
  correlationMatrixState,
}: DashboardProps) => {
  
  const exportAsImageOrPDF = async (format: "image" | "pdf") => {
    const dashboardElement = document.getElementById("dashboard-container");

    if (!dashboardElement) return;

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
          <LineChart data={lineChartState?.data} state={lineChartState} />
        </div>
        <div>
          <BoxPlot data={boxPlotState?.data} state={boxPlotState} />
        </div>
        <div>
          <BarChart data={barChartState?.data} state={barChartState} />
        </div>
        <div>
          <CorrelationMatrix data={correlationMatrixState?.data || []} />
        </div>
      </div>
    </div>
  );
};

export default DashboardLandscape;

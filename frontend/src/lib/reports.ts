import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { format } from "date-fns";

// Extend jsPDF with autotable types
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface ReportData {
  title: string;
  category: string;
  columns: string[];
  rows: any[][];
}

export const generatePDF = (data: ReportData) => {
  const doc = new jsPDF();
  const dateStr = format(new Date(), "yyyy-MM-dd HH:mm");

  // Header
  doc.setFontSize(22);
  doc.setTextColor(16, 185, 129); // Brand Emerald
  doc.text("YesYouCan Cyber Secure", 14, 20);
  
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text(data.title, 14, 32);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated on: ${dateStr}`, 14, 40);
  doc.text(`Category: ${data.category}`, 14, 46);

  // Table
  autoTable(doc, {
    startY: 55,
    head: [data.columns],
    body: data.rows,
    theme: "grid",
    headStyles: { fillColor: [16, 185, 129], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [249, 250, 251] },
    margin: { top: 55 },
  });

  // Footer text as requested
  const pageCount = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    const footerText = "CEO: Dr. Noah Darko-Adjei | Strategic Advisor: Christiana Konlan Kennedy";
    doc.text(footerText, 14, doc.internal.pageSize.height - 10);
    doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10);
  }

  doc.save(`${data.title.toLowerCase().replace(/\s+/g, "-")}-${format(new Date(), "yyyyMMdd")}.pdf`);
};

export const generateExcel = (data: ReportData) => {
  const ws = XLSX.utils.aoa_to_sheet([data.columns, ...data.rows]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Report");

  // Metadata addition for professional look
  XLSX.writeFile(wb, `${data.title.toLowerCase().replace(/\s+/g, "-")}-${format(new Date(), "yyyyMMdd")}.xlsx`);
};

export const getMockDataForReport = (id: string): ReportData => {
  switch (id) {
    case "grc-summary":
      return {
        title: "GRC Executive Summary",
        category: "GRC",
        columns: ["Metric", "Value", "Status", "Trend"],
        rows: [
          ["Risk Posture Index", "84/100", "Strong", "+2%"],
          ["Compliance Coverage", "92%", "High", "+5%"],
          ["Open Mitigations", "14", "On Track", "-3"],
          ["Critical Incidents (30d)", "0", "Excellent", "0"],
        ],
      };
    case "esg-disclosure":
      return {
        title: "ESG Disclosure Report",
        category: "ESG",
        columns: ["Topic", "Indicator", "Value", "Unit"],
        rows: [
          ["Environmental", "Energy Consumption", "12,450", "kWh"],
          ["Social", "Employee Turnover", "4.2", "%"],
          ["Governance", "Board Diversity", "45", "%"],
          ["Environmental", "Water Usage", "1,200", "m3"],
        ],
      };
    case "carbon-report":
      return {
        title: "Carbon Emissions Report",
        category: "Environmental",
        columns: ["Scope", "Source", "Emissions", "Unit"],
        rows: [
          ["Scope 1", "Fuel Combustion", "450", "tCO2e"],
          ["Scope 2", "Purchased Electricity", "820", "tCO2e"],
          ["Scope 3", "Purchased Goods", "2,150", "tCO2e"],
          ["Scope 3", "Business Travel", "120", "tCO2e"],
        ],
      };
    case "compliance-audit":
      return {
        title: "Compliance Audit Report",
        category: "Compliance",
        columns: ["Framework", "Control ID", "Control Name", "Status"],
        rows: [
          ["ISO 27001", "A.5.1", "Information Security Policies", "Compliant"],
          ["ISO 27001", "A.9.2", "User Access Management", "Partial"],
          ["GDPR", "Art 32", "Security of Processing", "Compliant"],
          ["SOC2", "CC6.1", "Logical Access", "Compliant"],
        ],
      };
    case "supplier-esg":
      return {
        title: "Supplier ESG Assessment",
        category: "Suppliers",
        columns: ["Supplier Name", "Risk Score", "ESG Rating", "Last Audit"],
        rows: [
          ["Global Logistics Inc", "Low", "Gold", "2024-03-12"],
          ["DataCloud Systems", "Medium", "Silver", "2024-02-28"],
          ["EcoOffice Supplies", "Low", "Platinum", "2024-04-01"],
          ["Standard Steel Co", "High", "Bronze", "2023-11-15"],
        ],
      };
    case "board-report":
      return {
        title: "Board ESG Dashboard",
        category: "Executive",
        columns: ["KPI", "Current", "Target", "YTD Progress"],
        rows: [
          ["Net Zero Target", "2030", "2030", "On Track"],
          ["Ethical Sourcing", "98%", "100%", "98%"],
          ["Cyber Resilience", "99.9%", "99.99%", "99.9%"],
          ["DEI Index", "78/100", "85/100", "+4%"],
        ],
      };
    default:
      return {
        title: "General Report",
        category: "General",
        columns: ["Data"],
        rows: [["No specific data available"]],
      };
  }
};

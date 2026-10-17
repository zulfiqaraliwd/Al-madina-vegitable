import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const INK = [27, 27, 25];
const GOLD = [201, 162, 75];
const CATEGORIES = ["Local Vegetables", "Imported Vegetables", "Fresh Fruits"];

const money = (n) => Number(n).toLocaleString("en-PK", { maximumFractionDigits: 2 });

// lines: [{ name, slug, category, qty }]
export function makeInvoicePdf({ invoiceNo, date, customer, lines, prices, unitOf }) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();

  // Header
  doc.setFillColor(...INK);
  doc.rect(0, 0, W, 34, "F");
  doc.setFillColor(...GOLD);
  doc.rect(0, 34, W, 1.5, "F");
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(25);
  doc.text("AL MADINA", 14, 16);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  doc.setTextColor(185, 224, 168);
  doc.text("Vegetables Shop", 14, 24);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(255);
  doc.text("0345 5807524  |  0348 0975065", W - 14, 13, { align: "right" });
  doc.text("Manzoor Colony, Karachi", W - 14, 18.5, { align: "right" });
  doc.text("FRESH TODAY, HEALTHY ALWAYS", W - 14, 27, { align: "right" });

  // Invoice details
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("INVOICE", 14, 47);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Invoice No.: ${invoiceNo}`, 14, 55);
  doc.text(`Customer Name: ${customer.name}`, 14, 61);
  doc.text(`Address: ${customer.address || "-"}`, 14, 67);
  doc.text(`Date: ${date}`, W - 14, 55, { align: "right" });
  doc.text(`Mobile: ${customer.mobile || "-"}`, W - 14, 61, { align: "right" });

  // Table body, grouped by category
  const body = [];
  let sno = 1;
  let total = 0;
  let unpriced = false;
  for (const cat of CATEGORIES) {
    const group = lines.filter((l) => l.category === cat);
    if (!group.length) continue;
    body.push([
      {
        content: cat.toUpperCase(),
        colSpan: 5,
        styles: { fillColor: INK, textColor: 255, fontStyle: "bold" },
      },
    ]);
    for (const l of group) {
      const rate = prices[l.slug];
      const amount = rate ? rate * l.qty : 0;
      if (!rate) unpriced = true;
      total += amount;
      body.push([
        sno++,
        l.name,
        `${l.qty} ${unitOf(l.slug)}`,
        rate ? money(rate) : "-",
        rate ? money(amount) : "-",
      ]);
    }
  }

  autoTable(doc, {
    startY: 74,
    head: [["S.No", "Description", "Qty", "Rate Rs.", "Amount Rs."]],
    body,
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 2.2, lineColor: [200, 200, 195], lineWidth: 0.2, textColor: INK },
    headStyles: { fillColor: [235, 232, 220], textColor: INK, fontStyle: "bold" },
    columnStyles: {
      0: { cellWidth: 16, halign: "center" },
      2: { cellWidth: 30, halign: "center" },
      3: { cellWidth: 32, halign: "right" },
      4: { cellWidth: 36, halign: "right" },
    },
    margin: { left: 14, right: 14 },
  });

  // Total
  let y = doc.lastAutoTable.finalY + 8;
  if (y > 250) {
    doc.addPage();
    y = 20;
  }
  doc.setFillColor(...INK);
  doc.roundedRect(W - 14 - 70, y, 70, 11, 1.5, 1.5, "F");
  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Total Rs. ${money(total)}/-`, W - 14 - 35, y + 7.4, { align: "center" });

  doc.setTextColor(...INK);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  if (unpriced) {
    doc.text("* Items marked '-' will be priced at order confirmation.", 14, y + 7);
  }

  // Footer
  y += 28;
  if (y > 270) {
    doc.addPage();
    y = 30;
  }
  doc.setFontSize(10);
  doc.text("Prepared By: ______________________", 14, y);
  doc.setFont("helvetica", "bolditalic");
  doc.text("Thank You for Your Trust and Support", W / 2, y + 12, { align: "center" });

  const safe = (customer.name || "customer").replace(/[^a-z0-9]+/gi, "-");
  doc.save(`Invoice-${invoiceNo}-${safe}.pdf`);
  return total;
}

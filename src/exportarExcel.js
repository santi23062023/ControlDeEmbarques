import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportarExcel({
  cliente,
  escaneos
}) {

  if (escaneos.length === 0) {
    alert("No hay datos para exportar.");
    return;
  }

  const workbook = new ExcelJS.Workbook();

  const hoja = workbook.addWorksheet("Reporte");

  // ==========================
  // ENCABEZADO
  // ==========================

  hoja.mergeCells("A1:F4");

  const logo = hoja.getCell("A1");

  logo.value = "[ LOGO ]";

  logo.alignment = {
    vertical: "middle",
    horizontal: "center"
  };

  logo.font = {
    bold: true,
    size: 18
  };

  hoja.mergeCells("A6:F6");

  const titulo = hoja.getCell("A6");

  titulo.value = "REPORTE DE EMBARQUE";

  titulo.font = {
    bold: true,
    size: 18,
    color: {
      argb: "FFFFFFFF"
    }
  };

  titulo.alignment = {
    horizontal: "center"
  };

  titulo.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: "1F4E78"
    }
  };

  // ==========================
  // DATOS
  // ==========================

  const ahora = new Date();

  const numeroPedido =
    `PED-${
      ahora.getFullYear()
    }${
      String(ahora.getMonth() + 1).padStart(2, "0")
    }${
      String(ahora.getDate()).padStart(2, "0")
    }-001`;

  hoja.getCell("A8").value = "No. Pedido";
  hoja.getCell("B8").value = numeroPedido;

  hoja.getCell("A9").value = "Cliente";
  hoja.getCell("B9").value = cliente || "SIN CLIENTE";

  hoja.getCell("A10").value = "Fecha";
  hoja.getCell("B10").value =
    ahora.toLocaleDateString();

  hoja.getCell("A12").value = "Total Piezas";
  hoja.getCell("B12").value = escaneos.length;

  const totalKg = escaneos.reduce(
    (total, item) => total + Number(item.peso),
    0
  );

  hoja.getCell("A13").value = "Total Kg";
  hoja.getCell("B13").value = totalKg;

  // ==========================
  // TITULO TABLA
  // ==========================

  hoja.mergeCells("A15:E15");

  const detalle = hoja.getCell("A15");

  detalle.value = "DETALLE DE ESCANEO";

  detalle.font = {
    bold: true,
    size: 14,
    color: {
      argb: "FFFFFFFF"
    }
  };

  detalle.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: "1F4E78"
    }
  };

  detalle.alignment = {
    horizontal: "center"
  };

  // ==========================
  // ENCABEZADOS
  // ==========================

  hoja.addRow([]);

  hoja.addRow([
    "Código",
    "Producto",
    "Peso",
    "HU",
    "Fecha/Hora"
  ]);

  const filaEncabezado = hoja.lastRow;

  filaEncabezado.eachCell(cell => {

    cell.font = {
      bold: true,
      color: {
        argb: "FFFFFFFF"
      }
    };

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "4F81BD"
      }
    };

  });

  // ==========================
  // DETALLE
  // ==========================

  escaneos.forEach(item => {

    hoja.addRow([
      item.codigo,
      item.nombre,
      item.peso,
      item.hu,
      item.fechaHora
        ? new Date(item.fechaHora).toLocaleString()
        : ""
    ]);

  });

  // ==========================
  // ANCHO COLUMNAS
  // ==========================

  hoja.columns = [
    { width: 15 },
    { width: 35 },
    { width: 12 },
    { width: 18 },
    { width: 22 }
  ];

  // ==========================
  // EXPORTAR
  // ==========================

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer]),
    `Reporte_Embarque.xlsx`
  );

}
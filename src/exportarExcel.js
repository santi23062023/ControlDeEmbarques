import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

import { crearEncabezado } from "./reportes/encabezado";
import { crearDetalle } from "./reportes/detalle";
import { crearResumen } from "./reportes/resumen";

export async function exportarExcel({
  cliente,
  escaneos
}) {

  if (!Array.isArray(escaneos) || escaneos.length === 0) {

    alert("No hay datos para exportar.");

    return;

  }

  const workbook = new ExcelJS.Workbook();

  workbook.creator = "Control de Embarques";

  const hoja = workbook.addWorksheet("Reporte");

  crearEncabezado({
    hoja,
    cliente,
    escaneos
  });

  crearDetalle({
    hoja,
    escaneos
  });

  crearResumen({
    hoja,
    escaneos
  });

  hoja.columns = [
    { width: 15 },
    { width: 35 },
    { width: 12 },
    { width: 18 },
    { width: 20 }
  ];

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer]),
    "Reporte_Embarque.xlsx"
  );

}
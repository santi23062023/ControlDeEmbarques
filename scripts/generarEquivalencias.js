import XLSX from "xlsx";
import fs from "fs";

const workbook = XLSX.readFile("CATALOGO.xlsx");

const hoja = workbook.Sheets["Equivalencias"];

const datos = XLSX.utils.sheet_to_json(hoja, {
  header: 1,
  defval: ""
});

const equivalencias = {};

for (let i = 1; i < datos.length; i++) {

  const original = String(datos[i][0]).trim();

  let sap = String(datos[i][1]).trim();

  // Quitar la S inicial si existe
  if (sap.startsWith("S")) {
    sap = sap.substring(1);
  }

  if (original && sap) {
    equivalencias[original] = sap;
  }
}

fs.writeFileSync(
  "./src/data/equivalencias.json",
  JSON.stringify(equivalencias, null, 2)
);

console.log("✅ Archivo generado correctamente");
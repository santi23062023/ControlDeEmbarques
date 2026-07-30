import * as XLSX from "xlsx";

export function exportarExcel(escaneos) {

  if (escaneos.length === 0) {
    alert("No hay datos para exportar.");
    return;
  }

  // ==========================
  // HOJA DETALLE
  // ==========================

  const detalle = escaneos.map(item => ({
    HU: item.hu,
    Código: item.codigo,
    Producto: item.nombre,
    Peso: item.peso
  }));

  const hojaDetalle = XLSX.utils.json_to_sheet(detalle);

  // ==========================
  // HOJA RESUMEN
  // ==========================

  const resumen = {};

  escaneos.forEach(item => {

    if (!resumen[item.codigo]) {

      resumen[item.codigo] = {
        Código: item.codigo,
        Producto: item.nombre,
        Piezas: 0,
        "Total Kg": 0
      };

    }

    resumen[item.codigo].Piezas += 1;
    resumen[item.codigo]["Total Kg"] += Number(item.peso);

  });

  const hojaResumen = XLSX.utils.json_to_sheet(
    Object.values(resumen)
  );

  // ==========================
  // LIBRO
  // ==========================

  const libro = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    libro,
    hojaDetalle,
    "Detalle"
  );

  XLSX.utils.book_append_sheet(
    libro,
    hojaResumen,
    "Resumen"
  );

  // ==========================
  // NOMBRE
  // ==========================

  const hoy = new Date();

  const nombre =
    `Embarque_${
      hoy.getFullYear()
    }-${
      String(hoy.getMonth() + 1).padStart(2, "0")
    }-${
      String(hoy.getDate()).padStart(2, "0")
    }_${
      String(hoy.getHours()).padStart(2, "0")
    }-${
      String(hoy.getMinutes()).padStart(2, "0")
    }.xlsx`;

  XLSX.writeFile(libro, nombre);

}
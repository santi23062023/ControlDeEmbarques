import * as XLSX from "xlsx";

export function exportarExcel(escaneos) {

  if (escaneos.length === 0) {
    alert("No hay datos para exportar.");
    return;
  }

  // Hoja detalle
  const detalle = escaneos.map(item => ({
    HU: item.hu,
    Código: item.codigo,
    Producto: item.nombre,
    Peso: item.peso
  }));

  const hojaDetalle = XLSX.utils.json_to_sheet(detalle);

  // Hoja resumen
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

  const libro = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(libro, hojaDetalle, "Detalle");
  XLSX.utils.book_append_sheet(libro, hojaResumen, "Resumen");

  const fecha = new Date();

  const nombre =
    `Embarque_${
      fecha.getFullYear()
    }-${
      String(fecha.getMonth() + 1).padStart(2, "0")
    }-${
      String(fecha.getDate()).padStart(2, "0")
    }_${
      String(fecha.getHours()).padStart(2, "0")
    }-${
      String(fecha.getMinutes()).padStart(2, "0")
    }.xlsx`;

  XLSX.writeFile(libro, nombre);

}
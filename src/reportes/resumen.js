export function crearResumen({
  hoja,
  escaneos
}) {

  // ==========================
  // AGRUPAR PRODUCTOS
  // ==========================

  const resumen = {};

  escaneos.forEach(item => {

    if (!resumen[item.codigo]) {

      resumen[item.codigo] = {
        codigo: item.codigo,
        nombre: item.nombre,
        piezas: 0,
        kilos: 0
      };

    }

    resumen[item.codigo].piezas++;

    resumen[item.codigo].kilos += Number(item.peso);

  });

  // ==========================
  // DEJAR ESPACIO
  // ==========================

  hoja.addRow([]);
  hoja.addRow([]);

  // ==========================
  // TITULO
  // ==========================

  const filaTitulo = hoja.lastRow.number + 1;

  hoja.mergeCells(`A${filaTitulo}:D${filaTitulo}`);

  const titulo = hoja.getCell(`A${filaTitulo}`);

  titulo.value = "RESUMEN";

  titulo.font = {
    bold: true,
    size: 14,
    color: {
      argb: "FFFFFFFF"
    }
  };

  titulo.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: "1F4E78"
    }
  };

  titulo.alignment = {
    horizontal: "center"
  };

  // ==========================
  // ENCABEZADOS
  // ==========================

  hoja.addRow([]);

  hoja.addRow([
    "Código",
    "Producto",
    "Piezas",
    "Total Kg"
  ]);

  const encabezado = hoja.lastRow;

  encabezado.eachCell(cell => {

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

    cell.alignment = {
      horizontal: "center"
    };

    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };

  });

  // ==========================
  // DATOS
  // ==========================

  Object.values(resumen).forEach((item, index) => {

    const fila = hoja.addRow([
      item.codigo,
      item.nombre,
      item.piezas,
      item.kilos.toFixed(2)
    ]);

    fila.eachCell(cell => {

      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" }
      };

      if (index % 2 === 0) {

        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "F7F7F7"
          }
        };

      }

    });

  });

}
export function crearDetalle({
  hoja,
  escaneos
}) {

  // ==========================
  // TÍTULO
  // ==========================

  hoja.mergeCells("A15:E15");

  const titulo = hoja.getCell("A15");

  titulo.value = "DETALLE DE ESCANEO";

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
    "Peso",
    "HU",
    "Hora"
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
      horizontal: "center",
      vertical: "middle"
    };

    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" }
    };

  });

  // ==========================
  // FILAS
  // ==========================

  escaneos.forEach((item, index) => {

    const fila = hoja.addRow([
      item.codigo,
      item.nombre,
      Number(item.peso),
      item.hu,
      item.fechaHora
        ? new Date(item.fechaHora).toLocaleTimeString()
        : ""
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
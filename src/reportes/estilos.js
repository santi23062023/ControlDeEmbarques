export function crearEncabezado({
  hoja,
  cliente,
  escaneos
}) {

  const ahora = new Date();

  const pedido =
    `PED-${ahora.getFullYear()}${String(
      ahora.getMonth() + 1
    ).padStart(2, "0")}${String(
      ahora.getDate()
    ).padStart(2, "0")}-001`;

  // LOGO
  hoja.mergeCells("A1:E3");

  const logo = hoja.getCell("A1");

  logo.value = "[ LOGO ]";

  logo.font = {
    bold: true,
    size: 18
  };

  logo.alignment = {
    horizontal: "center",
    vertical: "middle"
  };

  // TÍTULO

  hoja.mergeCells("A5:E5");

  const titulo = hoja.getCell("A5");

  titulo.value = "PEDIDO CLIENTE";

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

  // DATOS

  hoja.getCell("A7").value = "No. Pedido";
  hoja.getCell("B7").value = pedido;

  hoja.getCell("A8").value = "Cliente";
  hoja.getCell("B8").value = cliente || "SIN CLIENTE";

  hoja.getCell("A9").value = "Fecha";

  hoja.getCell("B9").value =
    ahora.toLocaleString();

  hoja.getCell("A11").value = "Total Piezas";
  hoja.getCell("B11").value =
    escaneos.length;

  const totalKg = escaneos.reduce(
    (t, x) => t + Number(x.peso),
    0
  );

  hoja.getCell("A12").value = "Total Kg";

  hoja.getCell("B12").value =
    totalKg.toFixed(2);
}
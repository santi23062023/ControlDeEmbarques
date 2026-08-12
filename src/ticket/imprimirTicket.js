export function imprimirTicket({
  pedido,
  cliente,
  fecha,
  escaneos
}) {

  if (!Array.isArray(escaneos) || escaneos.length === 0) {
    alert("No hay datos para imprimir.");
    return;
  }

  // =========================
  // RESUMEN POR PRODUCTO
  // =========================

  const resumen = {};

  escaneos.forEach(item => {

    if (!resumen[item.codigo]) {

      resumen[item.codigo] = {
        codigo: item.codigo,
        nombre: item.nombre,
        piezas: 0,
        kg: 0
      };

    }

    resumen[item.codigo].piezas += 1;
    resumen[item.codigo].kg += Number(item.peso) || 0;

  });

  // =========================
  // TOTAL KG
  // =========================

  const totalKg = escaneos.reduce(
    (total, item) =>
      total + (Number(item.peso) || 0),
    0
  );

  // =========================
  // DETALLE
  // =========================

  let detalleHTML = "";

  escaneos.forEach(item => {

    detalleHTML += `
      <tr>
        <td class="codigo">
          ${item.codigo}
        </td>

        <td class="producto">
          ${item.nombre}
        </td>

        <td class="peso">
          ${Number(item.peso || 0).toFixed(2)}
        </td>
      </tr>
    `;

  });

  // =========================
  // RESUMEN
  // =========================

  let resumenHTML = "";

  Object.values(resumen).forEach(item => {

    resumenHTML += `
      <tr>

        <td class="codigo">
          ${item.codigo}
        </td>

        <td class="producto">
          ${item.nombre}
        </td>

        <td class="piezas">
          ${item.piezas}
        </td>

        <td class="peso">
          ${item.kg.toFixed(2)}
        </td>

      </tr>
    `;

  });

  // =========================
  // VENTANA DE IMPRESIÓN
  // =========================

  const ventana = window.open(
    "",
    "_blank",
    "width=400,height=800"
  );

  if (!ventana) {

    alert(
      "El navegador bloqueó la ventana de impresión. Permite las ventanas emergentes."
    );

    return;
  }

  ventana.document.write(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>Pedido Cliente</title>

<style>

@page {
  size: 80mm auto;
  margin: 0;
}

* {
  box-sizing: border-box;
}

html,
body {

  width: 80mm;

  margin: 0;
  padding: 0;

  background: #fff;

}

body {

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  font-size: 9px;

  color: #000;

  padding:
    4mm
    3mm
    6mm
    3mm;

}

/* =========================
   ENCABEZADO
   ========================= */

.logo {

  text-align: center;

  font-size: 18px;

  font-weight: bold;

  margin-bottom: 5px;

}
  .logo img {
  width: 55mm;
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

.titulo {

  text-align: center;

  font-size: 16px;

  font-weight: bold;

  margin-bottom: 3px;

}

.subtitulo {

  text-align: center;

  font-size: 12px;

  font-weight: bold;

  margin-bottom: 8px;

}

/* =========================
   LINEAS
   ========================= */

.linea {

  border-top: 1px solid #000;

  margin:
    7px 0;

}

/* =========================
   DATOS
   ========================= */

.datos {

  font-size: 10px;

  line-height: 1.5;

}

.datos p {

  margin:
    2px 0;

}

.etiqueta {

  font-weight: bold;

}

/* =========================
   TOTALES
   ========================= */

.totales {

  font-size: 11px;

  line-height: 1.6;

}

.total {

  display: flex;

  justify-content: space-between;

}

.total strong {

  font-weight: bold;

}

/* =========================
   TITULOS DE SECCION
   ========================= */

.seccion {

  text-align: center;

  font-size: 12px;

  font-weight: bold;

  margin:
    8px 0
    5px 0;

}

/* =========================
   TABLAS
   ========================= */

table {

  width: 100%;

  border-collapse: collapse;

  table-layout: fixed;

}

th {

  font-weight: bold;

  border-bottom:
    1px solid #000;

  padding:
    3px 1px;

  text-align: left;

}

td {

  padding:
    2px 0;

  vertical-align: top;

  border-bottom:
    1px dotted #aaa;

}

/* Código */

.codigo {

  width: 22%;

  font-weight: bold;

  text-align: left;

}

/* Producto */

.producto {

  width: 55%;

  text-align: left;

  word-break: break-word;

}

/* Piezas */

.piezas {

  width: 10%;

  text-align: center;

}

/* Peso */

.peso {

  width: 13%;

  text-align: right;

  white-space: nowrap;

}

/* =========================
   FIN
   ========================= */

.fin {

  text-align: center;

  font-weight: bold;

  font-size: 11px;

  margin-top: 10px;

}

/* =========================
   IMPRESIÓN
   ========================= */

@media print {

  html,
  body {

    width: 80mm;

  }

}

</style>

</head>

<body>

<!-- =========================
     LOGO
     ========================= -->

<div class="logo">

  <img src="${window.location.origin}/logo.png" alt="Papeloapan">

</div>

<div class="titulo">

  CONTROL DE EMBARQUES

</div>

<div class="subtitulo">

  PEDIDO CLIENTE

</div>

<div class="linea"></div>

<!-- =========================
     DATOS DEL PEDIDO
     ========================= -->

<div class="datos">

  <p>
    <span class="etiqueta">
      No. Pedido:
    </span>

    ${pedido}
  </p>

  <p>
    <span class="etiqueta">
      Cliente:
    </span>

    ${cliente || "SIN CLIENTE"}
  </p>

  <p>
    <span class="etiqueta">
      Fecha:
    </span>

    ${fecha}
  </p>

</div>

<div class="linea"></div>

<!-- =========================
     TOTALES
     ========================= -->

<div class="totales">

  <div class="total">

    <strong>
      Total Piezas:
    </strong>

    <strong>
      ${escaneos.length}
    </strong>

  </div>

  <div class="total">

    <strong>
      Total Kg:
    </strong>

    <strong>
      ${totalKg.toFixed(2)}
    </strong>

  </div>

</div>

<div class="linea"></div>

<!-- =========================
     DETALLE
     ========================= -->

<div class="seccion">

  DETALLE DE ESCANEO

</div>

<table>

<thead>

<tr>

<th class="codigo">
  Código
</th>

<th class="producto">
  Producto
</th>

<th class="peso">
  Kg
</th>

</tr>

</thead>

<tbody>

${detalleHTML}

</tbody>

</table>

<!-- =========================
     RESUMEN
     ========================= -->

<div class="linea"></div>

<div class="seccion">

  RESUMEN

</div>

<table>

<thead>

<tr>

<th class="codigo">
  Código
</th>

<th class="producto">
  Producto
</th>

<th class="piezas">
  Pzs
</th>

<th class="peso">
  Kg
</th>

</tr>

</thead>

<tbody>

${resumenHTML}

</tbody>

</table>

<div class="linea"></div>

<!-- =========================
     FIN
     ========================= -->

<div class="fin">

  * FIN DEL TICKET *

</div>

</body>

</html>

  `);

  ventana.document.close();

  ventana.focus();

  setTimeout(() => {

    ventana.print();

  }, 300);

}
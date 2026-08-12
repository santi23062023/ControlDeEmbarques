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

  font-size: 8px;

  color: #000;

  padding:
    3mm
    1.5mm
    5mm
    1.5mm;

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

  width: 20%;

  font-weight: bold;

  text-align: left;

}

/* Producto */

.producto {

  width: 61%;

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

  width: 19%;

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

  <img
    id="logoOriginal"
    src="${window.location.origin}/logo.png"
    alt="Papeloapan"
  >

  <canvas
    id="logoTermico"
    style="display:none;"
  ></canvas>

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

  const prepararLogo = () => {

    const img = ventana.document.getElementById("logoOriginal");
    const canvas = ventana.document.getElementById("logoTermico");

    if (!img || !canvas) {
      ventana.print();
      return;
    }

    const dibujarLogo = () => {

      try {

        const ctx = canvas.getContext("2d");

        const ancho = 1000;
        const alto = Math.round(
          img.naturalHeight * (ancho / img.naturalWidth)
        );

        canvas.width = ancho;
        canvas.height = alto;

        ctx.drawImage(
          img,
          0,
          0,
          ancho,
          alto
        );

        const datos = ctx.getImageData(
          0,
          0,
          ancho,
          alto
        );

        for (let i = 0; i < datos.data.length; i += 4) {

          const r = datos.data[i];
          const g = datos.data[i + 1];
          const b = datos.data[i + 2];
          const a = datos.data[i + 3];

          const gris =
            (r * 0.299) +
            (g * 0.587) +
            (b * 0.114);

          if (a < 50) {

            datos.data[i + 3] = 0;

          } else if (gris < 210) {

            datos.data[i] = 0;
            datos.data[i + 1] = 0;
            datos.data[i + 2] = 0;
            datos.data[i + 3] = 255;

          } else {

            datos.data[i] = 255;
            datos.data[i + 1] = 255;
            datos.data[i + 2] = 255;
            datos.data[i + 3] = 255;

          }

        }

        ctx.putImageData(
          datos,
          0,
          0
        );

        img.src = canvas.toDataURL("image/png");

        img.style.display = "block";

        setTimeout(() => {

          ventana.print();

        }, 200);

      } catch (error) {

        console.error(
          "Error preparando logo térmico:",
          error
        );

        ventana.print();

      }

    };

    if (img.complete && img.naturalWidth > 0) {

      dibujarLogo();

    } else {

      img.onload = dibujarLogo;

      img.onerror = () => {
        ventana.print();
      };

    }

  };

  prepararLogo();

}
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
      <div class="fila-ticket">
        <span class="fila-codigo">${item.codigo}</span>
        <span class="fila-producto">${item.nombre}</span>
        <span class="fila-peso">${Number(item.peso || 0).toFixed(2)}</span>
      </div>
    `;

  });

  // =========================
  // RESUMEN
  // =========================

  let resumenHTML = "";

  Object.values(resumen).forEach(item => {

    resumenHTML += `
      <div class="fila-ticket resumen-fila">
        <span class="fila-codigo">${item.codigo}</span>
        <span class="fila-producto">${item.nombre}</span>
        <span class="fila-piezas">${item.piezas}</span>
        <span class="fila-peso">${item.kg.toFixed(2)}</span>
      </div>
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

  box-sizing: border-box;

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
    0
    5mm
    0;

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

  justify-content: flex-start;

  gap: 5px;
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

  width: 94%;

  border-collapse: collapse;

  table-layout: auto;

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

/* =========================
   FILAS DEL TICKET
   ========================= */

.fila-ticket {

  position: relative;

  width: 100%;

  min-height: 16px;

  line-height: 16px;

  border-bottom:
    1px dotted #aaa;

  white-space: nowrap;

  overflow: visible;

}

.fila-codigo {

  position: absolute;

  left: 0;

  width: 23%;

  font-weight: bold;

  text-align: left;

  overflow: hidden;

}

.fila-producto {

  position: absolute;

  left: 23%;

  width: 52%;

  text-align: left;

  overflow: hidden;

  white-space: nowrap;

}

.fila-peso {

  position: absolute;

  left: 65%;

  width: 32%;

  text-align: left;

  white-space: nowrap;

  overflow: visible;

}

.resumen-fila .fila-codigo {

  left: 0;

  width: 21%;

}

.resumen-fila .fila-producto {

  left: 21%;

  width: 59%;

}

.fila-piezas {

  position: absolute;

  left: 80%;

  width: 8%;

  text-align: center;

  white-space: nowrap;

}

.resumen-fila .fila-peso {

  left: 86%;

  width: 14%;

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

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  font-size: 9px;

  color: #000;

  padding:
    3mm
    0
    5mm
    0;

}

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

<th class="detalle-codigo">
  Código
</th>

<th class="detalle-producto">
  Producto
</th>

<th class="detalle-peso">
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

<th class="resumen-codigo">
  Código
</th>

<th class="resumen-producto">
  Producto
</th>

<th class="resumen-piezas">
  Pzs
</th>

<th class="resumen-peso">
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
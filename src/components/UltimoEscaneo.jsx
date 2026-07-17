import "./UltimoEscaneo.css";

function UltimoEscaneo({
  codigoOriginal,
  codigoSAP,
  nombreProducto,
  peso
}) {
  return (
    <section className="card">

      <h2>📋 Último Escaneo</h2>

      <div className="info">

        <div className="campo">
          <label>🏷 Código Original</label>
          <span>{codigoOriginal || "---------"}</span>
        </div>

        <div className="campo">
          <label>📦 Código SAP</label>
          <span>{codigoSAP || "---------"}</span>
        </div>

        <div className="campo">
          <label>🥩 Producto</label>
          <span>{nombreProducto || "---------"}</span>
        </div>

        <div className="campo">
          <label>⚖ Peso</label>
          <span>{peso ? peso + " Kg" : "0.00 Kg"}</span>
        </div>

      </div>

    </section>
  );
}

export default UltimoEscaneo;
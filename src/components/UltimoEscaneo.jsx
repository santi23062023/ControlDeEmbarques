import "./UltimoEscaneo.css";

function UltimoEscaneo({

  codigoOriginal,

  codigoSAP,

  nombreProducto,

  peso

}) {

  const hayEscaneo = codigoSAP !== "";

  return (

    <section className="ultimo-card">

      <div className="ultimo-header">

        <div className="check">

          {hayEscaneo ? "✅" : "📦"}

        </div>

        <div>

          <h2>ÚLTIMO ESCANEO</h2>

          <p>

            {hayEscaneo

              ? "Escaneo realizado correctamente"

              : "Esperando primer escaneo"}

          </p>

        </div>

      </div>

      <div className="producto">

        🥩

        <h1>

          {nombreProducto || "SIN PRODUCTO"}

        </h1>

      </div>

      <div className="datos">

        <div className="dato">

          <small>Código Original</small>

          <strong>{codigoOriginal || "--------"}</strong>

        </div>

        <div className="dato">

          <small>Código SAP</small>

          <strong>{codigoSAP || "--------"}</strong>

        </div>

        <div className="dato peso">

          <small>Peso</small>

          <strong>

            {peso ? peso + " Kg" : "0.00 Kg"}

          </strong>

        </div>

      </div>

    </section>

  );

}

export default UltimoEscaneo;
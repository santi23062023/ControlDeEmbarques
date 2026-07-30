import "./Resumen.css";

function Resumen({ escaneos }) {

  const piezas = escaneos.length;

  const totalKg = escaneos.reduce((total, item) => {
    return total + item.peso;
  }, 0);

  const productos = new Set(
    escaneos.map(item => item.codigo)
  ).size;

  const hora = new Date().toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit"
  });

  return (

    <section className="dashboard">

      <div className="card-dashboard azul">

        <div className="icono">📦</div>

        <div>

          <h4>PIEZAS</h4>

          <span>{piezas}</span>

        </div>

      </div>

      <div className="card-dashboard verde">

        <div className="icono">⚖</div>

        <div>

          <h4>TOTAL KG</h4>

          <span>{totalKg.toFixed(2)}</span>

        </div>

      </div>

      <div className="card-dashboard naranja">

        <div className="icono">📋</div>

        <div>

          <h4>PRODUCTOS</h4>

          <span>{productos}</span>

        </div>

      </div>

      <div className="card-dashboard morado">

        <div className="icono">🕒</div>

        <div>

          <h4>HORA</h4>

          <span>{hora}</span>

        </div>

      </div>

    </section>

  );

}

export default Resumen;
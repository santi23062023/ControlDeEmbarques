function Resumen({ escaneos }) {

  const piezas = escaneos.length;

  const totalKg = escaneos.reduce((total, item) => {
    return total + item.peso;
  }, 0);

  return (

    <section className="resumen">

      <div className="dato">

        <h3>📦 PIEZAS</h3>

        <span>{piezas}</span>

      </div>

      <div className="dato">

        <h3>⚖ TOTAL KG</h3>

        <span>{totalKg.toFixed(2)}</span>

      </div>

    </section>

  );

}

export default Resumen;
import "./ResumenProductos.css";

function ResumenProductos({ escaneos }) {

  const resumen = {};

  escaneos.forEach(item => {

    if (!resumen[item.codigo]) {

      resumen[item.codigo] = {
        codigo: item.codigo,
        nombre: item.nombre,
        piezas: 0,
        totalKg: 0
      };

    }

    resumen[item.codigo].piezas++;
    resumen[item.codigo].totalKg += item.peso;

  });

  const productos = Object.values(resumen);

  return (

    <section className="tabla-card">

      <div className="tabla-header">

        <h2>📊 Resumen por Producto</h2>

        <span>{productos.length} productos</span>

      </div>

      <div className="tabla-scroll">

        <table>

          <thead>

            <tr>

              <th>Código</th>
              <th>Producto</th>
              <th>Piezas</th>
              <th>Total Kg</th>

            </tr>

          </thead>

          <tbody>

            {productos.map(producto => (

              <tr key={producto.codigo}>

                <td>{producto.codigo}</td>

                <td>{producto.nombre}</td>

                <td>{producto.piezas}</td>

                <td>{producto.totalKg.toFixed(2)}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>

  );

}

export default ResumenProductos;
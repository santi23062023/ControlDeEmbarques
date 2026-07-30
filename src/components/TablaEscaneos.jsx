import "./TablaEscaneos.css";

function TablaEscaneos({ escaneos, eliminarEscaneo }) {

  return (

    <section className="tabla-card">

      <div className="tabla-header">

        <h2>📋 Escaneos del Embarque</h2>

        <span>{escaneos.length} registros</span>

      </div>

      <div className="tabla-scroll">

        <table>

          <thead>

            <tr>

              <th>Código</th>

              <th>Producto</th>

              <th>Peso</th>

              <th>HU</th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {escaneos.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="sin-datos"
                >

                  No hay escaneos registrados.

                </td>

              </tr>

            ) : (

              escaneos.map((item, index) => (

                <tr key={item.hu + index}>

                  <td>{item.codigo}</td>

                  <td>{item.nombre}</td>

                  <td>{item.peso.toFixed(2)} Kg</td>

                  <td>{item.hu}</td>

                  <td>

                    <button

                      className="btn-eliminar"

                      onClick={() => eliminarEscaneo(index)}

                    >

                      🗑

                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </section>

  );

}

export default TablaEscaneos;
function TablaEscaneos({ escaneos }) {
  return (
    <section className="card">

      <h2>📄 Escaneos Realizados</h2>

      <table>

        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Peso</th>
          </tr>
        </thead>

        <tbody>

          {escaneos.length === 0 ? (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No hay escaneos
              </td>
            </tr>
          ) : (
            escaneos.map((item, index) => (
              <tr key={index}>
                <td>{item.codigo}</td>
                <td>{item.nombre}</td>
                <td>{item.peso.toFixed(2)}</td>
              </tr>
            ))
          )}

        </tbody>

      </table>

    </section>
  );
}

export default TablaEscaneos;
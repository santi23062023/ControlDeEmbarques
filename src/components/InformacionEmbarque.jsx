import "./InformacionEmbarque.css";

function InformacionEmbarque({
  cliente,
  setCliente,
  clientesRecientes,
  fechaInicio
})

{

  return (

    <section className="info-embarque">

      <h2>🚚 Información del Embarque</h2>

      <div className="info-grid">

        <div>

          <label>Cliente</label>

          <input
            type="text"
            list="clientes"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            placeholder="Nombre del cliente..."
          />

          <datalist id="clientes">

            {clientesRecientes.map((c, index) => (

              <option
                key={index}
                value={c}
              />

            ))}

          </datalist>

        </div>

        <div>

          <label>Folio</label>

          <input
            type="text"
            value="EMB-0001"
            disabled
          />

        </div>

        <div>

          <label>Fecha Inicio</label>

          <input
            type="text"
            value={fechaInicio}
            disabled
          />

        </div>

      </div>

    </section>

  );

}

export default InformacionEmbarque;
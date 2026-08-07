import { forwardRef } from "react";
import "./Ticket.css";

const Ticket = forwardRef(function Ticket(
  {
    pedido,
    cliente,
    fecha,
    escaneos
  },
  ref
) {

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

    resumen[item.codigo].piezas++;

    resumen[item.codigo].kg += Number(item.peso);

  });

  const totalKg = escaneos.reduce(
    (total, item) => total + Number(item.peso),
    0
  );

  return (

    <div className="ticket" ref={ref}>

      <div className="logo">
        [ LOGO ]
      </div>

      <h2>CONTROL DE EMBARQUES</h2>

      <h3>PEDIDO CLIENTE</h3>

      <hr />

      <p>
        <strong>No. Pedido:</strong> {pedido}
      </p>

      <p>
        <strong>Cliente:</strong> {cliente || "SIN CLIENTE"}
      </p>

      <p>
        <strong>Fecha:</strong> {fecha}
      </p>

      <hr />

      <p>
        <strong>Total Piezas:</strong> {escaneos.length}
      </p>

      <p>
        <strong>Total Kg:</strong> {totalKg.toFixed(2)}
      </p>

      <hr />

      <h4>DETALLE DE ESCANEO</h4>

      <table>

        <thead>

          <tr>

            <th>Código</th>

            <th>Producto</th>

            <th>Peso</th>

          </tr>

        </thead>

        <tbody>

          {escaneos.map((item, index) => (

            <tr key={index}>

              <td>{item.codigo}</td>

              <td>{item.nombre}</td>

              <td>{Number(item.peso).toFixed(2)}</td>

            </tr>

          ))}

        </tbody>

      </table>

      <hr />

      <h4>RESUMEN</h4>

      <table>

        <thead>

          <tr>

            <th>Código</th>

            <th>Producto</th>

            <th>Pzs</th>

            <th>Kg</th>

          </tr>

        </thead>

        <tbody>

          {Object.values(resumen).map((item, index) => (

            <tr key={index}>

              <td>{item.codigo}</td>

              <td>{item.nombre}</td>

              <td>{item.piezas}</td>

              <td>{item.kg.toFixed(2)}</td>

            </tr>

          ))}

        </tbody>

      </table>

      <hr />

      <div className="fin">

        *** FIN DEL TICKET ***

      </div>

    </div>

  );

});

export default Ticket;
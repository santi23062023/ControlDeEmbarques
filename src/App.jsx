import { useState } from 'react'
import './App.css'
import { leerMarbete } from './utils/marbete'
import { buscarEquivalencia } from './services/equivalencias'
import { buscarProducto } from './services/base'

function App() {

  const [marbete, setMarbete] = useState("");
  const [escaneos, setEscaneos] = useState([]);
const { codigoOriginal, peso } = leerMarbete(marbete);
const codigoSAP = buscarEquivalencia(codigoOriginal);
const nombreProducto = buscarProducto(codigoSAP);
const totalKg = escaneos.reduce((total, item) => {
  return total + item.peso;
}, 0);
function agregarEscaneo() {
  const nombreProducto = buscarProducto(codigoSAP);

  if (!codigoSAP) return;

  const nuevo = {
    codigo: codigoSAP,
    nombre: nombreProducto,
    peso: Number(peso)
  };

  setEscaneos([...escaneos, nuevo]);

}

  return (
    <div className="contenedor">

      <h1>CONTROL DE EMBARQUES</h1>

      <h3>Versión 1.0.0</h3>

      <hr />

      <h2>Escanee un marbete</h2>

      <input
        type="text"
        placeholder="Escanee aquí..."
        value={marbete}
        onChange={(e) => setMarbete(e.target.value)}
        onKeyDown={(e) => {

  if (e.key === "Enter") {

    agregarEscaneo();

    setMarbete("");

  }

}}
      />

      <hr />

      <h2>Último escaneo</h2>

      <p><strong>Marbete:</strong></p>

      <p>{marbete}</p>

      <hr />

   <h2>Código:</h2>

<p>{codigoOriginal}</p>

<h2>Código SAP:</h2>

<p>{codigoSAP}</p>

<h2>Nombre:</h2>

<p>{nombreProducto}</p>
<h2>Peso:</h2>

<p>{peso}</p>

      <hr />
<h2>Resumen</h2>

<p><strong>Piezas:</strong> {escaneos.length}</p>

<p><strong>Total Kg:</strong> {totalKg.toFixed(2)}</p>

<hr />

<h2>Escaneos</h2>

<table border="1" cellPadding="5">

  <thead>

    <tr>

      <th>Código</th>

      <th>Nombre</th>

      <th>Peso</th>

    </tr>

  </thead>

  <tbody>

    {escaneos.map((item, index) => (

      <tr key={index}>

        <td>{item.codigo}</td>

        <td>{item.nombre}</td>

        <td>{item.peso}</td>

      </tr>

    ))}

  </tbody>

</table>

</div>
  )
}

export default App
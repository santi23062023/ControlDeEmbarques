import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import Scanner from "./components/Scanner";
import UltimoEscaneo from "./components/UltimoEscaneo";

import { leerMarbete } from "./utils/marbete";
import { buscarEquivalencia } from "./services/equivalencias";
import { buscarProducto } from "./services/base";

function App() {

  const [marbete, setMarbete] = useState("");

  const [ultimoEscaneo, setUltimoEscaneo] = useState({
    codigoOriginal: "",
    codigoSAP: "",
    nombre: "",
    peso: ""
  });

  const [escaneos, setEscaneos] = useState([]);

  // Leer el marbete mientras se escribe
  const { codigoOriginal, peso } = leerMarbete(marbete);

  // Buscar equivalencia
  const codigoSAP = buscarEquivalencia(codigoOriginal);

  // Buscar nombre del producto
  const nombreProducto = buscarProducto(codigoSAP);
  function agregarEscaneo() {

  if (!codigoSAP) return;

  const nuevo = {
    codigo: codigoSAP,
    nombre: nombreProducto,
    peso: Number(peso)
  };

  setEscaneos([...escaneos, nuevo]);

  setUltimoEscaneo({
    codigoOriginal,
    codigoSAP,
    nombre: nombreProducto,
    peso
  });

  setMarbete("");

}

  return (

    <div className="app">

      <Header />

      <main className="principal">

   <Scanner
  marbete={marbete}
  setMarbete={setMarbete}
  agregarEscaneo={agregarEscaneo}
/>

  <UltimoEscaneo
  codigoOriginal={codigoOriginal}
  codigoSAP={codigoSAP}
  nombreProducto={nombreProducto}
  peso={peso}
/>
      </main>

      <section className="resumen">

        <div className="dato">
          <h3>📦 PIEZAS</h3>
          <span>0</span>
        </div>

        <div className="dato">
          <h3>⚖ TOTAL KG</h3>
          <span>0.00</span>
        </div>

      </section>

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

          </tbody>

        </table>

      </section>

    </div>

  );

}

export default App;
import './App.css'
import Header from "./components/Header";
import Scanner from "./components/Scanner";

function App() {

  return (

    <div className="app">
<Header />
   
      <main className="principal">
<Scanner />

        <section className="card">

          <h2>📋 Último Escaneo</h2>

          <p><strong>Código:</strong></p>

          <p>---------</p>

          <p><strong>Código SAP:</strong></p>

          <p>---------</p>

          <p><strong>Nombre:</strong></p>

          <p>---------</p>

          <p><strong>Peso:</strong></p>

          <p>0.00 Kg</p>

        </section>

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

  )

}

export default App
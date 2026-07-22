import { forwardRef } from "react";
import "./Scanner.css";

const Scanner = forwardRef(function Scanner(
  { marbete, setMarbete, agregarEscaneo },
  inputRef
) {

  function manejarSubmit(e) {
    e.preventDefault();
    agregarEscaneo();
  }

  return (
    <section className="card">

      <h2>📦 Escanear Marbete</h2>

      <form onSubmit={manejarSubmit}>

        <input
          ref={inputRef}
          className="scanner-input"
          type="text"
          placeholder="Escanee aquí el marbete..."
          value={marbete}
          onChange={(e) => setMarbete(e.target.value)}
          autoFocus
        />

      </form>

      <div className="estado-scanner">
        🟢 Listo para escanear
      </div>

    </section>
  );
});

export default Scanner;
import { forwardRef } from "react";
import "./Scanner.css";

const Scanner = forwardRef(function Scanner(
  { marbete, setMarbete, agregarEscaneo },
  inputRef
) {

  function manejarSubmit(e){
    e.preventDefault();
    agregarEscaneo();
  }

  return(

    <section className="scanner-card">

      <div className="scanner-header">

        <div className="scanner-icon">

          📷

        </div>

        <div>

          <h2>ESCANEAR MARBETE</h2>

          <p>Escanee un HU porfis plis si no es molestia.</p>

        </div>

      </div>

      <form onSubmit={manejarSubmit}>

        <input

          ref={inputRef}

          className="scanner-input"

          type="text"

          placeholder="Esperando lector..."

          value={marbete}

          onChange={(e)=>setMarbete(e.target.value)}

          autoFocus

        />

      </form>

      <div className="estado-scanner">

          <span className="estado-punto"></span>

          Esperando lector...

      </div>

    </section>

  );

});

export default Scanner;
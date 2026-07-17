import "./Scanner.css";

function Scanner({ marbete, setMarbete, agregarEscaneo }) {
  return (
    <section className="card">

      <h2>📦 Escanear Marbete</h2>

      <input
        className="scanner-input"
        type="text"
        placeholder="Escanee aquí el marbete..."
        value={marbete}
        onChange={(e) => setMarbete(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            agregarEscaneo();
          }
        }}
      />

      <div className="estado-scanner">
        🟢 Listo para escanear
      </div>

    </section>
  );
}

export default Scanner;
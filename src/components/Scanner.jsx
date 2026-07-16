import "./Scanner.css";
function Scanner({
  marbete,
  setMarbete,
  agregarEscaneo
}) {

  return (

    <section className="card">

      <h2>📦 Escanear Marbete</h2>

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

    </section>

  );

}

export default Scanner;
import "./Header.css";

function Header() {
  return (
    <header className="header">

      <div className="header-left">

        <div className="logo">
          🚚
        </div>

        <div>

          <h1>CONTROL DE EMBARQUES</h1>

          <p>Sistema inteligente de captura de marbetes</p>

        </div>

      </div>

      <div className="estado">

        <div className="estado-linea">

          <span className="online"></span>

          <span>Sistema listo</span>

        </div>

        <small>Versión 1.1</small>

      </div>

    </header>
  );
}

export default Header;
import "./Header.css";

function Header() {
  return (
    <header className="header">

      <div>
        <h1>🚚 CONTROL DE EMBARQUES</h1>
        <p>Sistema de captura de marbetes</p>
      </div>

      <div className="estado">
        <div>
          <span className="online"></span>
          Sistema listo
        </div>

        <small>Versión 1.0.0</small>
      </div>

    </header>
  );
}

export default Header;
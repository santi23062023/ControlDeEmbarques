import "./Header.css";

function Header() {
  return (
    <header className="header">

      <div className="header-info">

        <div className="logo">
          CE
        </div>

        <div>

          <h1>CONTROL DE EMBARQUES</h1>

          <p>Sistema de captura de marbetes</p>

        </div>

      </div>

      <div className="header-status">

        <div className="status">

          <span className="status-dot"></span>

          Sistema listo

        </div>

        <small>Versión 1.0.0</small>

      </div>

    </header>
  );
}

export default Header;
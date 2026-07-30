function ModalConfirmacion({

  visible,

  titulo,

  mensaje,

  hu,

  producto,

  peso,

  textoAceptar = "Aceptar",

  textoCancelar = "Cancelar",

  onCancelar,

  onAceptar

}) {

  if (!visible) return null;

  return (

    <div className="modal-fondo">

      <div className="modal">

        <h2>{titulo}</h2>

        <hr />

        <p>{mensaje}</p>

        <br />

        {hu && (
          <>
            <strong>HU</strong>
            <p>{hu}</p>
          </>
        )}

        {producto && (
          <>
            <strong>Producto</strong>
            <p>{producto}</p>
          </>
        )}

        {peso && (
          <>
            <strong>Peso</strong>
            <p>{peso} Kg</p>
          </>
        )}

        <div className="botones">

          <button
            className="cancelar"
            onClick={onCancelar}
          >
            {textoCancelar}
          </button>

          <button
            className="aceptar"
            onClick={onAceptar}
          >
            {textoAceptar}
          </button>

        </div>

      </div>

    </div>

  );

}

export default ModalConfirmacion;
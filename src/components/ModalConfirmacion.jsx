function ModalConfirmacion({

  visible,

  hu,

  producto,

  peso,

  onCancelar,

  onAceptar

}) {

  if (!visible) return null;

  return (

    <div className="modal-fondo">

      <div className="modal">

        <h2>⚠️ HU YA ESCANEADA</h2>

        <hr />

        <p>

          La siguiente pieza ya fue escaneada.

        </p>

        <br />

        <strong>HU</strong>

        <p>{hu}</p>

        <strong>Producto</strong>

        <p>{producto}</p>

        <strong>Peso</strong>

        <p>{peso} Kg</p>

        <div className="botones">

          <button

            className="cancelar"

            onClick={onCancelar}

          >

            Cancelar

          </button>

          <button

            className="aceptar"

            onClick={onAceptar}

          >

            Agregar nuevamente

          </button>

        </div>

      </div>

    </div>

  );

}

export default ModalConfirmacion;
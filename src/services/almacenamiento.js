const CLAVE = "embarque_actual";

export function guardarEmbarque(embarque) {
  localStorage.setItem(
    CLAVE,
    JSON.stringify(embarque)
  );
}

export function cargarEmbarque() {

  const datos = localStorage.getItem(CLAVE);

  if (!datos) {
    return null;
  }

  try {

    return JSON.parse(datos);

  } catch (error) {

    console.error("Error al cargar embarque:", error);

    return null;

  }

}

export function eliminarEmbarque() {
  localStorage.removeItem(CLAVE);
}
const CLAVE = "embarque_actual";

export function guardarEmbarque(escaneos) {
  localStorage.setItem(CLAVE, JSON.stringify(escaneos));
}

export function cargarEmbarque() {
  const datos = localStorage.getItem(CLAVE);

  if (!datos) return [];

  try {
    return JSON.parse(datos);
  } catch {
    return [];
  }
}

export function eliminarEmbarque() {
  localStorage.removeItem(CLAVE);
}
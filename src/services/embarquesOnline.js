const FUNCTION_URL =
  "https://controldeembarques.netlify.app/.netlify/functions/embarque";

export async function guardarEmbarque(datos) {
  const respuesta = await fetch(FUNCTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  const resultado = await respuesta.json();

  if (!respuesta.ok || !resultado.success) {
    throw new Error(resultado.error || "No se pudo guardar el embarque");
  }

  return resultado;
}

export async function obtenerEmbarque(id) {
  const respuesta = await fetch(
    `${FUNCTION_URL}?id=${encodeURIComponent(id)}`
  );

  const resultado = await respuesta.json();

  if (!respuesta.ok || !resultado.success) {
    throw new Error(resultado.error || "No se pudo obtener el embarque");
  }

  return resultado.datos;
}

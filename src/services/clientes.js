const CLAVE = "clientesRecientes";

export function obtenerClientes() {
  return JSON.parse(localStorage.getItem(CLAVE)) || [];
}

export function guardarCliente(nombre) {

  if (!nombre.trim()) return;

  let clientes = obtenerClientes();

  // Eliminar si ya existe
  clientes = clientes.filter(
    c => c.toLowerCase() !== nombre.toLowerCase()
  );

  // Agregar al inicio
  clientes.unshift(nombre);

  // Mantener solo los últimos 10
  clientes = clientes.slice(0,10);

  localStorage.setItem(
    CLAVE,
    JSON.stringify(clientes)
  );

}
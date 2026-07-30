import productos from "../data/base.json";

export function buscarProducto(codigoSAP) {
  return productos[codigoSAP] || "";
}
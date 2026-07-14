const productos = {
  "11331081": "CHAMBARETE",
  "22110040": "NEW YORK"
};

export function buscarProducto(codigoSAP) {
  return productos[codigoSAP] || "";
}
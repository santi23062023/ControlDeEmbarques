const equivalencias = {
  "41331081": "11331081",
  "42110040": "22110040"
};

export function buscarEquivalencia(codigoOriginal) {
  return equivalencias[codigoOriginal] || "";
}
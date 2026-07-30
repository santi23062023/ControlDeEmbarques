import equivalencias from "../data/equivalencias.json";

export function buscarEquivalencia(codigoOriginal) {
  return equivalencias[codigoOriginal] || "";
}
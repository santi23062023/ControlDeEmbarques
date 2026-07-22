export function leerMarbete(marbete) {

  if (!marbete || marbete.length < 29) {
    return {
      codigoOriginal: "",
      peso: "",
      hu: ""
    };
  }

  const codigoOriginal = marbete.substring(0, 8);

  const peso = (
    Number(marbete.substring(16, 20)) / 100
  ).toFixed(2);

  // HU = caracteres 21 al 29 (índices 20-28)
  const hu = marbete.substring(20, 29);

  return {
    codigoOriginal,
    peso,
    hu
  };

}
export function leerMarbete(marbete) {

  if (!marbete || marbete.length < 20) {
    return {
      codigoOriginal: "",
      peso: ""
    };
  }

  const codigoOriginal = marbete.substring(0, 8);

  const peso = (
    Number(marbete.substring(16, 20)) / 100
  ).toFixed(2);

  return {
    codigoOriginal,
    peso
  };

}
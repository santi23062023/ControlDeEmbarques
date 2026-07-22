import { useState, useRef } from "react";
import "./App.css";

import Header from "./components/Header";
import Scanner from "./components/Scanner";
import UltimoEscaneo from "./components/UltimoEscaneo";

import { leerMarbete } from "./utils/marbete";
import { buscarEquivalencia } from "./services/equivalencias";
import { buscarProducto } from "./services/base";

import TablaEscaneos from "./components/TablaEscaneos";
import Resumen from "./components/Resumen";

import ModalConfirmacion from "./components/ModalConfirmacion";
import "./components/ModalConfirmacion.css";

function App() {

  const [marbete, setMarbete] = useState("");

  const [ultimoEscaneo, setUltimoEscaneo] = useState({
    codigoOriginal: "",
    codigoSAP: "",
    nombre: "",
    peso: ""
  });

  const [escaneos, setEscaneos] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);

  const [escaneoPendiente, setEscaneoPendiente] = useState(null);

  const scannerRef = useRef(null);

  // Leer marbete
  const { codigoOriginal, peso, hu } = leerMarbete(marbete);

  // Buscar datos
  const codigoSAP = buscarEquivalencia(codigoOriginal);
  const nombreProducto = buscarProducto(codigoSAP);

  // ==========================
  // CONFIRMAR AGREGAR
  // ==========================

  function confirmarAgregar() {

    setEscaneos(prev => [...prev, escaneoPendiente]);

    setUltimoEscaneo({
      codigoOriginal,
      codigoSAP,
      nombre: nombreProducto,
      peso
    });

    setMarbete("");

    setMostrarModal(false);

    setEscaneoPendiente(null);

    setTimeout(() => {
      scannerRef.current?.focus();
    }, 100);

  }

  // ==========================
  // CANCELAR
  // ==========================

  function cancelarAgregar() {

    setMostrarModal(false);

    setEscaneoPendiente(null);

    setMarbete("");

    setTimeout(() => {
      scannerRef.current?.focus();
    }, 100);

  }

  // ==========================
  // AGREGAR ESCANEO
  // ==========================

  function agregarEscaneo() {

    if (!codigoSAP) return;

    const existeHU = escaneos.some(item => item.hu === hu);

    if (existeHU) {

      setEscaneoPendiente({
        hu,
        marbete,
        codigo: codigoSAP,
        nombre: nombreProducto,
        peso: Number(peso)
      });

      setMostrarModal(true);

      return;

    }

    const nuevo = {
      hu,
      marbete,
      codigo: codigoSAP,
      nombre: nombreProducto,
      peso: Number(peso)
    };

    setEscaneos(prev => [...prev, nuevo]);

    setUltimoEscaneo({
      codigoOriginal,
      codigoSAP,
      nombre: nombreProducto,
      peso
    });

    setMarbete("");

    setTimeout(() => {
      scannerRef.current?.focus();
    }, 100);

  }

  return (

    <div className="app">

      <Header />

      <main className="principal">

        <Scanner
          ref={scannerRef}
          marbete={marbete}
          setMarbete={setMarbete}
          agregarEscaneo={agregarEscaneo}
        />

        <UltimoEscaneo
          codigoOriginal={ultimoEscaneo.codigoOriginal}
          codigoSAP={ultimoEscaneo.codigoSAP}
          nombreProducto={ultimoEscaneo.nombre}
          peso={ultimoEscaneo.peso}
        />

      </main>

      <Resumen escaneos={escaneos} />

      <TablaEscaneos escaneos={escaneos} />

      <ModalConfirmacion
        visible={mostrarModal}
        hu={escaneoPendiente?.hu}
        producto={escaneoPendiente?.nombre}
        peso={escaneoPendiente?.peso}
        onCancelar={cancelarAgregar}
        onAceptar={confirmarAgregar}
      />

    </div>

  );

}

export default App;
import { useState, useRef, useEffect } from "react";
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

import { exportarExcel } from "./exportarExcel";

import ResumenProductos from "./components/ResumenProductos";

import InformacionEmbarque from "./components/InformacionEmbarque";

import { imprimirTicket } from "./ticket/imprimirTicket";


import {
  guardarEmbarque,
  cargarEmbarque,
  eliminarEmbarque
} from "./services/almacenamiento";

import {
  obtenerClientes,
  guardarCliente
} from "./services/clientes";

import {
  Plus,
  Download,
  Settings
} from "lucide-react";

function App() {

  const [marbete, setMarbete] = useState("");

  const [ultimoEscaneo, setUltimoEscaneo] = useState({
    codigoOriginal: "",
    codigoSAP: "",
    nombre: "",
    peso: ""
  });

  const [escaneos, setEscaneos] = useState([]);

  const [vistaTabla, setVistaTabla] = useState("detalle");

  const [cliente, setCliente] = useState("");


  const [fechaInicio] = useState(
  new Date().toLocaleString()
);

  const [clientesRecientes, setClientesRecientes] = useState([]);

  // Modal HU repetida
  const [mostrarModal, setMostrarModal] = useState(false);
  const [escaneoPendiente, setEscaneoPendiente] = useState(null);

  // Modal eliminar
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [indiceEliminar, setIndiceEliminar] = useState(null);
  const [mostrarModalNuevo, setMostrarModalNuevo] = useState(false);


  const scannerRef = useRef(null);

  useEffect(() => {
  const guardado = cargarEmbarque();

  if (guardado && guardado.escaneos && guardado.escaneos.length > 0) {
    setEmbarqueGuardado(guardado);
    setMostrarModalRecuperar(true);
  }
}, []);
  const [mostrarModalRecuperar, setMostrarModalRecuperar] = useState(false);

const [embarqueGuardado, setEmbarqueGuardado] = useState([]);

useEffect(() => {

  guardarEmbarque({

    cliente,

    fechaInicio,

    escaneos,

    ultimoEscaneo,

    vistaTabla

  });

}, [
  cliente,
  fechaInicio,
  escaneos,
  ultimoEscaneo,
  vistaTabla
]);
useEffect(() => {

  if (escaneos.length === 0) return;

  const ultimo = escaneos[escaneos.length - 1];

  setUltimoEscaneo({
    codigoOriginal: ultimo.codigoOriginal || "",
    codigoSAP: ultimo.codigo,
    nombre: ultimo.nombre,
    peso: ultimo.peso
  });

  

}, [escaneos]);

useEffect(() => {

  setClientesRecientes(obtenerClientes());

}, []);
  // ==========================
  // LEER MARBETE
  // ==========================

  const { codigoOriginal, peso, hu } = leerMarbete(marbete);

  const codigoSAP = buscarEquivalencia(codigoOriginal);

const nombreProducto = buscarProducto(codigoSAP);

console.log("Código Original:", codigoOriginal);
console.log("Código SAP:", codigoSAP);
console.log("Producto:", nombreProducto);

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
  // CANCELAR AGREGAR
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
  codigoOriginal,
  codigo: codigoSAP,
  nombre: nombreProducto,
  peso: Number(peso),
  fechaHora: new Date().toISOString()
});

      setMostrarModal(true);

      return;

    }

  const nuevo = {
  hu,
  marbete,
  codigoOriginal,
  codigo: codigoSAP,
  nombre: nombreProducto,
  peso: Number(peso),
  fechaHora: new Date().toISOString()
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

  // ==========================
  // ELIMINAR ESCANEO
  // ==========================

  function eliminarEscaneo(indice) {

    setIndiceEliminar(indice);

    setMostrarModalEliminar(true);

  }

  function nuevoEmbarque() {

  setMostrarModalNuevo(true);

}

function confirmarNuevoEmbarque() {

  setEscaneos([]);

  eliminarEmbarque();

  setUltimoEscaneo({
    codigoOriginal: "",
    codigoSAP: "",
    nombre: "",
    peso: ""
  });

  setMarbete("");

  setMostrarModalNuevo(false);

  setTimeout(() => {
    scannerRef.current?.focus();
  }, 100);

}

function cancelarNuevoEmbarque() {

  setMostrarModalNuevo(false);

  setTimeout(() => {
    scannerRef.current?.focus();
  }, 100);

}

  // ==========================
  // CONFIRMAR ELIMINAR
  // ==========================

  function confirmarEliminar() {

    const nuevosEscaneos = escaneos.filter(
      (_, i) => i !== indiceEliminar
    );

    setEscaneos(nuevosEscaneos);

    setMostrarModalEliminar(false);

    setIndiceEliminar(null);

    setTimeout(() => {
      scannerRef.current?.focus();
    }, 100);

  }

  // ==========================
  // CANCELAR ELIMINAR
  // ==========================

  function cancelarEliminar() {

    setMostrarModalEliminar(false);

    setIndiceEliminar(null);

    setTimeout(() => {
      scannerRef.current?.focus();
    }, 100);

  }

  return (
  
<div className="app">

  <Header />

<InformacionEmbarque
  cliente={cliente}
  setCliente={setCliente}
  clientesRecientes={clientesRecientes}
  fechaInicio={fechaInicio}
/>
  <div className="toolbar">


  <button
  className="btn-toolbar nuevo"
  onClick={nuevoEmbarque}
>
  <Plus size={20} />
  <span>Nuevo Embarque</span>
</button>

{/* ESTE BOTÓN ES EL NUEVO */}

<button
  className="btn-toolbar"
  onClick={async () => {
    try {
      const { registerPlugin } = await import("@capacitor/core");
      const Printer = registerPlugin("Printer");

      await Printer.imprimir({
        texto: "PRUEBA DESDE ANDROID\\n\\n"
      });

      alert("Impresión enviada correctamente");
    } catch (error) {
      console.error("Error de impresión:", error);
      alert("Error de impresión: " + (error?.message || error));
    }
  }}
>
  🖨 Imprimir Ticket
</button>

{/* AQUÍ SIGUE EL BOTÓN QUE YA TENÍAS */}

<button
  className="btn-toolbar"
  onClick={() =>
    exportarExcel({
      cliente,
      escaneos
    })
  }
>
  <Download size={20} />
  <span>Exportar Excel</span>
</button>

<button
  className="btn-toolbar"
  disabled
>
  <Settings size={20} />
  <span>Configuración</span>
</button>

</div>
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

<div className="selector-tabla">

  <button
    className={vistaTabla === "detalle" ? "tab-activa" : "tab"}
    onClick={() => setVistaTabla("detalle")}
  >
    📄 Detalle
  </button>

  <button
    className={vistaTabla === "resumen" ? "tab-activa" : "tab"}
    onClick={() => setVistaTabla("resumen")}
  >
    📊 Resumen
  </button>

</div>

{vistaTabla === "detalle" ? (

  <TablaEscaneos
    escaneos={escaneos}
    eliminarEscaneo={eliminarEscaneo}
  />

) : (

  <ResumenProductos
    escaneos={escaneos}
  />

)}

{/* Modal HU repetida */}

<ModalConfirmacion
  visible={mostrarModal}
  titulo="⚠️ HU YA ESCANEADA"
  mensaje="La siguiente pieza ya fue escaneada. ¿Deseas agregarla nuevamente?"
  hu={escaneoPendiente?.hu}
  producto={escaneoPendiente?.nombre}
  peso={escaneoPendiente?.peso}
  textoAceptar="Agregar nuevamente"
  textoCancelar="Cancelar"
  onCancelar={cancelarAgregar}
  onAceptar={confirmarAgregar}
/>

{/* Modal eliminar */}

<ModalConfirmacion
  visible={mostrarModalEliminar}
  titulo="🗑 Eliminar Escaneo"
  mensaje="¿Deseas eliminar este escaneo?"
  hu={escaneos[indiceEliminar]?.hu}
  producto={escaneos[indiceEliminar]?.nombre}
  peso={escaneos[indiceEliminar]?.peso}
  textoAceptar="Eliminar"
  textoCancelar="Cancelar"
  onCancelar={cancelarEliminar}
  onAceptar={confirmarEliminar}
/>
<ModalConfirmacion
  visible={mostrarModalNuevo}
  titulo="🆕 Nuevo Embarque"
  mensaje="¿Deseas iniciar un nuevo embarque? Se eliminarán todos los escaneos."
  textoAceptar="Iniciar"
  textoCancelar="Cancelar"
  onCancelar={cancelarNuevoEmbarque}
  onAceptar={confirmarNuevoEmbarque}
/>


</div>

);

}

export default App;
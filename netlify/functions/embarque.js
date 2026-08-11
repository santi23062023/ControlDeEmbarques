import { getStore } from "@netlify/blobs";

export default async (request) => {
  const store = getStore("embarques");

  // ==========================================
  // GUARDAR EMBARQUE
  // ==========================================
  if (request.method === "POST") {
    try {
      const datos = await request.json();

      const id = datos.id || `PRUEBA-${Date.now()}`;

      await store.setJSON(id, {
        ...datos,
        guardado: new Date().toISOString()
      });

      return new Response(
        JSON.stringify({
          success: true,
          id
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

    } catch (error) {
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
  }

  // ==========================================
  // CONSULTAR EMBARQUE(S)
  // ==========================================
  if (request.method === "GET") {

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    // ------------------------------------------
    // SI VIENE ID → DEVOLVER EMBARQUE ESPECÍFICO
    // ------------------------------------------
    if (id) {

      const datos = await store.get(id, {
        type: "json"
      });

      if (!datos) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Embarque no encontrado"
          }),
          {
            status: 404,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          datos
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    // ------------------------------------------
    // SIN ID → LISTAR EMBARQUES
    // ------------------------------------------

    const resultado = await store.list();

    const embarques = [];

    for (const item of resultado.blobs) {

      try {

        const datos = await store.get(item.key, {
          type: "json"
        });

        if (datos) {
          embarques.push(datos);
        }

      } catch (error) {

        console.error(
          "Error leyendo embarque:",
          item.key,
          error
        );

      }
    }

    // Ordenar del más reciente al más antiguo
    embarques.sort((a, b) => {

      const fechaA = new Date(
        a.guardado || a.fechaInicio || 0
      ).getTime();

      const fechaB = new Date(
        b.guardado || b.fechaInicio || 0
      ).getTime();

      return fechaB - fechaA;
    });

    return new Response(
      JSON.stringify({
        success: true,
        total: embarques.length,
        embarques
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  return new Response(
    JSON.stringify({
      success: false,
      error: "Método no permitido"
    }),
    {
      status: 405,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

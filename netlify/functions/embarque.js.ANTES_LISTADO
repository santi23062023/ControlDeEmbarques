import { getStore } from "@netlify/blobs";

export default async (request) => {
  const store = getStore("embarques");

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

  if (request.method === "GET") {
    const id = new URL(request.url).searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Falta el id del embarque"
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

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

  return new Response("Método no permitido", {
    status: 405
  });
};

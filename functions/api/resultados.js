// Devuelve todos los votos para el panel de resultados.
// Protegido con clave via variable de entorno CLAVE_ADMIN.

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const clave = url.searchParams.get("clave");

  const claveOk = env.CLAVE_ADMIN;
  if (!claveOk || clave !== claveOk) {
    return new Response(JSON.stringify({ ok: false, error: "Clave incorrecta" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const { results } = await env.DB.prepare(
      "SELECT * FROM votos ORDER BY id DESC"
    ).all();

    return new Response(JSON.stringify({ ok: true, votos: results }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

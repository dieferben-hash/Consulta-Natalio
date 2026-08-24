// Recibe un voto de la consulta y lo guarda en la base D1 (tabla votos).
// Binding D1 esperado: DB

export async function onRequestPost({ request, env }) {
  try {
    const d = await request.json();

    await env.DB.prepare(
      `INSERT INTO votos (edad, zona, voto, fecha) VALUES (?,?,?,?)`
    ).bind(
      d.edad || null,
      d.zona || null,
      d.voto || null,
      d.fecha || new Date().toISOString()
    ).run();

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    // GET /tasks
    if (request.method === "GET" && url.pathname === "/tasks") {
      const { results } = await env.task_db
        .prepare("SELECT * FROM tasks")
        .all();

      return Response.json(results);
    }

    // POST /tasks
    if (request.method === "POST" && url.pathname === "/tasks") {
      const body = await request.json();

      await env.task_db
        .prepare("INSERT INTO tasks (title) VALUES (?)")
        .bind(body.title)
        .run();

      return Response.json({ message: "Task creada" });
    }

    return new Response("Not Found", { status: 404 });
  }
};

import * as Sentry from "@sentry/cloudflare";

export interface Env {
  task_db: D1Database;
  ASSETS: Fetcher;
  SENTRY_DSN: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default Sentry.withSentry(
  (env: Env) => ({
    dsn: env.SENTRY_DSN,
    tracesSampleRate: 1.0,
  }),
  {
    async fetch(request: Request, env: Env): Promise<Response> {
      const url = new URL(request.url);

      if (request.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
      }

      if (
        request.method === "GET" &&
        (url.pathname === "/" || url.pathname === "/index.html")
      ) {
        return env.ASSETS.fetch(request);
      }

      if (request.method === "GET" && url.pathname === "/tasks") {
        const { results } = await env.task_db
          .prepare("SELECT * FROM tasks ORDER BY id DESC")
          .all();

        return Response.json(results, { headers: corsHeaders });
      }

      if (request.method === "POST" && url.pathname === "/tasks") {
        const body: any = await request.json();

        if (!body.title || body.title.trim() === "") {
          return Response.json(
            { error: "Task title is required" },
            { status: 400, headers: corsHeaders }
          );
        }

        await env.task_db
          .prepare("INSERT INTO tasks (title, due_date) VALUES (?, ?)")
          .bind(body.title, body.due_date || null)
          .run();

        return Response.json(
          { message: "Task creada" },
          { headers: corsHeaders }
        );
      }

      if (request.method === "DELETE" && url.pathname.startsWith("/tasks/")) {
        const id = url.pathname.split("/")[2];

        await env.task_db
          .prepare("DELETE FROM tasks WHERE id = ?")
          .bind(id)
          .run();

        return Response.json(
          { message: "Task eliminada" },
          { headers: corsHeaders }
        );
      }

      if (request.method === "GET" && url.pathname === "/error") {
        throw new Error("Error de prueba enviado a Sentry");
      }

      return new Response("Not Found", {
        status: 404,
        headers: corsHeaders,
      });
    },
  }
);

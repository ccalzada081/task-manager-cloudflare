export interface Env {
  task_db: D1Database;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 🔹 CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    // 🔹 GET /tasks
    if (request.method === "GET" && url.pathname === "/tasks") {
      const { results } = await env.task_db
        .prepare("SELECT * FROM tasks ORDER BY id DESC")
        .all();

      return new Response(JSON.stringify(results), {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      });
    }

    // 🔹 POST /tasks
    if (request.method === "POST" && url.pathname === "/tasks") {
      const body: any = await request.json();

      await env.task_db
        .prepare("INSERT INTO tasks (title, due_date) VALUES (?, ?)")
        .bind(body.title, body.due_date || null)
        .run();

      return new Response(
        JSON.stringify({ message: "Task creada" }),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    // 🔹 DELETE /tasks/:id
    if (
      request.method === "DELETE" &&
      url.pathname.startsWith("/tasks/")
    ) {
      const id = url.pathname.split("/")[2];

      await env.task_db
        .prepare("DELETE FROM tasks WHERE id = ?")
        .bind(id)
        .run();

      return new Response(
        JSON.stringify({ message: "Task eliminada" }),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    // 🔹 fallback
    return new Response("Not Found", {
      status: 404,
      headers: corsHeaders,
    });
  },
};

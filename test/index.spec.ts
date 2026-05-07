import { describe, it, expect } from "vitest";

describe("Task Manager basic tests", () => {
  it("should validate a task title", () => {
    const task = {
      title: "Preparar demo",
      due_date: "2026-05-08"
    };

    expect(task.title).toBe("Preparar demo");
    expect(task.due_date).toBe("2026-05-08");
  });

  it("should validate task completed status", () => {
    const task = {
      title: "Grabar video",
      completed: false
    };

    expect(task.completed).toBe(false);
  });
});

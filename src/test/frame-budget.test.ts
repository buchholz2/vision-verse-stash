import { describe, expect, it, vi } from "vitest";
import { createFrameBudget, median, WINDOW_SIZE } from "@/lib/dental/frame-budget";

const feed = (budget: ReturnType<typeof createFrameBudget>, ms: number, count = WINDOW_SIZE) => {
  for (let i = 0; i < count; i++) budget.push(ms);
};

describe("orçamento de quadros da cena 3D", () => {
  it("não degrada em 60 fps", () => {
    const onLevel = vi.fn();
    const budget = createFrameBudget(onLevel);
    feed(budget, 16.7, WINDOW_SIZE * 3);
    expect(onLevel).not.toHaveBeenCalled();
  });

  it("reduz a resolução e depois pede a alternativa estática", () => {
    const onLevel = vi.fn();
    const budget = createFrameBudget(onLevel);
    feed(budget, 70);
    expect(onLevel).toHaveBeenLastCalledWith(1);
    feed(budget, 70);
    expect(onLevel).toHaveBeenLastCalledWith(2);
    feed(budget, 70);
    expect(onLevel).toHaveBeenCalledTimes(2);
  });

  it("ignora pausas e abas em segundo plano", () => {
    const onLevel = vi.fn();
    const budget = createFrameBudget(onLevel);
    feed(budget, 16.7, WINDOW_SIZE - 5);
    feed(budget, 2000, 20); // aba oculta: não conta
    feed(budget, 16.7, 10);
    expect(onLevel).not.toHaveBeenCalled();
  });

  it("calcula a mediana", () => {
    expect(median([5, 1, 3])).toBe(3);
    expect(median([1, 2, 3, 4])).toBe(2.5);
  });
});

import { validateProspect } from "../prospect-helpers";

describe("salary validation", () => {
  const base = { companyName: "Acme", roleTitle: "Engineer" };

  test("accepts a valid positive integer salary", () => {
    const result = validateProspect({ ...base, targetSalary: 120000 });
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("accepts when salary is omitted (optional)", () => {
    const result = validateProspect({ ...base });
    expect(result.valid).toBe(true);
  });

  test("accepts when salary is null (optional)", () => {
    const result = validateProspect({ ...base, targetSalary: null });
    expect(result.valid).toBe(true);
  });

  test("rejects a negative salary", () => {
    const result = validateProspect({ ...base, targetSalary: -5000 });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Salary must be a positive whole number");
  });

  test("rejects a zero salary", () => {
    const result = validateProspect({ ...base, targetSalary: 0 });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Salary must be a positive whole number");
  });

  test("rejects a non-numeric salary string", () => {
    const result = validateProspect({ ...base, targetSalary: "lots" });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Salary must be a positive whole number");
  });

  test("rejects a decimal salary", () => {
    const result = validateProspect({ ...base, targetSalary: 99.5 });
    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Salary must be a positive whole number");
  });

  test("salary errors are independent of other field errors", () => {
    const result = validateProspect({ companyName: "", roleTitle: "", targetSalary: -1 });
    expect(result.errors).toContain("Company name is required");
    expect(result.errors).toContain("Role title is required");
    expect(result.errors).toContain("Salary must be a positive whole number");
  });
});

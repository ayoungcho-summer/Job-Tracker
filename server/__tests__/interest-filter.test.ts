import { INTEREST_LEVELS } from "../../shared/schema";

type ProspectStub = { id: number; interestLevel: string };

function filterByInterest(
  prospects: ProspectStub[],
  filter: "All" | (typeof INTEREST_LEVELS)[number],
): ProspectStub[] {
  if (filter === "All") return prospects;
  return prospects.filter((p) => p.interestLevel === filter);
}

const sampleProspects: ProspectStub[] = [
  { id: 1, interestLevel: "High" },
  { id: 2, interestLevel: "Medium" },
  { id: 3, interestLevel: "Low" },
  { id: 4, interestLevel: "High" },
  { id: 5, interestLevel: "Medium" },
];

describe("interest-level column filter", () => {
  test("All returns every prospect unchanged", () => {
    expect(filterByInterest(sampleProspects, "All")).toHaveLength(5);
  });

  test("High returns only High-interest prospects", () => {
    const result = filterByInterest(sampleProspects, "High");
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.interestLevel === "High")).toBe(true);
  });

  test("Medium returns only Medium-interest prospects", () => {
    const result = filterByInterest(sampleProspects, "Medium");
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.interestLevel === "Medium")).toBe(true);
  });

  test("Low returns only Low-interest prospects", () => {
    const result = filterByInterest(sampleProspects, "Low");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(3);
  });

  test("returns empty array when no prospects match the filter", () => {
    const noLow: ProspectStub[] = [
      { id: 1, interestLevel: "High" },
      { id: 2, interestLevel: "Medium" },
    ];
    expect(filterByInterest(noLow, "Low")).toHaveLength(0);
  });

  test("filters are independent per column (different filter values produce different results)", () => {
    const highResult = filterByInterest(sampleProspects, "High");
    const lowResult = filterByInterest(sampleProspects, "Low");
    expect(highResult).not.toEqual(lowResult);
  });
});

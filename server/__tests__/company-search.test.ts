type ProspectStub = { id: number; companyName: string; status: string };

function searchByCompany(prospects: ProspectStub[], query: string): ProspectStub[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return prospects;
  return prospects.filter((p) => p.companyName.toLowerCase().includes(normalized));
}

const sampleProspects: ProspectStub[] = [
  { id: 1, companyName: "Google", status: "Applied" },
  { id: 2, companyName: "Amazon", status: "Bookmarked" },
  { id: 3, companyName: "Meta", status: "Applied" },
  { id: 4, companyName: "Goldman Sachs", status: "Interviewing" },
  { id: 5, companyName: "Netflix", status: "Offer" },
];

describe("company name search filter", () => {
  test("empty query returns all prospects", () => {
    expect(searchByCompany(sampleProspects, "")).toHaveLength(5);
  });

  test("whitespace-only query returns all prospects", () => {
    expect(searchByCompany(sampleProspects, "   ")).toHaveLength(5);
  });

  test("exact match returns the matching prospect", () => {
    const result = searchByCompany(sampleProspects, "Google");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  test("search is case-insensitive", () => {
    expect(searchByCompany(sampleProspects, "google")).toHaveLength(1);
    expect(searchByCompany(sampleProspects, "GOOGLE")).toHaveLength(1);
    expect(searchByCompany(sampleProspects, "GoOgLe")).toHaveLength(1);
  });

  test("partial match returns all matching prospects", () => {
    const result = searchByCompany(sampleProspects, "go");
    const ids = result.map((p) => p.id);
    expect(ids).toContain(1);
    expect(ids).toContain(4);
    expect(result).toHaveLength(2);
  });

  test("query with no matches returns an empty array", () => {
    expect(searchByCompany(sampleProspects, "OpenAI")).toHaveLength(0);
  });

  test("clearing the search (empty string) restores all prospects", () => {
    const filtered = searchByCompany(sampleProspects, "Netflix");
    expect(filtered).toHaveLength(1);
    const restored = searchByCompany(sampleProspects, "");
    expect(restored).toHaveLength(5);
  });

  test("search is independent of prospect status", () => {
    const result = searchByCompany(sampleProspects, "a");
    const statuses = result.map((p) => p.status);
    expect(statuses).toContain("Bookmarked");
    expect(statuses).toContain("Applied");
    expect(statuses).toContain("Interviewing");
  });
});

import {
    createEmptyProduct,
    normalizeProductForForm,
    toBoolean,
} from "./features/products/form-utils";

test("creates the default product form state", () => {
    expect(createEmptyProduct()).toEqual({
        name: "",
        price: "",
        description: "",
        category: "",
        quantity: "",
        brand: "",
        inStock: true,
        releaseDate: "",
    });
});

test("normalizes backend product payloads for the form", () => {
    expect(
        normalizeProductForForm({
            name: "Monitor",
            inStock: "false",
            releaseDate: "2026-03-01T00:00:00.000Z",
        })
    ).toMatchObject({
        name: "Monitor",
        inStock: false,
        releaseDate: "2026-03-01",
    });
});

test("converts mixed values to booleans consistently", () => {
    expect(toBoolean(true)).toBe(true);
    expect(toBoolean("true")).toBe(true);
    expect(toBoolean("false")).toBe(false);
    expect(toBoolean(undefined)).toBe(true);
});

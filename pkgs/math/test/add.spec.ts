import { describe, expect, it } from "@jest/globals";
import { add } from "../src/add";

describe("add", () => {
    it("should return sum of 2 numbers", () => {
        const result = add(1, 1);
        expect(result).toBe(2);
    });
});

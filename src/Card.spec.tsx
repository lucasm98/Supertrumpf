import React from "react";
import renderer from "react-test-renderer";
import Card from "./Card";
import Animal from "./Animal";

describe("Card", () => {
  describe("Snapshots", () => {
    it("should match the snapshot", () => {
      const animal = new Animal("Elefant", "Bild", 3.3, 6000, 70, 1, 40);

      const tree = renderer
        .create(<Card animal={animal} uncovered={true} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});

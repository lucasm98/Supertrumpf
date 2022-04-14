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

    it("should match the snapshot 2", () => {
      const animal = new Animal("Elefant", "Bild", 3.3, 6000, 70, 1, 40);

      const tree = renderer
        .create(<Card animal={animal} uncovered={true} />)
        .toJSON();
      expect(tree).toMatchInlineSnapshot(`
        <div
          className="card light"
        >
          <h1>
            Elefant
          </h1>
          <img
            alt="Elefant"
            height="200"
            src="/Bild"
            width="200"
          />
          <table
            className="sc-dkzDqf ePGVba"
          >
            <tbody>
              <tr
                className="sc-gsnTZi iytFdT size"
                onClick={[Function]}
              >
                <td
                  className="sc-bczRLJ OKfSj"
                >
                  Größe
                </td>
                <td
                  className="sc-bczRLJ OKfSj"
                >
                  3.3
                   
                  m
                </td>
              </tr>
              <tr
                className="sc-gsnTZi iytFdT weight"
                onClick={[Function]}
              >
                <td
                  className="sc-bczRLJ OKfSj"
                >
                  Gewicht
                </td>
                <td
                  className="sc-bczRLJ OKfSj"
                >
                  6000
                   
                  kg
                </td>
              </tr>
              <tr
                className="sc-gsnTZi iytFdT age"
                onClick={[Function]}
              >
                <td
                  className="sc-bczRLJ OKfSj"
                >
                  Alter
                </td>
                <td
                  className="sc-bczRLJ OKfSj"
                >
                  70
                   
                  Jahre
                </td>
              </tr>
              <tr
                className="sc-gsnTZi iytFdT offspring"
                onClick={[Function]}
              >
                <td
                  className="sc-bczRLJ OKfSj"
                >
                  Nachkommen
                </td>
                <td
                  className="sc-bczRLJ OKfSj"
                >
                  1
                   
                </td>
              </tr>
              <tr
                className="sc-gsnTZi iytFdT speed"
                onClick={[Function]}
              >
                <td
                  className="sc-bczRLJ OKfSj"
                >
                  Geschwindigkeit
                </td>
                <td
                  className="sc-bczRLJ OKfSj"
                >
                  40
                   
                  km/h
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      `);
    });
  });
});

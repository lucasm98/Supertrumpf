import React from "react";
import { Paper, Table ,TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import Animal from "../game/Animal";

interface Props {
  animals: Animal[];
}

export default function List({animals}: Props) {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {Object.keys(Animal.properties).map(property => (
              <TableCell align="right" key={property}>
                {Animal.properties[property].label}
                {Animal.properties[property].unit !== '' &&
                  ' ('+ Animal.properties[property].unit + ')'}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {animals.map(animal => (
            <TableRow key={animal.id}>
              <TableCell>{animal.name}</TableCell>
              {(Object.keys(Animal.properties) as (keyof Animal)[]).map(
                property => (
                  <TableCell key={property} align="right">
                    {animal[property]}
                  </TableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
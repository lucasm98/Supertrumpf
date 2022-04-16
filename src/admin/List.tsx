import React, {ChangeEvent, useState, useCallback, MouseEvent} from "react";
import { Paper, Table ,TableHead, TableRow, TableCell, TableBody, TextField, TableSortLabel, Grid, Hidden } from '@material-ui/core';
import Animal from "../game/Animal";

import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

interface Props {
  animals: Animal[];
}

export default function List({animals}: Props) {
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState<{
    orderBy: keyof Animal;
    order: 'asc' | 'desc';
  }>({
    orderBy: 'name',
    order: 'asc',
  });

  const createSortHandler = (columnId: keyof Animal) => {
    return () => {
      setSort({
        orderBy: columnId,
        order: sort.order === 'asc' ? 'desc' : 'asc',
      });
    };
  };

  return (
    <Grid container>
      <Grid item md={1} />
      <Grid item xs={12} md={10}>
        <Paper>
          <TextField
            label = "Liste filtern"
            value = {filter}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFilter(e.currentTarget.value)
            }
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={sort.orderBy === 'name'}
                    direction={sort.order}
                    onClick={createSortHandler('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                {(Object.keys(Animal.properties) as (keyof Animal)[]).map(property => (
                  <TableCell align="right" key={property}>
                    <TableSortLabel
                      active={sort.orderBy === property}
                      direction={sort.order}
                      onClick={createSortHandler(property)}
                    >
                      {Animal.properties[property].label}
                      {Animal.properties[property].unit !== '' &&
                        ' ('+ Animal.properties[property].unit + ')'}
                    </TableSortLabel>
                  </TableCell>
                ))}
                <TableCell>{/*edit*/}</TableCell>
                <TableCell>{/*delete*/}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {animals
                .filter(animal =>
                  animal.name.toLowerCase().includes(filter.toLowerCase())
                )
                .sort((animalA: Animal, animalB: Animal) => {
                  let result = 0;
                  if(animalB[sort.orderBy]! < animalA[sort.orderBy]!) {
                    result = -1;
                  }
                  if(animalB[sort.orderBy]! > animalA[sort.orderBy]!) {
                    result = 1;
                  }
                  return sort.order === 'asc' ? result * -1 : result;
                })
                .map(animal => (
                  <TableRow key={animal.id}>
                    <TableCell>{animal.name}</TableCell>
                    {(Object.keys(Animal.properties) as (keyof Animal)[]).map(
                      property => (
                        <TableCell key={property} align="right">
                          {animal[property]}
                        </TableCell>
                      )
                    )}
                    <TableCell>
                      <IconButton>
                        <DeleteIcon/>
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <EditIcon/>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
      <Grid item md={1} />
    </Grid>
  );
}
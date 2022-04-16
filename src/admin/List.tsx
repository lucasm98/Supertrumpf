import React, {ChangeEvent, useState, useCallback, MouseEvent} from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  TableSortLabel,
  Grid
} from '@material-ui/core';
import {IconButton} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Animal from "../game/Animal";
import ConfirmDialog from "./ConfirmDialog";
import Form from './Form';
import { Fab } from "./List.styles";

interface Props {
  animals: Animal[];
  onDelete: (id: number ) => void;
  onSave: (animal: Animal) => void;
}

export default function List({animals, onDelete, onSave}: Props) {
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    id:number;
  }>( {open:false, id:0});
  const [formDialog, setFormDialog] = useState<{
    open: boolean;
  }>({open: false});
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
                      <IconButton
                        onClick={()=> {
                          setDeleteDialog({open: true, id: animal.id!})
                        }}
                      >
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
      <ConfirmDialog
        title="Wirklich löschen?"
        text="Möchten Sie das gewählte Element wirklich löschen?"
        open={deleteDialog.open}
        onClose={confirm => {
          if (confirm) {
            onDelete(deleteDialog.id);
          }
          setDeleteDialog({
            id: 0,
            open: false,
          });
        }}
      />
      <Form
        onSubmit={(animal: Animal) => {
          setFormDialog(()=> ({open: false}));
          onSave(animal);
        }}
        open={formDialog.open}
        onClose={()=> setFormDialog(() => ({open: false}))}
      />
      <Fab
        color="primary"
        aria-label="Add"
        onClick={()=> {
          setFormDialog(() => ({open: true}));
        }}
      >
        <AddIcon />
      </Fab>
    </Grid>
  );
}
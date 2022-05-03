import React, {useEffect, useState} from "react";
import axios from "axios";
import update from "immutability-helper";
import {Routes, Route, useNavigate, useParams} from "react-router-dom";

import List from "./List";
import Animal from "../shared/models/Animal";
import Form from './Form';

export default function Admin() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const navigate = useNavigate();
  const {cardId} = useParams<string>();

  useEffect(()=> {
    async function fetchData() {
      const cards = await axios.get<Animal[]>('http://localhost:3001/card');
      setAnimals(cards.data);
    }
    fetchData();
  }, []);

  const deleteAnimal = async (id: number) => {
    await axios.delete(`http://localhost:3001/card/${id}`);
    setAnimals(animals => animals.filter((animal: Animal) => animal.id !== id));
  };

  const saveAnimal = async (animal: Animal) => {
/*    const data = new FormData();
    data.append('name', animal.name);
    data.append('image', animal.image);
    data.append('size', animal.size.toString());
    data.append('weight', animal.weight.toString());
    data.append('age', animal.age.toString());
    data.append('offspring', animal.offspring.toString());
    data.append('speed', animal.speed.toString());*/

    const data = {
      'name': animal.name,
      'image': "placeholder.png",//animal.image,
      'size': animal.size,
      'weight': animal.weight,
      'age': animal.age,
      'offspring': animal.offspring,
      'speed': animal.speed,
    }

    if(animal.id) {
      const updateAnimal = await axios.put(
        `http://localhost:3001/card/${animal.id}`,
        data
      );

      setAnimals(animals => {
        const index = animals.findIndex(
          animal => animal.id === updateAnimal.data.id
        );
        return update(animals, { [index]: { $set: updateAnimal.data } });
      });
    } else {
      const newAnimal = await axios.post('http://localhost:3001/card', data);

      setAnimals(animals => update(animals, {$push: [newAnimal.data]}));
    }
    navigate("/admin");
  };





  return (
    <>
      <List animals={animals} onDelete={deleteAnimal} onSave={saveAnimal}/>
      {{cardId}.cardId !== undefined && <Form
        onSubmit={saveAnimal}
        animal={animals.find(
          animal => animal.id === parseInt({cardId}.cardId!)
        )}
        onClose={() => navigate("/admin")}
        open
      />}
      <Routes>
        <Route
          path="new"
          element={
            <Form
              onSubmit={saveAnimal}
              onClose={()=>navigate("/admin")}
              open
            />
          }
        />
      </Routes>

    </>
  );
}
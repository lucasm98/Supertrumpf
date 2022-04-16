import React, {useEffect, useState} from "react";
import axios from "axios";
import Animal from "../game/Animal";
import List from "./List";

export default function Admin() {
  const [animals, setAnimals] = useState<Animal[]>([]);
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

  return <List animals={animals} onDelete={deleteAnimal} />;
}
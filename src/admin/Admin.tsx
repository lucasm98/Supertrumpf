import React, {useEffect, useState} from "react";
import axios from "axios";
import Animal from "../game/Animal";
import List from "./List";

export default function Admin() {
  const [animals, setAnimals] = useState<Animal[]>([]);
  useEffect(()=> {
    async function fetchData() {
      const cards = await axios.get<Animal[]>('http://localhost:3001');
      setAnimals(cards.data);
    }
    fetchData();
  }, []);
  return <List animals={animals} />;
}
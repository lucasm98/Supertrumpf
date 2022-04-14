import { useState, useCallback, ChangeEvent} from "react";
import update from "immutability-helper";
import Animal from "../game/Animal";

export default function useCardAdmin(
  initialAnimal: Animal = new Animal('', '', 0, 0, 0, 0, 0)
): [Animal, (event: ChangeEvent<HTMLInputElement>) => void] {
  const [animal, setAnimal] = useState<Animal>(initialAnimal);

  const changeProperty = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      const id = event.currentTarget.id;
      let value: string | File;
      value = event.currentTarget.value;
      if(id === 'image') {
        value = event.currentTarget.files![0];
      }
      setAnimal(animalState => {
        const newState = update(animalState, {
          [id]: {$set: value},
        });
        return newState;
      });
    },
    []
  );

  return [animal, changeProperty];
}
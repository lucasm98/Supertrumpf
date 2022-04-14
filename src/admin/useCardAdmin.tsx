import { useState, useCallback, ChangeEvent} from "react";
import update from "immutability-helper";
import Animal from "../Game/Animal";

export default function useCardAdmin(
  initialAnimal: Animal = new Animal('','',0,0,0,0,0)
): [Animal, (event: ChangeEvent<HTMLInputElement>) => void] {
  const [animal, setAnimal] = useState<Animal>(initialAnimal);

  const changeProperty = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setAnimal(animalState =>
      update(animalState, {
        [event.currentTarget.id]: {$set: event.currentTarget.value},
      })
    );
    },
    []
  );

  return [animal, changeProperty];
}
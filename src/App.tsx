import React from "react";

import Form from "./admin/Form";
import axios from "axios";

export default function App() {
  return (
    <Form
      onSubmit={animal => {
        const data = new FormData();
        data.append('name', animal.name);
        data.append('image', animal.image);
        data.append('size', animal.size.toString());
        data.append('weight', animal.weight.toString());
        data.append('age', animal.age.toString());
        data.append('offspring', animal.offspring.toString());
        data.append('speed', animal.speed.toString());
        axios.post('http://localhost:3001/card', data, {
          headers: {
            'content-type': 'multipart/form-data',
          },
        });
      }}
    />
  );
}

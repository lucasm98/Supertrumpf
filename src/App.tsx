import React from "react";

import Form from "./admin/Form";

export default function App() {
  return <Form onSubmit={animal => console.log(animal)}/>;
}

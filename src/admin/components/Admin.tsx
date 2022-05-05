import React from "react";
import {Routes, Route, useNavigate, useParams} from "react-router-dom";
import List from './List/List.container';
import Form from '../components/Form/Form.container';

export default function Admin() {
  const navigate = useNavigate();
  const {cardId} = useParams<string>();

  return (
    <>
      <List />
      {{cardId}.cardId !== undefined && <Form
        onSubmit={() => navigate("/admin")}
        id={parseInt({cardId}.cardId!)}
        onClose={() => navigate("/admin")}
      />}
      <Routes>
        <Route
          path="new"
          element={
            <Form
              onSubmit={() => navigate("/admin")}
              id={parseInt({cardId}.cardId!)}
              onClose={()=>navigate("/admin")}
            />
          }
        />
      </Routes>

    </>
  );
}
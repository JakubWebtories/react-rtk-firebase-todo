import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useParams } from "react-router-dom";
import { useSingleTaskQuery, useUpdateTaskMutation } from "../redux/api";
import { useState } from "react";

export const EditTask = () => {
  const { id } = useParams();

  const { data: task, isLoading, isError } = useSingleTaskQuery(id ? id : skipToken);
  const [updatedTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const [editValues, setEditValues] = useState({
    category: "",
    name: "",
    test: "",
  });

  console.log(editValues.category);

  const handleEdit = async (e) => {
    e.preventDefault();
    await updatedTask({
      id: id,
      category: editValues.category,
      name: editValues.name,
      test: editValues.test,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Not found... sorry :/</div>;
  }

  if (isUpdating) {
    return <div>Updating...</div>;
  }

  return (
    <div>
      <span>Kategorie {task.category}</span>
      <span>Název {task.name}</span>
      <form action="post">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          placeholder={task.category}
          value={editValues.category}
          onChange={(e) =>
            setEditValues({ ...editValues, category: e.target.value })
          }
        />

        <label htmlFor="category">Name</label>
        <input
          type="text"
          placeholder={task.name}
          value={editValues.name}
          onChange={(e) =>
            setEditValues({ ...editValues, name: e.target.value })
          }
        />

        <label htmlFor="test">Test</label>
        <input
          type="text"
          placeholder={task.test}
          value={editValues.test}
          onChange={(e) =>
            setEditValues({ ...editValues, test: e.target.value })
          }
        />

        <button type="submit" onClick={handleEdit}>
          Add
        </button>
      </form>
    </div>
  );
};

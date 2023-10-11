import { useState } from "react";
import { usePostDataMutation } from "../redux/api";

export const FormTask = () => {
  const [taskValues, setTaskValues] = useState({
    id: "",
    category: "",
    name: "",
    test: "",
  });

  const [createTask, { isLoading }] = usePostDataMutation();

  const handleAdd = async (e) => {
    e.preventDefault();
    console.log(taskValues);
    const newTask = {
      category: taskValues.category,
      name: taskValues.name,
      test: taskValues.test,
    };

    console.log(newTask);

    try {
      await createTask(newTask);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  if (isLoading) {
    return <div>Is loading...</div>;
  }

  return (
    <div className="form-container">
      <form action="post">
        <label htmlFor="category">Category</label>
        <input
          type="text"
          value={taskValues.category}
          onChange={(e) =>
            setTaskValues({ ...taskValues, category: e.target.value })
          }
        />

        <label htmlFor="category">Name</label>
        <input
          type="text"
          value={taskValues.name}
          onChange={(e) =>
            setTaskValues({ ...taskValues, name: e.target.value })
          }
        />

        <label htmlFor="test">Test</label>
        <input
          type="text"
          value={taskValues.test}
          onChange={(e) =>
            setTaskValues({ ...taskValues, test: e.target.value })
          }
        />

        <button type="submit" onClick={handleAdd}>
          Add
        </button>
      </form>
    </div>
  );
};

import "../styles/components/items.scss";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGetDataQuery, useDeleteDataMutation } from "../redux/api";

export const TaskList = () => {
  const { data, isLoading, error } = useGetDataQuery();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteDataMutation();
  const tasksCountRef = useRef(0);

  const handleDelete = async (id) => {
    try {
      await deleteTask(id, { invalidatesTags: ["Tasks"] });
      console.log("deleted:", id);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Data Loading ...</div>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  let countTasks = data.length;
  console.log(countTasks);

  console.log(data);

  return (
    <div className="">
      <h1>Úkoly</h1>
      <div>{countTasks}</div>

      <div className="flexbox column list-item-container">
        {data.map((task) => {
          return (
            <div
              key={task.id}
              id={task.id}
              className="list-item flexbox column"
            >
              <span>{task.id}</span>
              <h3 className="list-item-name">{task.category}</h3>
              <p className="list-item-content">{task.name}</p>
              <span>{task.test}</span>

              <div className="btn-container flexbox row">
                <button
                  className="btn"
                  onClick={() => handleDelete(task.id)}
                  disabled={isLoading}
                >
                  Vymazat
                </button>
                <Link to={`/detail/${task.id}`}>
                  <button className="btn">Detail</button>
                </Link>
              </div>
            </div>
          );
        })}
        {isDeleting && <p>Deleting task...</p>}
      </div>
    </div>
  );
};

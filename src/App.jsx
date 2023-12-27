import { useReducer, useState } from "react";
import "./App.css";

function App() {
  const reducer1 = (state, action) => {
    switch (action.type) {
      case ACTION.ADD:
        return [...state, { id: state.length, task: action.paylod }];

      case ACTION.EDIT:
        return state.map((item) =>
          item.id == action.paylod.id
            ? { ...item, task: action.paylod.Edited }
            : item
        );

      case ACTION.DELETE:
        return state.filter((i) => i.id !== action.paylod);

      case ACTION.RESET:
        return [];

      default:
        return state;
    }
  };

  const ACTION = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE",
    RESET: "RESET",
  };
  const initialState = [];

  const [state, dispatch] = useReducer(reducer1, initialState);
  console.log("state =", state);
  const [newTodo, setNewTodo] = useState("");
  console.log("newTodo =", newTodo);

  const addTaskHandler = () => {
    if (newTodo.trim() !== "") {
      dispatch({ type: ACTION.ADD, paylod: newTodo });
      setNewTodo("");
    }
  };

  return (
    <div className=" h-screen flex flex-col justify-start items-center p-5">
      <h1 className="text-4xl text-b border-b-4 mb-2 p-4 w-full text-center">
        Todo List {state.length}
      </h1>

      <div className="flex justify-between m-2 p-1 w-full rounded-lg ">
        <input
          autoFocus
          type="text"
          className="transition duration-1000 ease-in-out  border-b-8 hover:border  w-full p-4 outline-none    rounded-full mx-2 text-xl"
          placeholder="Enter the new task and press Enter"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim() !== "") {
              addTaskHandler();
            }
          }}
        />
        <button
          onClick={() => addTaskHandler()}
          className="transition duration-700 ease-in-out hover:border   border-b-8 rounded-full p-4 "
        >
          Add
        </button>
        <button
          onClick={() => dispatch({ type: ACTION.RESET })}
          className="transition duration-700 ease-in-out hover:border border-b-8 rounded-full p-3  mx-2 "
        >
          Clean
        </button>
      </div>
      <p className="text-slate-500">
        <b>Click</b> on the text to <b>edit</b> the Task
      </p>
      <div className="w-full">
        {state.length == 0 ? (
          <div className="flex justify-center items-center h-80 ">
             Your list is empty... 
          </div>
        ) : (
          state.map((item) => (
            <li
              key={item.id}
              className=" transition duration-700 ease-in-out hover:bg-cyan-200 rounded-full  cursor-pointer flex justify-between items-center border-b-4 m-1 p-2"
            >
              <span className="w-10 mx-2">{item.id + 1} - </span>
              <input
                className=" mx-2 outline-none  p-2 w-full"
                onChange={(e) =>
                  dispatch({
                    type: ACTION.EDIT,
                    paylod: { id: item.id, Edited: e.target.value },
                  })
                }
                type="text"
                value={item.task}
              />

              <div>
                <button
                  onClick={() =>
                    dispatch({ type: ACTION.DELETE, paylod: item.id })
                  }
                  className="  p-1 w-10 outline-none rounded-full"
                >
                  X
                </button>
              </div>
            </li>
          ))
        )}
      </div>
    </div>
  );
}

export default App;

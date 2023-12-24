import { useReducer, useState } from "react";
import "./App.css";

function App() {
  const ACTION = {
    ADD: "ADD",
    EDIT: "EDIT",
    DELETE: "DELETE",
  };
  const initialState = [];
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

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer1, initialState);
  console.log("state =", state);
  const [newTodo, setNewTodo] = useState("");
  console.log("newTodo =", newTodo);

  return (
    <div className=" h-screen flex flex-col justify-start items-center p-5">
      <h1 className="text-4xl border-black border-b-4 mb-2 p-2 w-full text-center">
        Todo List {state.length}
      </h1>

      <div className="flex justify-between m-2 p-1 w-full rounded-lg ">
        <input
          type="text"
          className="w-full p-4 outline-none bg-green-50 rounded-full mx-2 text-xl"
          placeholder="New Task ..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim() !== "") {
              dispatch({ type: ACTION.ADD, paylod: e.target.value });
              setNewTodo("");
            }
          }}
        />
        <button
          onClick={() =>
            newTodo.trim() !== "" &&
            dispatch({ type: ACTION.ADD, paylod: newTodo })
          }
          className="border  border-x-blue-500 rounded-full p-4 hover:bg-green-50 "
        >
          Add
        </button>
      </div>
      <p className="text-slate-500">
        Click on the text to <b>edit</b> the work
      </p>
      <div className="w-[85%]">
        {state.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b-4 m-1 p-2"
          >
            <span className="w-10">{item.id + 1} - </span>
            <input
              className="bg-slate-50 mx-2 outline-none  rounded-full p-2 w-full"
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
                className=" p-2 w-10 outline-none bg-red-100 rounded-full"
              >
                X
              </button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}

export default App;

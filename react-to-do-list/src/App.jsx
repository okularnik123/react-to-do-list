import { useState } from "react";
import { v4 as uuid } from "uuid";
import "./index.css";

function App() {
  const [newItem, changeNewItem] = useState("");
  const [items, changeItems] = useState([]);

  function handleInputChange(e) {
    changeNewItem(e.target.value);
  }

  function addItem() {
    if (newItem !== "") {
      changeItems([
        ...items,
        { title: newItem, id: uuid(), isCompleted: false },
      ]);

      changeNewItem("");
    }
  }
  function toggleItem(itemId, checked) {
    changeItems(
      items.map((item) => {
        if (item.id === itemId) {
          return { ...item, isCompleted: checked };
        }
        return item;
      })
    );
  }
  function deleteItem(itemId) {
    changeItems(items.filter((item) => item.id !== itemId));
  }
  return (
    <>
      <h1>To do list</h1>
      <div className="newItemDiv">
        <label htmlFor="newItem">Add to do:</label> <br />
        <input
          value={newItem}
          onChange={handleInputChange}
          type="text"
          id="newItem"
        />
        <button type="button" onClick={addItem}>
          Add
        </button>
      </div>
      {items.map((item) => {
        return (
          <div
            key={item.id}
            className={item.isCompleted ? "completed" : "notCompleted"}
          >
            <input
              type="checkbox"
              checked={item.isCompleted}
              onChange={(e) => toggleItem(item.id, e.target.checked)}
            />
            {item.title}
            <button className="deleteBtn" onClick={(e) => deleteItem(item.id)}>
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
}

export default App;

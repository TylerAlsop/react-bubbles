import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";


const initialColor = {
  color: "",
  code: { hex: "" }
};


const ColorList = ({ colors, updateColors, setColorChanged }) => {
  console.log("Colors in ColorList.js", colors);

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  // useEffect(() => {
  //   const colorById = colors.find(color => {
  //     return `${color.id}` === match.params.id;
  //   });
  //   console.log("colorToEdit", colorToEdit);
  //   if (colorById) {
  //     setColorToEdit(colorById);
  //   }
  // }, [colors, match.params.id]);


  console.log("ColorToEdit, id", colorToEdit.id)

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        setColorChanged(true)
        console.log("put res in saveEdit", res);
      })
      .catch(err => {
        console.log("Error with put", err);
      })
      setColorChanged(false);
  };


  const deleteColor = color => {
    // make a delete request to delete this color
  };


  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
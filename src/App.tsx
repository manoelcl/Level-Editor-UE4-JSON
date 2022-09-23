import { MouseEventHandler, useEffect, useState } from "react";
import "./App.css";
import { Cell, Map } from "./types";

function App() {
  const [maps, setMaps] = useState<Map[]>();
  const [currentMap, setCurrentMap] = useState<Map>();
  const [zoomLevel, setZoomLevel] = useState<number>(12);

  const createMap: MouseEventHandler<HTMLButtonElement> = (event) => {
    const formElements = event.currentTarget.parentNode?.children;

    const [columns, rows] = [
      Number((formElements?.namedItem("columns") as HTMLInputElement).value),
      Number((formElements?.namedItem("rows") as HTMLInputElement).value),
    ];

    if (isNaN(columns) || isNaN(rows))
      return console.log("Values must be a number");

    setCurrentMap({
      Name: "New map",
      Cells: new Array<Cell>(Math.floor(columns) * Math.floor(rows)).fill({
        Walls: [0, 0, 0, 0],
        Type: "Default",
        Rotation: 0,
      }),
      Row: Math.floor(columns),
    });
  };

  useEffect(() => {
    console.log(currentMap);
  }, [currentMap]);

  return (
    <div className="App">
      <h1>Level editor</h1>
      <h2>Current Map: {currentMap?.Name || "none"}</h2>
      <form className="tools" onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="columns" id="columns" defaultValue={12} />
        x
        <input type="text" name="rows" id="rows" defaultValue={12} />
        <button onClick={createMap}>Create new map</button>
        <button>Edit</button>
        <input
          type="range"
          name="slider"
          id="slider"
          min={12}
          max={32}
          onChange={(event) => setZoomLevel(Number(event.target.value))}
        />
        <select onChange={() => ""} name="Type" value={"Default"} id="Type">
          <option value="Default">Default</option>
          <option value="Road">Road</option>
          <option value="Grass">Grass</option>
          <option value="Dirt">Dirt</option>
        </select>
      </form>

      <div
        onClick={() => console.log("Click")}
        className="Map"
        style={{
          position: "relative",
          backgroundColor: "grey",
          width: currentMap?.Row || 12 * zoomLevel,
          height: currentMap
            ? Math.floor(currentMap?.Cells.length / currentMap?.Row) * zoomLevel
            : 12 * zoomLevel,
        }}
      >
        {currentMap?.Cells.map((cell, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "blue",
              position: "absolute",
              width: zoomLevel,
              height: zoomLevel,
              left: zoomLevel * (index % currentMap.Row),
              bottom: zoomLevel * Math.floor(index / currentMap.Row),
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;

export interface Cell {
  ["Walls"]: Number[];
  ["Type"]: string;
  ["Rotation"]: number;
}

export interface Map {
  ["Name"]: string;
  ["Cells"]: Cell[];
  ["Row"]: number;
}

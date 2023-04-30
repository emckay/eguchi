export type Chord = {
  id: number;
  notes: string[];
  colorName: string;
  textColor: string;
  themeColor: string;
};

// prettier-ignore
export const chords: Chord[] = [
  { id: 0, notes: ["C4", "E4", "G4"], colorName: "red", textColor: "black", themeColor: 'red.400' },
  { id: 1, notes: ["C4", "F4", "A4"], colorName: "yellow", textColor: "black", themeColor: 'yellow.400'  },
  { id: 2, notes: ["B3", "D4", "G4"], colorName: "blue", textColor: "black", themeColor: 'blue.400'   },
  { id: 3, notes: ["A3", "C4", "F4"], colorName: "black", textColor: "white", themeColor: 'black'   },
  { id: 4, notes: ["D4", "G4", "B4"], colorName: "green", textColor: "black", themeColor: 'green.400'   },
  { id: 5, notes: ["E4", "G4", "C5"], colorName: "orange", textColor: "black", themeColor: 'orange.400'   },
  { id: 6, notes: ["F4", "A4", "C5"], colorName: "purple", textColor: "black", themeColor: 'purple.400'   },
  { id: 7, notes: ["G4", "B4", "D5"], colorName: "pink", textColor: "black", themeColor: 'pink.400'   },
  { id: 8, notes: ["G4", "C5", "E5"], colorName: "white", textColor: "black", themeColor: 'white'   },
];

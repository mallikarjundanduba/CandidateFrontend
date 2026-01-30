// CodingBat-style practice questions data
// Main file that imports questions from separate topic files

// Import topic question arrays
import { warmup1Questions } from './topics/warmup1.js';
import { warmup2Questions } from './topics/warmup2.js';
import { string1Questions } from './topics/string1.js';
import { string2Questions } from './topics/string2.js';
import { string3Questions } from './topics/string3.js';
import { array1Questions } from './topics/array1.js';
import { array2Questions } from './topics/array2.js';
import { array3Questions } from './topics/array3.js';
import { logic1Questions } from './topics/logic1.js';
import { logic2Questions } from './topics/logic2.js';
import { ap1Questions } from './topics/ap1.js';
import { recursion1Questions } from './topics/recursion1.js';
import { recursion2Questions } from './topics/recursion2.js';
import { map1Questions } from './topics/map1.js';
import { map2Questions } from './topics/map2.js';
import { functional1Questions } from './topics/functional1.js';
import { functional2Questions } from './topics/functional2.js';

export const codingTopics = [
  {
    id: "warmup-1",
    name: "Warmup-1",
    description: "Simple warmup problems to get started (solutions available)",
    difficulty: "Easy",
    stars: 10
  },
  {
    id: "warmup-2",
    name: "Warmup-2",
    description: "Medium warmup string/array loops (solutions available)",
    difficulty: "Medium",
    stars: 6
  },
  {
    id: "string-1",
    name: "String-1",
    description: "Basic string problems -- no loops",
    difficulty: "Easy",
    stars: 8
  },
  {
    id: "string-2",
    name: "String-2",
    description: "Medium String problems -- 1 loop",
    difficulty: "Medium",
    stars: 7
  },
  {
    id: "string-3",
    name: "String-3",
    description: "Harder String problems -- 2 loops",
    difficulty: "Hard",
    stars: 4
  },
  {
    id: "array-1",
    name: "Array-1",
    description: "Basic array problems -- no loops.",
    difficulty: "Easy",
    stars: 8
  },
  {
    id: "array-2",
    name: "Array-2",
    description: "Medium array problems -- 1 loop",
    difficulty: "Medium",
    stars: 8
  },
  {
    id: "array-3",
    name: "Array-3",
    description: "Harder array problems -- 2 loops, more complex logic",
    difficulty: "Hard",
    stars: 3
  },
  {
    id: "logic-1",
    name: "Logic-1",
    description: "Basic boolean logic puzzles -- if else && || !",
    difficulty: "Easy",
    stars: 8
  },
  {
    id: "logic-2",
    name: "Logic-2",
    description: "Medium boolean logic puzzles -- if else && || !",
    difficulty: "Medium",
    stars: 3
  },
  {
    id: "ap-1",
    name: "AP-1",
    description: "AP CS medium problems",
    difficulty: "Medium",
    stars: 7
  },
  {
    id: "recursion-1",
    name: "Recursion-1",
    description: "Basic recursion problems",
    difficulty: "Medium",
    stars: 8
  },
  {
    id: "recursion-2",
    name: "Recursion-2",
    description: "Harder recursion problems",
    difficulty: "Hard",
    stars: 3
  },
  {
    id: "map-1",
    name: "Map-1",
    description: "Basic Map get()/put(), no loops",
    difficulty: "Easy",
    stars: 3
  },
  {
    id: "map-2",
    name: "Map-2",
    description: "Maps with bulk data and loops",
    difficulty: "Medium",
    stars: 3
  },
  {
    id: "functional-1",
    name: "Functional-1",
    description: "Functional mapping operations on lists with lambdas",
    difficulty: "Medium",
    stars: 3
  },
  {
    id: "functional-2",
    name: "Functional-2",
    description: "Functional filtering and mapping operations on lists with lambdas",
    difficulty: "Medium",
    stars: 3
  }
];

// Map topic IDs to their questions (imported from separate files)
export const topicQuestions = {
  "warmup-1": warmup1Questions,
  "warmup-2": warmup2Questions,
  "string-1": string1Questions,
  "string-2": string2Questions,
  "string-3": string3Questions,
  "array-1": array1Questions,
  "array-2": array2Questions,
  "array-3": array3Questions,
  "logic-1": logic1Questions,
  "logic-2": logic2Questions,
  "ap-1": ap1Questions,
  "recursion-1": recursion1Questions,
  "recursion-2": recursion2Questions,
  "map-1": map1Questions,
  "map-2": map2Questions,
  "functional-1": functional1Questions,
  "functional-2": functional2Questions
};

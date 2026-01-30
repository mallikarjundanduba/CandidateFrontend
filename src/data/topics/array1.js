// Array-1 Questions
export const array1Questions = [
  {
    id: "firstLast6",
    name: "firstLast6",
    difficulty: "H",
    description: `Given an array of ints, return true if 6 appears as either the first or last element in the array. The array will be length 1 or more.

firstLast6([1, 2, 6]) → true
firstLast6([6, 1, 2, 3]) → true
firstLast6([13, 6, 1, 2, 3]) → false`,
    examples: [
      { input: "firstLast6([1, 2, 6])", output: "true" },
      { input: "firstLast6([6, 1, 2, 3])", output: "true" },
      { input: "firstLast6([13, 6, 1, 2, 3])", output: "false" }
    ],
    functionSignature: "public boolean firstLast6(int[] nums)"
  },
  {
    id: "sameFirstLast",
    name: "sameFirstLast",
    difficulty: "H",
    description: `Given an array of ints, return true if the array is length 1 or more, and the first element and the last element are equal.

sameFirstLast([1, 2, 3]) → false
sameFirstLast([1, 2, 3, 1]) → true
sameFirstLast([1, 2, 1]) → true`,
    examples: [
      { input: "sameFirstLast([1, 2, 3])", output: "false" },
      { input: "sameFirstLast([1, 2, 3, 1])", output: "true" },
      { input: "sameFirstLast([1, 2, 1])", output: "true" }
    ],
    functionSignature: "public boolean sameFirstLast(int[] nums)"
  },
  {
    id: "makePi",
    name: "makePi",
    difficulty: "H",
    description: `Return an int array length 3 containing the first 3 digits of pi, {3, 1, 4}.

makePi() → [3, 1, 4]`,
    examples: [
      { input: "makePi()", output: "[3, 1, 4]" }
    ],
    functionSignature: "public int[] makePi()"
  },
  {
    id: "commonEnd",
    name: "commonEnd",
    difficulty: "H",
    description: `Given 2 arrays of ints, a and b, return true if they have the same first element or they have the same last element. Both arrays will be length 1 or more.

commonEnd([1, 2, 3], [7, 3]) → true
commonEnd([1, 2, 3], [7, 3, 2]) → false
commonEnd([1, 2, 3], [1, 3]) → true`,
    examples: [
      { input: "commonEnd([1, 2, 3], [7, 3])", output: "true" },
      { input: "commonEnd([1, 2, 3], [7, 3, 2])", output: "false" },
      { input: "commonEnd([1, 2, 3], [1, 3])", output: "true" }
    ],
    functionSignature: "public boolean commonEnd(int[] a, int[] b)"
  },
  {
    id: "sum3",
    name: "sum3",
    difficulty: "H",
    description: `Given an array of ints length 3, return the sum of all the elements.

sum3([1, 2, 3]) → 6
sum3([5, 11, 2]) → 18
sum3([7, 0, 0]) → 7`,
    examples: [
      { input: "sum3([1, 2, 3])", output: "6" },
      { input: "sum3([5, 11, 2])", output: "18" },
      { input: "sum3([7, 0, 0])", output: "7" }
    ],
    functionSignature: "public int sum3(int[] nums)"
  },
  {
    id: "rotateLeft3",
    name: "rotateLeft3",
    difficulty: "H",
    description: `Given an array of ints length 3, return an array with the elements "rotated left" so {1, 2, 3} yields {2, 3, 1}.

rotateLeft3([1, 2, 3]) → [2, 3, 1]
rotateLeft3([5, 11, 9]) → [11, 9, 5]
rotateLeft3([7, 0, 0]) → [0, 0, 7]`,
    examples: [
      { input: "rotateLeft3([1, 2, 3])", output: "[2, 3, 1]" },
      { input: "rotateLeft3([5, 11, 9])", output: "[11, 9, 5]" },
      { input: "rotateLeft3([7, 0, 0])", output: "[0, 0, 7]" }
    ],
    functionSignature: "public int[] rotateLeft3(int[] nums)"
  },
  {
    id: "reverse3",
    name: "reverse3",
    difficulty: "H",
    description: `Given an array of ints length 3, return a new array with the elements in reverse order, so {1, 2, 3} becomes {3, 2, 1}.

reverse3([1, 2, 3]) → [3, 2, 1]
reverse3([5, 11, 9]) → [9, 11, 5]
reverse3([7, 0, 0]) → [0, 0, 7]`,
    examples: [
      { input: "reverse3([1, 2, 3])", output: "[3, 2, 1]" },
      { input: "reverse3([5, 11, 9])", output: "[9, 11, 5]" },
      { input: "reverse3([7, 0, 0])", output: "[0, 0, 7]" }
    ],
    functionSignature: "public int[] reverse3(int[] nums)"
  },
  {
    id: "maxEnd3",
    name: "maxEnd3",
    difficulty: "H",
    description: `Given an array of ints length 3, figure out which is larger, the first or last element in the array, and set all the other elements to be that value. Return the changed array.

maxEnd3([1, 2, 3]) → [3, 3, 3]
maxEnd3([11, 5, 9]) → [11, 11, 11]
maxEnd3([2, 11, 3]) → [3, 3, 3]`,
    examples: [
      { input: "maxEnd3([1, 2, 3])", output: "[3, 3, 3]" },
      { input: "maxEnd3([11, 5, 9])", output: "[11, 11, 11]" },
      { input: "maxEnd3([2, 11, 3])", output: "[3, 3, 3]" }
    ],
    functionSignature: "public int[] maxEnd3(int[] nums)"
  },
  {
    id: "sum2",
    name: "sum2",
    difficulty: "H",
    description: `Given an array of ints, return the sum of the first 2 elements in the array. If the array length is less than 2, just sum up the elements that exist, returning 0 if the array is length 0.

sum2([1, 2, 3]) → 3
sum2([1, 1]) → 2
sum2([1, 1, 1, 1]) → 2`,
    examples: [
      { input: "sum2([1, 2, 3])", output: "3" },
      { input: "sum2([1, 1])", output: "2" },
      { input: "sum2([1, 1, 1, 1])", output: "2" }
    ],
    functionSignature: "public int sum2(int[] nums)"
  },
  {
    id: "middleWay",
    name: "middleWay",
    difficulty: "H",
    description: `Given 2 int arrays, a and b, each length 3, return a new array length 2 containing their middle elements.

middleWay([1, 2, 3], [4, 5, 6]) → [2, 5]
middleWay([7, 7, 7], [3, 8, 0]) → [7, 8]
middleWay([5, 2, 9], [1, 4, 5]) → [2, 4]`,
    examples: [
      { input: "middleWay([1, 2, 3], [4, 5, 6])", output: "[2, 5]" },
      { input: "middleWay([7, 7, 7], [3, 8, 0])", output: "[7, 8]" },
      { input: "middleWay([5, 2, 9], [1, 4, 5])", output: "[2, 4]" }
    ],
    functionSignature: "public int[] middleWay(int[] a, int[] b)"
  },
  {
    id: "makeEnds",
    name: "makeEnds",
    difficulty: "H",
    description: `Given an array of ints, return a new array length 2 containing the first and last elements from the original array. The original array will be length 1 or more.

makeEnds([1, 2, 3]) → [1, 3]
makeEnds([1, 2, 3, 4]) → [1, 4]
makeEnds([7, 4, 6, 2]) → [7, 2]`,
    examples: [
      { input: "makeEnds([1, 2, 3])", output: "[1, 3]" },
      { input: "makeEnds([1, 2, 3, 4])", output: "[1, 4]" },
      { input: "makeEnds([7, 4, 6, 2])", output: "[7, 2]" }
    ],
    functionSignature: "public int[] makeEnds(int[] nums)"
  },
  {
    id: "has23",
    name: "has23",
    difficulty: "H",
    description: `Given an int array length 2, return true if it contains a 2 or a 3.

has23([2, 5]) → true
has23([4, 3]) → true
has23([4, 5]) → false`,
    examples: [
      { input: "has23([2, 5])", output: "true" },
      { input: "has23([4, 3])", output: "true" },
      { input: "has23([4, 5])", output: "false" }
    ],
    functionSignature: "public boolean has23(int[] nums)"
  },
  {
    id: "no23",
    name: "no23",
    difficulty: "H",
    description: `Given an int array length 2, return true if it does not contain a 2 or 3.

no23([4, 5]) → true
no23([4, 2]) → false
no23([3, 5]) → false`,
    examples: [
      { input: "no23([4, 5])", output: "true" },
      { input: "no23([4, 2])", output: "false" },
      { input: "no23([3, 5])", output: "false" }
    ],
    functionSignature: "public boolean no23(int[] nums)"
  },
  {
    id: "makeLast",
    name: "makeLast",
    difficulty: "H",
    description: `Given an int array, return a new array with double the length where its last element is the same as the original array, and all the other elements are 0. The original array will be length 1 or more.

makeLast([4, 5, 6]) → [0, 0, 0, 0, 0, 6]
makeLast([1, 2]) → [0, 0, 0, 2]
makeLast([3]) → [0, 3]`,
    examples: [
      { input: "makeLast([4, 5, 6])", output: "[0, 0, 0, 0, 0, 6]" },
      { input: "makeLast([1, 2])", output: "[0, 0, 0, 2]" },
      { input: "makeLast([3])", output: "[0, 3]" }
    ],
    functionSignature: "public int[] makeLast(int[] nums)"
  },
  {
    id: "double23",
    name: "double23",
    difficulty: "H",
    description: `Given an int array, return true if the array contains 2 twice, or 3 twice. The array will be length 0, 1, or 2.

double23([2, 2]) → true
double23([3, 3]) → true
double23([2, 3]) → false`,
    examples: [
      { input: "double23([2, 2])", output: "true" },
      { input: "double23([3, 3])", output: "true" },
      { input: "double23([2, 3])", output: "false" }
    ],
    functionSignature: "public boolean double23(int[] nums)"
  },
  {
    id: "fix23",
    name: "fix23",
    difficulty: "H",
    description: `Given an int array length 3, if there is a 2 in the array immediately followed by a 3, set the 3 element to 0. Return the changed array.

fix23([1, 2, 3]) → [1, 2, 0]
fix23([2, 3, 5]) → [2, 0, 5]
fix23([1, 2, 1]) → [1, 2, 1]`,
    examples: [
      { input: "fix23([1, 2, 3])", output: "[1, 2, 0]" },
      { input: "fix23([2, 3, 5])", output: "[2, 0, 5]" },
      { input: "fix23([1, 2, 1])", output: "[1, 2, 1]" }
    ],
    functionSignature: "public int[] fix23(int[] nums)"
  },
  {
    id: "start1",
    name: "start1",
    difficulty: "H",
    description: `Start with 2 int arrays, a and b, of any length. Return how many of the arrays have 1 as their first element.

start1([1, 2, 3], [1, 3]) → 2
start1([7, 2, 3], [1]) → 1
start1([1, 2], []) → 1`,
    examples: [
      { input: "start1([1, 2, 3], [1, 3])", output: "2" },
      { input: "start1([7, 2, 3], [1])", output: "1" },
      { input: "start1([1, 2], [])", output: "1" }
    ],
    functionSignature: "public int start1(int[] a, int[] b)"
  },
  {
    id: "biggerTwo",
    name: "biggerTwo",
    difficulty: "H",
    description: `Start with 2 int arrays, a and b, each length 2. Consider the sum of the values in each array. Return the array which has the largest sum. In event of a tie, return a.

biggerTwo([1, 2], [3, 4]) → [3, 4]
biggerTwo([3, 4], [1, 2]) → [3, 4]
biggerTwo([1, 1], [1, 2]) → [1, 2]`,
    examples: [
      { input: "biggerTwo([1, 2], [3, 4])", output: "[3, 4]" },
      { input: "biggerTwo([3, 4], [1, 2])", output: "[3, 4]" },
      { input: "biggerTwo([1, 1], [1, 2])", output: "[1, 2]" }
    ],
    functionSignature: "public int[] biggerTwo(int[] a, int[] b)"
  },
  {
    id: "makeMiddle",
    name: "makeMiddle",
    difficulty: "H",
    description: `Given an array of ints of even length, return a new array length 2 containing the middle two elements from the original array. The original array will be length 2 or more.

makeMiddle([1, 2, 3, 4]) → [2, 3]
makeMiddle([7, 1, 2, 3, 4, 9]) → [2, 3]
makeMiddle([1, 2]) → [1, 2]`,
    examples: [
      { input: "makeMiddle([1, 2, 3, 4])", output: "[2, 3]" },
      { input: "makeMiddle([7, 1, 2, 3, 4, 9])", output: "[2, 3]" },
      { input: "makeMiddle([1, 2])", output: "[1, 2]" }
    ],
    functionSignature: "public int[] makeMiddle(int[] nums)"
  },
  {
    id: "plusTwo",
    name: "plusTwo",
    difficulty: "H",
    description: `Given 2 int arrays, each length 2, return a new array length 4 containing all their elements.

plusTwo([1, 2], [3, 4]) → [1, 2, 3, 4]
plusTwo([4, 4], [2, 2]) → [4, 4, 2, 2]
plusTwo([9, 2], [3, 4]) → [9, 2, 3, 4]`,
    examples: [
      { input: "plusTwo([1, 2], [3, 4])", output: "[1, 2, 3, 4]" },
      { input: "plusTwo([4, 4], [2, 2])", output: "[4, 4, 2, 2]" },
      { input: "plusTwo([9, 2], [3, 4])", output: "[9, 2, 3, 4]" }
    ],
    functionSignature: "public int[] plusTwo(int[] a, int[] b)"
  },
  {
    id: "swapEnds",
    name: "swapEnds",
    difficulty: "H",
    description: `Given an array of ints, swap the first and last elements in the array. Return the modified array. The array length will be at least 1.

swapEnds([1, 2, 3, 4]) → [4, 2, 3, 1]
swapEnds([1, 2, 3]) → [3, 2, 1]
swapEnds([8, 6, 7, 9, 5]) → [5, 6, 7, 9, 8]`,
    examples: [
      { input: "swapEnds([1, 2, 3, 4])", output: "[4, 2, 3, 1]" },
      { input: "swapEnds([1, 2, 3])", output: "[3, 2, 1]" },
      { input: "swapEnds([8, 6, 7, 9, 5])", output: "[5, 6, 7, 9, 8]" }
    ],
    functionSignature: "public int[] swapEnds(int[] nums)"
  },
  {
    id: "midThree",
    name: "midThree",
    difficulty: "H",
    description: `Given an array of ints of odd length, return a new array length 3 containing the elements from the middle of the array. The array length will be at least 3.

midThree([1, 2, 3, 4, 5]) → [2, 3, 4]
midThree([8, 6, 7, 5, 3, 0, 9]) → [7, 5, 3]
midThree([1, 2, 3]) → [1, 2, 3]`,
    examples: [
      { input: "midThree([1, 2, 3, 4, 5])", output: "[2, 3, 4]" },
      { input: "midThree([8, 6, 7, 5, 3, 0, 9])", output: "[7, 5, 3]" },
      { input: "midThree([1, 2, 3])", output: "[1, 2, 3]" }
    ],
    functionSignature: "public int[] midThree(int[] nums)"
  }
];

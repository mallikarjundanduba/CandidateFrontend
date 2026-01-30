// Functional-1 Questions
export const functional1Questions = [
  {
    id: "doubling",
    name: "doubling",
    difficulty: "H",
    description: `Given a list of integers, return a list where each integer is multiplied by 2.

doubling([1, 2, 3]) → [2, 4, 6]
doubling([6, 8, 6, 8, -1]) → [12, 16, 12, 16, -2]
doubling([]) → []`,
    examples: [
      { input: "doubling([1, 2, 3])", output: "[2, 4, 6]" },
      { input: "doubling([6, 8, 6, 8, -1])", output: "[12, 16, 12, 16, -2]" },
      { input: "doubling([])", output: "[]" }
    ],
    functionSignature: "public List<Integer> doubling(List<Integer> nums)"
  },
  {
    id: "square",
    name: "square",
    difficulty: "H",
    description: `Given a list of integers, return a list where each integer is multiplied with itself.

square([1, 2, 3]) → [1, 4, 9]
square([6, 8, -6, -8, 1]) → [36, 64, 36, 64, 1]
square([]) → []`,
    examples: [
      { input: "square([1, 2, 3])", output: "[1, 4, 9]" },
      { input: "square([6, 8, -6, -8, 1])", output: "[36, 64, 36, 64, 1]" },
      { input: "square([])", output: "[]" }
    ],
    functionSignature: "public List<Integer> square(List<Integer> nums)"
  },
  {
    id: "addStar",
    name: "addStar",
    difficulty: "H",
    description: `Given a list of strings, return a list where each string has "*" added at its end.

addStar(["a", "bb", "ccc"]) → ["a*", "bb*", "ccc*"]
addStar(["hello", "there"]) → ["hello*", "there*"]
addStar(["*"]) → ["**"]`,
    examples: [
      { input: 'addStar(["a", "bb", "ccc"])', output: '["a*", "bb*", "ccc*"]' },
      { input: 'addStar(["hello", "there"])', output: '["hello*", "there*"]' },
      { input: 'addStar(["*"])', output: '["**"]' }
    ],
    functionSignature: "public List<String> addStar(List<String> strings)"
  },
  {
    id: "copies3",
    name: "copies3",
    difficulty: "H",
    description: `Given a list of strings, return a list where each string is replaced by 3 copies of itself concatenated together.

copies3(["a", "bb", "ccc"]) → ["aaa", "bbbbbb", "ccccccccc"]
copies3(["24", "a", ""]) → ["242424", "aaa", ""]
copies3(["hello", "there"]) → ["hellohellohello", "theretherethere"]`,
    examples: [
      { input: 'copies3(["a", "bb", "ccc"])', output: '["aaa", "bbbbbb", "ccccccccc"]' },
      { input: 'copies3(["24", "a", ""])', output: '["242424", "aaa", ""]' },
      { input: 'copies3(["hello", "there"])', output: '["hellohellohello", "theretherethere"]' }
    ],
    functionSignature: "public List<String> copies3(List<String> strings)"
  },
  {
    id: "moreY",
    name: "moreY",
    difficulty: "H",
    description: `Given a list of strings, return a list where each string has "y" added at its start and end.

moreY(["a", "b", "c"]) → ["yay", "yby", "ycy"]
moreY(["hello", "there"]) → ["yhelloy", "ytherey"]
moreY(["yay"]) → ["yyayy"]`,
    examples: [
      { input: 'moreY(["a", "b", "c"])', output: '["yay", "yby", "ycy"]' },
      { input: 'moreY(["hello", "there"])', output: '["yhelloy", "ytherey"]' },
      { input: 'moreY(["yay"])', output: '["yyayy"]' }
    ],
    functionSignature: "public List<String> moreY(List<String> strings)"
  },
  {
    id: "math1",
    name: "math1",
    difficulty: "H",
    description: `Given a list of integers, return a list where each integer is added to 1 and the result is multiplied by 10.

math1([1, 2, 3]) → [20, 30, 40]
math1([6, 8, 6, 8, 1]) → [70, 90, 70, 90, 20]
math1([10]) → [110]`,
    examples: [
      { input: "math1([1, 2, 3])", output: "[20, 30, 40]" },
      { input: "math1([6, 8, 6, 8, 1])", output: "[70, 90, 70, 90, 20]" },
      { input: "math1([10])", output: "[110]" }
    ],
    functionSignature: "public List<Integer> math1(List<Integer> nums)"
  },
  {
    id: "rightDigit",
    name: "rightDigit",
    difficulty: "H",
    description: `Given a list of non-negative integers, return an integer list of the rightmost digits.

rightDigit([1, 22, 93]) → [1, 2, 3]
rightDigit([16, 8, 886, 8, 1]) → [6, 8, 6, 8, 1]
rightDigit([10, 0]) → [0, 0]`,
    examples: [
      { input: "rightDigit([1, 22, 93])", output: "[1, 2, 3]" },
      { input: "rightDigit([16, 8, 886, 8, 1])", output: "[6, 8, 6, 8, 1]" },
      { input: "rightDigit([10, 0])", output: "[0, 0]" }
    ],
    functionSignature: "public List<Integer> rightDigit(List<Integer> nums)"
  },
  {
    id: "lower",
    name: "lower",
    difficulty: "H",
    description: `Given a list of strings, return a list where each string is converted to lower case.

lower(["Hello", "Hi"]) → ["hello", "hi"]
lower(["AAA", "BBB", "ccc"]) → ["aaa", "bbb", "ccc"]
lower(["KitteN", "ChocolaTE"]) → ["kitten", "chocolate"]`,
    examples: [
      { input: 'lower(["Hello", "Hi"])', output: '["hello", "hi"]' },
      { input: 'lower(["AAA", "BBB", "ccc"])', output: '["aaa", "bbb", "ccc"]' },
      { input: 'lower(["KitteN", "ChocolaTE"])', output: '["kitten", "chocolate"]' }
    ],
    functionSignature: "public List<String> lower(List<String> strings)"
  },
  {
    id: "noX",
    name: "noX",
    difficulty: "H",
    description: `Given a list of strings, return a list where each string has all its "x" removed.

noX(["ax", "bb", "cx"]) → ["a", "bb", "c"]
noX(["xxax", "xbxbx", "xxcx"]) → ["a", "bb", "c"]
noX(["x"]) → [""]`,
    examples: [
      { input: 'noX(["ax", "bb", "cx"])', output: '["a", "bb", "c"]' },
      { input: 'noX(["xxax", "xbxbx", "xxcx"])', output: '["a", "bb", "c"]' },
      { input: 'noX(["x"])', output: '[""]' }
    ],
    functionSignature: "public List<String> noX(List<String> strings)"
  },
  {
    id: "noNeg",
    name: "noNeg",
    difficulty: "H",
    description: `Given a list of integers, return a list of the integers, omitting any that are less than 0.

noNeg([1, -2]) → [1]
noNeg([-3, -3, 3, 3]) → [3, 3]
noNeg([-1, -1, -1]) → []`,
    examples: [
      { input: "noNeg([1, -2])", output: "[1]" },
      { input: "noNeg([-3, -3, 3, 3])", output: "[3, 3]" },
      { input: "noNeg([-1, -1, -1])", output: "[]" }
    ],
    functionSignature: "public List<Integer> noNeg(List<Integer> nums)"
  },
  {
    id: "no9",
    name: "no9",
    difficulty: "H",
    description: `Given a list of non-negative integers, return a list of those numbers except omitting any that end with 9.

no9([1, 2, 19]) → [1, 2]
no9([9, 19, 29, 3]) → [3]
no9([1, 2, 3]) → [1, 2, 3]`,
    examples: [
      { input: "no9([1, 2, 19])", output: "[1, 2]" },
      { input: "no9([9, 19, 29, 3])", output: "[3]" },
      { input: "no9([1, 2, 3])", output: "[1, 2, 3]" }
    ],
    functionSignature: "public List<Integer> no9(List<Integer> nums)"
  },
  {
    id: "noTeen",
    name: "noTeen",
    difficulty: "H",
    description: `Given a list of integers, return a list of those numbers, omitting any that are between 13 and 19 inclusive.

noTeen([12, 13, 19, 20]) → [12, 20]
noTeen([1, 14, 1]) → [1, 1]
noTeen([15]) → []`,
    examples: [
      { input: "noTeen([12, 13, 19, 20])", output: "[12, 20]" },
      { input: "noTeen([1, 14, 1])", output: "[1, 1]" },
      { input: "noTeen([15])", output: "[]" }
    ],
    functionSignature: "public List<Integer> noTeen(List<Integer> nums)"
  },
  {
    id: "noLong",
    name: "noLong",
    difficulty: "H",
    description: `Given a list of strings, return a list of the strings, omitting any string length 4 or more.

noLong(["this", "not", "too", "long"]) → ["not", "too"]
noLong(["a", "bbb", "cccc"]) → ["a", "bbb"]
noLong(["cccc", "cccc", "cccc"]) → []`,
    examples: [
      { input: 'noLong(["this", "not", "too", "long"])', output: '["not", "too"]' },
      { input: 'noLong(["a", "bbb", "cccc"])', output: '["a", "bbb"]' },
      { input: 'noLong(["cccc", "cccc", "cccc"])', output: "[]" }
    ],
    functionSignature: "public List<String> noLong(List<String> strings)"
  },
  {
    id: "noZ",
    name: "noZ",
    difficulty: "H",
    description: `Given a list of strings, return a list of the strings, omitting any string that contains a "z".

noZ(["aaa", "bbb", "aza"]) → ["aaa", "bbb"]
noZ(["hziz", "hzello", "hi"]) → ["hi"]
noZ(["hello", "howz", "are", "youz"]) → ["hello", "are"]`,
    examples: [
      { input: 'noZ(["aaa", "bbb", "aza"])', output: '["aaa", "bbb"]' },
      { input: 'noZ(["hziz", "hzello", "hi"])', output: '["hi"]' },
      { input: 'noZ(["hello", "howz", "are", "youz"])', output: '["hello", "are"]' }
    ],
    functionSignature: "public List<String> noZ(List<String> strings)"
  },
  {
    id: "no34",
    name: "no34",
    difficulty: "H",
    description: `Given a list of strings, return a list where each string has its length changed to 0, 1, 2, or 3 chars.

no34(["a", "bb", "ccc"]) → ["a", "bb", "ccc"]
no34(["a", "bb", "ccc", "dddd"]) → ["a", "bb", "ccc", ""]
no34(["hello", "there"]) → ["", ""]`,
    examples: [
      { input: 'no34(["a", "bb", "ccc"])', output: '["a", "bb", "ccc"]' },
      { input: 'no34(["a", "bb", "ccc", "dddd"])', output: '["a", "bb", "ccc", ""]' },
      { input: 'no34(["hello", "there"])', output: '["", ""]' }
    ],
    functionSignature: "public List<String> no34(List<String> strings)"
  },
  {
    id: "noYY",
    name: "noYY",
    difficulty: "H",
    description: `Given a list of strings, return a list where each string has "y" added at its end, omitting any resulting strings that contain "yy" as a substring anywhere.

noYY(["a", "b", "c"]) → ["ay", "by", "cy"]
noYY(["a", "b", "cy"]) → ["ay", "by"]
noYY(["xx", "ya", "zz"]) → ["xxy", "zzy"]`,
    examples: [
      { input: 'noYY(["a", "b", "c"])', output: '["ay", "by", "cy"]' },
      { input: 'noYY(["a", "b", "cy"])', output: '["ay", "by"]' },
      { input: 'noYY(["xx", "ya", "zz"])', output: '["xxy", "zzy"]' }
    ],
    functionSignature: "public List<String> noYY(List<String> strings)"
  },
  {
    id: "two2",
    name: "two2",
    difficulty: "H",
    description: `Given a list of non-negative integers, return a list of those numbers multiplied by 2, omitting any of the resulting numbers that end in 2.

two2([1, 2, 3]) → [4, 6]
two2([2, 6, 11]) → [4]
two2([0]) → [0]`,
    examples: [
      { input: "two2([1, 2, 3])", output: "[4, 6]" },
      { input: "two2([2, 6, 11])", output: "[4]" },
      { input: "two2([0])", output: "[0]" }
    ],
    functionSignature: "public List<Integer> two2(List<Integer> nums)"
  },
  {
    id: "square56",
    name: "square56",
    difficulty: "H",
    description: `Given a list of integers, return a list of those numbers squared and the product added to 10, omitting any of the resulting numbers that end in 5 or 6.

square56([3, 1, 4]) → [19, 11]
square56([1]) → [11]
square56([2]) → [14]`,
    examples: [
      { input: "square56([3, 1, 4])", output: "[19, 11]" },
      { input: "square56([1])", output: "[11]" },
      { input: "square56([2])", output: "[14]" }
    ],
    functionSignature: "public List<Integer> square56(List<Integer> nums)"
  },
  {
    id: "celsiusToFahrenheit",
    name: "celsiusToFahrenheit",
    difficulty: "H",
    description: `Given a list of integers representing temperatures in Celsius, return a list with each temperature converted to Fahrenheit (F = C * 9/5 + 32).

celsiusToFahrenheit([0, 100]) → [32, 212]
celsiusToFahrenheit([-40, 25]) → [-40, 77]
celsiusToFahrenheit([37]) → [98]`,
    examples: [
      { input: "celsiusToFahrenheit([0, 100])", output: "[32, 212]" },
      { input: "celsiusToFahrenheit([-40, 25])", output: "[-40, 77]" },
      { input: "celsiusToFahrenheit([37])", output: "[98]" }
    ],
    functionSignature: "public List<Integer> celsiusToFahrenheit(List<Integer> celsius)"
  },
  {
    id: "stringLengths",
    name: "stringLengths",
    difficulty: "H",
    description: `Given a list of strings, return a list of integers representing the length of each string.

stringLengths(["hello", "world"]) → [5, 5]
stringLengths(["a", "bb", "ccc"]) → [1, 2, 3]
stringLengths([]) → []`,
    examples: [
      { input: 'stringLengths(["hello", "world"])', output: "[5, 5]" },
      { input: 'stringLengths(["a", "bb", "ccc"])', output: "[1, 2, 3]" },
      { input: "stringLengths([])", output: "[]" }
    ],
    functionSignature: "public List<Integer> stringLengths(List<String> strings)"
  },
  {
    id: "capitalize",
    name: "capitalize",
    difficulty: "H",
    description: `Given a list of strings, return a list where each string has its first letter capitalized.

capitalize(["hello", "world"]) → ["Hello", "World"]
capitalize(["a", "bb", "ccc"]) → ["A", "Bb", "Ccc"]
capitalize(["apple", "banana"]) → ["Apple", "Banana"]`,
    examples: [
      { input: 'capitalize(["hello", "world"])', output: '["Hello", "World"]' },
      { input: 'capitalize(["a", "bb", "ccc"])', output: '["A", "Bb", "Ccc"]' },
      { input: 'capitalize(["apple", "banana"])', output: '["Apple", "Banana"]' }
    ],
    functionSignature: "public List<String> capitalize(List<String> strings)"
  }
];

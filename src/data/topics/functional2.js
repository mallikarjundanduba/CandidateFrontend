// Functional-2 Questions
export const functional2Questions = [
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
    id: "evenOdd",
    name: "evenOdd",
    difficulty: "H",
    description: `Given a list of integers, return a list of the integers, omitting any that are even and less than 0.

evenOdd([1, -2, 3, -4]) → [1, 3, -4]
evenOdd([2, 4, 6]) → [2, 4, 6]
evenOdd([-1, -3, -5]) → [-1, -3, -5]`,
    examples: [
      { input: "evenOdd([1, -2, 3, -4])", output: "[1, 3, -4]" },
      { input: "evenOdd([2, 4, 6])", output: "[2, 4, 6]" },
      { input: "evenOdd([-1, -3, -5])", output: "[-1, -3, -5]" }
    ],
    functionSignature: "public List<Integer> evenOdd(List<Integer> nums)"
  },
  {
    id: "filterStrings",
    name: "filterStrings",
    difficulty: "H",
    description: `Given a list of strings, return a list where each string has all its "x" removed.

filterStrings(["ax", "bb", "cx"]) → ["a", "bb", "c"]
filterStrings(["xxax", "xbxbx", "xxcx"]) → ["a", "bb", "c"]
filterStrings(["x"]) → [""]`,
    examples: [
      { input: 'filterStrings(["ax", "bb", "cx"])', output: '["a", "bb", "c"]' },
      { input: 'filterStrings(["xxax", "xbxbx", "xxcx"])', output: '["a", "bb", "c"]' },
      { input: 'filterStrings(["x"])', output: '[""]' }
    ],
    functionSignature: "public List<String> filterStrings(List<String> strings)"
  },
  {
    id: "mapToLength",
    name: "mapToLength",
    difficulty: "H",
    description: `Given a list of strings, return a list of integers representing the length of each string.

mapToLength(["hello", "world"]) → [5, 5]
mapToLength(["a", "bb", "ccc"]) → [1, 2, 3]
mapToLength([]) → []`,
    examples: [
      { input: 'mapToLength(["hello", "world"])', output: "[5, 5]" },
      { input: 'mapToLength(["a", "bb", "ccc"])', output: "[1, 2, 3]" },
      { input: "mapToLength([])", output: "[]" }
    ],
    functionSignature: "public List<Integer> mapToLength(List<String> strings)"
  },
  {
    id: "mapToString",
    name: "mapToString",
    difficulty: "H",
    description: `Given a list of integers, return a list of strings representing each integer.

mapToString([1, 2, 3]) → ["1", "2", "3"]
mapToString([10, 20]) → ["10", "20"]
mapToString([]) → []`,
    examples: [
      { input: "mapToString([1, 2, 3])", output: '["1", "2", "3"]' },
      { input: "mapToString([10, 20])", output: '["10", "20"]' },
      { input: "mapToString([])", output: "[]" }
    ],
    functionSignature: "public List<String> mapToString(List<Integer> nums)"
  },
  {
    id: "filterAndMap",
    name: "filterAndMap",
    difficulty: "H",
    description: `Given a list of integers, return a list where each integer is doubled, omitting any that are negative.

filterAndMap([1, -2, 3]) → [2, 6]
filterAndMap([-1, -2, -3]) → []
filterAndMap([2, 4, 6]) → [4, 8, 12]`,
    examples: [
      { input: "filterAndMap([1, -2, 3])", output: "[2, 6]" },
      { input: "filterAndMap([-1, -2, -3])", output: "[]" },
      { input: "filterAndMap([2, 4, 6])", output: "[4, 8, 12]" }
    ],
    functionSignature: "public List<Integer> filterAndMap(List<Integer> nums)"
  },
  {
    id: "filterAndSquare",
    name: "filterAndSquare",
    difficulty: "H",
    description: `Given a list of integers, return a list where each integer is squared, omitting any that are less than 10.

filterAndSquare([3, 4, 5]) → [16, 25]
filterAndSquare([1, 2, 3]) → []
filterAndSquare([10, 20]) → [100, 400]`,
    examples: [
      { input: "filterAndSquare([3, 4, 5])", output: "[16, 25]" },
      { input: "filterAndSquare([1, 2, 3])", output: "[]" },
      { input: "filterAndSquare([10, 20])", output: "[100, 400]" }
    ],
    functionSignature: "public List<Integer> filterAndSquare(List<Integer> nums)"
  },
  {
    id: "mapAndFilter",
    name: "mapAndFilter",
    difficulty: "H",
    description: `Given a list of strings, return a list where each string has "!" added at its end, omitting any strings longer than 3 characters.

mapAndFilter(["a", "bb", "ccc"]) → ["a!", "bb!", "ccc!"]
mapAndFilter(["hello", "hi"]) → ["hi!"]
mapAndFilter(["a"]) → ["a!"]`,
    examples: [
      { input: 'mapAndFilter(["a", "bb", "ccc"])', output: '["a!", "bb!", "ccc!"]' },
      { input: 'mapAndFilter(["hello", "hi"])', output: '["hi!"]' },
      { input: 'mapAndFilter(["a"])', output: '["a!"]' }
    ],
    functionSignature: "public List<String> mapAndFilter(List<String> strings)"
  },
  {
    id: "filterAndCapitalize",
    name: "filterAndCapitalize",
    difficulty: "H",
    description: `Given a list of strings, return a list where each string has its first letter capitalized, omitting any strings that start with "x".

filterAndCapitalize(["apple", "xray", "banana"]) → ["Apple", "Banana"]
filterAndCapitalize(["x", "y", "z"]) → ["Y", "Z"]
filterAndCapitalize(["hello", "world"]) → ["Hello", "World"]`,
    examples: [
      { input: 'filterAndCapitalize(["apple", "xray", "banana"])', output: '["Apple", "Banana"]' },
      { input: 'filterAndCapitalize(["x", "y", "z"])', output: '["Y", "Z"]' },
      { input: 'filterAndCapitalize(["hello", "world"])', output: '["Hello", "World"]' }
    ],
    functionSignature: "public List<String> filterAndCapitalize(List<String> strings)"
  },
  {
    id: "mapAndDouble",
    name: "mapAndDouble",
    difficulty: "H",
    description: `Given a list of integers, return a list where each integer is multiplied by 2, omitting any that are greater than 100.

mapAndDouble([1, 50, 60]) → [2, 100, 120]
mapAndDouble([100, 200]) → [200]
mapAndDouble([1, 2, 3]) → [2, 4, 6]`,
    examples: [
      { input: "mapAndDouble([1, 50, 60])", output: "[2, 100, 120]" },
      { input: "mapAndDouble([100, 200])", output: "[200]" },
      { input: "mapAndDouble([1, 2, 3])", output: "[2, 4, 6]" }
    ],
    functionSignature: "public List<Integer> mapAndDouble(List<Integer> nums)"
  },
  {
    id: "filterAndAdd",
    name: "filterAndAdd",
    difficulty: "H",
    description: `Given a list of integers, return a list where each integer has 10 added to it, omitting any that are less than 0.

filterAndAdd([1, -2, 3]) → [11, 13]
filterAndAdd([-1, -2]) → []
filterAndAdd([10, 20]) → [20, 30]`,
    examples: [
      { input: "filterAndAdd([1, -2, 3])", output: "[11, 13]" },
      { input: "filterAndAdd([-1, -2])", output: "[]" },
      { input: "filterAndAdd([10, 20])", output: "[20, 30]" }
    ],
    functionSignature: "public List<Integer> filterAndAdd(List<Integer> nums)"
  },
  {
    id: "mapAndReverse",
    name: "mapAndReverse",
    difficulty: "H",
    description: `Given a list of strings, return a list where each string is reversed, omitting any strings that are empty.

mapAndReverse(["hello", "", "world"]) → ["olleh", "dlrow"]
mapAndReverse(["a", "bb"]) → ["a", "bb"]
mapAndReverse([]) → []`,
    examples: [
      { input: 'mapAndReverse(["hello", "", "world"])', output: '["olleh", "dlrow"]' },
      { input: 'mapAndReverse(["a", "bb"])', output: '["a", "bb"]' },
      { input: "mapAndReverse([])", output: "[]" }
    ],
    functionSignature: "public List<String> mapAndReverse(List<String> strings)"
  },
  {
    id: "filterAndTransform",
    name: "filterAndTransform",
    difficulty: "H",
    description: `Given a list of strings, return a list where each string is converted to uppercase, omitting any that contain "x".

filterAndTransform(["apple", "banana", "xray"]) → ["APPLE", "BANANA"]
filterAndTransform(["hello", "world"]) → ["HELLO", "WORLD"]
filterAndTransform(["x", "y", "z"]) → ["Y", "Z"]`,
    examples: [
      { input: 'filterAndTransform(["apple", "banana", "xray"])', output: '["APPLE", "BANANA"]' },
      { input: 'filterAndTransform(["hello", "world"])', output: '["HELLO", "WORLD"]' },
      { input: 'filterAndTransform(["x", "y", "z"])', output: '["Y", "Z"]' }
    ],
    functionSignature: "public List<String> filterAndTransform(List<String> strings)"
  }
];

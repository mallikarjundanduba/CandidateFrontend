// AP-1 Questions
export const ap1Questions = [
  {
    id: "scoresIncreasing",
    name: "scoresIncreasing",
    difficulty: "H",
    description: `Given an array of scores, return true if each score is equal or greater than the one before. The array will be length 2 or more.

scoresIncreasing([1, 3, 4]) → true
scoresIncreasing([1, 3, 2]) → false
scoresIncreasing([1, 1, 4]) → true`,
    examples: [
      { input: "scoresIncreasing([1, 3, 4])", output: "true" },
      { input: "scoresIncreasing([1, 3, 2])", output: "false" },
      { input: "scoresIncreasing([1, 1, 4])", output: "true" }
    ],
    functionSignature: "public boolean scoresIncreasing(int[] scores)"
  },
  {
    id: "scores100",
    name: "scores100",
    difficulty: "H",
    description: `Given an array of scores, return true if there are scores of 100 next to each other in the array. The array length will be at least 2.

scores100([1, 100, 100]) → true
scores100([1, 100, 99, 100]) → false
scores100([100, 1, 100, 100]) → true`,
    examples: [
      { input: "scores100([1, 100, 100])", output: "true" },
      { input: "scores100([1, 100, 99, 100])", output: "false" },
      { input: "scores100([100, 1, 100, 100])", output: "true" }
    ],
    functionSignature: "public boolean scores100(int[] scores)"
  },
  {
    id: "scoresClump",
    name: "scoresClump",
    difficulty: "H",
    description: `Given an array of scores sorted in increasing order, return true if the array contains 3 adjacent scores that differ from each other by at most 2.

scoresClump([3, 4, 5]) → true
scoresClump([3, 4, 6]) → false
scoresClump([1, 3, 5, 5]) → true`,
    examples: [
      { input: "scoresClump([3, 4, 5])", output: "true" },
      { input: "scoresClump([3, 4, 6])", output: "false" },
      { input: "scoresClump([1, 3, 5, 5])", output: "true" }
    ],
    functionSignature: "public boolean scoresClump(int[] scores)"
  },
  {
    id: "scoresAverage",
    name: "scoresAverage",
    difficulty: "H",
    description: `Given an array of scores, compute the int average of the first half and the second half, and return whichever is larger. We'll say that the second half begins at index length/2.

scoresAverage([2, 2, 4, 4]) → 4
scoresAverage([4, 4, 4, 2, 2, 2]) → 4
scoresAverage([3, 4, 5, 1, 2, 3]) → 4`,
    examples: [
      { input: "scoresAverage([2, 2, 4, 4])", output: "4" },
      { input: "scoresAverage([4, 4, 4, 2, 2, 2])", output: "4" },
      { input: "scoresAverage([3, 4, 5, 1, 2, 3])", output: "4" }
    ],
    functionSignature: "public int scoresAverage(int[] scores)"
  },
  {
    id: "wordsCount",
    name: "wordsCount",
    difficulty: "H",
    description: `Given an array of strings, return the count of the number of strings with the given length.

wordsCount(["a", "bb", "b", "ccc"], 1) → 2
wordsCount(["a", "bb", "b", "ccc"], 3) → 1
wordsCount(["a", "bb", "b", "ccc"], 4) → 0`,
    examples: [
      { input: 'wordsCount(["a", "bb", "b", "ccc"], 1)', output: "2" },
      { input: 'wordsCount(["a", "bb", "b", "ccc"], 3)', output: "1" },
      { input: 'wordsCount(["a", "bb", "b", "ccc"], 4)', output: "0" }
    ],
    functionSignature: "public int wordsCount(String[] words, int len)"
  },
  {
    id: "wordsFront",
    name: "wordsFront",
    difficulty: "H",
    description: `Given an array of strings, return a new array containing the first N strings. N will be in the range 1..length.

wordsFront(["a", "b", "c", "d"], 1) → ["a"]
wordsFront(["a", "b", "c", "d"], 2) → ["a", "b"]
wordsFront(["a", "b", "c", "d"], 3) → ["a", "b", "c"]`,
    examples: [
      { input: 'wordsFront(["a", "b", "c", "d"], 1)', output: '["a"]' },
      { input: 'wordsFront(["a", "b", "c", "d"], 2)', output: '["a", "b"]' },
      { input: 'wordsFront(["a", "b", "c", "d"], 3)', output: '["a", "b", "c"]' }
    ],
    functionSignature: "public String[] wordsFront(String[] words, int n)"
  },
  {
    id: "wordsWithoutList",
    name: "wordsWithoutList",
    difficulty: "H",
    description: `Given an array of strings, return a new List (e.g. an ArrayList) where all the strings of the given length are omitted.

wordsWithoutList(["a", "bb", "b", "ccc"], 1) → ["bb", "ccc"]
wordsWithoutList(["a", "bb", "b", "ccc"], 3) → ["a", "bb", "b"]
wordsWithoutList(["a", "bb", "b", "ccc"], 4) → ["a", "bb", "b", "ccc"]`,
    examples: [
      { input: 'wordsWithoutList(["a", "bb", "b", "ccc"], 1)', output: '["bb", "ccc"]' },
      { input: 'wordsWithoutList(["a", "bb", "b", "ccc"], 3)', output: '["a", "bb", "b"]' },
      { input: 'wordsWithoutList(["a", "bb", "b", "ccc"], 4)', output: '["a", "bb", "b", "ccc"]' }
    ],
    functionSignature: "public List<String> wordsWithoutList(String[] words, int len)"
  },
  {
    id: "hasOne",
    name: "hasOne",
    difficulty: "H",
    description: `Given a positive int n, return true if it contains a 1 digit.

hasOne(10) → true
hasOne(22) → false
hasOne(220) → false`,
    examples: [
      { input: "hasOne(10)", output: "true" },
      { input: "hasOne(22)", output: "false" },
      { input: "hasOne(220)", output: "false" }
    ],
    functionSignature: "public boolean hasOne(int n)"
  },
  {
    id: "dividesSelf",
    name: "dividesSelf",
    difficulty: "H",
    description: `We'll say that a positive int divides itself if every digit in the number divides into the number evenly.

dividesSelf(128) → true
dividesSelf(12) → true
dividesSelf(120) → false`,
    examples: [
      { input: "dividesSelf(128)", output: "true" },
      { input: "dividesSelf(12)", output: "true" },
      { input: "dividesSelf(120)", output: "false" }
    ],
    functionSignature: "public boolean dividesSelf(int n)"
  },
  {
    id: "copyEvens",
    name: "copyEvens",
    difficulty: "H",
    description: `Given an array of positive ints, return a new array of length "count" containing the first even numbers from the original array.

copyEvens([3, 2, 4, 5, 8], 2) → [2, 4]
copyEvens([3, 2, 4, 5, 8], 3) → [2, 4, 8]
copyEvens([6, 1, 2, 4, 5, 8], 3) → [6, 2, 4]`,
    examples: [
      { input: "copyEvens([3, 2, 4, 5, 8], 2)", output: "[2, 4]" },
      { input: "copyEvens([3, 2, 4, 5, 8], 3)", output: "[2, 4, 8]" },
      { input: "copyEvens([6, 1, 2, 4, 5, 8], 3)", output: "[6, 2, 4]" }
    ],
    functionSignature: "public int[] copyEvens(int[] nums, int count)"
  },
  {
    id: "copyEndy",
    name: "copyEndy",
    difficulty: "H",
    description: `We'll say that a positive int n is "endy" if it is in the range 0..10 or 90..100 (inclusive). Given an array of positive ints, return a new array of length "count" containing the first endy numbers from the original array.

copyEndy([9, 11, 90, 22, 6], 2) → [9, 90]
copyEndy([9, 11, 90, 22, 6], 3) → [9, 90, 6]
copyEndy([12, 1, 1, 13, 0, 20], 2) → [1, 1]`,
    examples: [
      { input: "copyEndy([9, 11, 90, 22, 6], 2)", output: "[9, 90]" },
      { input: "copyEndy([9, 11, 90, 22, 6], 3)", output: "[9, 90, 6]" },
      { input: "copyEndy([12, 1, 1, 13, 0, 20], 2)", output: "[1, 1]" }
    ],
    functionSignature: "public int[] copyEndy(int[] nums, int count)"
  },
  {
    id: "matchUp",
    name: "matchUp",
    difficulty: "H",
    description: `Given 2 arrays that are the same length containing strings, compare the 1st string in the first array with the 1st string in the second array, the 2nd with the 2nd and so on. Count the number of times that the 2 strings are non-empty and start with the same char.

matchUp(["aa", "bb", "cc"], ["aaa", "xx", "bb"]) → 1
matchUp(["aa", "bb", "cc"], ["aaa", "b", "bb"]) → 2
matchUp(["aa", "bb", "cc"], ["", "", "ccc"]) → 1`,
    examples: [
      { input: 'matchUp(["aa", "bb", "cc"], ["aaa", "xx", "bb"])', output: "1" },
      { input: 'matchUp(["aa", "bb", "cc"], ["aaa", "b", "bb"])', output: "2" },
      { input: 'matchUp(["aa", "bb", "cc"], ["", "", "ccc"])', output: "1" }
    ],
    functionSignature: "public int matchUp(String[] a, String[] b)"
  },
  {
    id: "scoreUp",
    name: "scoreUp",
    difficulty: "H",
    description: `The "key" array is an array containing the correct answers to an exam, like {"a", "a", "b", "b"}. The "answers" array contains a student's answers, with "?" representing a question left blank. The two arrays are not empty and are the same length.

scoreUp(["a", "a", "b", "b"], ["a", "c", "b", "c"]) → 6
scoreUp(["a", "a", "b", "b"], ["a", "a", "b", "c"]) → 11
scoreUp(["a", "a", "b", "b"], ["a", "a", "b", "b"]) → 16`,
    examples: [
      { input: 'scoreUp(["a", "a", "b", "b"], ["a", "c", "b", "c"])', output: "6" },
      { input: 'scoreUp(["a", "a", "b", "b"], ["a", "a", "b", "c"])', output: "11" },
      { input: 'scoreUp(["a", "a", "b", "b"], ["a", "a", "b", "b"])', output: "16" }
    ],
    functionSignature: "public int scoreUp(String[] key, String[] answers)"
  },
  {
    id: "wordsWithout",
    name: "wordsWithout",
    difficulty: "H",
    description: `Given an array of strings, return a new array without the strings that are equal to the target string.

wordsWithout(["a", "b", "c", "a"], "a") → ["b", "c"]
wordsWithout(["a", "b", "c", "a"], "b") → ["a", "c", "a"]
wordsWithout(["a", "b", "c"], "z") → ["a", "b", "c"]`,
    examples: [
      { input: 'wordsWithout(["a", "b", "c", "a"], "a")', output: '["b", "c"]' },
      { input: 'wordsWithout(["a", "b", "c", "a"], "b")', output: '["a", "c", "a"]' },
      { input: 'wordsWithout(["a", "b", "c"], "z")', output: '["a", "b", "c"]' }
    ],
    functionSignature: "public String[] wordsWithout(String[] words, String target)"
  },
  {
    id: "scoresSpecial",
    name: "scoresSpecial",
    difficulty: "H",
    description: `Given two arrays, A and B, of non-negative int scores. A "special" score is one which is a multiple of 10, such as 40 or 90. Return the sum of largest special score in A and the largest special score in B.

scoresSpecial([12, 10, 4], [2, 20, 30]) → 40
scoresSpecial([20, 10, 4], [2, 20, 10]) → 40
scoresSpecial([12, 11, 4], [2, 20, 31]) → 20`,
    examples: [
      { input: "scoresSpecial([12, 10, 4], [2, 20, 30])", output: "40" },
      { input: "scoresSpecial([20, 10, 4], [2, 20, 10])", output: "40" },
      { input: "scoresSpecial([12, 11, 4], [2, 20, 31])", output: "20" }
    ],
    functionSignature: "public int scoresSpecial(int[] a, int[] b)"
  },
  {
    id: "sumHeights",
    name: "sumHeights",
    difficulty: "H",
    description: `We have an array of heights, representing the altitude along a walking trail. Given start/end indexes into the array, return the sum of the changes for a walk beginning at the start index and ending at the end index.

sumHeights([5, 3, 6, 7, 2], 2, 4) → 6
sumHeights([5, 3, 6, 7, 2], 0, 1) → 2
sumHeights([5, 3, 6, 7, 2], 0, 4) → 11`,
    examples: [
      { input: "sumHeights([5, 3, 6, 7, 2], 2, 4)", output: "6" },
      { input: "sumHeights([5, 3, 6, 7, 2], 0, 1)", output: "2" },
      { input: "sumHeights([5, 3, 6, 7, 2], 0, 4)", output: "11" }
    ],
    functionSignature: "public int sumHeights(int[] heights, int start, int end)"
  },
  {
    id: "sumHeights2",
    name: "sumHeights2",
    difficulty: "H",
    description: `We have an array of heights, representing the altitude along a walking trail. Given start/end indexes into the array, return the sum of the changes for a walk beginning at the start index and ending at the end index.

sumHeights2([5, 3, 6, 7, 2], 2, 4) → 7
sumHeights2([5, 3, 6, 7, 2], 0, 1) → 2
sumHeights2([5, 3, 6, 7, 2], 0, 4) → 15`,
    examples: [
      { input: "sumHeights2([5, 3, 6, 7, 2], 2, 4)", output: "7" },
      { input: "sumHeights2([5, 3, 6, 7, 2], 0, 1)", output: "2" },
      { input: "sumHeights2([5, 3, 6, 7, 2], 0, 4)", output: "15" }
    ],
    functionSignature: "public int sumHeights2(int[] heights, int start, int end)"
  },
  {
    id: "bigHeights",
    name: "bigHeights",
    difficulty: "H",
    description: `We have an array of heights, representing the altitude along a walking trail. Given start/end indexes into the array, return the number of "big" steps for a walk starting at the start index and ending at the end index.

bigHeights([5, 3, 6, 7, 2], 2, 4) → 1
bigHeights([5, 3, 6, 7, 2], 0, 1) → 0
bigHeights([5, 3, 6, 7, 2], 0, 4) → 1`,
    examples: [
      { input: "bigHeights([5, 3, 6, 7, 2], 2, 4)", output: "1" },
      { input: "bigHeights([5, 3, 6, 7, 2], 0, 1)", output: "0" },
      { input: "bigHeights([5, 3, 6, 7, 2], 0, 4)", output: "1" }
    ],
    functionSignature: "public int bigHeights(int[] heights, int start, int end)"
  },
  {
    id: "userCompare",
    name: "userCompare",
    difficulty: "H",
    description: `We have data for two users, A and B, each with a String name and an int id. The goal is to order the users such as for sorting. Return -1 if A comes before B, 1 if A comes after B, and 0 if they are the same.

userCompare("bb", 1, "zz", 2) → -1
userCompare("bb", 1, "aa", 2) → 1
userCompare("bb", 1, "bb", 1) → 0`,
    examples: [
      { input: 'userCompare("bb", 1, "zz", 2)', output: "-1" },
      { input: 'userCompare("bb", 1, "aa", 2)', output: "1" },
      { input: 'userCompare("bb", 1, "bb", 1)', output: "0" }
    ],
    functionSignature: "public int userCompare(String aName, int aId, String bName, int bId)"
  },
  {
    id: "mergeTwo",
    name: "mergeTwo",
    difficulty: "H",
    description: `Start with two arrays of strings, A and B, each with its elements in alphabetical order and without duplicates. Return a new array containing the first N elements from the two arrays.

mergeTwo(["a", "c", "z"], ["b", "f", "z"], 3) → ["a", "b", "c"]
mergeTwo(["a", "c", "z"], ["c", "f", "z"], 3) → ["a", "c", "f"]
mergeTwo(["f", "g", "z"], ["c", "f", "g"], 3) → ["c", "f", "g"]`,
    examples: [
      { input: 'mergeTwo(["a", "c", "z"], ["b", "f", "z"], 3)', output: '["a", "b", "c"]' },
      { input: 'mergeTwo(["a", "c", "z"], ["c", "f", "z"], 3)', output: '["a", "c", "f"]' },
      { input: 'mergeTwo(["f", "g", "z"], ["c", "f", "g"], 3)', output: '["c", "f", "g"]' }
    ],
    functionSignature: "public String[] mergeTwo(String[] a, String[] b, int n)"
  },
  {
    id: "commonTwo",
    name: "commonTwo",
    difficulty: "H",
    description: `Start with two arrays of strings, a and b, each in alphabetical order, possibly with duplicates. Return the count of the number of strings which appear in both arrays.

commonTwo(["a", "c", "x"], ["b", "c", "d", "x"]) → 2
commonTwo(["a", "c", "x"], ["a", "b", "c", "x", "z"]) → 3
commonTwo(["a", "b", "c"], ["a", "b", "c"]) → 3`,
    examples: [
      { input: 'commonTwo(["a", "c", "x"], ["b", "c", "d", "x"])', output: "2" },
      { input: 'commonTwo(["a", "c", "x"], ["a", "b", "c", "x", "z"])', output: "3" },
      { input: 'commonTwo(["a", "b", "c"], ["a", "b", "c"])', output: "3" }
    ],
    functionSignature: "public int commonTwo(String[] a, String[] b)"
  }
];

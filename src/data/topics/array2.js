// Array-2 Questions
export const array2Questions = [
  {
    id: "countEvens",
    name: "countEvens",
    difficulty: "H",
    description: `Return the number of even ints in the given array.

countEvens([2, 1, 2, 3, 4]) → 3
countEvens([2, 2, 0]) → 3
countEvens([1, 3, 5]) → 0`,
    examples: [
      { input: "countEvens([2, 1, 2, 3, 4])", output: "3" },
      { input: "countEvens([2, 2, 0])", output: "3" },
      { input: "countEvens([1, 3, 5])", output: "0" }
    ],
    functionSignature: "public int countEvens(int[] nums)"
  },
  {
    id: "bigDiff",
    name: "bigDiff",
    difficulty: "H",
    description: `Given an array length 1 or more of ints, return the difference between the largest and smallest values in the array.

bigDiff([10, 3, 5, 6]) → 7
bigDiff([7, 2, 10, 9]) → 8
bigDiff([2, 10, 7, 2]) → 8`,
    examples: [
      { input: "bigDiff([10, 3, 5, 6])", output: "7" },
      { input: "bigDiff([7, 2, 10, 9])", output: "8" },
      { input: "bigDiff([2, 10, 7, 2])", output: "8" }
    ],
    functionSignature: "public int bigDiff(int[] nums)"
  },
  {
    id: "centeredAverage",
    name: "centeredAverage",
    difficulty: "H",
    description: `Return the "centered" average of an array of ints, which we'll say is the mean average of the values, except ignoring the largest and smallest values in the array.

centeredAverage([1, 2, 3, 4, 100]) → 3
centeredAverage([1, 1, 5, 5, 10, 8, 7]) → 5
centeredAverage([-10, -4, -2, -4, -2, 0]) → -3`,
    examples: [
      { input: "centeredAverage([1, 2, 3, 4, 100])", output: "3" },
      { input: "centeredAverage([1, 1, 5, 5, 10, 8, 7])", output: "5" },
      { input: "centeredAverage([-10, -4, -2, -4, -2, 0])", output: "-3" }
    ],
    functionSignature: "public int centeredAverage(int[] nums)"
  },
  {
    id: "sum13",
    name: "sum13",
    difficulty: "H",
    description: `Return the sum of the numbers in the array, returning 0 for an empty array. Except the number 13 is very unlucky, so it does not count and numbers that come immediately after a 13 also do not count.

sum13([1, 2, 2, 1]) → 6
sum13([1, 1]) → 2
sum13([1, 2, 2, 1, 13]) → 6`,
    examples: [
      { input: "sum13([1, 2, 2, 1])", output: "6" },
      { input: "sum13([1, 1])", output: "2" },
      { input: "sum13([1, 2, 2, 1, 13])", output: "6" }
    ],
    functionSignature: "public int sum13(int[] nums)"
  },
  {
    id: "sum67",
    name: "sum67",
    difficulty: "H",
    description: `Return the sum of the numbers in the array, except ignore sections of numbers starting with a 6 and extending to the next 7 (every 6 will be followed by at least one 7). Return 0 for no numbers.

sum67([1, 2, 2]) → 5
sum67([1, 2, 2, 6, 99, 99, 7]) → 5
sum67([1, 1, 6, 7, 2]) → 4`,
    examples: [
      { input: "sum67([1, 2, 2])", output: "5" },
      { input: "sum67([1, 2, 2, 6, 99, 99, 7])", output: "5" },
      { input: "sum67([1, 1, 6, 7, 2])", output: "4" }
    ],
    functionSignature: "public int sum67(int[] nums)"
  },
  {
    id: "has22",
    name: "has22",
    difficulty: "H",
    description: `Given an array of ints, return true if the array contains a 2 next to a 2 somewhere.

has22([1, 2, 2]) → true
has22([1, 2, 1, 2]) → false
has22([2, 1, 2]) → false`,
    examples: [
      { input: "has22([1, 2, 2])", output: "true" },
      { input: "has22([1, 2, 1, 2])", output: "false" },
      { input: "has22([2, 1, 2])", output: "false" }
    ],
    functionSignature: "public boolean has22(int[] nums)"
  },
  {
    id: "lucky13",
    name: "lucky13",
    difficulty: "H",
    description: `Given an array of ints, return true if the array contains no 1's and no 3's.

lucky13([0, 2, 4]) → true
lucky13([1, 2, 3]) → false
lucky13([1, 2, 4]) → false`,
    examples: [
      { input: "lucky13([0, 2, 4])", output: "true" },
      { input: "lucky13([1, 2, 3])", output: "false" },
      { input: "lucky13([1, 2, 4])", output: "false" }
    ],
    functionSignature: "public boolean lucky13(int[] nums)"
  },
  {
    id: "sum28",
    name: "sum28",
    difficulty: "H",
    description: `Given an array of ints, return true if the sum of all the 2's in the array is exactly 8.

sum28([2, 3, 2, 2, 4, 2]) → true
sum28([2, 3, 2, 2, 4, 2, 2]) → false
sum28([1, 2, 3, 4]) → false`,
    examples: [
      { input: "sum28([2, 3, 2, 2, 4, 2])", output: "true" },
      { input: "sum28([2, 3, 2, 2, 4, 2, 2])", output: "false" },
      { input: "sum28([1, 2, 3, 4])", output: "false" }
    ],
    functionSignature: "public boolean sum28(int[] nums)"
  },
  {
    id: "more14",
    name: "more14",
    difficulty: "H",
    description: `Given an array of ints, return true if the number of 1's is greater than the number of 4's.

more14([1, 4, 1]) → true
more14([1, 4, 1, 4]) → false
more14([1, 1]) → true`,
    examples: [
      { input: "more14([1, 4, 1])", output: "true" },
      { input: "more14([1, 4, 1, 4])", output: "false" },
      { input: "more14([1, 1])", output: "true" }
    ],
    functionSignature: "public boolean more14(int[] nums)"
  },
  {
    id: "fizzArray",
    name: "fizzArray",
    difficulty: "H",
    description: `Given a number n, create and return a new int array of length n, containing the numbers 0, 1, 2, ... n-1.

fizzArray(4) → [0, 1, 2, 3]
fizzArray(1) → [0]
fizzArray(10) → [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]`,
    examples: [
      { input: "fizzArray(4)", output: "[0, 1, 2, 3]" },
      { input: "fizzArray(1)", output: "[0]" },
      { input: "fizzArray(10)", output: "[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" }
    ],
    functionSignature: "public int[] fizzArray(int n)"
  },
  {
    id: "only14",
    name: "only14",
    difficulty: "H",
    description: `Given an array of ints, return true if every element is a 1 or a 4.

only14([1, 4, 1, 4]) → true
only14([1, 4, 2, 4]) → false
only14([1, 1]) → true`,
    examples: [
      { input: "only14([1, 4, 1, 4])", output: "true" },
      { input: "only14([1, 4, 2, 4])", output: "false" },
      { input: "only14([1, 1])", output: "true" }
    ],
    functionSignature: "public boolean only14(int[] nums)"
  },
  {
    id: "fizzArray2",
    name: "fizzArray2",
    difficulty: "H",
    description: `Given a number n, create and return a new string array of length n, containing the strings "0", "1" "2" .. through n-1.

fizzArray2(4) → ["0", "1", "2", "3"]
fizzArray2(10) → ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
fizzArray2(2) → ["0", "1"]`,
    examples: [
      { input: 'fizzArray2(4)', output: '["0", "1", "2", "3"]' },
      { input: 'fizzArray2(10)', output: '["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]' },
      { input: 'fizzArray2(2)', output: '["0", "1"]' }
    ],
    functionSignature: "public String[] fizzArray2(int n)"
  },
  {
    id: "no14",
    name: "no14",
    difficulty: "H",
    description: `Given an array of ints, return true if it contains no 1's or it contains no 4's.

no14([1, 2, 3]) → true
no14([1, 2, 3, 4]) → false
no14([2, 3, 4]) → true`,
    examples: [
      { input: "no14([1, 2, 3])", output: "true" },
      { input: "no14([1, 2, 3, 4])", output: "false" },
      { input: "no14([2, 3, 4])", output: "true" }
    ],
    functionSignature: "public boolean no14(int[] nums)"
  },
  {
    id: "isEverywhere",
    name: "isEverywhere",
    difficulty: "H",
    description: `We'll say that a value is "everywhere" in an array if for every pair of adjacent elements in the array, at least one of the pair is that value. Return true if the given value is everywhere in the array.

isEverywhere([1, 2, 1, 3], 1) → true
isEverywhere([1, 2, 1, 3], 2) → false
isEverywhere([1, 2, 1, 3, 4], 1) → false`,
    examples: [
      { input: "isEverywhere([1, 2, 1, 3], 1)", output: "true" },
      { input: "isEverywhere([1, 2, 1, 3], 2)", output: "false" },
      { input: "isEverywhere([1, 2, 1, 3, 4], 1)", output: "false" }
    ],
    functionSignature: "public boolean isEverywhere(int[] nums, int val)"
  },
  {
    id: "either24",
    name: "either24",
    difficulty: "H",
    description: `Given an array of ints, return true if the array contains a 2 next to a 2 or a 4 next to a 4, but not both.

either24([1, 2, 2]) → true
either24([4, 4, 1]) → true
either24([4, 4, 1, 2, 2]) → false`,
    examples: [
      { input: "either24([1, 2, 2])", output: "true" },
      { input: "either24([4, 4, 1])", output: "true" },
      { input: "either24([4, 4, 1, 2, 2])", output: "false" }
    ],
    functionSignature: "public boolean either24(int[] nums)"
  },
  {
    id: "matchUp",
    name: "matchUp",
    difficulty: "H",
    description: `Given arrays nums1 and nums2 of the same length, for every element in nums1, consider the corresponding element in nums2 (at the same index). Return the count of the number of times that the two elements differ by 2 or less, but are not equal.

matchUp([1, 2, 3], [2, 3, 10]) → 2
matchUp([1, 2, 3], [2, 3, 5]) → 3
matchUp([1, 2, 3], [2, 3, 3]) → 2`,
    examples: [
      { input: "matchUp([1, 2, 3], [2, 3, 10])", output: "2" },
      { input: "matchUp([1, 2, 3], [2, 3, 5])", output: "3" },
      { input: "matchUp([1, 2, 3], [2, 3, 3])", output: "2" }
    ],
    functionSignature: "public int matchUp(int[] nums1, int[] nums2)"
  },
  {
    id: "has77",
    name: "has77",
    difficulty: "H",
    description: `Given an array of ints, return true if the array contains two 7's next to each other, or there are two 7's separated by one element, such as with {7, 1, 7}.

has77([1, 7, 7]) → true
has77([1, 7, 1, 7]) → true
has77([1, 7, 1, 1, 7]) → false`,
    examples: [
      { input: "has77([1, 7, 7])", output: "true" },
      { input: "has77([1, 7, 1, 7])", output: "true" },
      { input: "has77([1, 7, 1, 1, 7])", output: "false" }
    ],
    functionSignature: "public boolean has77(int[] nums)"
  },
  {
    id: "has12",
    name: "has12",
    difficulty: "H",
    description: `Given an array of ints, return true if there is a 1 in the array with a 2 somewhere later in the array.

has12([1, 3, 2]) → true
has12([3, 1, 2]) → true
has12([3, 1, 4, 5, 2]) → true`,
    examples: [
      { input: "has12([1, 3, 2])", output: "true" },
      { input: "has12([3, 1, 2])", output: "true" },
      { input: "has12([3, 1, 4, 5, 2])", output: "true" }
    ],
    functionSignature: "public boolean has12(int[] nums)"
  },
  {
    id: "modThree",
    name: "modThree",
    difficulty: "H",
    description: `Given an array of ints, return true if the array contains either 3 even or 3 odd values all next to each other.

modThree([2, 1, 3, 5]) → true
modThree([2, 1, 2, 5]) → false
modThree([2, 4, 2, 5]) → true`,
    examples: [
      { input: "modThree([2, 1, 3, 5])", output: "true" },
      { input: "modThree([2, 1, 2, 5])", output: "false" },
      { input: "modThree([2, 4, 2, 5])", output: "true" }
    ],
    functionSignature: "public boolean modThree(int[] nums)"
  },
  {
    id: "haveThree",
    name: "haveThree",
    difficulty: "H",
    description: `Given an array of ints, return true if the value 3 appears in the array exactly 3 times, and no 3's are next to each other.

haveThree([3, 1, 3, 1, 3]) → true
haveThree([3, 1, 3, 3]) → false
haveThree([3, 4, 3, 3, 4]) → false`,
    examples: [
      { input: "haveThree([3, 1, 3, 1, 3])", output: "true" },
      { input: "haveThree([3, 1, 3, 3])", output: "false" },
      { input: "haveThree([3, 4, 3, 3, 4])", output: "false" }
    ],
    functionSignature: "public boolean haveThree(int[] nums)"
  },
  {
    id: "twoTwo",
    name: "twoTwo",
    difficulty: "H",
    description: `Given an array of ints, return true if every 2 that appears in the array is next to another 2.

twoTwo([4, 2, 2, 3]) → true
twoTwo([2, 2, 4]) → true
twoTwo([2, 2, 4, 2]) → false`,
    examples: [
      { input: "twoTwo([4, 2, 2, 3])", output: "true" },
      { input: "twoTwo([2, 2, 4])", output: "true" },
      { input: "twoTwo([2, 2, 4, 2])", output: "false" }
    ],
    functionSignature: "public boolean twoTwo(int[] nums)"
  },
  {
    id: "sameEnds",
    name: "sameEnds",
    difficulty: "H",
    description: `Return true if the group of N numbers at the start and end of the array are the same.

sameEnds([5, 6, 45, 99, 13, 5, 6], 1) → false
sameEnds([5, 6, 45, 99, 13, 5, 6], 2) → true
sameEnds([5, 6, 45, 99, 13, 5, 6], 3) → false`,
    examples: [
      { input: "sameEnds([5, 6, 45, 99, 13, 5, 6], 1)", output: "false" },
      { input: "sameEnds([5, 6, 45, 99, 13, 5, 6], 2)", output: "true" },
      { input: "sameEnds([5, 6, 45, 99, 13, 5, 6], 3)", output: "false" }
    ],
    functionSignature: "public boolean sameEnds(int[] nums, int len)"
  },
  {
    id: "tripleUp",
    name: "tripleUp",
    difficulty: "H",
    description: `Return true if the array contains, somewhere, three increasing adjacent numbers like .... 4, 5, 6, ... or 23, 24, 25.

tripleUp([1, 4, 5, 6, 2]) → true
tripleUp([1, 2, 3]) → true
tripleUp([1, 2, 4]) → false`,
    examples: [
      { input: "tripleUp([1, 4, 5, 6, 2])", output: "true" },
      { input: "tripleUp([1, 2, 3])", output: "true" },
      { input: "tripleUp([1, 2, 4])", output: "false" }
    ],
    functionSignature: "public boolean tripleUp(int[] nums)"
  }
];

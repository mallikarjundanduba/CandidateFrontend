// Array-3 Questions
export const array3Questions = [
  {
    id: "maxSpan",
    name: "maxSpan",
    difficulty: "H",
    description: `Consider the leftmost and rightmost appearances of some value in an array. We'll say that the "span" is the number of elements between the two inclusive. Return the largest span found in the given array.

maxSpan([1, 2, 1, 1, 3]) → 4
maxSpan([1, 4, 2, 1, 4, 1, 4]) → 6
maxSpan([1, 4, 2, 1, 4, 4, 4]) → 6`,
    examples: [
      { input: "maxSpan([1, 2, 1, 1, 3])", output: "4" },
      { input: "maxSpan([1, 4, 2, 1, 4, 1, 4])", output: "6" },
      { input: "maxSpan([1, 4, 2, 1, 4, 4, 4])", output: "6" }
    ],
    functionSignature: "public int maxSpan(int[] nums)"
  },
  {
    id: "fix34",
    name: "fix34",
    difficulty: "H",
    description: `Return an array that contains exactly the same numbers as the given array, but rearranged so that every 3 is immediately followed by a 4. Do not move the 3's, but every other number may move.

fix34([1, 3, 1, 4]) → [1, 3, 4, 1]
fix34([1, 3, 1, 4, 4, 3, 1]) → [1, 3, 4, 1, 1, 3, 4]
fix34([3, 2, 2, 4]) → [3, 4, 2, 2]`,
    examples: [
      { input: "fix34([1, 3, 1, 4])", output: "[1, 3, 4, 1]" },
      { input: "fix34([1, 3, 1, 4, 4, 3, 1])", output: "[1, 3, 4, 1, 1, 3, 4]" },
      { input: "fix34([3, 2, 2, 4])", output: "[3, 4, 2, 2]" }
    ],
    functionSignature: "public int[] fix34(int[] nums)"
  },
  {
    id: "fix45",
    name: "fix45",
    difficulty: "H",
    description: `Return an array that contains exactly the same numbers as the given array, but rearranged so that every 4 is immediately followed by a 5. Do not move the 4's, but every other number may move.

fix45([5, 4, 9, 4, 9, 5]) → [9, 4, 5, 4, 5, 9]
fix45([1, 4, 1, 5]) → [1, 4, 5, 1]
fix45([1, 4, 1, 5, 5, 4, 1]) → [1, 4, 5, 1, 1, 4, 5]`,
    examples: [
      { input: "fix45([5, 4, 9, 4, 9, 5])", output: "[9, 4, 5, 4, 5, 9]" },
      { input: "fix45([1, 4, 1, 5])", output: "[1, 4, 5, 1]" },
      { input: "fix45([1, 4, 1, 5, 5, 4, 1])", output: "[1, 4, 5, 1, 1, 4, 5]" }
    ],
    functionSignature: "public int[] fix45(int[] nums)"
  },
  {
    id: "canBalance",
    name: "canBalance",
    difficulty: "H",
    description: `Given a non-empty array, return true if there is a place to split the array so that the sum of the numbers on one side is equal to the sum of the numbers on the other side.

canBalance([1, 1, 1, 2, 1]) → true
canBalance([2, 1, 1, 2, 1]) → false
canBalance([10, 10]) → true`,
    examples: [
      { input: "canBalance([1, 1, 1, 2, 1])", output: "true" },
      { input: "canBalance([2, 1, 1, 2, 1])", output: "false" },
      { input: "canBalance([10, 10])", output: "true" }
    ],
    functionSignature: "public boolean canBalance(int[] nums)"
  },
  {
    id: "linearIn",
    name: "linearIn",
    difficulty: "H",
    description: `Given two arrays of ints sorted in increasing order, outer and inner, return true if all of the numbers in inner appear in outer.

linearIn([1, 2, 4, 6], [2, 4]) → true
linearIn([1, 2, 4, 6], [2, 3, 4]) → false
linearIn([1, 2, 4, 4, 6], [2, 4]) → true`,
    examples: [
      { input: "linearIn([1, 2, 4, 6], [2, 4])", output: "true" },
      { input: "linearIn([1, 2, 4, 6], [2, 3, 4])", output: "false" },
      { input: "linearIn([1, 2, 4, 4, 6], [2, 4])", output: "true" }
    ],
    functionSignature: "public boolean linearIn(int[] outer, int[] inner)"
  },
  {
    id: "squareUp",
    name: "squareUp",
    difficulty: "H",
    description: `Given n>=0, create an array length n*n with the following pattern, shown here for n=3 : {0, 0, 1,    0, 2, 1,    3, 2, 1}

squareUp(3) → [0, 0, 1, 0, 2, 1, 3, 2, 1]
squareUp(2) → [0, 1, 2, 1]
squareUp(4) → [0, 0, 0, 1, 0, 0, 2, 1, 0, 3, 2, 1, 4, 3, 2, 1]`,
    examples: [
      { input: "squareUp(3)", output: "[0, 0, 1, 0, 2, 1, 3, 2, 1]" },
      { input: "squareUp(2)", output: "[0, 1, 2, 1]" },
      { input: "squareUp(4)", output: "[0, 0, 0, 1, 0, 0, 2, 1, 0, 3, 2, 1, 4, 3, 2, 1]" }
    ],
    functionSignature: "public int[] squareUp(int n)"
  },
  {
    id: "seriesUp",
    name: "seriesUp",
    difficulty: "H",
    description: `Given n>=0, create an array with the pattern {1,    1, 2,    1, 2, 3,   ... 1, 2, 3 .. n}.

seriesUp(3) → [1, 1, 2, 1, 2, 3]
seriesUp(4) → [1, 1, 2, 1, 2, 3, 1, 2, 3, 4]
seriesUp(2) → [1, 1, 2]`,
    examples: [
      { input: "seriesUp(3)", output: "[1, 1, 2, 1, 2, 3]" },
      { input: "seriesUp(4)", output: "[1, 1, 2, 1, 2, 3, 1, 2, 3, 4]" },
      { input: "seriesUp(2)", output: "[1, 1, 2]" }
    ],
    functionSignature: "public int[] seriesUp(int n)"
  },
  {
    id: "maxMirror",
    name: "maxMirror",
    difficulty: "H",
    description: `We'll say that a "mirror" section in an array is a group of contiguous elements such that somewhere in the array, the same group appears in reverse order.

maxMirror([1, 2, 3, 8, 9, 3, 2, 1]) → 3
maxMirror([1, 2, 1, 4]) → 3
maxMirror([7, 1, 2, 9, 7, 2, 1]) → 2`,
    examples: [
      { input: "maxMirror([1, 2, 3, 8, 9, 3, 2, 1])", output: "3" },
      { input: "maxMirror([1, 2, 1, 4])", output: "3" },
      { input: "maxMirror([7, 1, 2, 9, 7, 2, 1])", output: "2" }
    ],
    functionSignature: "public int maxMirror(int[] nums)"
  },
  {
    id: "countClumps",
    name: "countClumps",
    difficulty: "H",
    description: `Say that a "clump" in an array is a series of 2 or more adjacent elements of the same value. Return the number of clumps in the given array.

countClumps([1, 2, 2, 3, 4, 4]) → 2
countClumps([1, 1, 2, 1, 1]) → 2
countClumps([1, 1, 1, 1, 1]) → 1`,
    examples: [
      { input: "countClumps([1, 2, 2, 3, 4, 4])", output: "2" },
      { input: "countClumps([1, 1, 2, 1, 1])", output: "2" },
      { input: "countClumps([1, 1, 1, 1, 1])", output: "1" }
    ],
    functionSignature: "public int countClumps(int[] nums)"
  },
  {
    id: "findLargest",
    name: "findLargest",
    difficulty: "H",
    description: `Given an array of ints, find the index of the largest element.

findLargest([1, 5, 3, 2]) → 1
findLargest([7, 2, 9, 1]) → 2
findLargest([3, 3, 1]) → 0`,
    examples: [
      { input: "findLargest([1, 5, 3, 2])", output: "1" },
      { input: "findLargest([7, 2, 9, 1])", output: "2" },
      { input: "findLargest([3, 3, 1])", output: "0" }
    ],
    functionSignature: "public int findLargest(int[] nums)"
  },
  {
    id: "findSmallest",
    name: "findSmallest",
    difficulty: "H",
    description: `Given an array of ints, find the index of the smallest element.

findSmallest([1, 5, 3, 2]) → 0
findSmallest([7, 2, 9, 1]) → 3
findSmallest([3, 3, 1]) → 2`,
    examples: [
      { input: "findSmallest([1, 5, 3, 2])", output: "0" },
      { input: "findSmallest([7, 2, 9, 1])", output: "3" },
      { input: "findSmallest([3, 3, 1])", output: "2" }
    ],
    functionSignature: "public int findSmallest(int[] nums)"
  },
  {
    id: "containsDuplicate",
    name: "containsDuplicate",
    difficulty: "H",
    description: `Given an array of ints, return true if any value appears at least twice in the array.

containsDuplicate([1, 2, 3, 1]) → true
containsDuplicate([1, 2, 3, 4]) → false
containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]) → true`,
    examples: [
      { input: "containsDuplicate([1, 2, 3, 1])", output: "true" },
      { input: "containsDuplicate([1, 2, 3, 4])", output: "false" },
      { input: "containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2])", output: "true" }
    ],
    functionSignature: "public boolean containsDuplicate(int[] nums)"
  },
  {
    id: "rotateArray",
    name: "rotateArray",
    difficulty: "H",
    description: `Given an array, rotate the array to the right by k steps, where k is non-negative.

rotateArray([1, 2, 3, 4, 5], 2) → [4, 5, 1, 2, 3]
rotateArray([1, 2, 3], 1) → [3, 1, 2]
rotateArray([1, 2], 3) → [2, 1]`,
    examples: [
      { input: "rotateArray([1, 2, 3, 4, 5], 2)", output: "[4, 5, 1, 2, 3]" },
      { input: "rotateArray([1, 2, 3], 1)", output: "[3, 1, 2]" },
      { input: "rotateArray([1, 2], 3)", output: "[2, 1]" }
    ],
    functionSignature: "public int[] rotateArray(int[] nums, int k)"
  },
  {
    id: "removeElement",
    name: "removeElement",
    difficulty: "H",
    description: `Given an array and a value, remove all instances of that value in-place and return the new length.

removeElement([3, 2, 2, 3], 3) → 2 (array becomes [2, 2])
removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2) → 5 (array becomes [0, 1, 3, 0, 4])
removeElement([1], 1) → 0`,
    examples: [
      { input: "removeElement([3, 2, 2, 3], 3)", output: "2" },
      { input: "removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2)", output: "5" },
      { input: "removeElement([1], 1)", output: "0" }
    ],
    functionSignature: "public int removeElement(int[] nums, int val)"
  },
  {
    id: "moveZeroes",
    name: "moveZeroes",
    difficulty: "H",
    description: `Given an array, move all 0's to the end while maintaining the relative order of the non-zero elements.

moveZeroes([0, 1, 0, 3, 12]) → [1, 3, 12, 0, 0]
moveZeroes([0]) → [0]
moveZeroes([1, 2, 3]) → [1, 2, 3]`,
    examples: [
      { input: "moveZeroes([0, 1, 0, 3, 12])", output: "[1, 3, 12, 0, 0]" },
      { input: "moveZeroes([0])", output: "[0]" },
      { input: "moveZeroes([1, 2, 3])", output: "[1, 2, 3]" }
    ],
    functionSignature: "public int[] moveZeroes(int[] nums)"
  },
  {
    id: "plusOne",
    name: "plusOne",
    difficulty: "H",
    description: `Given a non-empty array of digits representing a non-negative integer, increment one to the integer.

plusOne([1, 2, 3]) → [1, 2, 4]
plusOne([4, 3, 2, 1]) → [4, 3, 2, 2]
plusOne([9]) → [1, 0]`,
    examples: [
      { input: "plusOne([1, 2, 3])", output: "[1, 2, 4]" },
      { input: "plusOne([4, 3, 2, 1])", output: "[4, 3, 2, 2]" },
      { input: "plusOne([9])", output: "[1, 0]" }
    ],
    functionSignature: "public int[] plusOne(int[] digits)"
  },
  {
    id: "intersection",
    name: "intersection",
    difficulty: "H",
    description: `Given two arrays, return their intersection (elements that appear in both).

intersection([1, 2, 2, 1], [2, 2]) → [2]
intersection([4, 9, 5], [9, 4, 9, 8, 4]) → [4, 9]
intersection([1, 2, 3], [4, 5, 6]) → []`,
    examples: [
      { input: "intersection([1, 2, 2, 1], [2, 2])", output: "[2]" },
      { input: "intersection([4, 9, 5], [9, 4, 9, 8, 4])", output: "[4, 9]" },
      { input: "intersection([1, 2, 3], [4, 5, 6])", output: "[]" }
    ],
    functionSignature: "public int[] intersection(int[] nums1, int[] nums2)"
  },
  {
    id: "findMaxConsecutive",
    name: "findMaxConsecutive",
    difficulty: "H",
    description: `Given an array of ints, find the maximum number of consecutive 1's in the array.

findMaxConsecutive([1, 1, 0, 1, 1, 1]) → 3
findMaxConsecutive([1, 0, 1, 1, 0, 1]) → 2
findMaxConsecutive([0, 0, 0]) → 0`,
    examples: [
      { input: "findMaxConsecutive([1, 1, 0, 1, 1, 1])", output: "3" },
      { input: "findMaxConsecutive([1, 0, 1, 1, 0, 1])", output: "2" },
      { input: "findMaxConsecutive([0, 0, 0])", output: "0" }
    ],
    functionSignature: "public int findMaxConsecutive(int[] nums)"
  },
  {
    id: "thirdMax",
    name: "thirdMax",
    difficulty: "H",
    description: `Given a non-empty array of integers, return the third maximum number. If it does not exist, return the maximum number.

thirdMax([3, 2, 1]) → 1
thirdMax([1, 2]) → 2
thirdMax([2, 2, 3, 1]) → 1`,
    examples: [
      { input: "thirdMax([3, 2, 1])", output: "1" },
      { input: "thirdMax([1, 2])", output: "2" },
      { input: "thirdMax([2, 2, 3, 1])", output: "1" }
    ],
    functionSignature: "public int thirdMax(int[] nums)"
  },
  {
    id: "findDisappearedNumbers",
    name: "findDisappearedNumbers",
    difficulty: "H",
    description: `Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), find all the integers that disappeared from the array.

findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1]) → [5, 6]
findDisappearedNumbers([1, 1]) → [2]
findDisappearedNumbers([1, 2, 3, 4]) → []`,
    examples: [
      { input: "findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])", output: "[5, 6]" },
      { input: "findDisappearedNumbers([1, 1])", output: "[2]" },
      { input: "findDisappearedNumbers([1, 2, 3, 4])", output: "[]" }
    ],
    functionSignature: "public List<Integer> findDisappearedNumbers(int[] nums)"
  },
  {
    id: "singleNumber",
    name: "singleNumber",
    difficulty: "H",
    description: `Given a non-empty array of integers, every element appears twice except for one. Find that single one.

singleNumber([2, 2, 1]) → 1
singleNumber([4, 1, 2, 1, 2]) → 4
singleNumber([1]) → 1`,
    examples: [
      { input: "singleNumber([2, 2, 1])", output: "1" },
      { input: "singleNumber([4, 1, 2, 1, 2])", output: "4" },
      { input: "singleNumber([1])", output: "1" }
    ],
    functionSignature: "public int singleNumber(int[] nums)"
  },
  {
    id: "majorityElement",
    name: "majorityElement",
    difficulty: "H",
    description: `Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊n/2⌋ times.

majorityElement([3, 2, 3]) → 3
majorityElement([2, 2, 1, 1, 1, 2, 2]) → 2
majorityElement([1]) → 1`,
    examples: [
      { input: "majorityElement([3, 2, 3])", output: "3" },
      { input: "majorityElement([2, 2, 1, 1, 1, 2, 2])", output: "2" },
      { input: "majorityElement([1])", output: "1" }
    ],
    functionSignature: "public int majorityElement(int[] nums)"
  }
];

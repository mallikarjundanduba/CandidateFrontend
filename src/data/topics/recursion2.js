// Recursion-2 Questions
export const recursion2Questions = [
  {
    id: "groupSum",
    name: "groupSum",
    difficulty: "H",
    description: `Given an array of ints, is it possible to choose a group of some of the ints, such that the group sums to the given target?

groupSum(0, [2, 4, 8], 10) → true
groupSum(0, [2, 4, 8], 14) → true
groupSum(0, [2, 4, 8], 9) → false`,
    examples: [
      { input: "groupSum(0, [2, 4, 8], 10)", output: "true" },
      { input: "groupSum(0, [2, 4, 8], 14)", output: "true" },
      { input: "groupSum(0, [2, 4, 8], 9)", output: "false" }
    ],
    functionSignature: "public boolean groupSum(int start, int[] nums, int target)"
  },
  {
    id: "groupSum6",
    name: "groupSum6",
    difficulty: "H",
    description: `Given an array of ints, is it possible to choose a group of some of the ints, beginning at the start index, such that the group sums to the given target? However, with the additional constraint that all 6's must be chosen.

groupSum6(0, [5, 6, 2], 8) → true
groupSum6(0, [5, 6, 2], 9) → false
groupSum6(0, [5, 6, 2], 7) → false`,
    examples: [
      { input: "groupSum6(0, [5, 6, 2], 8)", output: "true" },
      { input: "groupSum6(0, [5, 6, 2], 9)", output: "false" },
      { input: "groupSum6(0, [5, 6, 2], 7)", output: "false" }
    ],
    functionSignature: "public boolean groupSum6(int start, int[] nums, int target)"
  },
  {
    id: "groupNoAdj",
    name: "groupNoAdj",
    difficulty: "H",
    description: `Given an array of ints, is it possible to choose a group of some of the ints, such that the group sums to the given target with this additional constraint: If a value in the array is chosen to be in the group, the value immediately following it in the array must not be chosen.

groupNoAdj(0, [2, 5, 10, 4], 12) → true
groupNoAdj(0, [2, 5, 10, 4], 14) → false
groupNoAdj(0, [2, 5, 10, 4], 7) → false`,
    examples: [
      { input: "groupNoAdj(0, [2, 5, 10, 4], 12)", output: "true" },
      { input: "groupNoAdj(0, [2, 5, 10, 4], 14)", output: "false" },
      { input: "groupNoAdj(0, [2, 5, 10, 4], 7)", output: "false" }
    ],
    functionSignature: "public boolean groupNoAdj(int start, int[] nums, int target)"
  },
  {
    id: "groupSum5",
    name: "groupSum5",
    difficulty: "H",
    description: `Given an array of ints, is it possible to choose a group of some of the ints, such that the group sums to the given target with these additional constraints: all multiples of 5 in the array must be included in the group.

groupSum5(0, [2, 5, 10, 4], 19) → true
groupSum5(0, [2, 5, 10, 4], 17) → true
groupSum5(0, [2, 5, 10, 4], 12) → false`,
    examples: [
      { input: "groupSum5(0, [2, 5, 10, 4], 19)", output: "true" },
      { input: "groupSum5(0, [2, 5, 10, 4], 17)", output: "true" },
      { input: "groupSum5(0, [2, 5, 10, 4], 12)", output: "false" }
    ],
    functionSignature: "public boolean groupSum5(int start, int[] nums, int target)"
  },
  {
    id: "groupSumClump",
    name: "groupSumClump",
    difficulty: "H",
    description: `Given an array of ints, is it possible to choose a group of some of the ints, such that the group sums to the given target, with this constraint: if there are numbers in the array that are adjacent and the same value, they must either all be chosen, or none of them chosen.

groupSumClump(0, [2, 4, 8], 10) → true
groupSumClump(0, [1, 2, 4, 8, 1], 14) → true
groupSumClump(0, [2, 4, 4, 8], 14) → false`,
    examples: [
      { input: "groupSumClump(0, [2, 4, 8], 10)", output: "true" },
      { input: "groupSumClump(0, [1, 2, 4, 8, 1], 14)", output: "true" },
      { input: "groupSumClump(0, [2, 4, 4, 8], 14)", output: "false" }
    ],
    functionSignature: "public boolean groupSumClump(int start, int[] nums, int target)"
  },
  {
    id: "splitArray",
    name: "splitArray",
    difficulty: "H",
    description: `Given an array of ints, is it possible to divide the ints into two groups, so that the sums of the two groups are the same.

splitArray([2, 2]) → true
splitArray([2, 3]) → false
splitArray([5, 2, 3]) → true`,
    examples: [
      { input: "splitArray([2, 2])", output: "true" },
      { input: "splitArray([2, 3])", output: "false" },
      { input: "splitArray([5, 2, 3])", output: "true" }
    ],
    functionSignature: "public boolean splitArray(int[] nums)"
  },
  {
    id: "splitOdd10",
    name: "splitOdd10",
    difficulty: "H",
    description: `Given an array of ints, is it possible to divide the ints into two groups, so that the sum of one group is a multiple of 10, and the sum of the other group is odd.

splitOdd10([5, 5, 5]) → true
splitOdd10([5, 5, 6]) → false
splitOdd10([5, 5, 6, 1]) → true`,
    examples: [
      { input: "splitOdd10([5, 5, 5])", output: "true" },
      { input: "splitOdd10([5, 5, 6])", output: "false" },
      { input: "splitOdd10([5, 5, 6, 1])", output: "true" }
    ],
    functionSignature: "public boolean splitOdd10(int[] nums)"
  },
  {
    id: "split53",
    name: "split53",
    difficulty: "H",
    description: `Given an array of ints, is it possible to divide the ints into two groups, so that the sum of the two groups is the same, with these constraints: all the values that are multiple of 5 must be in one group, and all the values that are a multiple of 3 (and not a multiple of 5) must be in the other.

split53([1, 1]) → true
split53([1, 1, 1]) → false
split53([2, 4, 2]) → true`,
    examples: [
      { input: "split53([1, 1])", output: "true" },
      { input: "split53([1, 1, 1])", output: "false" },
      { input: "split53([2, 4, 2])", output: "true" }
    ],
    functionSignature: "public boolean split53(int[] nums)"
  },
  {
    id: "makeBricks",
    name: "makeBricks",
    difficulty: "H",
    description: `We want to make a row of bricks that is goal inches long. We have a number of small bricks (1 inch each) and big bricks (5 inches each). Return true if it is possible to make the goal by choosing from the given bricks.

makeBricks(3, 1, 8) → true
makeBricks(3, 1, 9) → false
makeBricks(3, 2, 10) → true`,
    examples: [
      { input: "makeBricks(3, 1, 8)", output: "true" },
      { input: "makeBricks(3, 1, 9)", output: "false" },
      { input: "makeBricks(3, 2, 10)", output: "true" }
    ],
    functionSignature: "public boolean makeBricks(int small, int big, int goal)"
  },
  {
    id: "makeChocolate",
    name: "makeChocolate",
    difficulty: "H",
    description: `We want make a package of goal kilos of chocolate. We have small bars (1 kilo each) and big bars (5 kilos each). Return the number of small bars to use, assuming we always use big bars before small bars. Return -1 if it can't be done.

makeChocolate(4, 1, 9) → 4
makeChocolate(4, 1, 10) → -1
makeChocolate(4, 1, 7) → 2`,
    examples: [
      { input: "makeChocolate(4, 1, 9)", output: "4" },
      { input: "makeChocolate(4, 1, 10)", output: "-1" },
      { input: "makeChocolate(4, 1, 7)", output: "2" }
    ],
    functionSignature: "public int makeChocolate(int small, int big, int goal)"
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
    id: "sameStarChar",
    name: "sameStarChar",
    difficulty: "H",
    description: `Returns true if for every '*' (star) in the string, if there are chars both immediately before and after the star, they are the same.

sameStarChar("xy*yzz") → true
sameStarChar("xy*zzz") → false
sameStarChar("*xa*az") → true`,
    examples: [
      { input: 'sameStarChar("xy*yzz")', output: "true" },
      { input: 'sameStarChar("xy*zzz")', output: "false" },
      { input: 'sameStarChar("*xa*az")', output: "true" }
    ],
    functionSignature: "public boolean sameStarChar(String str)"
  },
  {
    id: "strDist",
    name: "strDist",
    difficulty: "H",
    description: `Given a string and a non-empty substring sub, compute recursively the largest substring which starts and ends with sub and return its length.

strDist("catcowcat", "cat") → 9
strDist("catcowcat", "cow") → 3
strDist("cccatcowcatxx", "cat") → 9`,
    examples: [
      { input: 'strDist("catcowcat", "cat")', output: "9" },
      { input: 'strDist("catcowcat", "cow")', output: "3" },
      { input: 'strDist("cccatcowcatxx", "cat")', output: "9" }
    ],
    functionSignature: "public int strDist(String str, String sub)"
  },
  {
    id: "countHi",
    name: "countHi",
    difficulty: "H",
    description: `Given a string, compute recursively the number of times lowercase "hi" appears in the string.

countHi("xxhixx") → 1
countHi("xhixhix") → 2
countHi("hi") → 1`,
    examples: [
      { input: 'countHi("xxhixx")', output: "1" },
      { input: 'countHi("xhixhix")', output: "2" },
      { input: 'countHi("hi")', output: "1" }
    ],
    functionSignature: "public int countHi(String str)"
  },
  {
    id: "changeXY",
    name: "changeXY",
    difficulty: "H",
    description: `Given a string, compute recursively a new string where all the lowercase 'x' chars have been changed to 'y' chars.

changeXY("codex") → "codey"
changeXY("xxhixx") → "yyhiyy"
changeXY("xhixhix") → "yhiyhiy"`,
    examples: [
      { input: 'changeXY("codex")', output: '"codey"' },
      { input: 'changeXY("xxhixx")', output: '"yyhiyy"' },
      { input: 'changeXY("xhixhix")', output: '"yhiyhiy"' }
    ],
    functionSignature: "public String changeXY(String str)"
  },
  {
    id: "nestParen",
    name: "nestParen",
    difficulty: "H",
    description: `Given a string, return true if it is a nesting of zero or more pairs of parenthesis, like "(())" or "((()))".

nestParen("(())") → true
nestParen("((()))") → true
nestParen("(((x))") → false`,
    examples: [
      { input: 'nestParen("(())")', output: "true" },
      { input: 'nestParen("((()))")', output: "true" },
      { input: 'nestParen("(((x))")', output: "false" }
    ],
    functionSignature: "public boolean nestParen(String str)"
  },
  {
    id: "parenBit",
    name: "parenBit",
    difficulty: "H",
    description: `Given a string that contains a single pair of parenthesis, compute recursively a new string made of only of the parenthesis and their contents.

parenBit("xyz(abc)123") → "(abc)"
parenBit("x(hello)") → "(hello)"
parenBit("(xy)1") → "(xy)"`,
    examples: [
      { input: 'parenBit("xyz(abc)123")', output: '"(abc)"' },
      { input: 'parenBit("x(hello)")', output: '"(hello)"' },
      { input: 'parenBit("(xy)1")', output: '"(xy)"' }
    ],
    functionSignature: "public String parenBit(String str)"
  },
  {
    id: "strCount",
    name: "strCount",
    difficulty: "H",
    description: `Given a string and a non-empty substring sub, compute recursively the number of times that sub appears in the string, without overlapping.

strCount("catcowcat", "cat") → 2
strCount("catcowcat", "cow") → 1
strCount("catcowcat", "dog") → 0`,
    examples: [
      { input: 'strCount("catcowcat", "cat")', output: "2" },
      { input: 'strCount("catcowcat", "cow")', output: "1" },
      { input: 'strCount("catcowcat", "dog")', output: "0" }
    ],
    functionSignature: "public int strCount(String str, String sub)"
  },
  {
    id: "strCopies",
    name: "strCopies",
    difficulty: "H",
    description: `Given a string and a non-empty substring sub, compute recursively if at least n copies of sub appear in the string somewhere, possibly with overlapping.

strCopies("catcowcat", "cat", 2) → true
strCopies("catcowcat", "cow", 2) → false
strCopies("catcowcat", "cow", 1) → true`,
    examples: [
      { input: 'strCopies("catcowcat", "cat", 2)', output: "true" },
      { input: 'strCopies("catcowcat", "cow", 2)', output: "false" },
      { input: 'strCopies("catcowcat", "cow", 1)', output: "true" }
    ],
    functionSignature: "public boolean strCopies(String str, String sub, int n)"
  },
  {
    id: "strRemove",
    name: "strRemove",
    difficulty: "H",
    description: `Given a string and a non-empty substring sub, compute recursively the largest substring which starts and ends with sub and return its length.

strRemove("catcowcat", "cat") → 9
strRemove("catcowcat", "cow") → 3
strRemove("cccatcowcatxx", "cat") → 9`,
    examples: [
      { input: 'strRemove("catcowcat", "cat")', output: "9" },
      { input: 'strRemove("catcowcat", "cow")', output: "3" },
      { input: 'strRemove("cccatcowcatxx", "cat")', output: "9" }
    ],
    functionSignature: "public int strRemove(String str, String sub)"
  },
  {
    id: "triangleBlocks",
    name: "triangleBlocks",
    difficulty: "H",
    description: `We have triangle made of blocks. The topmost row has 1 block, the next row down has 2 blocks, the next row has 3 blocks, and so on. Compute recursively the total number of blocks in such a triangle with the given number of rows.

triangleBlocks(0) → 0
triangleBlocks(1) → 1
triangleBlocks(2) → 3`,
    examples: [
      { input: "triangleBlocks(0)", output: "0" },
      { input: "triangleBlocks(1)", output: "1" },
      { input: "triangleBlocks(2)", output: "3" }
    ],
    functionSignature: "public int triangleBlocks(int rows)"
  }
];

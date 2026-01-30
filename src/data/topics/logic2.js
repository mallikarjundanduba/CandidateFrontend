// Logic-2 Questions
export const logic2Questions = [
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
    id: "loneSum",
    name: "loneSum",
    difficulty: "H",
    description: `Given 3 int values, a b c, return their sum. However, if one of the values is the same as another of the values, it does not count towards the sum.

loneSum(1, 2, 3) → 6
loneSum(3, 2, 3) → 2
loneSum(3, 3, 3) → 0`,
    examples: [
      { input: "loneSum(1, 2, 3)", output: "6" },
      { input: "loneSum(3, 2, 3)", output: "2" },
      { input: "loneSum(3, 3, 3)", output: "0" }
    ],
    functionSignature: "public int loneSum(int a, int b, int c)"
  },
  {
    id: "luckySum",
    name: "luckySum",
    difficulty: "H",
    description: `Given 3 int values, a b c, return their sum. However, if one of the values is 13 then it does not count towards the sum and values to its right do not count.

luckySum(1, 2, 3) → 6
luckySum(1, 2, 13) → 3
luckySum(1, 13, 3) → 1`,
    examples: [
      { input: "luckySum(1, 2, 3)", output: "6" },
      { input: "luckySum(1, 2, 13)", output: "3" },
      { input: "luckySum(1, 13, 3)", output: "1" }
    ],
    functionSignature: "public int luckySum(int a, int b, int c)"
  },
  {
    id: "noTeenSum",
    name: "noTeenSum",
    difficulty: "H",
    description: `Given 3 int values, a b c, return their sum. However, if any of the values is a teen -- in the range 13..19 inclusive -- then that value counts as 0, except 15 and 16 do not count as a teens.

noTeenSum(1, 2, 3) → 6
noTeenSum(2, 13, 1) → 3
noTeenSum(2, 1, 14) → 3`,
    examples: [
      { input: "noTeenSum(1, 2, 3)", output: "6" },
      { input: "noTeenSum(2, 13, 1)", output: "3" },
      { input: "noTeenSum(2, 1, 14)", output: "3" }
    ],
    functionSignature: "public int noTeenSum(int a, int b, int c)"
  },
  {
    id: "roundSum",
    name: "roundSum",
    difficulty: "H",
    description: `For this problem, we'll round an int value up to the next multiple of 10 if its rightmost digit is 5 or more, so 15 rounds up to 20. Alternately, round down to the previous multiple of 10 if its rightmost digit is less than 5, so 12 rounds down to 10.

roundSum(16, 17, 18) → 60
roundSum(12, 13, 14) → 30
roundSum(6, 4, 4) → 10`,
    examples: [
      { input: "roundSum(16, 17, 18)", output: "60" },
      { input: "roundSum(12, 13, 14)", output: "30" },
      { input: "roundSum(6, 4, 4)", output: "10" }
    ],
    functionSignature: "public int roundSum(int a, int b, int c)"
  },
  {
    id: "closeFar",
    name: "closeFar",
    difficulty: "H",
    description: `Given three ints, a b c, return true if one of b or c is "close" (differing from a by at most 1), while the other is "far", differing from both other values by 2 or more.

closeFar(1, 2, 10) → true
closeFar(1, 2, 3) → false
closeFar(4, 1, 3) → true`,
    examples: [
      { input: "closeFar(1, 2, 10)", output: "true" },
      { input: "closeFar(1, 2, 3)", output: "false" },
      { input: "closeFar(4, 1, 3)", output: "true" }
    ],
    functionSignature: "public boolean closeFar(int a, int b, int c)"
  },
  {
    id: "blackjack",
    name: "blackjack",
    difficulty: "H",
    description: `Given 2 int values greater than 0, return whichever value is closest to 21 without going over. Return 0 if they both go over.

blackjack(19, 21) → 21
blackjack(21, 19) → 21
blackjack(19, 22) → 19`,
    examples: [
      { input: "blackjack(19, 21)", output: "21" },
      { input: "blackjack(21, 19)", output: "21" },
      { input: "blackjack(19, 22)", output: "19" }
    ],
    functionSignature: "public int blackjack(int a, int b)"
  },
  {
    id: "evenlySpaced",
    name: "evenlySpaced",
    difficulty: "H",
    description: `Given three ints, a b c, one of them is small, one is medium and one is large. Return true if the three values are evenly spaced.

evenlySpaced(2, 4, 6) → true
evenlySpaced(4, 6, 2) → true
evenlySpaced(4, 6, 3) → false`,
    examples: [
      { input: "evenlySpaced(2, 4, 6)", output: "true" },
      { input: "evenlySpaced(4, 6, 2)", output: "true" },
      { input: "evenlySpaced(4, 6, 3)", output: "false" }
    ],
    functionSignature: "public boolean evenlySpaced(int a, int b, int c)"
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
    id: "fix34Sequence",
    name: "fix34Sequence",
    difficulty: "H",
    description: `Given an array of ints, return true if there is a 3 followed by a 4 somewhere in the array. Return true if every 3 has a 4 immediately after it.

fix34Sequence([1, 3, 4, 5]) → true
fix34Sequence([3, 1, 4]) → false
fix34Sequence([1, 3, 4]) → true`,
    examples: [
      { input: "fix34Sequence([1, 3, 4, 5])", output: "true" },
      { input: "fix34Sequence([3, 1, 4])", output: "false" },
      { input: "fix34Sequence([1, 3, 4])", output: "true" }
    ],
    functionSignature: "public boolean fix34Sequence(int[] nums)"
  },
  {
    id: "sumDigitsUntilSingle",
    name: "sumDigitsUntilSingle",
    difficulty: "H",
    description: `Given a non-negative int n, repeatedly add all its digits until the result has only one digit.

sumDigitsUntilSingle(38) → 2
sumDigitsUntilSingle(123) → 6
sumDigitsUntilSingle(999) → 9`,
    examples: [
      { input: "sumDigitsUntilSingle(38)", output: "2" },
      { input: "sumDigitsUntilSingle(123)", output: "6" },
      { input: "sumDigitsUntilSingle(999)", output: "9" }
    ],
    functionSignature: "public int sumDigitsUntilSingle(int n)"
  },
  {
    id: "reverseInt",
    name: "reverseInt",
    difficulty: "H",
    description: `Given a 32-bit signed integer, reverse digits of an integer.

reverseInt(123) → 321
reverseInt(-123) → -321
reverseInt(120) → 21`,
    examples: [
      { input: "reverseInt(123)", output: "321" },
      { input: "reverseInt(-123)", output: "-321" },
      { input: "reverseInt(120)", output: "21" }
    ],
    functionSignature: "public int reverseInt(int x)"
  },
  {
    id: "isPowerOfTwo",
    name: "isPowerOfTwo",
    difficulty: "H",
    description: `Given an integer, write a function to determine if it is a power of two.

isPowerOfTwo(1) → true
isPowerOfTwo(16) → true
isPowerOfTwo(218) → false`,
    examples: [
      { input: "isPowerOfTwo(1)", output: "true" },
      { input: "isPowerOfTwo(16)", output: "true" },
      { input: "isPowerOfTwo(218)", output: "false" }
    ],
    functionSignature: "public boolean isPowerOfTwo(int n)"
  },
  {
    id: "countPrimes",
    name: "countPrimes",
    difficulty: "H",
    description: `Count the number of prime numbers less than a non-negative number, n.

countPrimes(10) → 4
countPrimes(0) → 0
countPrimes(1) → 0`,
    examples: [
      { input: "countPrimes(10)", output: "4" },
      { input: "countPrimes(0)", output: "0" },
      { input: "countPrimes(1)", output: "0" }
    ],
    functionSignature: "public int countPrimes(int n)"
  },
  {
    id: "isValidParentheses",
    name: "isValidParentheses",
    difficulty: "H",
    description: `Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

isValidParentheses("()") → true
isValidParentheses("()[]{}") → true
isValidParentheses("(]") → false`,
    examples: [
      { input: 'isValidParentheses("()")', output: "true" },
      { input: 'isValidParentheses("()[]{}")', output: "true" },
      { input: 'isValidParentheses("(]")', output: "false" }
    ],
    functionSignature: "public boolean isValidParentheses(String s)"
  },
  {
    id: "romanToInt",
    name: "romanToInt",
    difficulty: "H",
    description: `Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.

romanToInt("III") → 3
romanToInt("IV") → 4
romanToInt("LVIII") → 58`,
    examples: [
      { input: 'romanToInt("III")', output: "3" },
      { input: 'romanToInt("IV")', output: "4" },
      { input: 'romanToInt("LVIII")', output: "58" }
    ],
    functionSignature: "public int romanToInt(String s)"
  },
  {
    id: "longestCommonPrefix",
    name: "longestCommonPrefix",
    difficulty: "H",
    description: `Write a function to find the longest common prefix string amongst an array of strings.

longestCommonPrefix(["flower","flow","flight"]) → "fl"
longestCommonPrefix(["dog","racecar","car"]) → ""
longestCommonPrefix(["a"]) → "a"`,
    examples: [
      { input: 'longestCommonPrefix(["flower","flow","flight"])', output: '"fl"' },
      { input: 'longestCommonPrefix(["dog","racecar","car"])', output: '""' },
      { input: 'longestCommonPrefix(["a"])', output: '"a"' }
    ],
    functionSignature: "public String longestCommonPrefix(String[] strs)"
  },
  {
    id: "lengthOfLastWord",
    name: "lengthOfLastWord",
    difficulty: "H",
    description: `Given a string s consists of upper/lower-case alphabets and empty space characters ' ', return the length of last word in the string.

lengthOfLastWord("Hello World") → 5
lengthOfLastWord("   fly me   to   the moon  ") → 4
lengthOfLastWord("luffy is still joyboy") → 6`,
    examples: [
      { input: 'lengthOfLastWord("Hello World")', output: "5" },
      { input: 'lengthOfLastWord("   fly me   to   the moon  ")', output: "4" },
      { input: 'lengthOfLastWord("luffy is still joyboy")', output: "6" }
    ],
    functionSignature: "public int lengthOfLastWord(String s)"
  },
  {
    id: "plusOneArray",
    name: "plusOneArray",
    difficulty: "H",
    description: `Given a non-empty array of decimal digits representing a non-negative integer, increment one to the integer.

plusOneArray([1,2,3]) → [1,2,4]
plusOneArray([4,3,2,1]) → [4,3,2,2]
plusOneArray([9]) → [1,0]`,
    examples: [
      { input: "plusOneArray([1,2,3])", output: "[1,2,4]" },
      { input: "plusOneArray([4,3,2,1])", output: "[4,3,2,2]" },
      { input: "plusOneArray([9])", output: "[1,0]" }
    ],
    functionSignature: "public int[] plusOneArray(int[] digits)"
  },
  {
    id: "addBinary",
    name: "addBinary",
    difficulty: "H",
    description: `Given two binary strings a and b, return their sum as a binary string.

addBinary("11", "1") → "100"
addBinary("1010", "1011") → "10101"
addBinary("0", "0") → "0"`,
    examples: [
      { input: 'addBinary("11", "1")', output: '"100"' },
      { input: 'addBinary("1010", "1011")', output: '"10101"' },
      { input: 'addBinary("0", "0")', output: '"0"' }
    ],
    functionSignature: "public String addBinary(String a, String b)"
  },
  {
    id: "sqrt",
    name: "sqrt",
    difficulty: "H",
    description: `Given a non-negative integer x, compute and return the square root of x. Since the return type is an integer, the decimal digits are truncated.

sqrt(4) → 2
sqrt(8) → 2
sqrt(0) → 0`,
    examples: [
      { input: "sqrt(4)", output: "2" },
      { input: "sqrt(8)", output: "2" },
      { input: "sqrt(0)", output: "0" }
    ],
    functionSignature: "public int sqrt(int x)"
  },
  {
    id: "climbStairs",
    name: "climbStairs",
    difficulty: "H",
    description: `You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

climbStairs(2) → 2
climbStairs(3) → 3
climbStairs(4) → 5`,
    examples: [
      { input: "climbStairs(2)", output: "2" },
      { input: "climbStairs(3)", output: "3" },
      { input: "climbStairs(4)", output: "5" }
    ],
    functionSignature: "public int climbStairs(int n)"
  }
];

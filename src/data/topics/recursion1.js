// Recursion-1 Questions
export const recursion1Questions = [
  {
    id: "factorial",
    name: "factorial",
    difficulty: "H",
    description: `Given n of 1 or more, return the factorial of n, which is n * (n-1) * (n-2) ... 1.

factorial(1) → 1
factorial(2) → 2
factorial(3) → 6`,
    examples: [
      { input: "factorial(1)", output: "1" },
      { input: "factorial(2)", output: "2" },
      { input: "factorial(3)", output: "6" }
    ],
    functionSignature: "public int factorial(int n)"
  },
  {
    id: "bunnyEars",
    name: "bunnyEars",
    difficulty: "H",
    description: `We have a number of bunnies and each bunny has two big floppy ears. We want to compute the total number of ears across all the bunnies recursively.

bunnyEars(0) → 0
bunnyEars(1) → 2
bunnyEars(2) → 4`,
    examples: [
      { input: "bunnyEars(0)", output: "0" },
      { input: "bunnyEars(1)", output: "2" },
      { input: "bunnyEars(2)", output: "4" }
    ],
    functionSignature: "public int bunnyEars(int bunnies)"
  },
  {
    id: "fibonacci",
    name: "fibonacci",
    difficulty: "H",
    description: `The fibonacci sequence is a famous bit of mathematics, and it happens to have a recursive definition. The first two values in the sequence are 0 and 1 (essentially 2 base cases).

fibonacci(0) → 0
fibonacci(1) → 1
fibonacci(2) → 1`,
    examples: [
      { input: "fibonacci(0)", output: "0" },
      { input: "fibonacci(1)", output: "1" },
      { input: "fibonacci(2)", output: "1" }
    ],
    functionSignature: "public int fibonacci(int n)"
  },
  {
    id: "bunnyEars2",
    name: "bunnyEars2",
    difficulty: "H",
    description: `We have bunnies standing in a line, numbered 1, 2, ... The odd bunnies (1, 3, ..) have the normal 2 ears. The even bunnies (2, 4, ..) we'll say have 3 ears, because they each have a raised foot.

bunnyEars2(0) → 0
bunnyEars2(1) → 2
bunnyEars2(2) → 5`,
    examples: [
      { input: "bunnyEars2(0)", output: "0" },
      { input: "bunnyEars2(1)", output: "2" },
      { input: "bunnyEars2(2)", output: "5" }
    ],
    functionSignature: "public int bunnyEars2(int bunnies)"
  },
  {
    id: "triangle",
    name: "triangle",
    difficulty: "H",
    description: `We have triangle made of blocks. The topmost row has 1 block, the next row down has 2 blocks, the next row has 3 blocks, and so on. Compute recursively the total number of blocks in such a triangle with the given number of rows.

triangle(0) → 0
triangle(1) → 1
triangle(2) → 3`,
    examples: [
      { input: "triangle(0)", output: "0" },
      { input: "triangle(1)", output: "1" },
      { input: "triangle(2)", output: "3" }
    ],
    functionSignature: "public int triangle(int rows)"
  },
  {
    id: "sumDigits",
    name: "sumDigits",
    difficulty: "H",
    description: `Given a non-negative int n, return the sum of its digits recursively.

sumDigits(126) → 9
sumDigits(49) → 13
sumDigits(12) → 3`,
    examples: [
      { input: "sumDigits(126)", output: "9" },
      { input: "sumDigits(49)", output: "13" },
      { input: "sumDigits(12)", output: "3" }
    ],
    functionSignature: "public int sumDigits(int n)"
  },
  {
    id: "count7",
    name: "count7",
    difficulty: "H",
    description: `Given a non-negative int n, return the count of the occurrences of 7 as a digit.

count7(717) → 2
count7(7) → 1
count7(123) → 0`,
    examples: [
      { input: "count7(717)", output: "2" },
      { input: "count7(7)", output: "1" },
      { input: "count7(123)", output: "0" }
    ],
    functionSignature: "public int count7(int n)"
  },
  {
    id: "count8",
    name: "count8",
    difficulty: "H",
    description: `Given a non-negative int n, compute recursively the count of the occurrences of 8 as a digit, except that an 8 with another 8 immediately to its left counts double.

count8(8) → 1
count8(818) → 2
count8(8818) → 4`,
    examples: [
      { input: "count8(8)", output: "1" },
      { input: "count8(818)", output: "2" },
      { input: "count8(8818)", output: "4" }
    ],
    functionSignature: "public int count8(int n)"
  },
  {
    id: "powerN",
    name: "powerN",
    difficulty: "H",
    description: `Given base and n that are both 1 or more, compute recursively the value of base to the n power.

powerN(3, 1) → 3
powerN(3, 2) → 9
powerN(3, 3) → 27`,
    examples: [
      { input: "powerN(3, 1)", output: "3" },
      { input: "powerN(3, 2)", output: "9" },
      { input: "powerN(3, 3)", output: "27" }
    ],
    functionSignature: "public int powerN(int base, int n)"
  },
  {
    id: "countX",
    name: "countX",
    difficulty: "H",
    description: `Given a string, compute recursively the number of lowercase 'x' chars in the string.

countX("xxhixx") → 4
countX("xhixhix") → 3
countX("hi") → 0`,
    examples: [
      { input: 'countX("xxhixx")', output: "4" },
      { input: 'countX("xhixhix")', output: "3" },
      { input: 'countX("hi")', output: "0" }
    ],
    functionSignature: "public int countX(String str)"
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
    id: "changePi",
    name: "changePi",
    difficulty: "H",
    description: `Given a string, compute recursively a new string where all appearances of "pi" have been replaced by "3.14".

changePi("xpix") → "x3.14x"
changePi("pipi") → "3.143.14"
changePi("pip") → "3.14p"`,
    examples: [
      { input: 'changePi("xpix")', output: '"x3.14x"' },
      { input: 'changePi("pipi")', output: '"3.143.14"' },
      { input: 'changePi("pip")', output: '"3.14p"' }
    ],
    functionSignature: "public String changePi(String str)"
  },
  {
    id: "noX",
    name: "noX",
    difficulty: "H",
    description: `Given a string, compute recursively a new string where all the 'x' chars have been removed.

noX("xaxb") → "ab"
noX("abc") → "abc"
noX("xx") → ""`,
    examples: [
      { input: 'noX("xaxb")', output: '"ab"' },
      { input: 'noX("abc")', output: '"abc"' },
      { input: 'noX("xx")', output: '""' }
    ],
    functionSignature: "public String noX(String str)"
  },
  {
    id: "array6",
    name: "array6",
    difficulty: "H",
    description: `Given an array of ints, compute recursively if the array contains a 6.

array6([1, 6, 4], 0) → true
array6([1, 4], 0) → false
array6([6], 0) → true`,
    examples: [
      { input: "array6([1, 6, 4], 0)", output: "true" },
      { input: "array6([1, 4], 0)", output: "false" },
      { input: "array6([6], 0)", output: "true" }
    ],
    functionSignature: "public boolean array6(int[] nums, int index)"
  },
  {
    id: "array11",
    name: "array11",
    difficulty: "H",
    description: `Given an array of ints, compute recursively the number of times that the value 11 appears in the array.

array11([1, 2, 11], 0) → 1
array11([11, 11], 0) → 2
array11([1, 2, 3, 4], 0) → 0`,
    examples: [
      { input: "array11([1, 2, 11], 0)", output: "1" },
      { input: "array11([11, 11], 0)", output: "2" },
      { input: "array11([1, 2, 3, 4], 0)", output: "0" }
    ],
    functionSignature: "public int array11(int[] nums, int index)"
  },
  {
    id: "array220",
    name: "array220",
    difficulty: "H",
    description: `Given an array of ints, compute recursively if the array contains somewhere a value followed in the array by that value times 10.

array220([1, 2, 20], 0) → true
array220([3, 30], 0) → true
array220([3], 0) → false`,
    examples: [
      { input: "array220([1, 2, 20], 0)", output: "true" },
      { input: "array220([3, 30], 0)", output: "true" },
      { input: "array220([3], 0)", output: "false" }
    ],
    functionSignature: "public boolean array220(int[] nums, int index)"
  },
  {
    id: "allStar",
    name: "allStar",
    difficulty: "H",
    description: `Given a string, compute recursively a new string where all the adjacent chars are now separated by a "*".

allStar("hello") → "h*e*l*l*o"
allStar("abc") → "a*b*c"
allStar("ab") → "a*b"`,
    examples: [
      { input: 'allStar("hello")', output: '"h*e*l*l*o"' },
      { input: 'allStar("abc")', output: '"a*b*c"' },
      { input: 'allStar("ab")', output: '"a*b"' }
    ],
    functionSignature: "public String allStar(String str)"
  },
  {
    id: "pairStar",
    name: "pairStar",
    difficulty: "H",
    description: `Given a string, compute recursively a new string where identical chars that are adjacent in the original string are separated from each other by a "*".

pairStar("hello") → "hel*lo"
pairStar("xxyy") → "x*xy*y"
pairStar("aaaa") → "a*a*a*a"`,
    examples: [
      { input: 'pairStar("hello")', output: '"hel*lo"' },
      { input: 'pairStar("xxyy")', output: '"x*xy*y"' },
      { input: 'pairStar("aaaa")', output: '"a*a*a*a"' }
    ],
    functionSignature: "public String pairStar(String str)"
  },
  {
    id: "endX",
    name: "endX",
    difficulty: "H",
    description: `Given a string, compute recursively a new string where all the lowercase 'x' chars have been moved to the end of the string.

endX("xxre") → "rexx"
endX("xxhixx") → "hixxxx"
endX("xhixhix") → "hihixxx"`,
    examples: [
      { input: 'endX("xxre")', output: '"rexx"' },
      { input: 'endX("xxhixx")', output: '"hixxxx"' },
      { input: 'endX("xhixhix")', output: '"hihixxx"' }
    ],
    functionSignature: "public String endX(String str)"
  },
  {
    id: "countPairs",
    name: "countPairs",
    difficulty: "H",
    description: `We'll say that a "pair" in a string is two instances of a char separated by a char. So "AxA" the A's make a pair. Pair's can overlap, so "AxAxA" contains 3 pairs -- 2 for A and 1 for x.

countPairs("axa") → 1
countPairs("axax") → 2
countPairs("axbx") → 1`,
    examples: [
      { input: 'countPairs("axa")', output: "1" },
      { input: 'countPairs("axax")', output: "2" },
      { input: 'countPairs("axbx")', output: "1" }
    ],
    functionSignature: "public int countPairs(String str)"
  },
  {
    id: "countAbc",
    name: "countAbc",
    difficulty: "H",
    description: `Count recursively the total number of "abc" and "aba" substrings that appear in the given string.

countAbc("abc") → 1
countAbc("abcxxabc") → 2
countAbc("abaxxaba") → 2`,
    examples: [
      { input: 'countAbc("abc")', output: "1" },
      { input: 'countAbc("abcxxabc")', output: "2" },
      { input: 'countAbc("abaxxaba")', output: "2" }
    ],
    functionSignature: "public int countAbc(String str)"
  },
  {
    id: "count11",
    name: "count11",
    difficulty: "H",
    description: `Given a string, compute recursively the number of "11" substrings in the string. The "11" substrings should not overlap.

count11("11abc11") → 2
count11("abc11x11x11") → 3
count11("111") → 1`,
    examples: [
      { input: 'count11("11abc11")', output: "2" },
      { input: 'count11("abc11x11x11")', output: "3" },
      { input: 'count11("111")', output: "1" }
    ],
    functionSignature: "public int count11(String str)"
  }
];

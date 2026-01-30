// Warmup-2 Questions
export const warmup2Questions = [
  {
    id: "stringTimes",
    name: "stringTimes",
    difficulty: "H",
    description: `Given a string and a non-negative int n, return a larger string that is n copies of the original string.

stringTimes("Hi", 2) → "HiHi"
stringTimes("Hi", 3) → "HiHiHi"
stringTimes("Hi", 1) → "Hi"`,
    examples: [
      { input: 'stringTimes("Hi", 2)', output: '"HiHi"' },
      { input: 'stringTimes("Hi", 3)', output: '"HiHiHi"' },
      { input: 'stringTimes("Hi", 1)', output: '"Hi"' }
    ],
    functionSignature: "public String stringTimes(String str, int n)"
  },
  {
    id: "frontTimes",
    name: "frontTimes",
    difficulty: "H",
    description: `Given a string and a non-negative int n, we'll say that the front of the string is the first 3 chars, or whatever is there if the string is less than length 3. Return n copies of the front.

frontTimes("Chocolate", 2) → "ChoCho"
frontTimes("Chocolate", 3) → "ChoChoCho"
frontTimes("Abc", 3) → "AbcAbcAbc"`,
    examples: [
      { input: 'frontTimes("Chocolate", 2)', output: '"ChoCho"' },
      { input: 'frontTimes("Chocolate", 3)', output: '"ChoChoCho"' },
      { input: 'frontTimes("Abc", 3)', output: '"AbcAbcAbc"' }
    ],
    functionSignature: "public String frontTimes(String str, int n)"
  },
  {
    id: "countXX",
    name: "countXX",
    difficulty: "H",
    description: `Count the number of "xx" in the given string. We'll say that overlapping is allowed, so "xxx" contains 2 "xx".

countXX("abcxx") → 1
countXX("xxx") → 2
countXX("xxxx") → 3`,
    examples: [
      { input: 'countXX("abcxx")', output: "1" },
      { input: 'countXX("xxx")', output: "2" },
      { input: 'countXX("xxxx")', output: "3" }
    ],
    functionSignature: "public int countXX(String str)"
  },
  {
    id: "doubleX",
    name: "doubleX",
    difficulty: "H",
    description: `Given a string, return true if the first instance of "x" in the string is immediately followed by another "x".

doubleX("axxbb") → true
doubleX("axaxax") → false
doubleX("xxxxx") → true`,
    examples: [
      { input: 'doubleX("axxbb")', output: "true" },
      { input: 'doubleX("axaxax")', output: "false" },
      { input: 'doubleX("xxxxx")', output: "true" }
    ],
    functionSignature: "public boolean doubleX(String str)"
  },
  {
    id: "stringBits",
    name: "stringBits",
    difficulty: "H",
    description: `Given a string, return a new string made of every other char starting with the first, so "Hello" yields "Hlo".

stringBits("Hello") → "Hlo"
stringBits("Hi") → "H"
stringBits("Heeololeo") → "Hello"`,
    examples: [
      { input: 'stringBits("Hello")', output: '"Hlo"' },
      { input: 'stringBits("Hi")', output: '"H"' },
      { input: 'stringBits("Heeololeo")', output: '"Hello"' }
    ],
    functionSignature: "public String stringBits(String str)"
  },
  {
    id: "stringSplosion",
    name: "stringSplosion",
    difficulty: "H",
    description: `Given a non-empty string like "Code" return a string like "CCoCodCode".

stringSplosion("Code") → "CCoCodCode"
stringSplosion("abc") → "aababc"
stringSplosion("ab") → "aab"`,
    examples: [
      { input: 'stringSplosion("Code")', output: '"CCoCodCode"' },
      { input: 'stringSplosion("abc")', output: '"aababc"' },
      { input: 'stringSplosion("ab")', output: '"aab"' }
    ],
    functionSignature: "public String stringSplosion(String str)"
  },
  {
    id: "last2",
    name: "last2",
    difficulty: "H",
    description: `Given a string, return the count of the number of times that a substring length 2 appears in the string and also as the last 2 chars of the string, so "hixxxhi" yields 1 (we won't count the end substring).

last2("hixxhi") → 1
last2("xaxxaxaxx") → 1
last2("axxxaaxx") → 2`,
    examples: [
      { input: 'last2("hixxhi")', output: "1" },
      { input: 'last2("xaxxaxaxx")', output: "1" },
      { input: 'last2("axxxaaxx")', output: "2" }
    ],
    functionSignature: "public int last2(String str)"
  },
  {
    id: "arrayCount9",
    name: "arrayCount9",
    difficulty: "H",
    description: `Given an array of ints, return the number of 9's in the array.

arrayCount9([1, 2, 9]) → 1
arrayCount9([1, 9, 9]) → 2
arrayCount9([1, 9, 9, 3, 9]) → 3`,
    examples: [
      { input: "arrayCount9([1, 2, 9])", output: "1" },
      { input: "arrayCount9([1, 9, 9])", output: "2" },
      { input: "arrayCount9([1, 9, 9, 3, 9])", output: "3" }
    ],
    functionSignature: "public int arrayCount9(int[] nums)"
  },
  {
    id: "arrayFront9",
    name: "arrayFront9",
    difficulty: "H",
    description: `Given an array of ints, return true if one of the first 4 elements in the array is a 9. The array length may be less than 4.

arrayFront9([1, 2, 9, 3, 4]) → true
arrayFront9([1, 2, 3, 4, 9]) → false
arrayFront9([1, 2, 3, 4, 5]) → false`,
    examples: [
      { input: "arrayFront9([1, 2, 9, 3, 4])", output: "true" },
      { input: "arrayFront9([1, 2, 3, 4, 9])", output: "false" },
      { input: "arrayFront9([1, 2, 3, 4, 5])", output: "false" }
    ],
    functionSignature: "public boolean arrayFront9(int[] nums)"
  },
  {
    id: "array123",
    name: "array123",
    difficulty: "H",
    description: `Given an array of ints, return true if the sequence of numbers 1, 2, 3 appears in the array somewhere.

array123([1, 1, 2, 3, 1]) → true
array123([1, 1, 2, 4, 1]) → false
array123([1, 1, 2, 1, 2, 3]) → true`,
    examples: [
      { input: "array123([1, 1, 2, 3, 1])", output: "true" },
      { input: "array123([1, 1, 2, 4, 1])", output: "false" },
      { input: "array123([1, 1, 2, 1, 2, 3])", output: "true" }
    ],
    functionSignature: "public boolean array123(int[] nums)"
  },
  {
    id: "stringMatch",
    name: "stringMatch",
    difficulty: "H",
    description: `Given 2 strings, a and b, return the number of the positions where they contain the same length 2 substring. So "xxcaazz" and "xxbaaz" yields 3, since the "xx", "aa", and "az" substrings appear in the same place in both strings.

stringMatch("xxcaazz", "xxbaaz") → 3
stringMatch("abc", "abc") → 2
stringMatch("abc", "axc") → 0`,
    examples: [
      { input: 'stringMatch("xxcaazz", "xxbaaz")', output: "3" },
      { input: 'stringMatch("abc", "abc")', output: "2" },
      { input: 'stringMatch("abc", "axc")', output: "0" }
    ],
    functionSignature: "public int stringMatch(String a, String b)"
  },
  {
    id: "stringX",
    name: "stringX",
    difficulty: "H",
    description: `Given a string, return a version where all the "x" have been removed. Except an "x" at the very start or end should not be removed.

stringX("xxHxix") → "xHix"
stringX("abxxxcd") → "abcd"
stringX("xabxxxcdx") → "xabcdx"`,
    examples: [
      { input: 'stringX("xxHxix")', output: '"xHix"' },
      { input: 'stringX("abxxxcd")', output: '"abcd"' },
      { input: 'stringX("xabxxxcdx")', output: '"xabcdx"' }
    ],
    functionSignature: "public String stringX(String str)"
  },
  {
    id: "altPairs",
    name: "altPairs",
    difficulty: "H",
    description: `Given a string, return a string made of the chars at indexes 0,1, 4,5, 8,9 ... so "kittens" yields "kien".

altPairs("kitten") → "kien"
altPairs("Chocolate") → "Chole"
altPairs("CodingHorror") → "Congrr"`,
    examples: [
      { input: 'altPairs("kitten")', output: '"kien"' },
      { input: 'altPairs("Chocolate")', output: '"Chole"' },
      { input: 'altPairs("CodingHorror")', output: '"Congrr"' }
    ],
    functionSignature: "public String altPairs(String str)"
  },
  {
    id: "stringYak",
    name: "stringYak",
    difficulty: "H",
    description: `Suppose the string "yak" is unlucky. Given a string, return a version where all the "yak" are removed, but the "a" can be any char. The "yak" strings will not overlap.

stringYak("yakpak") → "pak"
stringYak("pakyak") → "pak"
stringYak("yak123ya") → "123ya"`,
    examples: [
      { input: 'stringYak("yakpak")', output: '"pak"' },
      { input: 'stringYak("pakyak")', output: '"pak"' },
      { input: 'stringYak("yak123ya")', output: '"123ya"' }
    ],
    functionSignature: "public String stringYak(String str)"
  },
  {
    id: "array667",
    name: "array667",
    difficulty: "H",
    description: `Given an array of ints, return the number of times that two 6's are next to each other in the array. Also count instances where the second "6" is actually a 7.

array667([6, 6, 2]) → 1
array667([6, 6, 2, 6]) → 1
array667([6, 7, 2, 6]) → 1`,
    examples: [
      { input: "array667([6, 6, 2])", output: "1" },
      { input: "array667([6, 6, 2, 6])", output: "1" },
      { input: "array667([6, 7, 2, 6])", output: "1" }
    ],
    functionSignature: "public int array667(int[] nums)"
  },
  {
    id: "noTriples",
    name: "noTriples",
    difficulty: "H",
    description: `Given an array of ints, we'll say that a triple is a value appearing 3 times in a row in the array. Return true if the array does not contain any triples.

noTriples([1, 1, 2, 2, 1]) → true
noTriples([1, 1, 1, 2, 2, 2, 1]) → false
noTriples([1, 1, 2, 2, 2, 1]) → false`,
    examples: [
      { input: "noTriples([1, 1, 2, 2, 1])", output: "true" },
      { input: "noTriples([1, 1, 1, 2, 2, 2, 1])", output: "false" },
      { input: "noTriples([1, 1, 2, 2, 2, 1])", output: "false" }
    ],
    functionSignature: "public boolean noTriples(int[] nums)"
  },
  {
    id: "has271",
    name: "has271",
    difficulty: "H",
    description: `Given an array of ints, return true if it contains a 2, 7, 1 pattern: a value, followed by the value plus 5, followed by the value minus 1. Additionally the 271 counts even if the "1" differs by 2 or less from the correct value.

has271([1, 2, 7, 1]) → true
has271([1, 2, 8, 1]) → false
has271([2, 7, 1]) → true`,
    examples: [
      { input: "has271([1, 2, 7, 1])", output: "true" },
      { input: "has271([1, 2, 8, 1])", output: "false" },
      { input: "has271([2, 7, 1])", output: "true" }
    ],
    functionSignature: "public boolean has271(int[] nums)"
  },
  {
    id: "countEvens",
    name: "countEvens",
    difficulty: "H",
    description: `Return the number of even ints in the given array. Note: the % "mod" operator computes the remainder, e.g. 5 % 2 is 1.

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
    description: `Return the "centered" average of an array of ints, which we'll say is the mean average of the values, except ignoring the largest and smallest values in the array. If there are multiple copies of the smallest value, ignore just one copy, and likewise for the largest value.

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
    description: `Return the sum of the numbers in the array, except ignore sections of numbers starting with a 6 and extending to the next 7.

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
  }
];

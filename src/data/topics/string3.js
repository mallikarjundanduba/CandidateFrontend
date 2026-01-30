// String-3 Questions
export const string3Questions = [
  {
    id: "countYZ",
    name: "countYZ",
    difficulty: "H",
    description: `Given a string, count the number of words ending in 'y' or 'z' -- so the 'y' in "heavy" and the 'z' in "fez" count, but not the 'y' in "yellow" (not case sensitive). We'll say that a y or z is at the end of a word if there is not an alphabetic letter immediately following it.

countYZ("fez day") → 2
countYZ("day fez") → 2
countYZ("day fyyyz") → 2`,
    examples: [
      { input: 'countYZ("fez day")', output: "2" },
      { input: 'countYZ("day fez")', output: "2" },
      { input: 'countYZ("day fyyyz")', output: "2" }
    ],
    functionSignature: "public int countYZ(String str)"
  },
  {
    id: "withoutString",
    name: "withoutString",
    difficulty: "H",
    description: `Given two strings, base and remove, return a version of the base string where all instances of the remove string have been removed (not case sensitive). You may assume that the remove string is length 1 or more.

withoutString("Hello there", "llo") → "He there"
withoutString("Hello there", "e") → "Hllo thr"
withoutString("Hello there", "x") → "Hello there"`,
    examples: [
      { input: 'withoutString("Hello there", "llo")', output: "He there" },
      { input: 'withoutString("Hello there", "e")', output: "Hllo thr" },
      { input: 'withoutString("Hello there", "x")', output: "Hello there" }
    ],
    functionSignature: "public String withoutString(String base, String remove)"
  },
  {
    id: "equalIsNot",
    name: "equalIsNot",
    difficulty: "H",
    description: `Given a string, return true if the number of appearances of "is" anywhere in the string is equal to the number of appearances of "not" anywhere in the string (case sensitive).

equalIsNot("This is not") → false
equalIsNot("This is notnot") → true
equalIsNot("noisxxnotyynotxisi") → true`,
    examples: [
      { input: 'equalIsNot("This is not")', output: "false" },
      { input: 'equalIsNot("This is notnot")', output: "true" },
      { input: 'equalIsNot("noisxxnotyynotxisi")', output: "true" }
    ],
    functionSignature: "public boolean equalIsNot(String str)"
  },
  {
    id: "gHappy",
    name: "gHappy",
    difficulty: "H",
    description: `We'll say that a lowercase 'g' in a string is "happy" if there is another 'g' immediately to its left or right. Return true if all the g's in the given string are happy.

gHappy("xxggxx") → true
gHappy("xxgxx") → false
gHappy("xxggyygxx") → false`,
    examples: [
      { input: 'gHappy("xxggxx")', output: "true" },
      { input: 'gHappy("xxgxx")', output: "false" },
      { input: 'gHappy("xxggyygxx")', output: "false" }
    ],
    functionSignature: "public boolean gHappy(String str)"
  },
  {
    id: "countTriple",
    name: "countTriple",
    difficulty: "H",
    description: `We'll say that a "triple" in a string is a char appearing three times in a row. Return the number of triples in the given string. The triples may overlap.

countTriple("abcXXXabc") → 1
countTriple("xxxabyyyycd") → 3
countTriple("a") → 0`,
    examples: [
      { input: 'countTriple("abcXXXabc")', output: "1" },
      { input: 'countTriple("xxxabyyyycd")', output: "3" },
      { input: 'countTriple("a")', output: "0" }
    ],
    functionSignature: "public int countTriple(String str)"
  },
  {
    id: "sumDigits",
    name: "sumDigits",
    difficulty: "H",
    description: `Given a string, return the sum of the digits 0-9 that appear in the string, ignoring all other characters. Return 0 if there are no digits in the string.

sumDigits("aa1bc2d3") → 6
sumDigits("aa11b33") → 8
sumDigits("Chocolate") → 0`,
    examples: [
      { input: 'sumDigits("aa1bc2d3")', output: "6" },
      { input: 'sumDigits("aa11b33")', output: "8" },
      { input: 'sumDigits("Chocolate")', output: "0" }
    ],
    functionSignature: "public int sumDigits(String str)"
  },
  {
    id: "sameEnds",
    name: "sameEnds",
    difficulty: "H",
    description: `Given a string, return the longest substring that appears at both the beginning and end of the string without overlapping.

sameEnds("abXYab") → "ab"
sameEnds("xx") → "x"
sameEnds("xxx") → "x"`,
    examples: [
      { input: 'sameEnds("abXYab")', output: "ab" },
      { input: 'sameEnds("xx")', output: "x" },
      { input: 'sameEnds("xxx")', output: "x" }
    ],
    functionSignature: "public String sameEnds(String string)"
  },
  {
    id: "mirrorEnds",
    name: "mirrorEnds",
    difficulty: "H",
    description: `Given a string, look for a mirror image (backwards) string at both the beginning and end of the given string. In other words, zero or more characters at the very begining of the given string, and at the very end of the string in reverse order (possibly overlapping).

mirrorEnds("abXYZba") → "ab"
mirrorEnds("abca") → "a"
mirrorEnds("aba") → "aba"`,
    examples: [
      { input: 'mirrorEnds("abXYZba")', output: "ab" },
      { input: 'mirrorEnds("abca")', output: "a" },
      { input: 'mirrorEnds("aba")', output: "aba" }
    ],
    functionSignature: "public String mirrorEnds(String string)"
  },
  {
    id: "maxBlock",
    name: "maxBlock",
    difficulty: "H",
    description: `Given a string, return the length of the largest "block" in the string. A block is a run of adjacent chars that are the same.

maxBlock("hoopla") → 2
maxBlock("abbCCCddBBBxx") → 3
maxBlock("") → 0`,
    examples: [
      { input: 'maxBlock("hoopla")', output: "2" },
      { input: 'maxBlock("abbCCCddBBBxx")', output: "3" },
      { input: 'maxBlock("")', output: "0" }
    ],
    functionSignature: "public int maxBlock(String str)"
  },
  {
    id: "sumNumbers",
    name: "sumNumbers",
    difficulty: "H",
    description: `Given a string, return the sum of the numbers appearing in the string, ignoring all other characters. A number is a series of 1 or more digit chars in a row.

sumNumbers("abc123xyz") → 123
sumNumbers("aa11b33") → 44
sumNumbers("7 11") → 18`,
    examples: [
      { input: 'sumNumbers("abc123xyz")', output: "123" },
      { input: 'sumNumbers("aa11b33")', output: "44" },
      { input: 'sumNumbers("7 11")', output: "18" }
    ],
    functionSignature: "public int sumNumbers(String str)"
  },
  {
    id: "notReplace",
    name: "notReplace",
    difficulty: "H",
    description: `Given a string, return a string where every appearance of the lowercase word "is" has been replaced with "is not". The word "is" should not be immediately preceeded or followed by a letter -- so for example the "is" in "this" does not count.

notReplace("is test") → "is not test"
notReplace("is-is") → "is not-is not"
notReplace("This is right") → "This is not right"`,
    examples: [
      { input: 'notReplace("is test")', output: "is not test" },
      { input: 'notReplace("is-is")', output: "is not-is not" },
      { input: 'notReplace("This is right")', output: "This is not right" }
    ],
    functionSignature: "public String notReplace(String str)"
  },
  {
    id: "countSubstrings",
    name: "countSubstrings",
    difficulty: "H",
    description: `Given a string, count the number of times a given substring appears in the string (non-overlapping).

countSubstrings("catcowcat", "cat") → 2
countSubstrings("catcowcat", "cow") → 1
countSubstrings("cccatcowcatxx", "cat") → 2`,
    examples: [
      { input: 'countSubstrings("catcowcat", "cat")', output: "2" },
      { input: 'countSubstrings("catcowcat", "cow")', output: "1" },
      { input: 'countSubstrings("cccatcowcatxx", "cat")', output: "2" }
    ],
    functionSignature: "public int countSubstrings(String str, String sub)"
  },
  {
    id: "findSubstring",
    name: "findSubstring",
    difficulty: "H",
    description: `Given two strings, return the index of the first occurrence of the second string in the first string, or -1 if not found.

findSubstring("abXYab", "XY") → 2
findSubstring("abXYab", "XYab") → 2
findSubstring("abXYab", "Z") → -1`,
    examples: [
      { input: 'findSubstring("abXYab", "XY")', output: "2" },
      { input: 'findSubstring("abXYab", "XYab")', output: "2" },
      { input: 'findSubstring("abXYab", "Z")', output: "-1" }
    ],
    functionSignature: "public int findSubstring(String str, String sub)"
  },
  {
    id: "replaceSubstring",
    name: "replaceSubstring",
    difficulty: "H",
    description: `Given a string and two substrings, replace all occurrences of the first substring with the second substring.

replaceSubstring("abXYab", "XY", "cd") → "abcdab"
replaceSubstring("abXYabXY", "XY", "cd") → "abcdabcd"
replaceSubstring("abXYab", "XY", "") → "abab"`,
    examples: [
      { input: 'replaceSubstring("abXYab", "XY", "cd")', output: "abcdab" },
      { input: 'replaceSubstring("abXYabXY", "XY", "cd")', output: "abcdabcd" },
      { input: 'replaceSubstring("abXYab", "XY", "")', output: "abab" }
    ],
    functionSignature: "public String replaceSubstring(String str, String oldSub, String newSub)"
  },
  {
    id: "hasSubstring",
    name: "hasSubstring",
    difficulty: "H",
    description: `Given two strings, return true if the first string contains the second string as a substring.

hasSubstring("abXYab", "XY") → true
hasSubstring("abXYab", "Z") → false
hasSubstring("abXYab", "ab") → true`,
    examples: [
      { input: 'hasSubstring("abXYab", "XY")', output: "true" },
      { input: 'hasSubstring("abXYab", "Z")', output: "false" },
      { input: 'hasSubstring("abXYab", "ab")', output: "true" }
    ],
    functionSignature: "public boolean hasSubstring(String str, String sub)"
  },
  {
    id: "reverseWords",
    name: "reverseWords",
    difficulty: "H",
    description: `Given a string of words separated by spaces, return a new string with the words in reverse order.

reverseWords("the sky is blue") → "blue is sky the"
reverseWords("hello world") → "world hello"
reverseWords("a good   example") → "example good a"`,
    examples: [
      { input: 'reverseWords("the sky is blue")', output: "blue is sky the" },
      { input: 'reverseWords("hello world")', output: "world hello" },
      { input: 'reverseWords("a good   example")', output: "example good a" }
    ],
    functionSignature: "public String reverseWords(String str)"
  },
  {
    id: "removeDuplicates",
    name: "removeDuplicates",
    difficulty: "H",
    description: `Given a string, remove duplicate characters, keeping only the first occurrence of each character.

removeDuplicates("aabbcc") → "abc"
removeDuplicates("abcabc") → "abc"
removeDuplicates("abcdef") → "abcdef"`,
    examples: [
      { input: 'removeDuplicates("aabbcc")', output: "abc" },
      { input: 'removeDuplicates("abcabc")', output: "abc" },
      { input: 'removeDuplicates("abcdef")', output: "abcdef" }
    ],
    functionSignature: "public String removeDuplicates(String str)"
  },
  {
    id: "compressString",
    name: "compressString",
    difficulty: "H",
    description: `Given a string, compress it by replacing consecutive duplicate characters with the character followed by its count.

compressString("aabcccccaaa") → "a2b1c5a3"
compressString("abcdef") → "a1b1c1d1e1f1"
compressString("aabb") → "a2b2"`,
    examples: [
      { input: 'compressString("aabcccccaaa")', output: "a2b1c5a3" },
      { input: 'compressString("abcdef")', output: "a1b1c1d1e1f1" },
      { input: 'compressString("aabb")', output: "a2b2" }
    ],
    functionSignature: "public String compressString(String str)"
  },
  {
    id: "expandString",
    name: "expandString",
    difficulty: "H",
    description: `Given a compressed string like "a2b1c5", expand it to "aabccccc".

expandString("a2b1c5") → "aabccccc"
expandString("a1b1") → "ab"
expandString("a3") → "aaa"`,
    examples: [
      { input: 'expandString("a2b1c5")', output: "aabccccc" },
      { input: 'expandString("a1b1")', output: "ab" },
      { input: 'expandString("a3")', output: "aaa" }
    ],
    functionSignature: "public String expandString(String str)"
  },
  {
    id: "longestCommonSubstring",
    name: "longestCommonSubstring",
    difficulty: "H",
    description: `Given two strings, find the length of the longest common substring.

longestCommonSubstring("abcdef", "abcxyz") → 3
longestCommonSubstring("xyzabc", "abc") → 3
longestCommonSubstring("hello", "world") → 1`,
    examples: [
      { input: 'longestCommonSubstring("abcdef", "abcxyz")', output: "3" },
      { input: 'longestCommonSubstring("xyzabc", "abc")', output: "3" },
      { input: 'longestCommonSubstring("hello", "world")', output: "1" }
    ],
    functionSignature: "public int longestCommonSubstring(String a, String b)"
  },
  {
    id: "isAnagram",
    name: "isAnagram",
    difficulty: "H",
    description: `Given two strings, return true if they are anagrams (contain the same characters in any order).

isAnagram("listen", "silent") → true
isAnagram("hello", "world") → false
isAnagram("anagram", "nagaram") → true`,
    examples: [
      { input: 'isAnagram("listen", "silent")', output: "true" },
      { input: 'isAnagram("hello", "world")', output: "false" },
      { input: 'isAnagram("anagram", "nagaram")', output: "true" }
    ],
    functionSignature: "public boolean isAnagram(String a, String b)"
  },
  {
    id: "rotateString",
    name: "rotateString",
    difficulty: "H",
    description: `Given a string and an integer k, rotate the string k positions to the right.

rotateString("abcdef", 2) → "efabcd"
rotateString("abcdef", 3) → "defabc"
rotateString("abc", 1) → "cab"`,
    examples: [
      { input: 'rotateString("abcdef", 2)', output: "efabcd" },
      { input: 'rotateString("abcdef", 3)', output: "defabc" },
      { input: 'rotateString("abc", 1)', output: "cab" }
    ],
    functionSignature: "public String rotateString(String str, int k)"
  }
];

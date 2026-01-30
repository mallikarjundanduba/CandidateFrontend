// Map-2 Questions
export const map2Questions = [
  {
    id: "word0",
    name: "word0",
    difficulty: "H",
    description: `Given an array of strings, return a Map<String, Integer> containing a key for every different string in the array, always with the value 0.

word0(["a", "b", "a", "b"]) → {"a": 0, "b": 0}
word0(["a", "b", "a", "c", "b"]) → {"a": 0, "b": 0, "c": 0}
word0(["c", "b", "a"]) → {"a": 0, "b": 0, "c": 0}`,
    examples: [
      { input: 'word0(["a", "b", "a", "b"])', output: '{"a": 0, "b": 0}' },
      { input: 'word0(["a", "b", "a", "c", "b"])', output: '{"a": 0, "b": 0, "c": 0}' },
      { input: 'word0(["c", "b", "a"])', output: '{"a": 0, "b": 0, "c": 0}' }
    ],
    functionSignature: "public Map<String, Integer> word0(String[] strings)"
  },
  {
    id: "wordLen",
    name: "wordLen",
    difficulty: "H",
    description: `Given an array of strings, return a Map<String, Integer> containing a key for every different string in the array, and the value is that string's length.

wordLen(["a", "bb", "a", "bb"]) → {"bb": 2, "a": 1}
wordLen(["this", "and", "that", "and"]) → {"that": 4, "and": 3, "this": 4}
wordLen(["code", "code", "code", "bug"]) → {"code": 4, "bug": 3}`,
    examples: [
      { input: 'wordLen(["a", "bb", "a", "bb"])', output: '{"bb": 2, "a": 1}' },
      { input: 'wordLen(["this", "and", "that", "and"])', output: '{"that": 4, "and": 3, "this": 4}' },
      { input: 'wordLen(["code", "code", "code", "bug"])', output: '{"code": 4, "bug": 3}' }
    ],
    functionSignature: "public Map<String, Integer> wordLen(String[] strings)"
  },
  {
    id: "pairs",
    name: "pairs",
    difficulty: "H",
    description: `Given an array of non-empty strings, create and return a Map<String, String> as follows: for each string add its first character as a key with its last character as the value.

pairs(["code", "bug"]) → {"b": "g", "c": "e"}
pairs(["man", "moon", "main"]) → {"m": "n"}
pairs(["man", "moon", "good", "night"]) → {"g": "d", "m": "n", "n": "t"}`,
    examples: [
      { input: 'pairs(["code", "bug"])', output: '{"b": "g", "c": "e"}' },
      { input: 'pairs(["man", "moon", "main"])', output: '{"m": "n"}' },
      { input: 'pairs(["man", "moon", "good", "night"])', output: '{"g": "d", "m": "n", "n": "t"}' }
    ],
    functionSignature: "public Map<String, String> pairs(String[] strings)"
  },
  {
    id: "wordCount",
    name: "wordCount",
    difficulty: "H",
    description: `The classic word-count algorithm: given an array of strings, return a Map<String, Integer> with a key for each different string, with the value the number of times that string appears in the array.

wordCount(["a", "b", "a", "c", "b"]) → {"a": 2, "b": 2, "c": 1}
wordCount(["c", "b", "a"]) → {"a": 1, "b": 1, "c": 1}
wordCount(["c", "c", "c", "c"]) → {"c": 4}`,
    examples: [
      { input: 'wordCount(["a", "b", "a", "c", "b"])', output: '{"a": 2, "b": 2, "c": 1}' },
      { input: 'wordCount(["c", "b", "a"])', output: '{"a": 1, "b": 1, "c": 1}' },
      { input: 'wordCount(["c", "c", "c", "c"])', output: '{"c": 4}' }
    ],
    functionSignature: "public Map<String, Integer> wordCount(String[] strings)"
  },
  {
    id: "firstChar",
    name: "firstChar",
    difficulty: "H",
    description: `Given an array of non-empty strings, return a Map<String, String> with a key for every different first character seen, with the value of all the strings starting with that character appended together in the order they appear in the array.

firstChar(["salt", "tea", "soda", "toast"]) → {"s": "saltsoda", "t": "teatoast"}
firstChar(["aa", "bb", "cc", "aAA", "cCC", "d"]) → {"a": "aaaAA", "b": "bb", "c": "cccCC", "d": "d"}
firstChar([]) → {}`,
    examples: [
      { input: 'firstChar(["salt", "tea", "soda", "toast"])', output: '{"s": "saltsoda", "t": "teatoast"}' },
      { input: 'firstChar(["aa", "bb", "cc", "aAA", "cCC", "d"])', output: '{"a": "aaaAA", "b": "bb", "c": "cccCC", "d": "d"}' },
      { input: 'firstChar([])', output: '{}' }
    ],
    functionSignature: "public Map<String, String> firstChar(String[] strings)"
  },
  {
    id: "wordAppend",
    name: "wordAppend",
    difficulty: "H",
    description: `Loop over the given array of strings to build a result string like this: when a string appears the 2nd, 4th, 6th, etc. time in the array, append the string to the result. Return the empty string if no string appears a 2nd time.

wordAppend(["a", "b", "a"]) → "a"
wordAppend(["a", "b", "a", "c", "a", "d", "a"]) → "aa"
wordAppend(["a", "", "a"]) → "a"`,
    examples: [
      { input: 'wordAppend(["a", "b", "a"])', output: '"a"' },
      { input: 'wordAppend(["a", "b", "a", "c", "a", "d", "a"])', output: '"aa"' },
      { input: 'wordAppend(["a", "", "a"])', output: '"a"' }
    ],
    functionSignature: "public String wordAppend(String[] strings)"
  },
  {
    id: "wordMultiple",
    name: "wordMultiple",
    difficulty: "H",
    description: `Given an array of strings, return a Map<String, Boolean> where each different string is a key and its value is true if that string appears 2 or more times in the array.

wordMultiple(["a", "b", "a", "c", "b"]) → {"a": true, "b": true, "c": false}
wordMultiple(["c", "b", "a"]) → {"a": false, "b": false, "c": false}
wordMultiple(["c", "c", "c", "c"]) → {"c": true}`,
    examples: [
      { input: 'wordMultiple(["a", "b", "a", "c", "b"])', output: '{"a": true, "b": true, "c": false}' },
      { input: 'wordMultiple(["c", "b", "a"])', output: '{"a": false, "b": false, "c": false}' },
      { input: 'wordMultiple(["c", "c", "c", "c"])', output: '{"c": true}' }
    ],
    functionSignature: "public Map<String, Boolean> wordMultiple(String[] strings)"
  },
  {
    id: "allSwap",
    name: "allSwap",
    difficulty: "H",
    description: `We'll say that 2 strings "match" if they are non-empty and their first chars are the same. Loop over and then return the given array of non-empty strings as follows: if a string matches an earlier string in the array, swap the 2 strings in the array.

allSwap(["ab", "ac"]) → ["ac", "ab"]
allSwap(["ax", "bx", "cx", "cy", "by", "ay", "aaa", "azz"]) → ["ay", "by", "cy", "cx", "bx", "ax", "azz", "aaa"]
allSwap(["ax", "bx", "ay", "by", "ai", "aj", "bx", "by"]) → ["ay", "by", "ax", "bx", "aj", "ai", "by", "bx"]`,
    examples: [
      { input: 'allSwap(["ab", "ac"])', output: '["ac", "ab"]' },
      { input: 'allSwap(["ax", "bx", "cx", "cy", "by", "ay", "aaa", "azz"])', output: '["ay", "by", "cy", "cx", "bx", "ax", "azz", "aaa"]' },
      { input: 'allSwap(["ax", "bx", "ay", "by", "ai", "aj", "bx", "by"])', output: '["ay", "by", "ax", "bx", "aj", "ai", "by", "bx"]' }
    ],
    functionSignature: "public String[] allSwap(String[] strings)"
  },
  {
    id: "firstSwap",
    name: "firstSwap",
    difficulty: "H",
    description: `We'll say that 2 strings "match" if they are non-empty and their first chars are the same. Loop over and then return the given array of non-empty strings as follows: if a string matches an earlier string in the array, swap the 2 strings in the array.

firstSwap(["ab", "ac"]) → ["ac", "ab"]
firstSwap(["ax", "bx", "cx", "cy", "by", "ay", "aaa", "azz"]) → ["ay", "by", "cy", "cx", "bx", "ax", "aaa", "azz"]
firstSwap(["ax", "bx", "ay", "by", "ai", "aj", "bx", "by"]) → ["ay", "by", "ax", "bx", "ai", "aj", "bx", "by"]`,
    examples: [
      { input: 'firstSwap(["ab", "ac"])', output: '["ac", "ab"]' },
      { input: 'firstSwap(["ax", "bx", "cx", "cy", "by", "ay", "aaa", "azz"])', output: '["ay", "by", "cy", "cx", "bx", "ax", "aaa", "azz"]' },
      { input: 'firstSwap(["ax", "bx", "ay", "by", "ai", "aj", "bx", "by"])', output: '["ay", "by", "ax", "bx", "ai", "aj", "bx", "by"]' }
    ],
    functionSignature: "public String[] firstSwap(String[] strings)"
  },
  {
    id: "mapChars",
    name: "mapChars",
    difficulty: "H",
    description: `Given an array of strings, return a Map<String, Integer> containing a key for every different character in the array, with the value being the count of that character.

mapChars(["a", "bb", "a", "bb"]) → {"a": 2, "b": 4}
mapChars(["this", "and", "that"]) → {"t": 4, "h": 2, "i": 1, "s": 2, "a": 2, "n": 1, "d": 1}
mapChars(["code", "code", "code"]) → {"c": 3, "o": 3, "d": 3, "e": 3}`,
    examples: [
      { input: 'mapChars(["a", "bb", "a", "bb"])', output: '{"a": 2, "b": 4}' },
      { input: 'mapChars(["this", "and", "that"])', output: '{"t": 4, "h": 2, "i": 1, "s": 2, "a": 2, "n": 1, "d": 1}' },
      { input: 'mapChars(["code", "code", "code"])', output: '{"c": 3, "o": 3, "d": 3, "e": 3}' }
    ],
    functionSignature: "public Map<String, Integer> mapChars(String[] strings)"
  },
  {
    id: "mapLength",
    name: "mapLength",
    difficulty: "H",
    description: `Given an array of strings, return a Map<String, Integer> containing a key for every different length of string in the array, with the value being the number of strings with that length.

mapLength(["a", "bb", "a", "bb"]) → {1: 2, 2: 2}
mapLength(["this", "and", "that", "and"]) → {4: 2, 3: 2}
mapLength(["code", "code", "code", "bug"]) → {4: 3, 3: 1}`,
    examples: [
      { input: 'mapLength(["a", "bb", "a", "bb"])', output: '{1: 2, 2: 2}' },
      { input: 'mapLength(["this", "and", "that", "and"])', output: '{4: 2, 3: 2}' },
      { input: 'mapLength(["code", "code", "code", "bug"])', output: '{4: 3, 3: 1}' }
    ],
    functionSignature: "public Map<Integer, Integer> mapLength(String[] strings)"
  },
  {
    id: "mapAB3",
    name: "mapAB3",
    difficulty: "H",
    description: `Given an array of strings, return a Map<String, Integer> containing a key for every different string in the array, always with the value 0, except for strings that appear an even number of times, which have the value 1.

mapAB3(["a", "b", "a", "b"]) → {"a": 1, "b": 1}
mapAB3(["a", "b", "a", "c", "b"]) → {"a": 0, "b": 0, "c": 0}
mapAB3(["a", "b", "c"]) → {"a": 0, "b": 0, "c": 0}`,
    examples: [
      { input: 'mapAB3(["a", "b", "a", "b"])', output: '{"a": 1, "b": 1}' },
      { input: 'mapAB3(["a", "b", "a", "c", "b"])', output: '{"a": 0, "b": 0, "c": 0}' },
      { input: 'mapAB3(["a", "b", "c"])', output: '{"a": 0, "b": 0, "c": 0}' }
    ],
    functionSignature: "public Map<String, Integer> mapAB3(String[] strings)"
  },
  {
    id: "mapAB4",
    name: "mapAB4",
    difficulty: "H",
    description: `Given an array of strings, return a Map<String, Integer> containing a key for every different string in the array, with the value being the first index where that string appears.

mapAB4(["a", "b", "a", "b"]) → {"a": 0, "b": 1}
mapAB4(["a", "b", "a", "c", "b"]) → {"a": 0, "b": 1, "c": 3}
mapAB4(["c", "b", "a"]) → {"a": 2, "b": 1, "c": 0}`,
    examples: [
      { input: 'mapAB4(["a", "b", "a", "b"])', output: '{"a": 0, "b": 1}' },
      { input: 'mapAB4(["a", "b", "a", "c", "b"])', output: '{"a": 0, "b": 1, "c": 3}' },
      { input: 'mapAB4(["c", "b", "a"])', output: '{"a": 2, "b": 1, "c": 0}' }
    ],
    functionSignature: "public Map<String, Integer> mapAB4(String[] strings)"
  },
  {
    id: "mapAB5",
    name: "mapAB5",
    difficulty: "H",
    description: `Given an array of strings, return a Map<String, Integer> containing a key for every different string in the array, with the value being the last index where that string appears.

mapAB5(["a", "b", "a", "b"]) → {"a": 2, "b": 3}
mapAB5(["a", "b", "a", "c", "b"]) → {"a": 2, "b": 4, "c": 3}
mapAB5(["c", "b", "a"]) → {"a": 2, "b": 1, "c": 0}`,
    examples: [
      { input: 'mapAB5(["a", "b", "a", "b"])', output: '{"a": 2, "b": 3}' },
      { input: 'mapAB5(["a", "b", "a", "c", "b"])', output: '{"a": 2, "b": 4, "c": 3}' },
      { input: 'mapAB5(["c", "b", "a"])', output: '{"a": 2, "b": 1, "c": 0}' }
    ],
    functionSignature: "public Map<String, Integer> mapAB5(String[] strings)"
  },
  {
    id: "mapAB6",
    name: "mapAB6",
    difficulty: "H",
    description: `Given an array of strings, return a Map<String, String> where each key is a string from the array and the value is the string reversed.

mapAB6(["a", "b", "c"]) → {"a": "a", "b": "b", "c": "c"}
mapAB6(["hello", "world"]) → {"hello": "olleh", "world": "dlrow"}
mapAB6(["a"]) → {"a": "a"}`,
    examples: [
      { input: 'mapAB6(["a", "b", "c"])', output: '{"a": "a", "b": "b", "c": "c"}' },
      { input: 'mapAB6(["hello", "world"])', output: '{"hello": "olleh", "world": "dlrow"}' },
      { input: 'mapAB6(["a"])', output: '{"a": "a"}' }
    ],
    functionSignature: "public Map<String, String> mapAB6(String[] strings)"
  },
  {
    id: "mapAB7",
    name: "mapAB7",
    difficulty: "H",
    description: `Given an array of strings, return a Map<String, Integer> where each key is a string from the array and the value is the length of that string squared.

mapAB7(["a", "bb", "ccc"]) → {"a": 1, "bb": 4, "ccc": 9}
mapAB7(["hello", "world"]) → {"hello": 25, "world": 25}
mapAB7(["x"]) → {"x": 1}`,
    examples: [
      { input: 'mapAB7(["a", "bb", "ccc"])', output: '{"a": 1, "bb": 4, "ccc": 9}' },
      { input: 'mapAB7(["hello", "world"])', output: '{"hello": 25, "world": 25}' },
      { input: 'mapAB7(["x"])', output: '{"x": 1}' }
    ],
    functionSignature: "public Map<String, Integer> mapAB7(String[] strings)"
  },
  {
    id: "mapAB8",
    name: "mapAB8",
    difficulty: "H",
    description: `Given an array of strings, return a Map<String, String> where each key is the first character of a string and the value is all strings starting with that character concatenated together.

mapAB8(["apple", "banana", "apricot"]) → {"a": "appleapricot", "b": "banana"}
mapAB8(["cat", "dog", "cow"]) → {"c": "catcow", "d": "dog"}
mapAB8(["a", "aa", "aaa"]) → {"a": "aaaaaa"}`,
    examples: [
      { input: 'mapAB8(["apple", "banana", "apricot"])', output: '{"a": "appleapricot", "b": "banana"}' },
      { input: 'mapAB8(["cat", "dog", "cow"])', output: '{"c": "catcow", "d": "dog"}' },
      { input: 'mapAB8(["a", "aa", "aaa"])', output: '{"a": "aaaaaa"}' }
    ],
    functionSignature: "public Map<String, String> mapAB8(String[] strings)"
  },
  {
    id: "mapAB9",
    name: "mapAB9",
    difficulty: "H",
    description: `Given an array of strings, return a Map<String, Integer> where each key is a string from the array and the value is the number of vowels in that string.

mapAB9(["hello", "world", "java"]) → {"hello": 2, "world": 1, "java": 2}
mapAB9(["apple", "banana"]) → {"apple": 2, "banana": 3}
mapAB9(["xyz"]) → {"xyz": 0}`,
    examples: [
      { input: 'mapAB9(["hello", "world", "java"])', output: '{"hello": 2, "world": 1, "java": 2}' },
      { input: 'mapAB9(["apple", "banana"])', output: '{"apple": 2, "banana": 3}' },
      { input: 'mapAB9(["xyz"])', output: '{"xyz": 0}' }
    ],
    functionSignature: "public Map<String, Integer> mapAB9(String[] strings)"
  },
  {
    id: "mapAB10",
    name: "mapAB10",
    difficulty: "H",
    description: `Given an array of strings, return a Map<String, Boolean> where each key is a string from the array and the value is true if the string starts and ends with the same character, false otherwise.

mapAB10(["aba", "abc", "aaa"]) → {"aba": true, "abc": false, "aaa": true}
mapAB10(["hello", "world", "x"]) → {"hello": false, "world": false, "x": true}
mapAB10(["a", "b", "c"]) → {"a": true, "b": true, "c": true}`,
    examples: [
      { input: 'mapAB10(["aba", "abc", "aaa"])', output: '{"aba": true, "abc": false, "aaa": true}' },
      { input: 'mapAB10(["hello", "world", "x"])', output: '{"hello": false, "world": false, "x": true}' },
      { input: 'mapAB10(["a", "b", "c"])', output: '{"a": true, "b": true, "c": true}' }
    ],
    functionSignature: "public Map<String, Boolean> mapAB10(String[] strings)"
  }
];

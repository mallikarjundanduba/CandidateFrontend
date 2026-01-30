// String-1 Questions
export const string1Questions = [
  {
    id: "helloName",
    name: "helloName",
    difficulty: "H",
    description: `Given a string name, e.g. "Bob", return a greeting of the form "Hello Bob!".

helloName("Bob") → "Hello Bob!"
helloName("Alice") → "Hello Alice!"
helloName("X") → "Hello X!"`,
    examples: [
      { input: 'helloName("Bob")', output: '"Hello Bob!"' },
      { input: 'helloName("Alice")', output: '"Hello Alice!"' },
      { input: 'helloName("X")', output: '"Hello X!"' }
    ],
    functionSignature: "public String helloName(String name)"
  },
  {
    id: "makeAbba",
    name: "makeAbba",
    difficulty: "H",
    description: `Given two strings, a and b, return the result of putting them together in the order abba, e.g. "Hi" and "Bye" returns "HiByeByeHi".

makeAbba("Hi", "Bye") → "HiByeByeHi"
makeAbba("Yo", "Alice") → "YoAliceAliceYo"
makeAbba("What", "Up") → "WhatUpUpWhat"`,
    examples: [
      { input: 'makeAbba("Hi", "Bye")', output: '"HiByeByeHi"' },
      { input: 'makeAbba("Yo", "Alice")', output: '"YoAliceAliceYo"' },
      { input: 'makeAbba("What", "Up")', output: '"WhatUpUpWhat"' }
    ],
    functionSignature: "public String makeAbba(String a, String b)"
  },
  {
    id: "makeTags",
    name: "makeTags",
    difficulty: "H",
    description: `The web is built with HTML strings like "<i>Yay</i>" which draws Yay as italic text. In this example, the "i" tag makes <i> and </i> which surround the word "Yay". Given tag and word strings, create the HTML string with tags around the word, e.g. "<i>Yay</i>".

makeTags("i", "Yay") → "<i>Yay</i>"
makeTags("i", "Hello") → "<i>Hello</i>"
makeTags("cite", "Yay") → "<cite>Yay</cite>"`,
    examples: [
      { input: 'makeTags("i", "Yay")', output: '"<i>Yay</i>"' },
      { input: 'makeTags("i", "Hello")', output: '"<i>Hello</i>"' },
      { input: 'makeTags("cite", "Yay")', output: '"<cite>Yay</cite>"' }
    ],
    functionSignature: "public String makeTags(String tag, String word)"
  },
  {
    id: "makeOutWord",
    name: "makeOutWord",
    difficulty: "H",
    description: `Given an "out" string length 4, such as "<<>>", and a word, return a new string where the word is in the middle of the out string, e.g. "<<word>>".

makeOutWord("<<>>", "Yay") → "<<Yay>>"
makeOutWord("<<>>", "WooHoo") → "<<WooHoo>>"
makeOutWord("[[]]", "word") → "[[word]]"`,
    examples: [
      { input: 'makeOutWord("<<>>", "Yay")', output: '"<<Yay>>"' },
      { input: 'makeOutWord("<<>>", "WooHoo")', output: '"<<WooHoo>>"' },
      { input: 'makeOutWord("[[]]", "word")', output: '"[[word]]"' }
    ],
    functionSignature: "public String makeOutWord(String out, String word)"
  },
  {
    id: "extraEnd",
    name: "extraEnd",
    difficulty: "H",
    description: `Given a string, return a new string made of 3 copies of the last 2 chars of the original string. The string length will be at least 2.

extraEnd("Hello") → "lololo"
extraEnd("ab") → "ababab"
extraEnd("Hi") → "HiHiHi"`,
    examples: [
      { input: 'extraEnd("Hello")', output: '"lololo"' },
      { input: 'extraEnd("ab")', output: '"ababab"' },
      { input: 'extraEnd("Hi")', output: '"HiHiHi"' }
    ],
    functionSignature: "public String extraEnd(String str)"
  },
  {
    id: "firstTwo",
    name: "firstTwo",
    difficulty: "H",
    description: `Given a string, return the string made of its first two chars, so the String "Hello" yields "He". If the string is shorter than length 2, return whatever there is, so "X" yields "X", and the empty string "" yields the empty string "".

firstTwo("Hello") → "He"
firstTwo("abcdefg") → "ab"
firstTwo("ab") → "ab"`,
    examples: [
      { input: 'firstTwo("Hello")', output: '"He"' },
      { input: 'firstTwo("abcdefg")', output: '"ab"' },
      { input: 'firstTwo("ab")', output: '"ab"' }
    ],
    functionSignature: "public String firstTwo(String str)"
  },
  {
    id: "firstHalf",
    name: "firstHalf",
    difficulty: "H",
    description: `Given a string of even length, return the first half. So the string "WooHoo" yields "Woo".

firstHalf("WooHoo") → "Woo"
firstHalf("HelloThere") → "Hello"
firstHalf("abcdef") → "abc"`,
    examples: [
      { input: 'firstHalf("WooHoo")', output: '"Woo"' },
      { input: 'firstHalf("HelloThere")', output: '"Hello"' },
      { input: 'firstHalf("abcdef")', output: '"abc"' }
    ],
    functionSignature: "public String firstHalf(String str)"
  },
  {
    id: "withoutEnd",
    name: "withoutEnd",
    difficulty: "H",
    description: `Given a string, return a version without the first and last char, so "Hello" yields "ell". The string length will be at least 2.

withoutEnd("Hello") → "ell"
withoutEnd("java") → "av"
withoutEnd("coding") → "odin"`,
    examples: [
      { input: 'withoutEnd("Hello")', output: '"ell"' },
      { input: 'withoutEnd("java")', output: '"av"' },
      { input: 'withoutEnd("coding")', output: '"odin"' }
    ],
    functionSignature: "public String withoutEnd(String str)"
  },
  {
    id: "comboString",
    name: "comboString",
    difficulty: "H",
    description: `Given 2 strings, a and b, return a string of the form short+long+short, with the shorter string on the outside and the longer string on the inside. The strings will not be the same length, but they may be empty (length 0).

comboString("Hello", "hi") → "hiHellohi"
comboString("hi", "Hello") → "hiHellohi"
comboString("aaa", "b") → "baaab"`,
    examples: [
      { input: 'comboString("Hello", "hi")', output: '"hiHellohi"' },
      { input: 'comboString("hi", "Hello")', output: '"hiHellohi"' },
      { input: 'comboString("aaa", "b")', output: '"baaab"' }
    ],
    functionSignature: "public String comboString(String a, String b)"
  },
  {
    id: "nonStart",
    name: "nonStart",
    difficulty: "H",
    description: `Given 2 strings, return their concatenation, except omit the first char of each. The strings will be at least length 1.

nonStart("Hello", "There") → "ellohere"
nonStart("java", "code") → "avaode"
nonStart("shotl", "java") → "hotlava"`,
    examples: [
      { input: 'nonStart("Hello", "There")', output: '"ellohere"' },
      { input: 'nonStart("java", "code")', output: '"avaode"' },
      { input: 'nonStart("shotl", "java")', output: '"hotlava"' }
    ],
    functionSignature: "public String nonStart(String a, String b)"
  },
  {
    id: "left2",
    name: "left2",
    difficulty: "H",
    description: `Given a string, return a "rotated left 2" version where the first 2 chars are moved to the end. The string length will be at least 2.

left2("Hello") → "lloHe"
left2("java") → "vaja"
left2("Hi") → "Hi"`,
    examples: [
      { input: 'left2("Hello")', output: '"lloHe"' },
      { input: 'left2("java")', output: '"vaja"' },
      { input: 'left2("Hi")', output: '"Hi"' }
    ],
    functionSignature: "public String left2(String str)"
  },
  {
    id: "right2",
    name: "right2",
    difficulty: "H",
    description: `Given a string, return a "rotated right 2" version where the last 2 chars are moved to the start. The string length will be at least 2.

right2("Hello") → "loHel"
right2("java") → "vaja"
right2("Hi") → "Hi"`,
    examples: [
      { input: 'right2("Hello")', output: '"loHel"' },
      { input: 'right2("java")', output: '"vaja"' },
      { input: 'right2("Hi")', output: '"Hi"' }
    ],
    functionSignature: "public String right2(String str)"
  },
  {
    id: "theEnd",
    name: "theEnd",
    difficulty: "H",
    description: `Given a string, return a string length 1 from its front, unless front is false, in which case return a string length 1 from its back. The string will be non-empty.

theEnd("Hello", true) → "H"
theEnd("Hello", false) → "o"
theEnd("oh", true) → "o"`,
    examples: [
      { input: 'theEnd("Hello", true)', output: '"H"' },
      { input: 'theEnd("Hello", false)', output: '"o"' },
      { input: 'theEnd("oh", true)', output: '"o"' }
    ],
    functionSignature: "public String theEnd(String str, boolean front)"
  },
  {
    id: "withoutEnd2",
    name: "withoutEnd2",
    difficulty: "H",
    description: `Given a string, return a version without both the first and last char of the string. The string may be any length, including 0.

withoutEnd2("Hello") → "ell"
withoutEnd2("abc") → "b"
withoutEnd2("ab") → ""`,
    examples: [
      { input: 'withoutEnd2("Hello")', output: '"ell"' },
      { input: 'withoutEnd2("abc")', output: '"b"' },
      { input: 'withoutEnd2("ab")', output: '""' }
    ],
    functionSignature: "public String withoutEnd2(String str)"
  },
  {
    id: "middleTwo",
    name: "middleTwo",
    difficulty: "H",
    description: `Given a string of even length, return a string made of the middle two chars, so the string "string" yields "ri". The string length will be at least 2.

middleTwo("string") → "ri"
middleTwo("code") → "od"
middleTwo("Practice") → "ct"`,
    examples: [
      { input: 'middleTwo("string")', output: '"ri"' },
      { input: 'middleTwo("code")', output: '"od"' },
      { input: 'middleTwo("Practice")', output: '"ct"' }
    ],
    functionSignature: "public String middleTwo(String str)"
  },
  {
    id: "endsLy",
    name: "endsLy",
    difficulty: "H",
    description: `Given a string, return true if it ends in "ly".

endsLy("oddly") → true
endsLy("y") → false
endsLy("oddy") → false`,
    examples: [
      { input: 'endsLy("oddly")', output: "true" },
      { input: 'endsLy("y")', output: "false" },
      { input: 'endsLy("oddy")', output: "false" }
    ],
    functionSignature: "public boolean endsLy(String str)"
  },
  {
    id: "nTwice",
    name: "nTwice",
    difficulty: "H",
    description: `Given a string and an int n, return a string made of the first and last n chars from the string. The string length will be at least n.

nTwice("Hello", 2) → "Helo"
nTwice("Chocolate", 3) → "Choate"
nTwice("Chocolate", 1) → "Ce"`,
    examples: [
      { input: 'nTwice("Hello", 2)', output: '"Helo"' },
      { input: 'nTwice("Chocolate", 3)', output: '"Choate"' },
      { input: 'nTwice("Chocolate", 1)', output: '"Ce"' }
    ],
    functionSignature: "public String nTwice(String str, int n)"
  },
  {
    id: "twoChar",
    name: "twoChar",
    difficulty: "H",
    description: `Given a string and an index, return a string length 2 starting at the given index. If the index is too big or too small to define a string length 2, use the first 2 chars. The string length will be at least 2.

twoChar("java", 0) → "ja"
twoChar("java", 2) → "va"
twoChar("java", 3) → "ja"`,
    examples: [
      { input: 'twoChar("java", 0)', output: '"ja"' },
      { input: 'twoChar("java", 2)', output: '"va"' },
      { input: 'twoChar("java", 3)', output: '"ja"' }
    ],
    functionSignature: "public String twoChar(String str, int index)"
  },
  {
    id: "middleThree",
    name: "middleThree",
    difficulty: "H",
    description: `Given a string of odd length, return the string length 3 from its middle, so "Candy" yields "and". The string length will be at least 3.

middleThree("Candy") → "and"
middleThree("and") → "and"
middleThree("solving") → "lvi"`,
    examples: [
      { input: 'middleThree("Candy")', output: '"and"' },
      { input: 'middleThree("and")', output: '"and"' },
      { input: 'middleThree("solving")', output: '"lvi"' }
    ],
    functionSignature: "public String middleThree(String str)"
  },
  {
    id: "hasBad",
    name: "hasBad",
    difficulty: "H",
    description: `Given a string, return true if "bad" appears starting at index 0 or 1 in the string, such as with "badxxx" or "xbadxx" but not "xxbadxx". The string may be any length, including 0.

hasBad("badxx") → true
hasBad("xbadxx") → true
hasBad("xxbadxx") → false`,
    examples: [
      { input: 'hasBad("badxx")', output: "true" },
      { input: 'hasBad("xbadxx")', output: "true" },
      { input: 'hasBad("xxbadxx")', output: "false" }
    ],
    functionSignature: "public boolean hasBad(String str)"
  },
  {
    id: "atFirst",
    name: "atFirst",
    difficulty: "H",
    description: `Given a string, return a string length 2 made of its first 2 chars. If the string length is less than 2, use '@' for the missing chars.

atFirst("hello") → "he"
atFirst("hi") → "hi"
atFirst("h") → "h@"`,
    examples: [
      { input: 'atFirst("hello")', output: '"he"' },
      { input: 'atFirst("hi")', output: '"hi"' },
      { input: 'atFirst("h")', output: '"h@"' }
    ],
    functionSignature: "public String atFirst(String str)"
  },
  {
    id: "lastChars",
    name: "lastChars",
    difficulty: "H",
    description: `Given 2 strings, a and b, return a new string made of the first char of a and the last char of b, so "yo" and "java" yields "ya". If either string is length 0, use '@' for its missing char.

lastChars("last", "chars") → "ls"
lastChars("yo", "java") → "ya"
lastChars("hi", "") → "h@"`,
    examples: [
      { input: 'lastChars("last", "chars")', output: '"ls"' },
      { input: 'lastChars("yo", "java")', output: '"ya"' },
      { input: 'lastChars("hi", "")', output: '"h@"' }
    ],
    functionSignature: "public String lastChars(String a, String b)"
  }
];

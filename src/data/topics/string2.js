// String-2 Questions
export const string2Questions = [
  {
    id: "doubleChar",
    name: "doubleChar",
    difficulty: "H",
    description: `Given a string, return a string where for every char in the original, there are two chars.

doubleChar("The") → "TThhee"
doubleChar("AAbb") → "AAAAbbbb"
doubleChar("Hi-There") → "HHii--TThheerree"`,
    examples: [
      { input: 'doubleChar("The")', output: '"TThhee"' },
      { input: 'doubleChar("AAbb")', output: '"AAAAbbbb"' },
      { input: 'doubleChar("Hi-There")', output: '"HHii--TThheerree"' }
    ],
    functionSignature: "public String doubleChar(String str)"
  },
  {
    id: "countHi",
    name: "countHi",
    difficulty: "H",
    description: `Return the number of times that the string "hi" appears anywhere in the given string.

countHi("abc hi ho") → 1
countHi("ABChi hi") → 2
countHi("hihi") → 2`,
    examples: [
      { input: 'countHi("abc hi ho")', output: "1" },
      { input: 'countHi("ABChi hi")', output: "2" },
      { input: 'countHi("hihi")', output: "2" }
    ],
    functionSignature: "public int countHi(String str)"
  },
  {
    id: "catDog",
    name: "catDog",
    difficulty: "H",
    description: `Return true if the string "cat" and "dog" appear the same number of times in the given string.

catDog("catdog") → true
catDog("catcat") → false
catDog("1cat1cadodog") → true`,
    examples: [
      { input: 'catDog("catdog")', output: "true" },
      { input: 'catDog("catcat")', output: "false" },
      { input: 'catDog("1cat1cadodog")', output: "true" }
    ],
    functionSignature: "public boolean catDog(String str)"
  },
  {
    id: "countCode",
    name: "countCode",
    difficulty: "H",
    description: `Return the number of times that the string "code" appears anywhere in the given string, except we'll accept any letter for the 'd', so "cope" and "cooe" count.

countCode("aaacodebbb") → 1
countCode("codexxcode") → 2
countCode("cozexxcope") → 2`,
    examples: [
      { input: 'countCode("aaacodebbb")', output: "1" },
      { input: 'countCode("codexxcode")', output: "2" },
      { input: 'countCode("cozexxcope")', output: "2" }
    ],
    functionSignature: "public int countCode(String str)"
  },
  {
    id: "endOther",
    name: "endOther",
    difficulty: "H",
    description: `Given two strings, return true if either of the strings appears at the very end of the other string, ignoring upper/lower case differences (in other words, the computation should not be "case sensitive").

endOther("Hiabc", "abc") → true
endOther("AbC", "HiaBc") → true
endOther("abc", "abXabc") → true`,
    examples: [
      { input: 'endOther("Hiabc", "abc")', output: "true" },
      { input: 'endOther("AbC", "HiaBc")', output: "true" },
      { input: 'endOther("abc", "abXabc")', output: "true" }
    ],
    functionSignature: "public boolean endOther(String a, String b)"
  },
  {
    id: "xyzThere",
    name: "xyzThere",
    difficulty: "H",
    description: `Return true if the given string contains an appearance of "xyz" where the xyz is not directly preceeded by a period (.). So "xxyz" counts but "x.xyz" does not.

xyzThere("abcxyz") → true
xyzThere("abc.xyz") → false
xyzThere("xyz.abc") → true`,
    examples: [
      { input: 'xyzThere("abcxyz")', output: "true" },
      { input: 'xyzThere("abc.xyz")', output: "false" },
      { input: 'xyzThere("xyz.abc")', output: "true" }
    ],
    functionSignature: "public boolean xyzThere(String str)"
  },
  {
    id: "bobThere",
    name: "bobThere",
    difficulty: "H",
    description: `Return true if the given string contains a "bob" string, but where the middle 'o' char can be any char.

bobThere("abcbob") → true
bobThere("b9b") → true
bobThere("bac") → false`,
    examples: [
      { input: 'bobThere("abcbob")', output: "true" },
      { input: 'bobThere("b9b")', output: "true" },
      { input: 'bobThere("bac")', output: "false" }
    ],
    functionSignature: "public boolean bobThere(String str)"
  },
  {
    id: "xyBalance",
    name: "xyBalance",
    difficulty: "H",
    description: `We'll say that a String is xy-balanced if for all the 'x' chars in the string, there exists a 'y' char somewhere later in the string. So "xxy" is balanced, but "xyx" is not. One 'y' can balance multiple 'x's. Return true if the given string is xy-balanced.

xyBalance("aaxbby") → true
xyBalance("aaxbb") → false
xyBalance("yaaxbb") → false`,
    examples: [
      { input: 'xyBalance("aaxbby")', output: "true" },
      { input: 'xyBalance("aaxbb")', output: "false" },
      { input: 'xyBalance("yaaxbb")', output: "false" }
    ],
    functionSignature: "public boolean xyBalance(String str)"
  },
  {
    id: "mixString",
    name: "mixString",
    difficulty: "H",
    description: `Given two strings, a and b, create a bigger string made of the first char of a, the first char of b, the second char of a, the second char of b, and so on. Any leftover chars go at the end of the result.

mixString("abc", "xyz") → "axbycz"
mixString("Hi", "There") → "HTihere"
mixString("xxxx", "There") → "xTxhxexre"`,
    examples: [
      { input: 'mixString("abc", "xyz")', output: '"axbycz"' },
      { input: 'mixString("Hi", "There")', output: '"HTihere"' },
      { input: 'mixString("xxxx", "There")', output: '"xTxhxexre"' }
    ],
    functionSignature: "public String mixString(String a, String b)"
  },
  {
    id: "repeatEnd",
    name: "repeatEnd",
    difficulty: "H",
    description: `Given a string and an int n, return a string made of n repetitions of the last n characters of the string. You may assume that n is between 0 and the length of the string, inclusive.

repeatEnd("Hello", 3) → "llollollo"
repeatEnd("Hello", 2) → "lolo"
repeatEnd("Hello", 1) → "o"`,
    examples: [
      { input: 'repeatEnd("Hello", 3)', output: '"llollollo"' },
      { input: 'repeatEnd("Hello", 2)', output: '"lolo"' },
      { input: 'repeatEnd("Hello", 1)', output: '"o"' }
    ],
    functionSignature: "public String repeatEnd(String str, int n)"
  },
  {
    id: "repeatFront",
    name: "repeatFront",
    difficulty: "H",
    description: `Given a string and an int n, return a string made of the first n characters of the string, followed by the first n-1 characters of the string, and so on. You may assume that n is between 0 and the length of the string, inclusive.

repeatFront("Chocolate", 4) → "ChocChoChC"
repeatFront("Chocolate", 3) → "ChoChC"
repeatFront("Ice Cream", 2) → "IcI"`,
    examples: [
      { input: 'repeatFront("Chocolate", 4)', output: '"ChocChoChC"' },
      { input: 'repeatFront("Chocolate", 3)', output: '"ChoChC"' },
      { input: 'repeatFront("Ice Cream", 2)', output: '"IcI"' }
    ],
    functionSignature: "public String repeatFront(String str, int n)"
  },
  {
    id: "repeatSeparator",
    name: "repeatSeparator",
    difficulty: "H",
    description: `Given two strings, word and a separator sep, return a big string made of count occurrences of the word, separated by the separator string.

repeatSeparator("Word", "X", 3) → "WordXWordXWord"
repeatSeparator("This", "And", 2) → "ThisAndThis"
repeatSeparator("This", "And", 1) → "This"`,
    examples: [
      { input: 'repeatSeparator("Word", "X", 3)', output: '"WordXWordXWord"' },
      { input: 'repeatSeparator("This", "And", 2)', output: '"ThisAndThis"' },
      { input: 'repeatSeparator("This", "And", 1)', output: '"This"' }
    ],
    functionSignature: "public String repeatSeparator(String word, String sep, int count)"
  },
  {
    id: "prefixAgain",
    name: "prefixAgain",
    difficulty: "H",
    description: `Given a string, consider the prefix string made of the first N chars of the string. Does that prefix string appear somewhere else in the string? Assume that the string is not empty and that N is in the range 1..str.length().

prefixAgain("abXYabc", 1) → true
prefixAgain("abXYabc", 2) → true
prefixAgain("abXYabc", 3) → false`,
    examples: [
      { input: 'prefixAgain("abXYabc", 1)', output: "true" },
      { input: 'prefixAgain("abXYabc", 2)', output: "true" },
      { input: 'prefixAgain("abXYabc", 3)', output: "false" }
    ],
    functionSignature: "public boolean prefixAgain(String str, int n)"
  },
  {
    id: "xyzMiddle",
    name: "xyzMiddle",
    difficulty: "H",
    description: `Given a string, does "xyz" appear in the middle of the string? To define middle, we'll say that the number of chars to the left and right of the "xyz" must differ by at most one.

xyzMiddle("AAxyzBB") → true
xyzMiddle("AxyzBB") → true
xyzMiddle("AxyzBBB") → false`,
    examples: [
      { input: 'xyzMiddle("AAxyzBB")', output: "true" },
      { input: 'xyzMiddle("AxyzBB")', output: "true" },
      { input: 'xyzMiddle("AxyzBBB")', output: "false" }
    ],
    functionSignature: "public boolean xyzMiddle(String str)"
  },
  {
    id: "getSandwich",
    name: "getSandwich",
    difficulty: "H",
    description: `A sandwich is two pieces of bread with something in between. Return the string that is between the first and last appearance of "bread" in the given string, or return the empty string "" if there are not two pieces of bread.

getSandwich("breadjambread") → "jam"
getSandwich("xxbreadjambreadyy") → "jam"
getSandwich("xxbreadyy") → ""`,
    examples: [
      { input: 'getSandwich("breadjambread")', output: '"jam"' },
      { input: 'getSandwich("xxbreadjambreadyy")', output: '"jam"' },
      { input: 'getSandwich("xxbreadyy")', output: '""' }
    ],
    functionSignature: "public String getSandwich(String str)"
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
    id: "oneTwo",
    name: "oneTwo",
    difficulty: "H",
    description: `Given a string, compute a new string by moving the first char to come after the next two chars, so "abc" yields "bca". Repeat this process for each subsequent group of 3 chars, so "abcdef" yields "bcaefd". Ignore any group of fewer than 3 chars at the end.

oneTwo("abc") → "bca"
oneTwo("tca") → "cat"
oneTwo("tcagdo") → "catdog"`,
    examples: [
      { input: 'oneTwo("abc")', output: '"bca"' },
      { input: 'oneTwo("tca")', output: '"cat"' },
      { input: 'oneTwo("tcagdo")', output: '"catdog"' }
    ],
    functionSignature: "public String oneTwo(String str)"
  },
  {
    id: "zipZap",
    name: "zipZap",
    difficulty: "H",
    description: `Look for patterns like "zip" and "zap" in the string -- length-3, starting with 'z' and ending with 'p'. Return a string where for all such words, the middle letter is gone, so "zipXzap" yields "zpXzp".

zipZap("zipXzap") → "zpXzp"
zipZap("zopzop") → "zpzp"
zipZap("zzzopzop") → "zzzpzp"`,
    examples: [
      { input: 'zipZap("zipXzap")', output: '"zpXzp"' },
      { input: 'zipZap("zopzop")', output: '"zpzp"' },
      { input: 'zipZap("zzzopzop")', output: '"zzzpzp"' }
    ],
    functionSignature: "public String zipZap(String str)"
  },
  {
    id: "starOut",
    name: "starOut",
    difficulty: "H",
    description: `Return a version of the given string, where for every star (*) in the string the star and the chars immediately to its left and right are gone. So "ab*cd" yields "ad" and "ab**cd" also yields "ad".

starOut("ab*cd") → "ad"
starOut("ab**cd") → "ad"
starOut("sm*eilly") → "silly"`,
    examples: [
      { input: 'starOut("ab*cd")', output: '"ad"' },
      { input: 'starOut("ab**cd")', output: '"ad"' },
      { input: 'starOut("sm*eilly")', output: '"silly"' }
    ],
    functionSignature: "public String starOut(String str)"
  },
  {
    id: "plusOut",
    name: "plusOut",
    difficulty: "H",
    description: `Given a string and a non-empty word string, return a version of the original String where all chars have been replaced by pluses ("+"), except for appearances of the word string which are preserved unchanged.

plusOut("12xy34", "xy") → "++xy++"
plusOut("12xy34", "1") → "1+++++"
plusOut("12xy34xyabcxy", "xy") → "++xy++xy+++xy"`,
    examples: [
      { input: 'plusOut("12xy34", "xy")', output: '"++xy++"' },
      { input: 'plusOut("12xy34", "1")', output: '"1+++++"' },
      { input: 'plusOut("12xy34xyabcxy", "xy")', output: '"++xy++xy+++xy"' }
    ],
    functionSignature: "public String plusOut(String str, String word)"
  },
  {
    id: "wordEnds",
    name: "wordEnds",
    difficulty: "H",
    description: `Given a string and a non-empty word string, return a string made of each char just before and just after every appearance of the word in the string. Ignore cases where there is no char before or after the word, and a char may be included twice if it is between two words.

wordEnds("abcXY123XYijk", "XY") → "c13i"
wordEnds("XY123XY", "XY") → "13"
wordEnds("XY1XY", "XY") → "11"`,
    examples: [
      { input: 'wordEnds("abcXY123XYijk", "XY")', output: '"c13i"' },
      { input: 'wordEnds("XY123XY", "XY")', output: '"13"' },
      { input: 'wordEnds("XY1XY", "XY")', output: '"11"' }
    ],
    functionSignature: "public String wordEnds(String str, String word)"
  }
];

// Warmup-1 Questions (from CodingBat)
export const warmup1Questions = [
  {
    id: "sleepIn",
    name: "sleepIn",
    difficulty: "H",
    description: `The parameter weekday is true if it is a weekday, and the parameter vacation is true if we are on vacation. We sleep in if it is not a weekday or we're on vacation. Return true if we sleep in.

sleepIn(false, false) → true
sleepIn(true, false) → false
sleepIn(false, true) → true`,
    examples: [
      { input: "sleepIn(false, false)", output: "true" },
      { input: "sleepIn(true, false)", output: "false" },
      { input: "sleepIn(false, true)", output: "true" }
    ],
    functionSignature: "public boolean sleepIn(boolean weekday, boolean vacation)"
  },
  {
    id: "monkeyTrouble",
    name: "monkeyTrouble",
    difficulty: "H",
    description: `We have two monkeys, a and b, and the parameters aSmile and bSmile indicate if each is smiling. We are in trouble if they are both smiling or if neither of them is smiling. Return true if we are in trouble.

monkeyTrouble(true, true) → true
monkeyTrouble(false, false) → true
monkeyTrouble(true, false) → false`,
    examples: [
      { input: "monkeyTrouble(true, true)", output: "true" },
      { input: "monkeyTrouble(false, false)", output: "true" },
      { input: "monkeyTrouble(true, false)", output: "false" }
    ],
    functionSignature: "public boolean monkeyTrouble(boolean aSmile, boolean bSmile)"
  },
  {
    id: "sumDouble",
    name: "sumDouble",
    difficulty: "H",
    description: `Given two int values, return their sum. Unless the two values are the same, then return double their sum.

sumDouble(1, 2) → 3
sumDouble(3, 2) → 5
sumDouble(2, 2) → 8`,
    examples: [
      { input: "sumDouble(1, 2)", output: "3" },
      { input: "sumDouble(3, 2)", output: "5" },
      { input: "sumDouble(2, 2)", output: "8" }
    ],
    functionSignature: "public int sumDouble(int a, int b)"
  },
  {
    id: "diff21",
    name: "diff21",
    difficulty: "H",
    description: `Given an int n, return the absolute difference between n and 21, except return double the absolute difference if n is over 21.

diff21(19) → 2
diff21(10) → 11
diff21(21) → 0`,
    examples: [
      { input: "diff21(19)", output: "2" },
      { input: "diff21(10)", output: "11" },
      { input: "diff21(21)", output: "0" }
    ],
    functionSignature: "public int diff21(int n)"
  },
  {
    id: "parrotTrouble",
    name: "parrotTrouble",
    difficulty: "H",
    description: `We have a loud talking parrot. The "hour" parameter is the current hour time in the range 0..23. We are in trouble if the parrot is talking and the hour is before 7 or after 20. Return true if we are in trouble.

parrotTrouble(true, 6) → true
parrotTrouble(true, 7) → false
parrotTrouble(false, 6) → false`,
    examples: [
      { input: "parrotTrouble(true, 6)", output: "true" },
      { input: "parrotTrouble(true, 7)", output: "false" },
      { input: "parrotTrouble(false, 6)", output: "false" }
    ],
    functionSignature: "public boolean parrotTrouble(boolean talking, int hour)"
  },
  {
    id: "makes10",
    name: "makes10",
    difficulty: "H",
    description: `Given 2 ints, a and b, return true if one if them is 10 or if their sum is 10.

makes10(9, 10) → true
makes10(9, 9) → false
makes10(1, 9) → true`,
    examples: [
      { input: "makes10(9, 10)", output: "true" },
      { input: "makes10(9, 9)", output: "false" },
      { input: "makes10(1, 9)", output: "true" }
    ],
    functionSignature: "public boolean makes10(int a, int b)"
  },
  {
    id: "nearHundred",
    name: "nearHundred",
    difficulty: "H",
    description: `Given an int n, return true if it is within 10 of 100 or 200. Note: Math.abs(num) computes the absolute value of a number.

nearHundred(93) → true
nearHundred(90) → true
nearHundred(89) → false`,
    examples: [
      { input: "nearHundred(93)", output: "true" },
      { input: "nearHundred(90)", output: "true" },
      { input: "nearHundred(89)", output: "false" }
    ],
    functionSignature: "public boolean nearHundred(int n)"
  },
  {
    id: "posNeg",
    name: "posNeg",
    difficulty: "H",
    description: `Given 2 int values, return true if one is negative and one is positive. Except if the parameter "negative" is true, then return true only if both are negative.

posNeg(1, -1, false) → true
posNeg(-1, 1, false) → true
posNeg(-4, -5, true) → true`,
    examples: [
      { input: "posNeg(1, -1, false)", output: "true" },
      { input: "posNeg(-1, 1, false)", output: "true" },
      { input: "posNeg(-4, -5, true)", output: "true" }
    ],
    functionSignature: "public boolean posNeg(int a, int b, boolean negative)"
  },
  {
    id: "notString",
    name: "notString",
    difficulty: "H",
    description: `Given a string, return a new string where "not " has been added to the front. However, if the string already begins with "not", return the string unchanged. Note: use .equals() to compare 2 strings.

notString("candy") → "not candy"
notString("x") → "not x"
notString("not bad") → "not bad"`,
    examples: [
      { input: "notString(\"candy\")", output: "\"not candy\"" },
      { input: "notString(\"x\")", output: "\"not x\"" },
      { input: "notString(\"not bad\")", output: "\"not bad\"" }
    ],
    functionSignature: "public String notString(String str)"
  },
  {
    id: "missingChar",
    name: "missingChar",
    difficulty: "H",
    description: `Given a non-empty string and an int n, return a new string where the char at index n has been removed. The value of n will be a valid index of a char in the original string (i.e. n will be in the range 0..str.length()-1 inclusive).

missingChar("kitten", 1) → "ktten"
missingChar("kitten", 0) → "itten"
missingChar("kitten", 4) → "kittn"`,
    examples: [
      { input: "missingChar(\"kitten\", 1)", output: "\"ktten\"" },
      { input: "missingChar(\"kitten\", 0)", output: "\"itten\"" },
      { input: "missingChar(\"kitten\", 4)", output: "\"kittn\"" }
    ],
    functionSignature: "public String missingChar(String str, int n)"
  },
  {
    id: "frontBack",
    name: "frontBack",
    difficulty: "H",
    description: `Given a string, return a new string where the first and last chars have been exchanged.

frontBack("code") → "eodc"
frontBack("a") → "a"
frontBack("ab") → "ba"`,
    examples: [
      { input: "frontBack(\"code\")", output: "\"eodc\"" },
      { input: "frontBack(\"a\")", output: "\"a\"" },
      { input: "frontBack(\"ab\")", output: "\"ba\"" }
    ],
    functionSignature: "public String frontBack(String str)"
  },
  {
    id: "front3",
    name: "front3",
    difficulty: "H",
    description: `Given a string, we'll say that the front is the first 3 chars of the string. If the string length is less than 3, the front is whatever is there. Return a new string which is 3 copies of the front.

front3("Java") → "JavJavJav"
front3("Chocolate") → "ChoChoCho"
front3("abc") → "abcabcabc"`,
    examples: [
      { input: "front3(\"Java\")", output: "\"JavJavJav\"" },
      { input: "front3(\"Chocolate\")", output: "\"ChoChoCho\"" },
      { input: "front3(\"abc\")", output: "\"abcabcabc\"" }
    ],
    functionSignature: "public String front3(String str)"
  },
  {
    id: "backAround",
    name: "backAround",
    difficulty: "H",
    description: `Given a string, take the last char and return a new string with the last char added at the front and back, so "cat" yields "ccatc". The original string will be length 1 or more.

backAround("cat") → "ccatc"
backAround("Hello") → "oHelloo"
backAround("a") → "aaa"`,
    examples: [
      { input: "backAround(\"cat\")", output: "\"ccatc\"" },
      { input: "backAround(\"Hello\")", output: "\"oHelloo\"" },
      { input: "backAround(\"a\")", output: "\"aaa\"" }
    ],
    functionSignature: "public String backAround(String str)"
  },
  {
    id: "or35",
    name: "or35",
    difficulty: "H",
    description: `Return true if the given non-negative number is a multiple of 3 or a multiple of 5. Use the % "mod" operator.

or35(3) → true
or35(10) → true
or35(8) → false`,
    examples: [
      { input: "or35(3)", output: "true" },
      { input: "or35(10)", output: "true" },
      { input: "or35(8)", output: "false" }
    ],
    functionSignature: "public boolean or35(int n)"
  },
  {
    id: "front22",
    name: "front22",
    difficulty: "H",
    description: `Given a string, take the first 2 chars and return the string with the 2 chars added at both the front and back, so "kitten" yields "kikittenki". If the string length is less than 2, use whatever is there.

front22("kitten") → "kikittenki"
front22("Ha") → "HaHaHa"
front22("abc") → "ababcab"`,
    examples: [
      { input: "front22(\"kitten\")", output: "\"kikittenki\"" },
      { input: "front22(\"Ha\")", output: "\"HaHaHa\"" },
      { input: "front22(\"abc\")", output: "\"ababcab\"" }
    ],
    functionSignature: "public String front22(String str)"
  },
  {
    id: "startHi",
    name: "startHi",
    difficulty: "H",
    description: `Given a string, return true if the string starts with "hi" and false otherwise.

startHi("hi there") → true
startHi("hi") → true
startHi("hello hi") → false`,
    examples: [
      { input: "startHi(\"hi there\")", output: "true" },
      { input: "startHi(\"hi\")", output: "true" },
      { input: "startHi(\"hello hi\")", output: "false" }
    ],
    functionSignature: "public boolean startHi(String str)"
  },
  {
    id: "icyHot",
    name: "icyHot",
    difficulty: "H",
    description: `Given two temperatures, return true if one is less than 0 and the other is greater than 100.

icyHot(120, -1) → true
icyHot(-1, 120) → true
icyHot(2, 120) → false`,
    examples: [
      { input: "icyHot(120, -1)", output: "true" },
      { input: "icyHot(-1, 120)", output: "true" },
      { input: "icyHot(2, 120)", output: "false" }
    ],
    functionSignature: "public boolean icyHot(int temp1, int temp2)"
  },
  {
    id: "in1020",
    name: "in1020",
    difficulty: "H",
    description: `Given 2 int values, return true if either of them is in the range 10..20 inclusive.

in1020(12, 99) → true
in1020(21, 12) → true
in1020(8, 99) → false`,
    examples: [
      { input: "in1020(12, 99)", output: "true" },
      { input: "in1020(21, 12)", output: "true" },
      { input: "in1020(8, 99)", output: "false" }
    ],
    functionSignature: "public boolean in1020(int a, int b)"
  },
  {
    id: "hasTeen",
    name: "hasTeen",
    difficulty: "H",
    description: `We'll say that a number is "teen" if it is in the range 13..19 inclusive. Given 3 int values, return true if 1 or more of them are teen.

hasTeen(13, 20, 10) → true
hasTeen(20, 19, 10) → true
hasTeen(20, 10, 13) → true`,
    examples: [
      { input: "hasTeen(13, 20, 10)", output: "true" },
      { input: "hasTeen(20, 19, 10)", output: "true" },
      { input: "hasTeen(20, 10, 13)", output: "true" }
    ],
    functionSignature: "public boolean hasTeen(int a, int b, int c)"
  },
  {
    id: "loneTeen",
    name: "loneTeen",
    difficulty: "H",
    description: `We'll say that a number is "teen" if it is in the range 13..19 inclusive. Given 2 int values, return true if one or the other is teen, but not both.

loneTeen(13, 99) → true
loneTeen(21, 19) → true
loneTeen(13, 13) → false`,
    examples: [
      { input: "loneTeen(13, 99)", output: "true" },
      { input: "loneTeen(21, 19)", output: "true" },
      { input: "loneTeen(13, 13)", output: "false" }
    ],
    functionSignature: "public boolean loneTeen(int a, int b)"
  },
  {
    id: "delDel",
    name: "delDel",
    difficulty: "H",
    description: `Given a string, if the string "del" appears starting at index 1, return a string where that "del" has been deleted. Otherwise, return the string unchanged.

delDel("adelbc") → "abc"
delDel("adelHello") → "aHello"
delDel("adedbc") → "adedbc"`,
    examples: [
      { input: "delDel(\"adelbc\")", output: "\"abc\"" },
      { input: "delDel(\"adelHello\")", output: "\"aHello\"" },
      { input: "delDel(\"adedbc\")", output: "\"adedbc\"" }
    ],
    functionSignature: "public String delDel(String str)"
  },
  {
    id: "mixStart",
    name: "mixStart",
    difficulty: "H",
    description: `Return true if the given string begins with "mix", except the 'm' can be anything, so "pix", "9ix" .. all count.

mixStart("mix snacks") → true
mixStart("pix snacks") → true
mixStart("piz snacks") → false`,
    examples: [
      { input: "mixStart(\"mix snacks\")", output: "true" },
      { input: "mixStart(\"pix snacks\")", output: "true" },
      { input: "mixStart(\"piz snacks\")", output: "false" }
    ],
    functionSignature: "public boolean mixStart(String str)"
  },
  {
    id: "startOz",
    name: "startOz",
    difficulty: "H",
    description: `Given a string, return a string made of the first 2 chars (if present), however include first char only if it is 'o' and include the second only if it is 'z', so "ozymandias" yields "oz".

startOz("ozymandias") → "oz"
startOz("bzoo") → "z"
startOz("oxx") → "o"`,
    examples: [
      { input: "startOz(\"ozymandias\")", output: "\"oz\"" },
      { input: "startOz(\"bzoo\")", output: "\"z\"" },
      { input: "startOz(\"oxx\")", output: "\"o\"" }
    ],
    functionSignature: "public String startOz(String str)"
  },
  {
    id: "intMax",
    name: "intMax",
    difficulty: "H",
    description: `Given three int values, a b c, return the largest.

intMax(1, 2, 3) → 3
intMax(1, 3, 2) → 3
intMax(3, 2, 1) → 3`,
    examples: [
      { input: "intMax(1, 2, 3)", output: "3" },
      { input: "intMax(1, 3, 2)", output: "3" },
      { input: "intMax(3, 2, 1)", output: "3" }
    ],
    functionSignature: "public int intMax(int a, int b, int c)"
  },
  {
    id: "close10",
    name: "close10",
    difficulty: "H",
    description: `Given 2 int values, return whichever value is nearest to the value 10, or return 0 in case of a tie. Note that Math.abs(n) returns the absolute value of a number.

close10(8, 13) → 8
close10(13, 8) → 8
close10(13, 7) → 0`,
    examples: [
      { input: "close10(8, 13)", output: "8" },
      { input: "close10(13, 8)", output: "8" },
      { input: "close10(13, 7)", output: "0" }
    ],
    functionSignature: "public int close10(int a, int b)"
  },
  {
    id: "in3050",
    name: "in3050",
    difficulty: "H",
    description: `Given 2 int values, return true if they are both in the range 30..40 inclusive, or they are both in the range 40..50 inclusive.

in3050(30, 31) → true
in3050(30, 41) → false
in3050(40, 50) → true`,
    examples: [
      { input: "in3050(30, 31)", output: "true" },
      { input: "in3050(30, 41)", output: "false" },
      { input: "in3050(40, 50)", output: "true" }
    ],
    functionSignature: "public boolean in3050(int a, int b)"
  },
  {
    id: "max1020",
    name: "max1020",
    difficulty: "H",
    description: `Given 2 positive int values, return the larger value that is in the range 10..20 inclusive, or return 0 if neither is in that range.

max1020(11, 19) → 19
max1020(19, 11) → 19
max1020(11, 9) → 11`,
    examples: [
      { input: "max1020(11, 19)", output: "19" },
      { input: "max1020(19, 11)", output: "19" },
      { input: "max1020(11, 9)", output: "11" }
    ],
    functionSignature: "public int max1020(int a, int b)"
  },
  {
    id: "stringE",
    name: "stringE",
    difficulty: "E",
    description: `Return true if the given string contains between 1 and 3 'e' chars.

stringE("Hello") → true
stringE("Heelle") → true
stringE("Heelele") → false`,
    examples: [
      { input: "stringE(\"Hello\")", output: "true" },
      { input: "stringE(\"Heelle\")", output: "true" },
      { input: "stringE(\"Heelele\")", output: "false" }
    ],
    functionSignature: "public boolean stringE(String str)"
  },
  {
    id: "lastDigit",
    name: "lastDigit",
    difficulty: "H",
    description: `Given two non-negative int values, return true if they have the same last digit, such as with 27 and 57. Note that the % "mod" operator computes remainders, so 17 % 10 is 7.

lastDigit(7, 17) → true
lastDigit(6, 17) → false
lastDigit(3, 113) → true`,
    examples: [
      { input: "lastDigit(7, 17)", output: "true" },
      { input: "lastDigit(6, 17)", output: "false" },
      { input: "lastDigit(3, 113)", output: "true" }
    ],
    functionSignature: "public boolean lastDigit(int a, int b)"
  },
  {
    id: "endUp",
    name: "endUp",
    difficulty: "H",
    description: `Given a string, return a new string where the last 3 chars are now in upper case. If the string has less than 3 chars, uppercase whatever is there. Note that str.toUpperCase() returns the uppercase version of a string.

endUp("Hello") → "HeLLO"
endUp("hi there") → "hi thERE"
endUp("hi") → "HI"`,
    examples: [
      { input: "endUp(\"Hello\")", output: "\"HeLLO\"" },
      { input: "endUp(\"hi there\")", output: "\"hi thERE\"" },
      { input: "endUp(\"hi\")", output: "\"HI\"" }
    ],
    functionSignature: "public String endUp(String str)"
  },
  {
    id: "everyNth",
    name: "everyNth",
    difficulty: "H",
    description: `Given a non-empty string and an int N, return the string made starting with char 0, and then every Nth char of the string. So if N is 3, use char 0, 3, 6, ... and so on. N is 1 or more.

everyNth("Miracle", 2) → "Mrce"
everyNth("abcdefg", 2) → "aceg"
everyNth("abcdefg", 3) → "adg"`,
    examples: [
      { input: "everyNth(\"Miracle\", 2)", output: "\"Mrce\"" },
      { input: "everyNth(\"abcdefg\", 2)", output: "\"aceg\"" },
      { input: "everyNth(\"abcdefg\", 3)", output: "\"adg\"" }
    ],
    functionSignature: "public String everyNth(String str, int n)"
  }
];


// Logic-1 Questions
export const logic1Questions = [
  {
    id: "cigarParty",
    name: "cigarParty",
    difficulty: "H",
    description: `When squirrels get together for a party, they like to have cigars. A squirrel party is successful when the number of cigars is between 40 and 60, inclusive. Unless it is the weekend, in which case there is no upper bound on the number of cigars. Return true if the party with the given values is successful, or false otherwise.

cigarParty(30, false) → false
cigarParty(50, false) → true
cigarParty(70, true) → true`,
    examples: [
      { input: "cigarParty(30, false)", output: "false" },
      { input: "cigarParty(50, false)", output: "true" },
      { input: "cigarParty(70, true)", output: "true" }
    ],
    functionSignature: "public boolean cigarParty(int cigars, boolean isWeekend)"
  },
  {
    id: "dateFashion",
    name: "dateFashion",
    difficulty: "H",
    description: `You and your date are trying to get a table at a restaurant. The parameter "you" is the stylishness of your clothes, in the range 0..10, and "date" is the stylishness of your date's clothes. The result getting the table is encoded as an int value with 0=no, 1=maybe, 2=yes. If either of you is very stylish, 8 or more, then the result is 2 (yes). With the exception that if either of you has style of 2 or less, then the result is 0 (no). Otherwise the result is 1 (maybe).

dateFashion(5, 10) → 2
dateFashion(5, 2) → 0
dateFashion(5, 5) → 1`,
    examples: [
      { input: "dateFashion(5, 10)", output: "2" },
      { input: "dateFashion(5, 2)", output: "0" },
      { input: "dateFashion(5, 5)", output: "1" }
    ],
    functionSignature: "public int dateFashion(int you, int date)"
  },
  {
    id: "squirrelPlay",
    name: "squirrelPlay",
    difficulty: "H",
    description: `The squirrels in Palo Alto spend most of the day playing. In particular, they play if the temperature is between 60 and 90 (inclusive). Unless it is summer, then the upper limit is 100 instead of 90. Given an int temperature and a boolean isSummer, return true if the squirrels play and false otherwise.

squirrelPlay(70, false) → true
squirrelPlay(95, false) → false
squirrelPlay(95, true) → true`,
    examples: [
      { input: "squirrelPlay(70, false)", output: "true" },
      { input: "squirrelPlay(95, false)", output: "false" },
      { input: "squirrelPlay(95, true)", output: "true" }
    ],
    functionSignature: "public boolean squirrelPlay(int temp, boolean isSummer)"
  },
  {
    id: "caughtSpeeding",
    name: "caughtSpeeding",
    difficulty: "H",
    description: `You are driving a little too fast, and a police officer stops you. Write code to compute the result, encoded as an int value: 0=no ticket, 1=small ticket, 2=big ticket. If speed is 60 or less, the result is 0. If speed is between 61 and 80 inclusive, the result is 1. If speed is 81 or more, the result is 2. Unless it is your birthday -- on that day, your speed can be 5 higher in all cases.

caughtSpeeding(60, false) → 0
caughtSpeeding(65, false) → 1
caughtSpeeding(65, true) → 0`,
    examples: [
      { input: "caughtSpeeding(60, false)", output: "0" },
      { input: "caughtSpeeding(65, false)", output: "1" },
      { input: "caughtSpeeding(65, true)", output: "0" }
    ],
    functionSignature: "public int caughtSpeeding(int speed, boolean isBirthday)"
  },
  {
    id: "sortaSum",
    name: "sortaSum",
    difficulty: "H",
    description: `Given 2 ints, a and b, return their sum. However, sums in the range 10..19 inclusive, are forbidden, so in that case just return 20.

sortaSum(3, 4) → 7
sortaSum(9, 4) → 20
sortaSum(10, 11) → 21`,
    examples: [
      { input: "sortaSum(3, 4)", output: "7" },
      { input: "sortaSum(9, 4)", output: "20" },
      { input: "sortaSum(10, 11)", output: "21" }
    ],
    functionSignature: "public int sortaSum(int a, int b)"
  },
  {
    id: "alarmClock",
    name: "alarmClock",
    difficulty: "H",
    description: `Given a day of the week encoded as 0=Sun, 1=Mon, 2=Tue, ...6=Sat, and a boolean indicating if we are on vacation, return a string of the form "7:00" indicating when the alarm clock should ring. Weekdays, the alarm should be "7:00" and on the weekend it should be "10:00". Unless we are on vacation -- then on weekdays it should be "10:00" and weekends it should be "off".

alarmClock(1, false) → "7:00"
alarmClock(5, false) → "7:00"
alarmClock(0, false) → "10:00"`,
    examples: [
      { input: 'alarmClock(1, false)', output: '"7:00"' },
      { input: 'alarmClock(5, false)', output: '"7:00"' },
      { input: 'alarmClock(0, false)', output: '"10:00"' }
    ],
    functionSignature: "public String alarmClock(int day, boolean vacation)"
  },
  {
    id: "love6",
    name: "love6",
    difficulty: "H",
    description: `The number 6 is a truly great number. Given two int values, a and b, return true if either one is 6. Or if their sum or difference is 6.

love6(6, 4) → true
love6(4, 5) → false
love6(1, 5) → true`,
    examples: [
      { input: "love6(6, 4)", output: "true" },
      { input: "love6(4, 5)", output: "false" },
      { input: "love6(1, 5)", output: "true" }
    ],
    functionSignature: "public boolean love6(int a, int b)"
  },
  {
    id: "in1To10",
    name: "in1To10",
    difficulty: "H",
    description: `Given a number n, return true if n is in the range 1..10, inclusive. Unless outsideMode is true, in which case return true if the number is less or equal to 1, or greater or equal to 10.

in1To10(5, false) → true
in1To10(11, false) → false
in1To10(11, true) → true`,
    examples: [
      { input: "in1To10(5, false)", output: "true" },
      { input: "in1To10(11, false)", output: "false" },
      { input: "in1To10(11, true)", output: "true" }
    ],
    functionSignature: "public boolean in1To10(int n, boolean outsideMode)"
  },
  {
    id: "specialEleven",
    name: "specialEleven",
    difficulty: "H",
    description: `We'll say a number is "special" if it is a multiple of 11 or if it is one more than a multiple of 11. Return true if the given non-negative number is special.

specialEleven(22) → true
specialEleven(23) → true
specialEleven(24) → false`,
    examples: [
      { input: "specialEleven(22)", output: "true" },
      { input: "specialEleven(23)", output: "true" },
      { input: "specialEleven(24)", output: "false" }
    ],
    functionSignature: "public boolean specialEleven(int n)"
  },
  {
    id: "more20",
    name: "more20",
    difficulty: "H",
    description: `Return true if the given non-negative number is 1 or 2 more than a multiple of 20.

more20(20) → false
more20(21) → true
more20(22) → true`,
    examples: [
      { input: "more20(20)", output: "false" },
      { input: "more20(21)", output: "true" },
      { input: "more20(22)", output: "true" }
    ],
    functionSignature: "public boolean more20(int n)"
  },
  {
    id: "old35",
    name: "old35",
    difficulty: "H",
    description: `Return true if the given non-negative number is a multiple of 3 or 5, but not both.

old35(3) → true
old35(10) → true
old35(15) → false`,
    examples: [
      { input: "old35(3)", output: "true" },
      { input: "old35(10)", output: "true" },
      { input: "old35(15)", output: "false" }
    ],
    functionSignature: "public boolean old35(int n)"
  },
  {
    id: "less20",
    name: "less20",
    difficulty: "H",
    description: `Return true if the given non-negative number is 1 or 2 less than a multiple of 20.

less20(18) → true
less20(19) → true
less20(20) → false`,
    examples: [
      { input: "less20(18)", output: "true" },
      { input: "less20(19)", output: "true" },
      { input: "less20(20)", output: "false" }
    ],
    functionSignature: "public boolean less20(int n)"
  },
  {
    id: "nearTen",
    name: "nearTen",
    difficulty: "H",
    description: `Given a non-negative number "num", return true if num is within 2 of a multiple of 10.

nearTen(12) → true
nearTen(17) → false
nearTen(19) → true`,
    examples: [
      { input: "nearTen(12)", output: "true" },
      { input: "nearTen(17)", output: "false" },
      { input: "nearTen(19)", output: "true" }
    ],
    functionSignature: "public boolean nearTen(int num)"
  },
  {
    id: "teenSum",
    name: "teenSum",
    difficulty: "H",
    description: `Given 2 ints, a and b, return their sum. However, "teen" values in the range 13..19 inclusive, are extra lucky. So if either value is a teen, just return 19.

teenSum(3, 4) → 7
teenSum(10, 13) → 19
teenSum(13, 2) → 19`,
    examples: [
      { input: "teenSum(3, 4)", output: "7" },
      { input: "teenSum(10, 13)", output: "19" },
      { input: "teenSum(13, 2)", output: "19" }
    ],
    functionSignature: "public int teenSum(int a, int b)"
  },
  {
    id: "answerCell",
    name: "answerCell",
    difficulty: "H",
    description: `Your cell phone rings. Return true if you should answer it. Normally you answer, except in the morning you only answer if it is your mom calling. In all cases, if you are asleep, you do not answer.

answerCell(false, false, false) → true
answerCell(false, false, true) → false
answerCell(true, false, false) → false`,
    examples: [
      { input: "answerCell(false, false, false)", output: "true" },
      { input: "answerCell(false, false, true)", output: "false" },
      { input: "answerCell(true, false, false)", output: "false" }
    ],
    functionSignature: "public boolean answerCell(boolean isMorning, boolean isMom, boolean isAsleep)"
  },
  {
    id: "teaParty",
    name: "teaParty",
    difficulty: "H",
    description: `We are having a party with amounts of tea and candy. Return the int outcome of the party encoded as 0=bad, 1=good, or 2=great. A party is good (1) if both tea and candy are at least 5. However, if either tea or candy is at least double the amount of the other one, the party is great (2). However, in all cases, if either tea or candy is less than 5, the party is always bad (0).

teaParty(6, 8) → 1
teaParty(3, 8) → 0
teaParty(20, 6) → 2`,
    examples: [
      { input: "teaParty(6, 8)", output: "1" },
      { input: "teaParty(3, 8)", output: "0" },
      { input: "teaParty(20, 6)", output: "2" }
    ],
    functionSignature: "public int teaParty(int tea, int candy)"
  },
  {
    id: "fizzString",
    name: "fizzString",
    difficulty: "H",
    description: `Given a string str, if the string starts with "f" return "Fizz". If the string ends with "b" return "Buzz". If both the "f" and "b" conditions are true, return "FizzBuzz". In all other cases, return the string unchanged.

fizzString("fig") → "Fizz"
fizzString("dib") → "Buzz"
fizzString("fib") → "FizzBuzz"`,
    examples: [
      { input: 'fizzString("fig")', output: '"Fizz"' },
      { input: 'fizzString("dib")', output: '"Buzz"' },
      { input: 'fizzString("fib")', output: '"FizzBuzz"' }
    ],
    functionSignature: "public String fizzString(String str)"
  },
  {
    id: "fizzString2",
    name: "fizzString2",
    difficulty: "H",
    description: `Given an int n, return the string form of the number followed by "!". So the int 6 yields "6!". Except if the number is divisible by 3 use "Fizz" instead of the number, and if the number is divisible by 5 use "Buzz", and if divisible by both 3 and 5, use "FizzBuzz".

fizzString2(1) → "1!"
fizzString2(2) → "2!"
fizzString2(3) → "Fizz!"`,
    examples: [
      { input: 'fizzString2(1)', output: '"1!"' },
      { input: 'fizzString2(2)', output: '"2!"' },
      { input: 'fizzString2(3)', output: '"Fizz!"' }
    ],
    functionSignature: "public String fizzString2(int n)"
  },
  {
    id: "twoAsOne",
    name: "twoAsOne",
    difficulty: "H",
    description: `Given three ints, a b c, return true if it is possible to add two of the ints to get the third.

twoAsOne(1, 2, 3) → true
twoAsOne(3, 1, 2) → true
twoAsOne(3, 2, 2) → false`,
    examples: [
      { input: "twoAsOne(1, 2, 3)", output: "true" },
      { input: "twoAsOne(3, 1, 2)", output: "true" },
      { input: "twoAsOne(3, 2, 2)", output: "false" }
    ],
    functionSignature: "public boolean twoAsOne(int a, int b, int c)"
  },
  {
    id: "inOrder",
    name: "inOrder",
    difficulty: "H",
    description: `Given three ints, a b c, return true if b is greater than a, and c is greater than b. However, with the exception that if "bOk" is true, b does not need to be greater than a.

inOrder(1, 2, 4, false) → true
inOrder(1, 2, 1, false) → false
inOrder(1, 1, 2, true) → true`,
    examples: [
      { input: "inOrder(1, 2, 4, false)", output: "true" },
      { input: "inOrder(1, 2, 1, false)", output: "false" },
      { input: "inOrder(1, 1, 2, true)", output: "true" }
    ],
    functionSignature: "public boolean inOrder(int a, int b, int c, boolean bOk)"
  },
  {
    id: "inOrderEqual",
    name: "inOrderEqual",
    difficulty: "H",
    description: `Given three ints, a b c, return true if they are in strict increasing order, such as 2 5 11, or 5 6 7, but not 6 5 7 or 5 5 7. However, with the exception that if "equalOk" is true, equality is allowed, such as 5 5 7 or 5 5 5.

inOrderEqual(2, 5, 11, false) → true
inOrderEqual(5, 7, 6, false) → false
inOrderEqual(5, 5, 7, true) → true`,
    examples: [
      { input: "inOrderEqual(2, 5, 11, false)", output: "true" },
      { input: "inOrderEqual(5, 7, 6, false)", output: "false" },
      { input: "inOrderEqual(5, 5, 7, true)", output: "true" }
    ],
    functionSignature: "public boolean inOrderEqual(int a, int b, int c, boolean equalOk)"
  },
  {
    id: "lastDigit",
    name: "lastDigit",
    difficulty: "H",
    description: `Given three ints, a b c, return true if two or more of them have the same rightmost digit.

lastDigit(23, 19, 13) → true
lastDigit(23, 19, 12) → false
lastDigit(23, 19, 3) → true`,
    examples: [
      { input: "lastDigit(23, 19, 13)", output: "true" },
      { input: "lastDigit(23, 19, 12)", output: "false" },
      { input: "lastDigit(23, 19, 3)", output: "true" }
    ],
    functionSignature: "public boolean lastDigit(int a, int b, int c)"
  },
  {
    id: "lessBy10",
    name: "lessBy10",
    difficulty: "H",
    description: `Given three ints, a b c, return true if one of them is 10 or more less than one of the others.

lessBy10(1, 7, 11) → true
lessBy10(1, 7, 10) → false
lessBy10(11, 1, 7) → true`,
    examples: [
      { input: "lessBy10(1, 7, 11)", output: "true" },
      { input: "lessBy10(1, 7, 10)", output: "false" },
      { input: "lessBy10(11, 1, 7)", output: "true" }
    ],
    functionSignature: "public boolean lessBy10(int a, int b, int c)"
  },
  {
    id: "withoutDoubles",
    name: "withoutDoubles",
    difficulty: "H",
    description: `Return the sum of two 6-sided dice rolls, each in the range 1..6. However, if noDoubles is true, if the two dice show the same value, increment one die to the next value, wrapping around to 1 if its value was 6.

withoutDoubles(2, 3, true) → 5
withoutDoubles(3, 3, true) → 7
withoutDoubles(3, 3, false) → 6`,
    examples: [
      { input: "withoutDoubles(2, 3, true)", output: "5" },
      { input: "withoutDoubles(3, 3, true)", output: "7" },
      { input: "withoutDoubles(3, 3, false)", output: "6" }
    ],
    functionSignature: "public int withoutDoubles(int die1, int die2, boolean noDoubles)"
  },
  {
    id: "maxMod5",
    name: "maxMod5",
    difficulty: "H",
    description: `Given two int values, return whichever value is larger. However if the two values have the same remainder when divided by 5, then the return the smaller value.

maxMod5(2, 3) → 3
maxMod5(6, 2) → 6
maxMod5(3, 2) → 3`,
    examples: [
      { input: "maxMod5(2, 3)", output: "3" },
      { input: "maxMod5(6, 2)", output: "6" },
      { input: "maxMod5(3, 2)", output: "3" }
    ],
    functionSignature: "public int maxMod5(int a, int b)"
  }
];

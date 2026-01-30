# Coding Practice Topics Structure

This directory contains separate files for each coding practice topic.

## File Structure

Each topic has its own file:
- `warmup1.js` - Warmup-1 questions (✓ populated)
- `warmup2.js` - Warmup-2 questions
- `string1.js` - String-1 questions
- `string2.js` - String-2 questions
- `string3.js` - String-3 questions
- `array1.js` - Array-1 questions
- `array2.js` - Array-2 questions
- `array3.js` - Array-3 questions
- `logic1.js` - Logic-1 questions
- `logic2.js` - Logic-2 questions
- `ap1.js` - AP-1 questions
- `recursion1.js` - Recursion-1 questions
- `recursion2.js` - Recursion-2 questions
- `map1.js` - Map-1 questions
- `map2.js` - Map-2 questions
- `functional1.js` - Functional-1 questions
- `functional2.js` - Functional-2 questions

## Format

Each file should export an array of question objects with this structure:

```javascript
export const topicNameQuestions = [
  {
    id: "uniqueId",
    name: "functionName",
    difficulty: "H" or "E",
    description: `Problem description with examples`,
    examples: [
      { input: "functionCall(...)", output: "expectedOutput" }
    ],
    functionSignature: "public ReturnType functionName(Type param)"
  },
  // ... more questions
];
```

## Main File

The main `codingPracticeData.js` file imports all topic question arrays and maps them to topic IDs in the `topicQuestions` object.


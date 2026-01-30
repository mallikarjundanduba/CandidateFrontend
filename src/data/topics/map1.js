// Map-1 Questions
export const map1Questions = [
  {
    id: "mapBully",
    name: "mapBully",
    difficulty: "H",
    description: `Modify and return the given map as follows: if the key "a" has a value, set the key "b" to have that value, and set the key "a" to have the value "". Basically "b" is a bully, taking the value and replacing it with the empty string.

mapBully({"a": "candy", "b": "dirt"}) → {"a": "", "b": "candy"}
mapBully({"a": "candy"}) → {"a": "", "b": "candy"}
mapBully({"a": "candy", "b": "carrot", "c": "meh"}) → {"a": "", "b": "candy", "c": "meh"}`,
    examples: [
      { input: 'mapBully({"a": "candy", "b": "dirt"})', output: '{"a": "", "b": "candy"}' },
      { input: 'mapBully({"a": "candy"})', output: '{"a": "", "b": "candy"}' },
      { input: 'mapBully({"a": "candy", "b": "carrot", "c": "meh"})', output: '{"a": "", "b": "candy", "c": "meh"}' }
    ],
    functionSignature: "public Map<String, String> mapBully(Map<String, String> map)"
  },
  {
    id: "mapShare",
    name: "mapShare",
    difficulty: "H",
    description: `Modify and return the given map as follows: if the key "a" has a value, set the key "b" to have that same value. In all cases remove the key "c", leaving the rest of the map unchanged.

mapShare({"a": "aaa", "b": "bbb", "c": "ccc"}) → {"a": "aaa", "b": "aaa"}
mapShare({"b": "xyz", "c": "ccc"}) → {"b": "xyz"}
mapShare({"a": "aaa", "c": "meh", "d": "hi"}) → {"a": "aaa", "b": "aaa", "d": "hi"}`,
    examples: [
      { input: 'mapShare({"a": "aaa", "b": "bbb", "c": "ccc"})', output: '{"a": "aaa", "b": "aaa"}' },
      { input: 'mapShare({"b": "xyz", "c": "ccc"})', output: '{"b": "xyz"}' },
      { input: 'mapShare({"a": "aaa", "c": "meh", "d": "hi"})', output: '{"a": "aaa", "b": "aaa", "d": "hi"}' }
    ],
    functionSignature: "public Map<String, String> mapShare(Map<String, String> map)"
  },
  {
    id: "mapAB",
    name: "mapAB",
    difficulty: "H",
    description: `Modify and return the given map as follows: for this problem the map may or may not contain the "a" and "b" keys. If both keys are present, append their 2 string values together and store the result under the key "ab".

mapAB({"a": "Hi", "b": "There"}) → {"a": "Hi", "ab": "HiThere", "b": "There"}
mapAB({"a": "Hi"}) → {"a": "Hi"}
mapAB({"b": "There"}) → {"b": "There"}`,
    examples: [
      { input: 'mapAB({"a": "Hi", "b": "There"})', output: '{"a": "Hi", "ab": "HiThere", "b": "There"}' },
      { input: 'mapAB({"a": "Hi"})', output: '{"a": "Hi"}' },
      { input: 'mapAB({"b": "There"})', output: '{"b": "There"}' }
    ],
    functionSignature: "public Map<String, String> mapAB(Map<String, String> map)"
  },
  {
    id: "topping1",
    name: "topping1",
    difficulty: "H",
    description: `Given a map of food keys and topping values, modify and return the map as follows: if the key "ice cream" is present, set its value to "cherry". In all cases, set the key "bread" to have the value "butter".

topping1({"ice cream": "peanuts"}) → {"bread": "butter", "ice cream": "cherry"}
topping1({}) → {"bread": "butter"}
topping1({"pancake": "syrup"}) → {"bread": "butter", "pancake": "syrup"}`,
    examples: [
      { input: 'topping1({"ice cream": "peanuts"})', output: '{"bread": "butter", "ice cream": "cherry"}' },
      { input: 'topping1({})', output: '{"bread": "butter"}' },
      { input: 'topping1({"pancake": "syrup"})', output: '{"bread": "butter", "pancake": "syrup"}' }
    ],
    functionSignature: "public Map<String, String> topping1(Map<String, String> map)"
  },
  {
    id: "topping2",
    name: "topping2",
    difficulty: "H",
    description: `Given a map of food keys and their topping values, modify and return the map as follows: if the key "ice cream" has a value, set that as the value for the key "yogurt" also. If the key "spinach" has a value, change that value to "nuts".

topping2({"ice cream": "cherry"}) → {"yogurt": "cherry", "ice cream": "cherry"}
topping2({"spinach": "dirt", "ice cream": "cherry"}) → {"yogurt": "cherry", "spinach": "nuts", "ice cream": "cherry"}
topping2({"yogurt": "salt"}) → {"yogurt": "salt"}`,
    examples: [
      { input: 'topping2({"ice cream": "cherry"})', output: '{"yogurt": "cherry", "ice cream": "cherry"}' },
      { input: 'topping2({"spinach": "dirt", "ice cream": "cherry"})', output: '{"yogurt": "cherry", "spinach": "nuts", "ice cream": "cherry"}' },
      { input: 'topping2({"yogurt": "salt"})', output: '{"yogurt": "salt"}' }
    ],
    functionSignature: "public Map<String, String> topping2(Map<String, String> map)"
  },
  {
    id: "topping3",
    name: "topping3",
    difficulty: "H",
    description: `Given a map of food keys and topping values, modify and return the map as follows: if the key "potato" has a value, set that as the value for the key "fries". If the key "salad" has a value, set that as the value for the key "spinach".

topping3({"potato": "ketchup"}) → {"potato": "ketchup", "fries": "ketchup"}
topping3({"potato": "butter"}) → {"potato": "butter", "fries": "butter"}
topping3({"salad": "oil", "potato": "ketchup"}) → {"spinach": "oil", "salad": "oil", "potato": "ketchup", "fries": "ketchup"}`,
    examples: [
      { input: 'topping3({"potato": "ketchup"})', output: '{"potato": "ketchup", "fries": "ketchup"}' },
      { input: 'topping3({"potato": "butter"})', output: '{"potato": "butter", "fries": "butter"}' },
      { input: 'topping3({"salad": "oil", "potato": "ketchup"})', output: '{"spinach": "oil", "salad": "oil", "potato": "ketchup", "fries": "ketchup"}' }
    ],
    functionSignature: "public Map<String, String> topping3(Map<String, String> map)"
  },
  {
    id: "mapAB2",
    name: "mapAB2",
    difficulty: "H",
    description: `Modify and return the given map as follows: if the keys "a" and "b" are both in the map and have equal values, remove them both.

mapAB2({"a": "aaa", "b": "aaa", "c": "cake"}) → {"c": "cake"}
mapAB2({"a": "aaa", "b": "bbb"}) → {"a": "aaa", "b": "bbb"}
mapAB2({"a": "aaa", "b": "bbb", "c": "aaa"}) → {"a": "aaa", "b": "bbb", "c": "aaa"}`,
    examples: [
      { input: 'mapAB2({"a": "aaa", "b": "aaa", "c": "cake"})', output: '{"c": "cake"}' },
      { input: 'mapAB2({"a": "aaa", "b": "bbb"})', output: '{"a": "aaa", "b": "bbb"}' },
      { input: 'mapAB2({"a": "aaa", "b": "bbb", "c": "aaa"})', output: '{"a": "aaa", "b": "bbb", "c": "aaa"}' }
    ],
    functionSignature: "public Map<String, String> mapAB2(Map<String, String> map)"
  },
  {
    id: "mapAB3",
    name: "mapAB3",
    difficulty: "H",
    description: `Modify and return the given map as follows: if exactly one of the keys "a" or "b" has a value in the map (but not both), set the other to have that same value in the map.

mapAB3({"a": "aaa", "c": "cake"}) → {"a": "aaa", "b": "aaa", "c": "cake"}
mapAB3({"b": "bbb", "c": "cake"}) → {"a": "bbb", "b": "bbb", "c": "cake"}
mapAB3({"a": "aaa", "b": "bbb", "c": "cake"}) → {"a": "aaa", "b": "bbb", "c": "cake"}`,
    examples: [
      { input: 'mapAB3({"a": "aaa", "c": "cake"})', output: '{"a": "aaa", "b": "aaa", "c": "cake"}' },
      { input: 'mapAB3({"b": "bbb", "c": "cake"})', output: '{"a": "bbb", "b": "bbb", "c": "cake"}' },
      { input: 'mapAB3({"a": "aaa", "b": "bbb", "c": "cake"})', output: '{"a": "aaa", "b": "bbb", "c": "cake"}' }
    ],
    functionSignature: "public Map<String, String> mapAB3(Map<String, String> map)"
  },
  {
    id: "mapAB4",
    name: "mapAB4",
    difficulty: "H",
    description: `Modify and return the given map as follows: if the keys "a" and "b" have values that have different lengths, then set "c" to have the longer value. If the values exist and have the same length, change both to the empty string in the map.

mapAB4({"a": "aaa", "b": "bb", "c": "cake"}) → {"a": "aaa", "b": "bb", "c": "aaa"}
mapAB4({"a": "aa", "b": "bbb", "c": "cake"}) → {"a": "aa", "b": "bbb", "c": "bbb"}
mapAB4({"a": "aa", "b": "bb"}) → {"a": "", "b": ""}`,
    examples: [
      { input: 'mapAB4({"a": "aaa", "b": "bb", "c": "cake"})', output: '{"a": "aaa", "b": "bb", "c": "aaa"}' },
      { input: 'mapAB4({"a": "aa", "b": "bbb", "c": "cake"})', output: '{"a": "aa", "b": "bbb", "c": "bbb"}' },
      { input: 'mapAB4({"a": "aa", "b": "bb"})', output: '{"a": "", "b": ""}' }
    ],
    functionSignature: "public Map<String, String> mapAB4(Map<String, String> map)"
  },
  {
    id: "mapValue",
    name: "mapValue",
    difficulty: "H",
    description: `Given a map, return a new map where each key's value is doubled.

mapValue({"a": 2, "b": 3}) → {"a": 4, "b": 6}
mapValue({"a": 1, "b": 2, "c": 3}) → {"a": 2, "b": 4, "c": 6}
mapValue({"a": 5}) → {"a": 10}`,
    examples: [
      { input: 'mapValue({"a": 2, "b": 3})', output: '{"a": 4, "b": 6}' },
      { input: 'mapValue({"a": 1, "b": 2, "c": 3})', output: '{"a": 2, "b": 4, "c": 6}' },
      { input: 'mapValue({"a": 5})', output: '{"a": 10}' }
    ],
    functionSignature: "public Map<String, Integer> mapValue(Map<String, Integer> map)"
  },
  {
    id: "mapKeys",
    name: "mapKeys",
    difficulty: "H",
    description: `Given a map, return a new map where each key has been uppercased.

mapKeys({"a": "apple", "b": "banana"}) → {"A": "apple", "B": "banana"}
mapKeys({"x": "xray"}) → {"X": "xray"}
mapKeys({"hello": "world"}) → {"HELLO": "world"}`,
    examples: [
      { input: 'mapKeys({"a": "apple", "b": "banana"})', output: '{"A": "apple", "B": "banana"}' },
      { input: 'mapKeys({"x": "xray"})', output: '{"X": "xray"}' },
      { input: 'mapKeys({"hello": "world"})', output: '{"HELLO": "world"}' }
    ],
    functionSignature: "public Map<String, String> mapKeys(Map<String, String> map)"
  },
  {
    id: "mapFilter",
    name: "mapFilter",
    difficulty: "H",
    description: `Given a map and a threshold value, return a new map containing only entries where the value is greater than the threshold.

mapFilter({"a": 5, "b": 3, "c": 8}, 4) → {"a": 5, "c": 8}
mapFilter({"a": 1, "b": 2, "c": 3}, 2) → {"c": 3}
mapFilter({"a": 10}, 5) → {"a": 10}`,
    examples: [
      { input: 'mapFilter({"a": 5, "b": 3, "c": 8}, 4)', output: '{"a": 5, "c": 8}' },
      { input: 'mapFilter({"a": 1, "b": 2, "c": 3}, 2)', output: '{"c": 3}' },
      { input: 'mapFilter({"a": 10}, 5)', output: '{"a": 10}' }
    ],
    functionSignature: "public Map<String, Integer> mapFilter(Map<String, Integer> map, int threshold)"
  },
  {
    id: "mapMerge",
    name: "mapMerge",
    difficulty: "H",
    description: `Given two maps, merge them into one. If a key exists in both maps, use the value from the second map.

mapMerge({"a": "1", "b": "2"}, {"b": "3", "c": "4"}) → {"a": "1", "b": "3", "c": "4"}
mapMerge({"x": "1"}, {"y": "2"}) → {"x": "1", "y": "2"}
mapMerge({"a": "1"}, {"a": "2"}) → {"a": "2"}`,
    examples: [
      { input: 'mapMerge({"a": "1", "b": "2"}, {"b": "3", "c": "4"})', output: '{"a": "1", "b": "3", "c": "4"}' },
      { input: 'mapMerge({"x": "1"}, {"y": "2"})', output: '{"x": "1", "y": "2"}' },
      { input: 'mapMerge({"a": "1"}, {"a": "2"})', output: '{"a": "2"}' }
    ],
    functionSignature: "public Map<String, String> mapMerge(Map<String, String> map1, Map<String, String> map2)"
  },
  {
    id: "mapSwap",
    name: "mapSwap",
    difficulty: "H",
    description: `Given a map, swap the keys and values. If there are duplicate values, use the last key encountered.

mapSwap({"a": "1", "b": "2"}) → {"1": "a", "2": "b"}
mapSwap({"a": "1", "b": "1", "c": "2"}) → {"1": "b", "2": "c"}
mapSwap({"x": "y"}) → {"y": "x"}`,
    examples: [
      { input: 'mapSwap({"a": "1", "b": "2"})', output: '{"1": "a", "2": "b"}' },
      { input: 'mapSwap({"a": "1", "b": "1", "c": "2"})', output: '{"1": "b", "2": "c"}' },
      { input: 'mapSwap({"x": "y"})', output: '{"y": "x"}' }
    ],
    functionSignature: "public Map<String, String> mapSwap(Map<String, String> map)"
  },
  {
    id: "mapInvert",
    name: "mapInvert",
    difficulty: "H",
    description: `Given a map, create a new map where each key-value pair is inverted (value becomes key, key becomes value). Assume all values are unique.

mapInvert({"a": "1", "b": "2"}) → {"1": "a", "2": "b"}
mapInvert({"x": "y", "z": "w"}) → {"y": "x", "w": "z"}
mapInvert({"hello": "world"}) → {"world": "hello"}`,
    examples: [
      { input: 'mapInvert({"a": "1", "b": "2"})', output: '{"1": "a", "2": "b"}' },
      { input: 'mapInvert({"x": "y", "z": "w"})', output: '{"y": "x", "w": "z"}' },
      { input: 'mapInvert({"hello": "world"})', output: '{"world": "hello"}' }
    ],
    functionSignature: "public Map<String, String> mapInvert(Map<String, String> map)"
  },
  {
    id: "mapContains",
    name: "mapContains",
    difficulty: "H",
    description: `Given a map and a key, return true if the map contains the key, false otherwise.

mapContains({"a": "1", "b": "2"}, "a") → true
mapContains({"a": "1", "b": "2"}, "c") → false
mapContains({}, "a") → false`,
    examples: [
      { input: 'mapContains({"a": "1", "b": "2"}, "a")', output: "true" },
      { input: 'mapContains({"a": "1", "b": "2"}, "c")', output: "false" },
      { input: 'mapContains({}, "a")', output: "false" }
    ],
    functionSignature: "public boolean mapContains(Map<String, String> map, String key)"
  },
  {
    id: "mapSize",
    name: "mapSize",
    difficulty: "H",
    description: `Given a map, return the number of key-value pairs in the map.

mapSize({"a": "1", "b": "2"}) → 2
mapSize({}) → 0
mapSize({"a": "1", "b": "2", "c": "3"}) → 3`,
    examples: [
      { input: 'mapSize({"a": "1", "b": "2"})', output: "2" },
      { input: 'mapSize({})', output: "0" },
      { input: 'mapSize({"a": "1", "b": "2", "c": "3"})', output: "3" }
    ],
    functionSignature: "public int mapSize(Map<String, String> map)"
  },
  {
    id: "mapKeysList",
    name: "mapKeysList",
    difficulty: "H",
    description: `Given a map, return a list of all the keys in the map.

mapKeysList({"a": "1", "b": "2"}) → ["a", "b"]
mapKeysList({"x": "y"}) → ["x"]
mapKeysList({}) → []`,
    examples: [
      { input: 'mapKeysList({"a": "1", "b": "2"})', output: '["a", "b"]' },
      { input: 'mapKeysList({"x": "y"})', output: '["x"]' },
      { input: 'mapKeysList({})', output: '[]' }
    ],
    functionSignature: "public List<String> mapKeysList(Map<String, String> map)"
  },
  {
    id: "mapValuesList",
    name: "mapValuesList",
    difficulty: "H",
    description: `Given a map, return a list of all the values in the map.

mapValuesList({"a": "1", "b": "2"}) → ["1", "2"]
mapValuesList({"x": "y"}) → ["y"]
mapValuesList({}) → []`,
    examples: [
      { input: 'mapValuesList({"a": "1", "b": "2"})', output: '["1", "2"]' },
      { input: 'mapValuesList({"x": "y"})', output: '["y"]' },
      { input: 'mapValuesList({})', output: '[]' }
    ],
    functionSignature: "public List<String> mapValuesList(Map<String, String> map)"
  },
  {
    id: "mapClear",
    name: "mapClear",
    difficulty: "H",
    description: `Given a map, remove all key-value pairs and return the empty map.

mapClear({"a": "1", "b": "2"}) → {}
mapClear({"x": "y"}) → {}
mapClear({}) → {}`,
    examples: [
      { input: 'mapClear({"a": "1", "b": "2"})', output: '{}' },
      { input: 'mapClear({"x": "y"})', output: '{}' },
      { input: 'mapClear({})', output: '{}' }
    ],
    functionSignature: "public Map<String, String> mapClear(Map<String, String> map)"
  }
];

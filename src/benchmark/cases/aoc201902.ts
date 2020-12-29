const raw =
  "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,5,19,23,1,13,23,27,1,6,27,31,2,31,13,35,1,9,35,39,2,39,13,43,1,43,10,47,1,47,13,51,2,13,51,55,1,55,9,59,1,59,5,63,1,6,63,67,1,13,67,71,2,71,10,75,1,6,75,79,1,79,10,83,1,5,83,87,2,10,87,91,1,6,91,95,1,9,95,99,1,99,9,103,2,103,10,107,1,5,107,111,1,9,111,115,2,13,115,119,1,119,10,123,1,123,10,127,2,127,10,131,1,5,131,135,1,10,135,139,1,139,2,143,1,6,143,0,99,2,14,0,0"

const go = (input: string, noun?: number, verb?: number) => {
  const arr = input.split(",").map(Number)

  arr[1] = noun !== undefined ? noun : arr[1]
  arr[2] = verb !== undefined ? verb : arr[2]

  for (let i = 0; arr[i] !== 99; i += 4) {
    arr[arr[i + 3]] =
      arr[i] === 1
        ? arr[arr[i + 1]] + arr[arr[i + 2]]
        : arr[arr[i + 1]] * arr[arr[i + 2]]
  }

  return arr
}

const brute = (input: string, target: number) => {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const x = go(input, i, j)[0]

      if (x === target) {
        return 100 * i + j
      }
    }
  }
}

export default () => {
  go(raw, 12, 2)[0]
  brute(raw, 19690720)
}

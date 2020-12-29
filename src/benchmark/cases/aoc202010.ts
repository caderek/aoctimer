import raw from "./aoc202010.input"

const prepareInput = (rawInput: string) => {
  const adapters = rawInput
    .split("\n")
    .map(Number)
    .sort((a, b) => a - b)

  return [0, ...adapters, adapters[adapters.length - 1] + 3]
}

const createGraph = () => {
  return {
    graph: [],
    mem: [],

    addEdge(v, w) {
      if (this.graph[v]) {
        this.graph[v].push(w)
      } else {
        this.graph[v] = [w]
      }
    },

    dfs(from) {
      const to = this.graph.length - 1

      if (from === to) {
        return 1
      } else {
        if (this.mem[from] === undefined) {
          this.mem[from] = this.graph[from]
            .map((child) => this.dfs(child, to))
            .reduce((a, b) => a + b)
        }
        return this.mem[from]
      }
    },
  }
}

const goA = (rawInput: string) => {
  const adapters = prepareInput(rawInput)
  const diffs: { [key: number]: number } = {}

  for (let i = 0; i < adapters.length - 1; i++) {
    const diff = adapters[i + 1] - adapters[i]

    if (!diffs[diff]) {
      diffs[diff] = 0
    }

    diffs[diff]++
  }

  return diffs[1] * diffs[3]
}

const goB = (rawInput: string) => {
  const adapters = prepareInput(rawInput)
  const graph = createGraph()

  for (let i = 0; i < adapters.length - 1; i++) {
    let inc = 1

    while (true) {
      if (adapters[i + inc] === undefined) {
        break
      }

      const inRange = adapters[i + inc] - adapters[i] <= 3

      if (!inRange) {
        break
      }

      graph.addEdge(i, i + inc)
      inc++
    }
  }

  return graph.dfs(0)
}

export default () => {
  goA(raw)
  goB(raw)
}

import raw from "./aoc202024.input"

const neighbors = {
  se: [-1, 1],
  sw: [0, 1],
  nw: [1, -1],
  ne: [0, -1],
  e: [-1, 0],
  w: [1, 0],
}

const neighborsVal = Object.values(neighbors)

const prepareInput = (rawInput: string) =>
  rawInput
    .split("\n")
    .map((line) => line.match(/(se|sw|nw|ne|e|w)/g).map((v) => neighbors[v]))

const getBlackTiles = (input: number[][][]) => {
  const blackTiles = new Map()

  input.forEach((coords) => {
    const point = coords.reduce((a, b) => [a[0] + b[0], a[1] + b[1]])

    const id = point.join()

    if (blackTiles.has(id)) {
      blackTiles.delete(id)
    } else {
      blackTiles.set(id, point)
    }
  })

  return blackTiles
}

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)

  return getBlackTiles(input).size
}

const countNeighbors = (arr: number[][], z: number, y: number) => {
  let n = 0

  neighborsVal.forEach(([i, j]) => {
    if (arr[z + i]?.[y + j]) {
      n++
    }
  })

  return n
}

const surroundByEmptySpace = (arr: number[][]) => {
  const h = arr.length + 2
  const d = arr[0].length + 2

  return Array.from({ length: h }, (_, z) =>
    Array.from({ length: d }, (_, y) => arr[z - 1]?.[y - 1] || 0),
  )
}

const goB = (rawInput: string, turns: number = 100) => {
  const input = prepareInput(rawInput)

  const blackTiles = [...getBlackTiles(input).values()]

  const zs = blackTiles.map(([z]) => z)
  const ys = blackTiles.map(([_, y]) => y)
  const minZ = Math.abs(Math.min(...zs))
  const minY = Math.abs(Math.min(...ys))
  const sizeZ = Math.max(...zs) + minZ + 1
  const sizeY = Math.max(...ys) + minY + 1

  const grid = Array.from({ length: sizeZ }, () =>
    Array.from({ length: sizeY }, () => 0),
  )

  blackTiles.forEach(([z, y]) => (grid[z + minZ][y + minY] = 1))

  let world = surroundByEmptySpace(grid)

  while (turns--) {
    const copy = JSON.parse(JSON.stringify(world))

    for (let z = 0; z < world.length; z++) {
      for (let y = 0; y < world[0].length; y++) {
        const item = world[z][y]
        const neighbors = countNeighbors(world, z, y)

        if (item) {
          copy[z][y] = neighbors === 1 || neighbors === 2 ? 1 : 0
        } else if (neighbors === 2) {
          copy[z][y] = 1
        } else {
          copy[z][y] = 0
        }
      }
    }

    world = surroundByEmptySpace(copy)
  }

  return world.flat().filter((v) => v === 1).length
}

export default () => {
  goA(raw)
  goB(raw)
}

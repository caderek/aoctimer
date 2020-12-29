import raw from "./aoc202020.input"

const monster = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `

const monsterSegments = monster.match(/#/g).length

const monsterReg = monster
  .split("\n")
  .map((row) => new RegExp(`(?=(${row.replace(/\s/g, ".")}))`, "g"))

const prepareInput = (rawInput: string) =>
  rawInput.split("\n\n").map((frame) => {
    const [rawId, ...rows] = frame.split("\n")
    const id = Number(rawId.match(/\d+/)[0])
    const pixels = rows.map((row) => row.split(""))

    return { id, pixels }
  })

const zipWith = (zippingFn, otherArr, arr) => {
  const length = Math.min(arr.length, otherArr.length)
  const newArr = []

  for (let i = 0; i < length; i++) {
    const value = zippingFn(otherArr[i], arr[i])
    newArr.push(value)
  }

  return newArr
}

const chunk = (chunkSize, arr) => {
  if (chunkSize <= 0) {
    throw new Error("Chunk size has to be greater than 0.")
  }

  const chunks = []

  for (let i = 0; i < arr.length; i = i + chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize))
  }

  return chunks
}

const getBorders = (pixels: string[][]) => {
  return [
    pixels[0].join(),
    pixels[pixels.length - 1].join(),
    Array.from({ length: pixels.length }, (_, i) => pixels[i][0]).join(),
    Array.from(
      { length: pixels.length },
      (_, i) => pixels[i][pixels.length - 1],
    ).join(),
  ]
}

const getNeighbors = (input) => {
  const framesBoarders = input.map(({ id, pixels }) => {
    const borders = getBorders(pixels)
    const reversed = borders.map((border) => [...border].reverse().join(""))

    return { id, pixels, borders: [borders, reversed] }
  })

  const withNeighbors = framesBoarders.map(({ id, pixels, borders }, i) => ({
    id,
    pixels,
    neighbors: framesBoarders
      .filter((x, j) => {
        if (i === j) return false

        for (const b of borders) {
          for (const bb of x.borders) {
            if (new Set([...b, ...bb]).size < 8) {
              return true
            }
          }
        }

        return false
      })
      .map((x) => x.id),
  }))

  return withNeighbors
}

const identity = (x: any) => x

const flipV = (pixels: string[][]) => {
  return [...pixels].reverse()
}

const flipH = (pixels: string[][]) => {
  return pixels.map((row) => [...row].reverse())
}

const rotate = (pixels: string[][]) => {
  const length = pixels.length
  let rotated: string[][] = Array.from({ length }, () => Array.from({ length }))

  for (let y = 0; y < pixels.length; y++) {
    for (let x = 0; x < pixels.length; x++) {
      rotated[y][x] = pixels[length - 1 - x][y]
    }
  }

  return rotated
}

function* transform(pixels: string[][]) {
  const transformations = [identity, flipH, flipV]
  let current = pixels
  for (let i = 0; i < 3; i++) {
    current = transformations[i](pixels)
    yield current
    for (let j = 0; j < 3; j++) {
      current = rotate(current)
      yield current
    }
  }
}

const stripBorders = (pixels: string[][]) => {
  return pixels.slice(1, -1).map((row) => row.slice(1, -1))
}

const commonPart = (arr1: any[], arr2: any[]) => {
  const set = new Set(arr2)
  return arr1.filter((x) => set.has(x))
}

const goA = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const withNeighbors = getNeighbors(input)

  const corners = withNeighbors
    .filter(({ neighbors }) => neighbors.length === 2)
    .map((x) => x.id)

  return corners.reduce((a, b) => a * b)
}

const goB = (rawInput: string) => {
  const input = prepareInput(rawInput)
  const withNeighbors = getNeighbors(input)
  const idToIndex = Object.fromEntries(input.map(({ id }, i) => [id, i]))

  const done = new Set()
  const orientated = new Map()

  const orientate = (tileWithNeighbors, x = 0, y = 0) => {
    const pixels = orientated.get(tileWithNeighbors.id).pixels
    const [top, bottom, left, right] = getBorders(pixels)

    tileWithNeighbors.neighbors.forEach((id) => {
      if (done.has(id)) {
        return
      }

      const index = idToIndex[id]
      const neighborPixels = input[index].pixels
      for (const pix of transform(neighborPixels)) {
        const [t, b, l, r] = getBorders(pix)

        if (t === bottom) {
          orientated.set(id, { pixels: pix, x: x, y: y - 1 })
          break
        }
        if (b === top) {
          orientated.set(id, { pixels: pix, x: x, y: y + 1 })
          break
        }
        if (l === right) {
          orientated.set(id, { pixels: pix, x: x - 1, y: y })
          break
        }
        if (r === left) {
          orientated.set(id, { pixels: pix, x: x + 1, y: y })
          break
        }
      }

      done.add(id)
    })

    tileWithNeighbors.neighbors.forEach((id) => {
      const index = idToIndex[id]
      const curr = orientated.get(id)
      const tile = {
        ...withNeighbors[index],
        neighbors: withNeighbors[index].neighbors.filter((n) => !done.has(n)),
      }

      orientate(tile, curr.x, curr.y)
    })
  }

  const start = withNeighbors[0]
  orientated.set(start.id, { pixels: start.pixels, x: 0, y: 0 })
  done.add(start.id)
  orientate(start)

  const orientatedVal = [...orientated.values()]

  const shiftX = Math.abs(Math.min(...orientatedVal.map((v) => v.x)))
  const shiftY = Math.abs(Math.min(...orientatedVal.map((v) => v.y)))

  const orientatedValNormalized = orientatedVal
    .map((val) => ({
      ...val,
      x: val.x + shiftX,
      y: val.y + shiftY,
    }))
    .sort((a, b) => a.y - b.y || a.x - b.x)

  const maxY = Math.max(...orientatedValNormalized.map((v) => v.y))

  const picture = chunk(
    orientatedValNormalized.length / (maxY + 1),
    orientatedValNormalized.map(({ pixels }) => stripBorders(pixels)),
  )
    .map((bigRow) =>
      bigRow.reduce((a, b) =>
        zipWith((d: string[], c: string[]) => [...d, ...c], b, a),
      ),
    )
    .reverse()
    .flat()

  const hashesCount = picture.flat().filter((v) => v === "#").length

  const counts: number[] = []
  for (const pix of transform(picture)) {
    const lines = pix.map((v) => v.join(""))
    let monstersCount = 0

    for (let i = 0; i < lines.length - 2; i++) {
      const l1 = [...lines[i].matchAll(monsterReg[0])].map((x) => x.index)
      const l2 = [...lines[i + 1].matchAll(monsterReg[1])].map((x) => x.index)
      const l3 = [...lines[i + 2].matchAll(monsterReg[2])].map((x) => x.index)

      monstersCount += commonPart(commonPart(l1, l2), l3).length
    }
    counts.push(monstersCount)
  }

  return hashesCount - Math.max(...counts) * monsterSegments
}

export default () => {
  goA(raw)
  goB(raw)
}

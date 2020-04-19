export const plotDefinitions = {
  logistic: {
    getInitial: ({ x }) => ({ x, y: Math.random() }),
    iterate: ({ x, y }) => ({ x, y: x * y * (1 - y) }),
    iterations: 500,
    batchSize: 10,
    dimensions: {
      top: 2,
      bottom: -1,
      left: -2.0,
      right: 4.0,
    },
  },

  gauss: {
    getInitial: ({ x }) => ({ x, y: Math.random() }),
    iterate: ({ x, y }, { alpha }) => ({ x, y: Math.exp(-alpha * y ** 2) + x }),
    parameters: {
      alpha: 6.2,
    },
    iterations: 500,
    batchSize: 10,
    dimensions: {
      top: 2,
      bottom: -1,
      left: -2.0,
      right: 4.0,
    },
  },

  tinkerbell: {
    getInitial: () => ({ x: -0.72, y: -0.64 }),
    iterate: ({ x, y }, { a, b, c, d }) => ({
      x: x ** 2 - y ** 2 + a * x + b * y,
      y: 2 * x * y + c * x + d * y,
    }),
    parameters: {
      a: 0.9,
      b: -0.6013,
      c: 2.0,
      d: 0.5,
    },
    iterations: 100000,
    batchSize: 1000,
    dimensions: {
      top: 1,
      bottom: -2,
      left: -2.0,
      right: 1.0,
    },
  },

  henon: {
    getInitial: () => ({ x: 0, y: 0 }),
    iterate: ({ x, y }, { a, b }) => ({
      x: 1 - a * x ** 2 + y,
      y: b * x,
    }),
    parameters: {
      a: 1.4, // 0.2 x (-4..4) y (-4..4)
      b: 0.3, // 0.9991
    },
    iterations: 10000,
    batchSize: 100,
    dimensions: {
      top: 0.4,
      bottom: -0.4,
      left: -3,
      right: 3,
    },
  },

  ikeda: {
    getInitial: () => ({ x: Math.random(), y: Math.random() }),
    iterate: ({ x, y }, { u }) => {
      const t = 0.4 - 6 / (1 + x ** 2 + y ** 2)
      const nextX = 1 + u * (x * Math.cos(t) - y * Math.sin(t))
      const nextY = u * (x * Math.sin(t) + y * Math.cos(t))
      return {
        x: nextX,
        y: nextY,
      }
    },
    parameters: {
      u: 0.918,
    },
    iterations: 1000,
    batchSize: 1,
    dimensions: {
      top: 7,
      bottom: -3,
      left: -2,
      right: 8,
    },
  },

  'de jong': {
    getInitial: () => ({ x: 0, y: 0 }),
    iterate: ({ x, y }, { a, b, c, d }) => ({
      x: Math.sin(a * y) - Math.cos(b * x),
      y: Math.sin(c * x) - Math.cos(d * y),
    }),
    parameters: {
      a: -2,
      b: -2,
      c: -1.2,
      d: 2,
    },
    iterations: 500000,
    batchSize: 10000,
    dimensions: {
      top: 2,
      bottom: -2,
      left: -6,
      right: 6,
    },
  },

  clifford: {
    getInitial: () => ({ x: 0, y: 0 }),
    iterate: ({ x, y }, { a, b, c, d }) => ({
      x: Math.sin(a * y) + c * Math.cos(a * x),
      y: Math.sin(b * x) + d * Math.cos(b * y),
    }),
    parameters: {
      a: -1.7,
      b: 1.8,
      c: -1.9,
      d: -0.4,
    },
    iterations: 500000,
    batchSize: 10000,
    dimensions: {
      top: 2,
      bottom: -2,
      left: -6,
      right: 6,
    },
  },
}

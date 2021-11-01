import * as THREE from 'three'

export const steps = 10000

// equations http://www.3d-meier.de/
export const attractorDefinitions = {
  lorenz: {
    scale: 1,
    createPoints: () => {
      const points = []

      const beta = 8 / 3
      const rho = 28
      const sigma = 10

      const dt = 0.005

      let x = 15 * Math.random()
      let y = 15 * Math.random()
      let z = 15 * Math.random()

      let current = 1
      while (current < steps) {
        const dx = sigma * (y - x)
        const dy = x * (rho - z) - y
        const dz = x * y - beta * z

        x += dx * dt
        y += dy * dt
        z += dz * dt

        current++
        points.push(new THREE.Vector3(x, y, z))
      }

      return points
    },
  },

  rössler: {
    scale: 2,
    createPoints: () => {
      const points = []

      const a = 0.2
      const b = 0.2
      const c = 5.7

      const dt = 0.008

      let x = 0 * Math.random()
      let y = 10 * Math.random()
      let z = 10 * Math.random()

      let current = 1
      while (current < steps) {
        const dx = -(y + z)
        const dy = x + a * y
        const dz = b + x * z - c * z

        x += dx * dt
        y += dy * dt
        z += dz * dt

        current++
        points.push(new THREE.Vector3(x, y, z))
      }
      return points
    },
  },

  thomas: {
    scale: 7,
    createPoints: () => {
      const points = []

      const b = 0.208186
      const dt = 0.1

      let x = 1 * Math.random()
      let y = 0 * Math.random()
      let z = 1 * Math.random()

      let current = 1
      while (current < steps) {
        const dx = Math.sin(y) - b * x
        const dy = Math.sin(z) - b * y
        const dz = Math.sin(x) - b * z

        x += dx * dt
        y += dy * dt
        z += dz * dt

        current++
        points.push(new THREE.Vector3(x, y, z))
      }
      return points
    },
  },

  halvorsen: {
    scale: 3,
    createPoints: () => {
      const points = []

      const a = 1.4

      const dt = 0.005

      let x = 1 * Math.random()
      let y = 0 * Math.random()
      let z = 0 * Math.random()

      let current = 1
      while (current < steps) {
        const dx = -a * x - 4 * y - 4 * z - y ** 2
        const dy = -a * y - 4 * z - 4 * x - z ** 2
        const dz = -a * z - 4 * x - 4 * y - x ** 2

        x += dx * dt
        y += dy * dt
        z += dz * dt

        current++
        points.push(new THREE.Vector3(x, y, z))
      }
      return points
    },
  },

  'chen lee': {
    scale: 2,
    createPoints: () => {
      const points = []

      const alpha = 5
      const beta = -10
      const delta = -0.38

      const dt = 0.004

      let x = 1 * Math.random()
      let y = 0 * Math.random()
      let z = 4.5 * (Math.random() + 1)

      let current = 1
      while (current < steps) {
        const dx = alpha * x - y * z
        const dy = beta * y + x * z
        const dz = delta * z + (x * y) / 3

        x += dx * dt
        y += dy * dt
        z += dz * dt

        current++
        points.push(new THREE.Vector3(x, y, z))
      }
      return points
    },
  },

  aizawa: {
    scale: 12,
    createPoints: () => {
      const points = []

      const a = 0.95
      const b = 0.7
      const c = 0.6
      const d = 3.5
      const e = 0.25
      const f = 0.1

      const dt = 0.01

      let x = 1 * Math.random()
      let y = 0 * Math.random()
      let z = 0 * Math.random()

      let current = 1
      while (current < steps) {
        const dx = (z - b) * x - d * y
        const dy = d * x + (z - b) * y
        const dz = c + a * z - z ** 3 / 3 - (x ** 2 + y ** 2) * (1 + e * z) + f * z * x ** 3

        x += dx * dt
        y += dy * dt
        z += dz * dt

        current++
        points.push(new THREE.Vector3(x, y, z))
      }
      return points
    },
  },

  tsucs: {
    scale: 0.5,
    createPoints: () => {
      const points = []

      const a = 40
      const c = 0.833
      const d = 0.5
      const e = 0.65
      const f = 20

      const dt = 0.001

      let x = 2.2 * (Math.random() + 1)
      let y = 2.4 * (Math.random() + 1)
      let z = 28 * (Math.random() + 1)

      let current = 1
      while (current < steps) {
        const dx = a * (y - x) + d * x * z
        const dy = f * y - x * z
        const dz = c * z + x * y - e * x ** 2

        x += dx * dt
        y += dy * dt
        z += dz * dt

        current++
        points.push(new THREE.Vector3(x, y, z))
      }
      return points
    },
  },
}

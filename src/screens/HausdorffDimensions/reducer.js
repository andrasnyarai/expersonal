import fractals from './fractals'
import { SET_FRACTAL_NAME, SET_DEPTH } from './constants/actionNames'

const initialState = {
  currentFractalName: Object.keys(fractals)[0],
  currentDepth: 1,
  calculating: false,
}

function reducer(state, action) {
  switch (action.type) {
    case SET_FRACTAL_NAME: {
      const currentFractalName = action.payload
      return {
        ...state,
        calculating: true,
        currentFractalName,
      }
    }
    case SET_DEPTH: {
      const currentDepth = action.payload
      return { ...state, currentDepth, calculating: false }
    }
    default:
      throw new Error()
  }
}

export { reducer, initialState }

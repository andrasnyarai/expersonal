import curves from './spaceFillingCurves'
import { SET_CURVE, SET_GENERATION } from './actions'

const initialState = {
  curve: curves['Hilbert curve'],
  generation: 2,
}

function reducer(state, action) {
  switch (action.type) {
    case SET_CURVE: {
      const curveName = action.payload
      const nextCurve = curves[curveName]
      return {
        ...state,
        curve: nextCurve,
        generation: nextCurve.maxGeneration <= state.generation ? nextCurve.maxGeneration : state.generation,
      }
    }
    case SET_GENERATION: {
      const generation = action.payload
      return { ...state, generation }
    }
    default:
      throw new Error()
  }
}

export { reducer, initialState }

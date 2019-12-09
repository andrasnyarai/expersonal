import curves from '../control/spaceFillingCurves'
import { SET_CURVE, SET_GENERATION } from './actions'

const [initialCurveName] = Object.keys(curves)

const initialState = {
  curve: curves[initialCurveName],
  curveName: initialCurveName,
  generation: 2,
  calculating: false,
}

function reducer(state, action) {
  switch (action.type) {
    case SET_CURVE: {
      const curveName = action.payload
      const nextCurve = curves[curveName]
      return {
        ...state,
        curve: nextCurve,
        curveName,
        generation: nextCurve.maxGeneration <= state.generation ? nextCurve.maxGeneration : state.generation,
        calculating: true,
      }
    }
    case SET_GENERATION: {
      const generation = action.payload
      return { ...state, generation, calculating: false }
    }
    default:
      throw new Error()
  }
}

export { reducer, initialState }

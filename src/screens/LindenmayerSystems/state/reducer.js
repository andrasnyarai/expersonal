import curves from '../control/spaceFillingCurves'
import { gradientNames, compositeOperations, lineCaps, lineWidthStyleMap } from '../control/constants'
import {
  SET_CURVE,
  SET_GENERATION,
  SET_GRADIENT_NAME,
  SET_LINE_WIDTH_STYLE,
  SET_COMPOSITE_OPERATION,
  SET_LINE_CAPS,
  SET_CLEAR_BEFORE_DRAW,
  SET_CLEAR_REMAINING_ANIMATIONS,
  SET_DRAW_FULL,
} from './actions'

const [initialCurveName] = Object.keys(curves)

const initialState = {
  curve: curves[initialCurveName],
  curveName: initialCurveName,
  generation: 0,
  calculating: false,

  gradientName: 'Jungle paw',
  lineWidthStyle: 'default',
  compositeOperation: 'source-over',
  lineCaps: 'butt',

  clearBeforeDraw: true,
  clearRemainingAnimations: false,
  drawFull: false,
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
    case SET_GRADIENT_NAME: {
      return { ...state, gradientName: action.payload }
    }
    case SET_LINE_WIDTH_STYLE: {
      return { ...state, lineWidthStyle: action.payload }
    }
    case SET_COMPOSITE_OPERATION: {
      return { ...state, compositeOperation: action.payload }
    }
    case SET_LINE_CAPS: {
      return { ...state, lineCaps: action.payload }
    }
    case SET_CLEAR_BEFORE_DRAW: {
      return { ...state, clearBeforeDraw: action.payload }
    }
    case SET_CLEAR_REMAINING_ANIMATIONS: {
      return { ...state, clearRemainingAnimations: action.payload }
    }
    case SET_DRAW_FULL: {
      return { ...state, drawFull: action.payload }
    }
    default:
      throw new Error()
  }
}

export { reducer, initialState }

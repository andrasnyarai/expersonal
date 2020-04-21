import { plotDefinitions } from './plotDefinitions'

export const SET_MAP = 'SET_MAP'
export const SET_PARAMETER = 'SET_PARAMETER'
export const SET_FRAME = 'SET_FRAME'

const startingName = 'logistic'

export const initialState = {
  mapName: startingName,
  ...plotDefinitions[startingName],
}

export function reducer(state, action) {
  switch (action.type) {
    case SET_MAP: {
      const mapName = action.payload
      return {
        ...plotDefinitions[mapName],
        mapName,
      }
    }
    case SET_PARAMETER: {
      return { ...state, parameters: { ...state.parameters, ...action.payload } }
    }
    case SET_FRAME: {
      return { ...state, dimensions: action.payload }
    }
    default:
      throw new Error()
  }
}

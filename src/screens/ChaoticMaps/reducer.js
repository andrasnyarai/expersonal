import { plotDefinitions } from './plotDefinitions'

export const SET_FRAME = 'SET_FRAME'
export const SET_MAP = 'SET_MAP'

const startingName = 'logistic'

export const initialState = {
  mapName: startingName,
  ...plotDefinitions[startingName],
}

export function reducer(state, action) {
  switch (action.type) {
    case SET_FRAME: {
      return { ...state, dimensions: action.payload }
    }
    case SET_MAP: {
      const mapName = action.payload
      return {
        ...plotDefinitions[mapName],
        mapName,
      }
    }
    default:
      throw new Error()
  }
}

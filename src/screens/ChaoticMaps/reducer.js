export const SET_FRAME = 'SET_FRAME'
export const SET_MAP = 'SET_MAP'

export const initialState = {
  // logistic
  top: 2,
  bottom: -1,

  left: -2.0,
  right: 4.0,

  mapName: 'logistic',
}

export function reducer(state, action) {
  switch (action.type) {
    case SET_FRAME: {
      return { ...state, ...action.payload }
    }
    case SET_MAP: {
      return { ...state, mapName: action.payload }
    }
    default:
      throw new Error()
  }
}

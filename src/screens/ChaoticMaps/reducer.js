export const SET_FRAME = 'SET_FRAME'

export const initialState = {
  // logistic
  top: 2,
  bottom: -1,

  startLambda: -2.0,
  endLambda: 4.0,
}

export function reducer(state, action) {
  switch (action.type) {
    case SET_FRAME: {
      return { ...action.payload }
    }
    default:
      throw new Error()
  }
}

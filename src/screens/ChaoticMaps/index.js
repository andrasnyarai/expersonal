import React, { useRef, useReducer } from 'react'

import { reducer, initialState, SET_FRAME, SET_MAP, SET_PARAMETER } from './reducer'
import { useChaoticMapsDraw } from './draw'
import useResizeObserver from 'use-resize-observer'
import { useGesture } from 'react-use-gesture'
import { map } from '../../math/utils'

// get actal touch position!!
function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue
}

function radiansToDegrees(radians) {
  return radians * (180 / Math.PI)
}

const getDistanceBetweenPoints = (pointA, pointB) =>
  Math.sqrt(Math.pow(pointA.y - pointB.y, 2) + Math.pow(pointA.x - pointB.x, 2))

const getMidpoint = (pointA, pointB) => ({
  x: (pointA.x + pointB.x) / 2,
  y: (pointA.y + pointB.y) / 2,
})
// add windowcheck
// zoom & revert
// zoom anim
// mobile size
// canvas dinamic resize
// number indicators
// add to dashboard
// size them properly
// parameter sliders

// if medium screen maxbatchsize

// change favicon have an ogimage for index as well!!!

export default function ChaoticMaps() {
  const [resizeRef, width] = useResizeObserver()
  const canvasRef = useRef()
  const isMediumScreen = window.innerWidth < 800

  const [offsets, setOffsets] = React.useState({ x: 0, y: 0 })
  const [initial, setInitial] = React.useState({ x: 0, y: 0, distance: 0 })
  const [end, setEnd] = React.useState(false)
  const [zoom, setZoom] = React.useState(1)
  const [transformO, setTransformO] = React.useState({ x: 0, y: 0 })

  const [state, dispatch] = useReducer(reducer, initialState)

  const [newDim, setNewDim] = React.useState(state.dimensions)

  const bind = useGesture(
    {
      onPinch: ({ ...rest }) => {
        const x = rest.event.offsetX
        const y = rest.event.offsetY

        const [a, b] = rest.event.touches || []

        if (!a || !b) {
          return
        }
        const { top, bottom, left, right } = state.dimensions

        const at = { x: a.clientX, y: a.clientY }
        const bt = { x: b.clientX, y: b.clientY }
        const distance = getDistanceBetweenPoints(at, bt)
        const currentMid = getMidpoint(at, bt)

        if (rest.first) {
          setTransformO(getMidpoint(at, bt))
          setInitial({ x: a.clientX, y: a.clientY, distance, bx: bt.x, by: bt.y })
          setEnd(false)
          return
        } else {
          setOffsets({ x: currentMid.x - transformO.x, y: currentMid.y - transformO.y })
        }

        const zoom = distance / initial.distance

        const xShiftPercentega = map(Math.abs(offsets.x), [0, width], [0, 100])
        const yShiftPercentega = map(Math.abs(offsets.y), [0, width], [0, 100]) // we are doing this only i isM<EDIUMSCRENN? lol

        const xAxisMid = map(0.5, [0, 1], [left, right])
        const yAxisMid = map(0.5, [0, 1], [bottom, top])

        let zommedLeft = xAxisMid - Math.abs(xAxisMid - left) / zoom
        let zommedRight = xAxisMid + Math.abs(xAxisMid - right) / zoom
        let zommedTop = yAxisMid + Math.abs(yAxisMid - top) / zoom
        let zommedBottom = yAxisMid - Math.abs(yAxisMid - bottom) / zoom

        const valueToSHiftByX = map(xShiftPercentega, [0, 100], [0, Math.abs(zommedLeft - zommedRight)])
        const valueToSHiftByY = map(yShiftPercentega, [0, 100], [0, Math.abs(zommedTop - zommedBottom)])

        if (offsets.x > 0) {
          zommedLeft -= valueToSHiftByX
          zommedRight -= valueToSHiftByX
        } else {
          zommedLeft += valueToSHiftByX
          zommedRight += valueToSHiftByX
        }

        if (offsets.y > 0) {
          zommedTop += valueToSHiftByY
          zommedBottom += valueToSHiftByY
        } else {
          zommedTop -= valueToSHiftByY
          zommedBottom -= valueToSHiftByY
        }

        const afterZoom = {
          top: zommedTop,
          bottom: zommedBottom,
          left: zommedLeft,
          right: zommedRight,
        }

        setNewDim(afterZoom)
        setZoom(zoom)
      },
      onPinchEnd() {
        dispatch({
          type: SET_FRAME,
          payload: {
            top: newDim.top,
            bottom: newDim.bottom,
            left: newDim.left,
            right: newDim.right,
          },
        })
        setEnd(true)
        setInitial({ x: 0, y: 0, distance: 0 })
        setOffsets({ x: 0, y: 0 })
        setZoom(1)
      },
      // onPinchStart: state => console.log(state),
      // onPinchEnd: state => console.log(state),
    },
    {},
  )

  useChaoticMapsDraw(canvasRef, state, width, isMediumScreen)

  return (
    <>
      <div style={{ touchAction: 'none', overflow: 'hidden', position: 'relative' }} {...bind()} ref={resizeRef}>
        <div style={{ zIndex: 2, left: 0, position: 'absolute', width: '10px', height: '10px' }}>{newDim.top}</div>
        <div style={{ zIndex: 2, bottom: 25, position: 'absolute', width: '10px', height: '10px' }}>
          {newDim.bottom}
        </div>
        <div style={{ zIndex: 2, bottom: 15, left: 15, position: 'absolute', width: '10px', height: '10px' }}>
          {newDim.left}
        </div>
        <div style={{ zIndex: 2, right: 50, bottom: 15, position: 'absolute', width: '10px', height: '10px' }}>
          {newDim.right}
        </div>
        <canvas
          style={{
            // msTransformOrigin: `${transformO.x} ${transformO.y}`,
            transform: end
              ? `translateX(0px) translateY(0px) scale(1)`
              : `translateX(${offsets.x}px) translateY(${offsets.y}px) scale(${zoom}) `,
            outline: 'solid',
          }}
          width={width}
          height={isMediumScreen ? width : width / 2}
          ref={canvasRef}
        />
      </div>
      {['logistic', 'gauss', 'tinkerbell', 'henon', 'ikeda', 'de jong', 'clifford'].map(mapName => (
        <div key={mapName} onClick={() => dispatch({ type: SET_MAP, payload: mapName })}>
          {mapName}
        </div>
      ))}
      {state.parameters &&
        Object.entries(state.parameters).map(([parameterName, value]) => {
          const [min, max] = state.parametersRange[parameterName]
          const step = state.parametersStep
          // memo these
          // debounce throttle
          return (
            <>
              <input
                type="range"
                step={step}
                min={min}
                max={max}
                value={value}
                onChange={e => dispatch({ type: SET_PARAMETER, payload: { [parameterName]: e.target.value } })}
              />
              {value}
            </>
          )
        })}
    </>
  )
}

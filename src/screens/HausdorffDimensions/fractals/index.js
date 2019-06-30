import { drawSierpinskiTriangle } from './drawSierpinskiTriangle'
import { drawHTree } from './drawHTree'
import { drawVicsekSnowflake } from './drawVicsekSnowflake'
import { drawTSquare } from './drawTSquare'
import { drawCantorSet } from './drawCantorSet'
import { drawSierpinskiCarpet } from './drawSierpinskiCarpet'
import { drawSierpinskiHexagon } from './drawSierpinskiHexagon'
import { drawKochSnowflake } from './drawKochSnowflake'
import { drawPythagorasTree } from './drawPythagorasTree'
import { drawMandelbrotSet } from './drawMandelbrotSet'

export default {
  'Mandelbrot Set': { draw: drawMandelbrotSet, maxDepth: 10 },
  'Pythagoras tree': { draw: drawPythagorasTree, maxDepth: 12 },
  'Koch snowflake': { draw: drawKochSnowflake, maxDepth: 7 },
  'Sierpinski Triangle': { draw: drawSierpinskiTriangle, maxDepth: 7 },
  'Sierpinski Hexagon': { draw: drawSierpinskiHexagon, maxDepth: 6 },
  'Sierpinski Carpet': { draw: drawSierpinskiCarpet, maxDepth: 6 },
  'Vicsek snowflake': { draw: drawVicsekSnowflake, maxDepth: 6 },
  'H tree': { draw: drawHTree, maxDepth: 7 },
  'T-square': { draw: drawTSquare, maxDepth: 7 },
  'Cantor Set': { draw: drawCantorSet, maxDepth: 9 },
}

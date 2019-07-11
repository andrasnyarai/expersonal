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
  'Mandelbrot Set': {
    draw: drawMandelbrotSet,
    maxDepth: 10,
    pixelManipulated: true,
    readyMadeCard: {
      base64:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABHElEQVRoQ+3ZUQ6EIAwEULn/odm4iYYYhLa0HWJmv9X4OpSuWmqt9fjArxCyWYpMZLNADibCRIIqwKXlVdhSyn2pldkMT6SFXCILCArpIawYGGSEODHaVNIhM0DbexpMGkQDeG4kElAKZAUh7ZlwiAdCggmDeAJSIRE33hu6b/2ynEgWYJYKIWeFstMYDUpTIgiA69JCAlwgOwAI6e3hOyTjOkeQIFfIlRYCFAJBzBJCpG9LspZZWCJv0AjY6EnR9BdFmpJ3D0EhXpjZc3t4Ih5b9QzxL1b2pzdN70gAd6GyIdKENAhIIu1G8YlXpqNktGnAE3nuaBYAvEc0s0hybPquJbkpyzGEWKoWeQ4Tiayu5dpMxFK1yHM+k8gPSnInelIwoyIAAAAASUVORK5CYII=',
    },
  },
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

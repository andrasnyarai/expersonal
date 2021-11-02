![lambda](/src/images/expr.png?raw=true 'expersonal')

# Visual Experiments

[![Netlify Status](https://api.netlify.com/api/v1/badges/a6f7430e-1c83-4650-9809-66c53bfb2b01/deploy-status)](https://app.netlify.com/sites/pensive-perlman-4b9984/deploys)

---

## Strange Attractors

A 3d visualisation of deterministic equations.

## Chaotic Maps

An exploration through the abstract world of chaotic maps and bifurcation diagrams. The initial conditions, constants can be adjusted via knobs, the canvas can handle zooming and panning for fine grained details.

## Lindenmayer Systems

A parallel rewriting system for [Space-filling Curves](https://en.wikipedia.org/wiki/Space-filling_curve) and fractals.
Each geometric structure describes itself as an axiom and production rules,
to calculate the n-th generation of a structure, the production rules are applied
as a rewriting rule on the axiom.
To draw the structure on to the canvas, the output symbols are translated into vector graphics commands.

## Hausdorff Dimensions

A recursive implementation of the most well-known fractals, the [Mandelbrot Set](https://en.wikipedia.org/wiki/Mandelbrot_set) in particular is drawn
with direct pixel manipulation and spawning web workers.

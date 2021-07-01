import * as THREE from 'three'
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils'

const matrix = new THREE.Matrix4()

const lineSize = 1
const lineDepth = 0.03

const lineGeometry = new THREE.BoxBufferGeometry(lineSize, lineDepth, lineDepth)

const frontLineGeometry = lineGeometry.clone().applyMatrix4(matrix)
const backLineGeometry = lineGeometry.clone().applyMatrix4(matrix)
const leftLineGeometry = lineGeometry.clone().applyMatrix4(matrix)
const rightLineGeometry = lineGeometry.clone().applyMatrix4(matrix)

frontLineGeometry.translate(0, 0, lineSize / 2 - lineDepth / 2)
backLineGeometry.translate(0, 0, -(lineSize / 2 - lineDepth / 2))

leftLineGeometry.rotateY(Math.PI / 2)
leftLineGeometry.translate(-(lineSize / 2 - lineDepth / 2), 0, 0)

rightLineGeometry.rotateY(Math.PI / 2)
rightLineGeometry.translate(lineSize / 2 - lineDepth / 2, 0, 0)

const topFrame = BufferGeometryUtils.mergeBufferGeometries([
  frontLineGeometry,
  backLineGeometry,
  leftLineGeometry,
  rightLineGeometry,
])

const bottomFrame = topFrame.clone().applyMatrix4(matrix)
const frontFrame = topFrame.clone().applyMatrix4(matrix)
const backFrame = topFrame.clone().applyMatrix4(matrix)

topFrame.translate(0, -(lineSize / 2 - lineDepth / 2), 0)
bottomFrame.translate(0, lineSize / 2 - lineDepth / 2, 0)

frontFrame.rotateX(Math.PI / 2)
frontFrame.translate(0, 0, lineSize / 2 - lineDepth / 2)

backFrame.rotateX(Math.PI / 2)
backFrame.translate(0, 0, -(lineSize / 2 - lineDepth / 2))

export const hollowCubeGeometry = BufferGeometryUtils.mergeBufferGeometries([
  topFrame,
  bottomFrame,
  frontFrame,
  backFrame,
])

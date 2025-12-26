import { Position, PositionState } from './drag-type'

export function getViewportPosition(position: PositionState, isMobile: boolean): Position {
  return isMobile ? position.mb : position.pc
}

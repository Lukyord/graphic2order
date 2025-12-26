import { Position } from './drag-type'

export const DEFAULT_POSITION = '0'

export function normalizePosition(position: Position): Position {
  return {
    top: position.top || DEFAULT_POSITION,
    left: position.left || DEFAULT_POSITION,
  }
}

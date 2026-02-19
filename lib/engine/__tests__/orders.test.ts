import { describe, it, expect } from 'vitest'
import { shouldTriggerOrder, updateTrailingStop, validateOrderPrice } from '../orders'

describe('shouldTriggerOrder', () => {
  it('triggers stop-loss for long when price drops to trigger', () => {
    expect(shouldTriggerOrder('STOP_LOSS', 49000, 49500, 'LONG')).toBe(true)
  })

  it('does not trigger stop-loss for long when price is above trigger', () => {
    expect(shouldTriggerOrder('STOP_LOSS', 50000, 49500, 'LONG')).toBe(false)
  })

  it('triggers stop-loss for short when price rises to trigger', () => {
    expect(shouldTriggerOrder('STOP_LOSS', 51000, 50500, 'SHORT')).toBe(true)
  })

  it('does not trigger stop-loss for short when price is below trigger', () => {
    expect(shouldTriggerOrder('STOP_LOSS', 50000, 50500, 'SHORT')).toBe(false)
  })

  it('triggers take-profit for long when price rises to trigger', () => {
    expect(shouldTriggerOrder('TAKE_PROFIT', 52000, 51500, 'LONG')).toBe(true)
  })

  it('does not trigger take-profit for long when price is below trigger', () => {
    expect(shouldTriggerOrder('TAKE_PROFIT', 51000, 51500, 'LONG')).toBe(false)
  })

  it('triggers take-profit for short when price drops to trigger', () => {
    expect(shouldTriggerOrder('TAKE_PROFIT', 48000, 48500, 'SHORT')).toBe(true)
  })

  it('does not trigger take-profit for short when price is above trigger', () => {
    expect(shouldTriggerOrder('TAKE_PROFIT', 49000, 48500, 'SHORT')).toBe(false)
  })
})

describe('updateTrailingStop', () => {
  it('moves trigger up for long when price increases', () => {
    // current trigger 49000, distance 1000, price rises to 51000 -> new trigger 50000
    expect(updateTrailingStop(49000, 1000, 51000, 'LONG')).toBe(50000)
  })

  it('does not move trigger down for long when price drops', () => {
    // current trigger 49000, distance 1000, price drops to 49500 -> stays 49000
    expect(updateTrailingStop(49000, 1000, 49500, 'LONG')).toBe(49000)
  })

  it('moves trigger down for short when price decreases', () => {
    // current trigger 51000, distance 1000, price drops to 49000 -> new trigger 50000
    expect(updateTrailingStop(51000, 1000, 49000, 'SHORT')).toBe(50000)
  })

  it('does not move trigger up for short when price rises', () => {
    // current trigger 51000, distance 1000, price rises to 51500 -> stays 51000
    expect(updateTrailingStop(51000, 1000, 51500, 'SHORT')).toBe(51000)
  })
})

describe('validateOrderPrice', () => {
  it('accepts stop-loss below entry for long', () => {
    expect(validateOrderPrice(49000, 50000, 'LONG', 'STOP_LOSS')).toBe(true)
  })

  it('rejects stop-loss above entry for long', () => {
    expect(validateOrderPrice(51000, 50000, 'LONG', 'STOP_LOSS')).toBe(false)
  })

  it('accepts stop-loss above entry for short', () => {
    expect(validateOrderPrice(51000, 50000, 'SHORT', 'STOP_LOSS')).toBe(true)
  })

  it('rejects stop-loss below entry for short', () => {
    expect(validateOrderPrice(49000, 50000, 'SHORT', 'STOP_LOSS')).toBe(false)
  })

  it('accepts take-profit above entry for long', () => {
    expect(validateOrderPrice(51000, 50000, 'LONG', 'TAKE_PROFIT')).toBe(true)
  })

  it('rejects take-profit below entry for long', () => {
    expect(validateOrderPrice(49000, 50000, 'LONG', 'TAKE_PROFIT')).toBe(false)
  })

  it('accepts take-profit below entry for short', () => {
    expect(validateOrderPrice(49000, 50000, 'SHORT', 'TAKE_PROFIT')).toBe(true)
  })

  it('rejects take-profit above entry for short', () => {
    expect(validateOrderPrice(51000, 50000, 'SHORT', 'TAKE_PROFIT')).toBe(false)
  })
})

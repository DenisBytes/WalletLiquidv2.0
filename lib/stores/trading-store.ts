import { create } from 'zustand'
import type { FuturesPosition, OptionsPosition } from '@/lib/engine/types'

interface TradingState {
  balance: number
  futuresPositions: FuturesPosition[]
  optionsPositions: OptionsPosition[]
  isLoading: boolean
  setBalance: (balance: number) => void
  setFuturesPositions: (positions: FuturesPosition[]) => void
  setOptionsPositions: (positions: OptionsPosition[]) => void
  setLoading: (loading: boolean) => void
  updateFuturesMarkPrice: (positionId: string, markPrice: number) => void
  removeFuturesPosition: (positionId: string) => void
  removeOptionsPosition: (positionId: string) => void
}

export const useTradingStore = create<TradingState>((set) => ({
  balance: 0,
  futuresPositions: [],
  optionsPositions: [],
  isLoading: false,

  setBalance(balance) {
    set({ balance })
  },

  setFuturesPositions(positions) {
    set({ futuresPositions: positions })
  },

  setOptionsPositions(positions) {
    set({ optionsPositions: positions })
  },

  setLoading(loading) {
    set({ isLoading: loading })
  },

  updateFuturesMarkPrice(positionId, markPrice) {
    set((state) => ({
      futuresPositions: state.futuresPositions.map((p) =>
        p.id === positionId ? { ...p, markPrice } : p
      ),
    }))
  },

  removeFuturesPosition(positionId) {
    set((state) => ({
      futuresPositions: state.futuresPositions.filter(
        (p) => p.id !== positionId
      ),
    }))
  },

  removeOptionsPosition(positionId) {
    set((state) => ({
      optionsPositions: state.optionsPositions.filter(
        (p) => p.id !== positionId
      ),
    }))
  },
}))

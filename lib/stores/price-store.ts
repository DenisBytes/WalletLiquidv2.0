import { create } from 'zustand'

const RECONNECT_DELAY = 3000

interface PriceState {
  prices: Map<string, number>
  connected: boolean
  ws: WebSocket | null
  connect: (symbols: string[]) => void
  disconnect: () => void
  getPrice: (symbol: string) => number | undefined
}

export const usePriceStore = create<PriceState>((set, get) => {
  let reconnectTimeout: ReturnType<typeof setTimeout> | null = null
  let activeSymbols: string[] = []

  function cleanup() {
    if (reconnectTimeout) {
      clearTimeout(reconnectTimeout)
      reconnectTimeout = null
    }
  }

  function scheduleReconnect() {
    cleanup()
    reconnectTimeout = setTimeout(() => {
      const { ws } = get()
      if (!ws) {
        get().connect(activeSymbols)
      }
    }, RECONNECT_DELAY)
  }

  return {
    prices: new Map(),
    connected: false,
    ws: null,

    connect(symbols: string[]) {
      const { ws } = get()
      if (ws) ws.close()
      cleanup()

      if (symbols.length === 0) return

      activeSymbols = symbols

      const streams = symbols
        .map((s) => `${s.toLowerCase()}usdt@trade`)
        .join('/')
      const socket = new WebSocket(
        `wss://stream.binance.com:9443/stream?streams=${streams}`
      )

      socket.onopen = () => {
        set({ connected: true, ws: socket })
      }

      socket.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data)
          const data = msg.data
          if (!data?.s || !data?.p) return

          // Strip the USDT suffix to get the base symbol
          const symbol = data.s.replace(/USDT$/i, '').toUpperCase()
          const price = parseFloat(data.p)

          set((state) => {
            const next = new Map(state.prices)
            next.set(symbol, price)
            return { prices: next }
          })
        } catch {
          // Malformed message, skip
        }
      }

      socket.onclose = () => {
        set({ connected: false, ws: null })
        scheduleReconnect()
      }

      socket.onerror = () => {
        socket.close()
      }

      set({ ws: socket })
    },

    disconnect() {
      cleanup()
      activeSymbols = []
      const { ws } = get()
      if (ws) ws.close()
      set({ connected: false, ws: null })
    },

    getPrice(symbol: string) {
      return get().prices.get(symbol.toUpperCase())
    },
  }
})

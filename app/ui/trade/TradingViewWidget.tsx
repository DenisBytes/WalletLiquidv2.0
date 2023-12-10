"use client";
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
declare global {
    interface Window {
        TradingView: any; // Define the type for TradingView here, 'any' is used as an example
    }
}

let tvScriptLoadingPromise: Promise<Event> | undefined;

export default function TradingViewWidget() {
    const onLoadScriptRef = useRef<(() => void) | null>(null);
    const pathname = usePathname();
    const symbol = pathname.substring(pathname.length - 3);
    useEffect(() => {
        onLoadScriptRef.current = createWidget;

        if (!tvScriptLoadingPromise) {
            tvScriptLoadingPromise = new Promise((resolve) => {
                const script = document.createElement('script');
                script.id = 'tradingview-widget-loading-script';
                script.src = 'https://s3.tradingview.com/tv.js';
                script.type = 'text/javascript';
                script.onload = resolve;

                document.head.appendChild(script);
            });
        }

        tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

        return () => {
            onLoadScriptRef.current = null;
        };

        function createWidget(): void {
            if (document.getElementById('tradingview_138dc') && window.TradingView) {
                const bluePrice = 40000.00; // Blue line price level (replace with your value)
                const redPrice = 38000.00; // Red line price level (replace with your value)

                const widget = new window.TradingView.widget({
                    autosize: true,
                    symbol: `${symbol}USDT`,
                    interval: 'D',
                    timezone: 'Etc/UTC',
                    theme: 'light',
                    style: '1',
                    locale: 'en',
                    enable_publishing: false,
                    hide_side_toolbar: false,
                    hide_legend: true,
                    allow_symbol_change: false,
                    gridColor: 'rgba(238, 238, 238, 1)',
                    save_image: false,
                    container_id: 'tradingview_138dc',
                    hide_volume: true,
                    overrides: {
                        'paneProperties.background': '#FFFFFF', // Chart background color
                        'mainSeriesProperties.candleStyle.upColor': '#0d9c84', // Positive candle body color
                        'mainSeriesProperties.candleStyle.borderUpColor': '#0d9c84', // Positive candle border color
                        'mainSeriesProperties.candleStyle.downColor': 'black', // Negative candle body color
                        'mainSeriesProperties.candleStyle.borderDownColor': 'black', // Negative candle border color
                        'mainSeriesProperties.candleStyle.drawWick': true, // Draw wick for candles
                        'mainSeriesProperties.candleStyle.wickUpColor': 'black', // Positive candle wick color
                        'mainSeriesProperties.candleStyle.wickDownColor': 'black', // Negative candle wick color
                    },
                });
            }
        }
    }, [symbol]);

    return (
        <div className="tradingview-widget-container" style={{ height: '10rem', width: '50%' }}>
            <div id="tradingview_138dc" style={{ height: '100%', width: '100%', minHeight: '500px' }} />
        </div>
    );
}

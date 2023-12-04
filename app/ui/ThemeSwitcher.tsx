"use client"
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react';


export default function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

    }, []);

    if (!mounted) {
        return null;
    }
    return (
        <div>
            <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="theme-switch-btn"
            >
                <h1 style={{ fontSize: '30px' }}>{theme === 'dark' ? '☀️' : '🌑'}</h1>
            </button>
        </div>
    )
    
}
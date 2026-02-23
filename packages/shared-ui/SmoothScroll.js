import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { scrollConfig } from '@portfolio/config-animations';
export const SmoothScroll = ({ children }) => {
    const lenisRef = useRef(null);
    useEffect(() => {
        lenisRef.current = new Lenis({
            ...scrollConfig,
        });
        function raf(time) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => {
            lenisRef.current?.destroy();
        };
    }, []);
    return _jsx(_Fragment, { children: children });
};

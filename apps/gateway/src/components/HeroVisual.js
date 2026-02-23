import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
const NeuralCore = () => {
    const meshRef = useRef(null);
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.cos(t / 4) / 8;
            meshRef.current.rotation.y = Math.sin(t / 4) / 8;
            meshRef.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20;
        }
    });
    return (_jsx(Float, { speed: 4, rotationIntensity: 1, floatIntensity: 2, children: _jsx(Sphere, { args: [1, 100, 100], scale: 1.5, children: _jsx(MeshDistortMaterial, { color: "#D4AF37", speed: 3, distort: 0.4, radius: 1 }) }) }));
};
export const HeroVisual = () => {
    return (_jsx("div", { className: "absolute inset-0 -z-10 h-screen w-full", children: _jsxs(Canvas, { camera: { position: [0, 0, 5], fov: 75 }, children: [_jsx("ambientLight", { intensity: 0.5 }), _jsx("pointLight", { position: [10, 10, 10], intensity: 1 }), _jsx(NeuralCore, {})] }) }));
};
export default HeroVisual;

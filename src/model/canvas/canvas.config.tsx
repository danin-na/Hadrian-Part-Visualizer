import { INTERF_Canvas_Config } from "./canvas.interface";


export const CanvasConfig: INTERF_Canvas_Config = {
    camera: {
        position: [200, 200, 200],
        fov: 70,
    },
    background: '#333333',
    orbitControls: {
        minPolarAngle: 0,
        maxPolarAngle: Math.PI / 1.9,
        enablePan: false,
    },
    presentationControls: {
        global: true,
        polar: [-1, 1],
        config: { mass: 2, tension: 400 },
        snap: { mass: 4, tension: 400 },
    },
    float: {
        rotationIntensity: 2,
    },
    shadow: {
        position: [0, -1.2, 0],
        opacity: 0.7,
        scale: 10,
        blur: 1.8,
        far: 2,
    },
    environment: {
        preset: 'city',
        background: false,
    },
    grid: {
        enabled: true,
        size: 200,
        divisions: 10,
        color: '#333333',
        fadeDistance: 200,
        infiniteGrid: true,
    },
};
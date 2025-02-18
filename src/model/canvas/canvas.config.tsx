import { INTERF_Canvas_Config } from "./canvas.interface";


export const CanvasConfig: INTERF_Canvas_Config = {
    camera: {
        position: [20, 25, 20],
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
        rotationIntensity: 0.1,
    },
    shadow: {
        position: [0, -1.5, 0],
        opacity: 0.8,
        scale: 15,
        blur: 5,
        far: 5,
    },
    environment: {
        preset: 'city',
        background: false,
    },
    grid: {
        enabled: true,
        size: 10,
        divisions: 10,
        color: '#333333',
        fadeDistance: 55,
        infiniteGrid: true,
    },
};
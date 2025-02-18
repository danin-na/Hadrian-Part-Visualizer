import { INTERF_Canvas_Config } from "./canvas.interface";


export const CanvasConfig: INTERF_Canvas_Config = {
    camera: {
        position: [10, 10, 10], fov: 70
    },
    background: '#333333',
    fog: {
        color: '#333333', near: 5, far: 25
    },
    ambientLight: {
        intensity: 0.4
    },
    directionalLight:
    {
        position: [5, 10, 5],
        intensity: 1.5,
        castShadow: true,
        shadowMapSize: [1024, 1024],
    },
    pointLight: { position: [-5, 5, -5], intensity: 0.7 },
    softShadows: { size: 16, focus: 0.5, samples: 10 },
    orbitControls: { minPolarAngle: 0, maxPolarAngle: Math.PI / 1.9, enablePan: false },
    presentationControls: {
        global: true,
        polar: [-1, 1],
        config: { mass: 2, tension: 400 },
        snap: { mass: 4, tension: 400 },
    },
    float: { rotationIntensity: 2 },
    contactShadows: { position: [0, -1.2, 0], opacity: 0.7, scale: 10, blur: 1.8, far: 2 },
    environment: { preset: 'city', background: false },
    grid: { enabled: true, size: 10, divisions: 10, color: '#ffffff' },
};

export interface INTERF_Canvas_Config
{

    camera: {
        position: [number, number, number];
        fov: number;
    };
    background: string;
    fog: {
        color: string;
        near: number;
        far: number;
    };
    ambientLight: {
        intensity: number;
    };
    directionalLight: {
        position: [number, number, number];
        intensity: number;
        castShadow: boolean;
        shadowMapSize: [number, number];
    };
    pointLight: {
        position: [number, number, number];
        intensity: number;
    };
    softShadows: {
        size: number;
        focus: number;
        samples: number;
    };
    orbitControls: {
        minPolarAngle: number;
        maxPolarAngle: number;
        enablePan: boolean;
    };
    presentationControls: {
        global: boolean;
        polar: [number, number];
        config: {
            mass: number;
            tension: number;
        };
        snap: {
            mass: number;
            tension: number;
        };
    };
    float: {
        rotationIntensity: number;
    };
    contactShadows: {
        position: [number, number, number];
        opacity: number;
        scale: number;
        blur: number;
        far: number;
    };
    environment: {
        preset: "apartment" | "city" | "dawn" | "forest" | "lobby" | "night" | "park" | "studio" | "sunset" | "warehouse";
        background: boolean;
    };
    grid?: {
        enabled?: boolean;
        size?: number;
        divisions?: number;
        color?: string;
    };

}

export interface INTERF_Canvas_Render
{
    config: INTERF_Canvas_Config
    children?: React.ReactNode;
}

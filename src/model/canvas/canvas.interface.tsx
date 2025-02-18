export interface INTERF_Canvas_Config
{
    camera: {
        position: [number, number, number];
        fov: number;
    };
    background: string;
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
    shadow: {
        position: [number, number, number];
        opacity: number;
        scale: number;
        blur: number;
        far: number;
    };
    environment: {
        preset:
        | "apartment"
        | "city"
        | "dawn"
        | "forest"
        | "lobby"
        | "night"
        | "park"
        | "studio"
        | "sunset"
        | "warehouse";
        background: boolean;
    };
    grid?: {
        enabled?: boolean;
        size?: number;
        divisions?: number;
        color?: string;
        fadeDistance?: number;
        infiniteGrid?: boolean;
    };
}

export interface INTERF_Canvas_Render
{
    config: INTERF_Canvas_Config;
    children?: React.ReactNode;
}

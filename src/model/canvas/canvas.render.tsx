import { Canvas } from '@react-three/fiber';
import
{
    ContactShadows,
    Float,
    OrbitControls,
    PresentationControls,
    Environment,
    SoftShadows,
    Grid,
} from '@react-three/drei';
import { INTERF_Canvas_Render } from './canvas.interface';


export const CanvasRender = ({ config, children }: INTERF_Canvas_Render) =>
{
    const {
        camera,
        background,
        fog,
        ambientLight,
        directionalLight,
        pointLight,
        softShadows,
        orbitControls,
        presentationControls,
        float,
        contactShadows,
        environment,
        grid,
    } = config;

    return (
        <Canvas shadows camera={{ position: camera.position, fov: camera.fov }} gl={{ antialias: true }}>
            {/* Background and Fog */}
            <color args={[background]} attach="background" />
            <fog attach="fog" args={[fog.color, fog.near, fog.far]} />

            {/* Lighting */}
            <ambientLight intensity={ambientLight.intensity} />
            <directionalLight
                position={directionalLight.position}
                intensity={directionalLight.intensity}
                castShadow={directionalLight.castShadow}
                shadow-mapSize={directionalLight.shadowMapSize}
            />
            <pointLight position={pointLight.position} intensity={pointLight.intensity} />

            {/* Soft Shadows */}
            <SoftShadows size={softShadows.size} focus={softShadows.focus} samples={softShadows.samples} />

            {/* Orbit Controls */}
            <OrbitControls
                minPolarAngle={orbitControls.minPolarAngle}
                maxPolarAngle={orbitControls.maxPolarAngle}
                enablePan={orbitControls.enablePan}
            />

            {/* Optional Grid Background */}
            {grid?.enabled && (
                <Grid
                    args={[grid.size || 10, grid.divisions || 10]}
                    cellColor={grid.color || '#ffffff'}
                    sectionColor={grid.color || '#ffffff'}
                />
            )}

            {/* Presentation Controls with Floating Children */}
            <PresentationControls
                global={presentationControls.global}
                polar={presentationControls.polar}
                config={presentationControls.config}
                snap={presentationControls.snap}
            >
                <Float rotationIntensity={float.rotationIntensity}>
                    {children}
                </Float>
            </PresentationControls>

            {/* Contact Shadows */}
            <ContactShadows
                position={contactShadows.position}
                opacity={contactShadows.opacity}
                scale={contactShadows.scale}
                blur={contactShadows.blur}
                far={contactShadows.far}
            />

            {/* Environment Reflections */}
            <Environment preset={environment.preset} background={environment.background} />
        </Canvas>
    );
};

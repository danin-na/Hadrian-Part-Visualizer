import { Canvas } from '@react-three/fiber';
import
    {
        ContactShadows,
        Float,
        OrbitControls,
        PresentationControls,
        Environment,
        Grid,
    } from '@react-three/drei';
import { INTERF_Canvas_Render } from './canvas.interface';

export const CanvasRender = ({ config, children }: INTERF_Canvas_Render) =>
{
    const {
        camera,
        background,
        orbitControls,
        presentationControls,
        float,
        shadow,
        environment,
        grid,
    } = config;

    return (
        <Canvas shadows camera={{ position: camera.position, fov: camera.fov }} gl={{ antialias: true }}>
            {/* Background */}
            <color args={[background]} attach="background" />

            {/* Orbit Controls */}
            <OrbitControls
                minPolarAngle={orbitControls.minPolarAngle}
                maxPolarAngle={orbitControls.maxPolarAngle}
                enablePan={orbitControls.enablePan}
            />

            {/* Cool Infinite Grid */}
            {grid?.enabled && (
                <Grid
                    args={[grid.size || 10, grid.divisions || 10]}
                    cellColor={grid.color || '#ffffff'}
                    sectionColor={grid.color || '#ffffff'}
                    fadeDistance={grid.fadeDistance || 30}
                    infiniteGrid={grid.infiniteGrid ?? true}
                />
            )}

            {/* Presentation Controls & Floating Children */}
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
                position={shadow.position}
                opacity={shadow.opacity}
                scale={shadow.scale}
                blur={shadow.blur}
                far={shadow.far}
            />

            {/* Environment */}
            <Environment preset={environment.preset} background={environment.background} />
        </Canvas>
    );
};

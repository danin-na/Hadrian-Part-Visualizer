import * as THREE from 'three';
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';


interface Geo 
{
    id: number
    name?: string
    geo?: THREE.BufferGeometry
}

interface Rgb
{
    id: number
    rgb: string
}

interface Ent
{
    id: number
    ent?: {
        type: number
        centerUv: number[]
        centerPoint: number[]
        centerNormal: number[]
        area: number
        minRadius: number
        minPosRadius: number
        minNegRadius: number
        edgeCurveChains: any[]
    }
}

export default function PartLoader ()
{
    const [geo, setGeo] = useState<Geo[]>([]);
    const [rgb, setRgb] = useState<Rgb[]>([]);
    const [ent, setEnt] = useState<Ent[]>([]);

    const getEnt = async () =>
    {
        const response = await fetch("./entity_geometry_info.json");
        const data = await response.json();

        const E: Ent[] = data.map((item: any) => ({
            id: item.entityId,
            ent: {
                type: item.entityType,
                centerUv: item.centerUv,
                centerPoint: item.centerPoint,
                centerNormal: item.centerNormal,
                area: item.area,
                minRadius: item.minRadius,
                minPosRadius: item.minPosRadius,
                minNegRadius: item.minNegRadius,
                edgeCurveChains: item.edgeCurveChains,
            },
        }));

        console.log("ENT", E)
        setEnt(E);
    };

    const getRgb = async () =>
    {
        const response = await fetch("./rgb_id_to_entity_id_map.json");
        const data = await response.json();

        const R: Rgb[] = Object.entries(data).map(([rgb, id]) =>
        {
            // convert "187-4-105" -> ["187", "4", "105"] -> "rgb(187, 4, 105)"
            const [R, G, B] = rgb.split("-");
            const RGB = `rgb(${R},${G},${B})`;

            return {
                id: parseInt(id as string),
                rgb: RGB
            };
        });

        console.log("RGB", R)
        setRgb(R);
    };

    const { scene } = useGLTF('./colored_glb.glb');

    const getGeo = () =>
    {
        if (!scene) return;

        const g: Geo[] = [];
        scene.traverse((obj) =>
        {
            if ((obj as THREE.Mesh).isMesh) {
                const mesh = obj as THREE.Mesh;
                g.push({
                    id: parseInt(mesh.name.split('_').pop() || '0', 10),
                    name: mesh.name,
                    geo: mesh.geometry,
                });
            }
        });

        console.log('GEO', g);
        setGeo(g);
    };

    useEffect(() =>
    {
        getRgb()
        getEnt()
        getGeo()

    }, [scene])

    /*

    // Load the GLB/GLTF model
    const { scene } = useGLTF('./colored_glb.glb');

    useEffect(() =>
    {
        if (!scene) return;

        const g: Geo[] = [];

        scene.traverse((obj) =>
        {
            if ((obj as THREE.Mesh).isMesh) {
                const mesh = obj as THREE.Mesh;

                g.push({
                    id: parseInt(mesh.name.split('_').pop() || '0', 10),
                    name: mesh.name,
                    geo: mesh.geometry,
                });
            }
        });

        setGeo(g);

    }, [scene]);



    useEffect(() =>
    {
        if (geo.length === 0) return

        console.log(geo)

    }, [geo])
*/

    return (
        <Canvas shadows gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [4, 5, 2], fov: 35 }}>
            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.9} />
            <Stage intensity={0.5} preset="rembrandt" shadows="contact" adjustCamera={3}>
                <group>
                    {geo.map((item, index) => (
                        <mesh key={index} geometry={item.geo}>
                            <meshStandardMaterial />
                        </mesh>
                    ))}
                </group>
            </Stage>
        </Canvas>
    );
}

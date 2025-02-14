import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { useState, useEffect } from 'react';

import { Geo, Rgb, Ent, Mesh } from "./interface"

const createMeshes = (geo: Geo[], ent: Ent[], rgb: Rgb[]): Mesh[] =>
{
    return geo.map((geoItem) =>
    {
        // Find the corresponding ent and rgb items by id
        const meshEnt = ent.find((e) => e.id === geoItem.id) || ({} as Ent);
        const meshRgb = rgb.find((r) => r.id === geoItem.id) || ({} as Rgb);

        // Create a new Mesh using the spread operator for each part
        return {
            id: geoItem.id,
            geo: { ...geoItem },
            ent: { ...meshEnt },
            rgb: { ...meshRgb },
        };
    });
};

export default function PartLoader ()
{
    const [geo, setGeo] = useState<Geo[]>([]);
    const [rgb, setRgb] = useState<Rgb[]>([]);
    const [ent, setEnt] = useState<Ent[]>([]);
    const [meshes, setMeshes] = useState<Mesh[]>([]);

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

        console.log("ENT", E);
        setEnt(E);
    };

    const getRgb = async () =>
    {
        const response = await fetch("./rgb_id_to_entity_id_map.json");
        const data = await response.json();

        const R: Rgb[] = Object.entries(data).map(([rgb, id]) =>
        {
            const [R, G, B] = rgb.split("-");
            const RGB = `rgb(${R},${G},${B})`;

            return {
                id: parseInt(id as string),
                rgb: RGB
            };
        });

        console.log("RGB", R);
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
        getRgb();
        getEnt();
        getGeo();
    }, [scene]);

    useEffect(() =>
    {
        if (geo.length && ent.length && rgb.length) {
            const combinedMeshes = createMeshes(geo, ent, rgb);
            console.log("Combined Meshes:", combinedMeshes);
            setMeshes(combinedMeshes);
        }
    }, [geo, ent, rgb]);

    return (
        <Canvas shadows gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [4, 3, 2], fov: 35 }}>
            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.9} />
            <Stage intensity={0.9} preset="rembrandt" shadows="contact" adjustCamera={3}>
                <group>
                    {meshes.map((mesh, index) => (
                        <mesh key={index} geometry={mesh.geo.geo}>
                            <meshStandardMaterial color={mesh.rgb.rgb} />
                        </mesh>
                    ))}
                </group>
            </Stage>
        </Canvas>
    );
}

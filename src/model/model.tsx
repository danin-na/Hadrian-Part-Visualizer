import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { useState, useEffect } from 'react';


export interface Geo 
{
    geo: {
        id: string
        name?: string
        source: THREE.BufferGeometry
    }
}

export interface Rgb
{
    rgb: {
        id: string
        code: string
    }
}

export interface Ent
{
    ent: {
        id: string
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

export interface Mesh
{
    id: string
    geo: Geo
    ent: Ent
    rgb: Rgb
}



export default function PartLoader ()
{
    const [geo, setGeo] = useState<Geo[]>([]);
    const [rgb, setRgb] = useState<Rgb[]>([]);
    const [ent, setEnt] = useState<Ent[]>([]);
    const [meshes, setMeshes] = useState<Mesh[]>([]);

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
                    geo:
                    {
                        id: mesh.name.split('_').pop() || '0',
                        name: mesh.name,
                        source: mesh.geometry,
                    }
                });
            }
        });

        console.log('GEO', g);
        setGeo(g);
    };

    const getRgb = async () =>
    {
        const response = await fetch("./rgb_id_to_entity_id_map.json");
        const data = await response.json();

        const R: Rgb[] = Object.entries(data).map(([rgb, id]) =>
        {
            const [R, G, B] = rgb.split("-");

            return {
                rgb:
                {
                    id: id as string,
                    code: `rgb(${R},${G},${B})`
                }
            };
        });

        console.log("RGB", R);
        setRgb(R);
    };


    const getEnt = async () =>
    {
        const response = await fetch("./entity_geometry_info.json");
        const data = await response.json();

        const E: Ent[] = data.map((item: any) => ({

            ent: {
                id: item.entityId,
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


    useEffect(() =>
    {
        getGeo();
        getRgb();
        getEnt();

    }, [scene]);


    useEffect(() =>
    {
        // Only combine data if all arrays have items.
        if (geo.length && rgb.length && ent.length) {
            // Create maps for quick lookup by id.
            const geoMap = new Map(geo.map((g) => [g.geo.id, g]));
            const rgbMap = new Map(rgb.map((r) => [r.rgb.id, r]));
            const entMap = new Map(ent.map((e) => [e.ent.id, e]));

            // Get the union of all keys.
            const meshIds = new Set([
                ...geoMap.keys(),
                ...rgbMap.keys(),
                ...entMap.keys(),
            ]);

            const createdMeshes: Mesh[] = [];

            meshIds.forEach((id) =>
            {
                const geoItem = geoMap.get(id);
                const rgbItem = rgbMap.get(id);
                const entItem = entMap.get(id);

                // Only create the mesh if all three exist for the id.
                if (geoItem && rgbItem && entItem) {
                    createdMeshes.push({
                        id,
                        geo: geoItem,
                        rgb: rgbItem,
                        ent: entItem,
                    });
                }
            });

            console.log("Meshes", createdMeshes);
            setMeshes(createdMeshes);
        }
    }, [geo, rgb, ent]);


    return (
        <Canvas
            shadows
            gl={{ antialias: false }}
            dpr={[1, 1.5]}
            camera={{ position: [4, 3, 2], fov: 35 }}
        >
            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.9} />
            <Stage intensity={0.9} preset="rembrandt" shadows="contact" adjustCamera={3}>
                <group>
                    {meshes.map((meshData) => (
                        <mesh
                            key={meshData.id}
                            geometry={meshData.geo.geo.source}
                        >
                            <meshStandardMaterial
                                color={
                                    meshData.ent.ent.type === 0
                                        ? "#333"
                                        : meshData.rgb.rgb.code
                                }
                            />
                        </mesh>
                    ))}
                </group>
            </Stage>
        </Canvas>

    );
}

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { useState, useEffect } from 'react';
//import { useFetchGEO, useFetchRGB, useFetchENT, useFetchNBR, interfaceGEO, interfaceRGB, interfaceENT, interfaceNBR } from './helpres';
import _ from 'lodash';
import * as THREE from 'three';

interface interfaceRGB
{
    id: string;
    rgb: {
        code: string;
    }

}

interface interfaceGEO
{
    id: string
    name: string
    geo: THREE.BufferGeometry
}

interface interfaceENT
{
    id: string
    ent: {
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

interface interfaceNBR
{
    id: string
    nbr:
    {
        neighbors: string[]
        neighbors_number: number
    }
}


const useFetchGEO = async (group: THREE.Group): Promise<interfaceGEO[]> =>
{
    const meshes: THREE.Mesh[] = [];
    group.traverse((obj) =>
    {
        if ((obj as THREE.Mesh).isMesh) {
            meshes.push(obj as THREE.Mesh);
        }
    });

    const newGEO = _.chain(meshes)
        .map((mesh: THREE.Mesh) =>
        {
            const [name, num, id] = mesh.name.split('_');
            return {
                id: String(id),
                name: mesh.name,
                geo: mesh.geometry,
            };
        })
        .value();

    return newGEO;
};

const useFetchRGB = async (url: string): Promise<interfaceRGB[]> =>
{
    const response = await fetch(url);
    const data = await response.json();

    const newRGB = _.chain(data)
        .toPairs()
        .map(([code, id]) =>
        {
            const [R, G, B] = code.split('-');
            return {
                id: String(id),
                rgb: { code: `rgb(${R},${G},${B})` },
            };
        })
        .sortBy(item => Number(item.id))
        .value();

    return newRGB;
};

const useFetchNBR = async (url: string): Promise<interfaceNBR[]> =>
{
    const response = await fetch(url);
    const data = await response.json();

    const newNBR = _.chain(data)
        .toPairs()
        .map(([id, neighbors]) => ({
            id: String(id),
            nbr: {
                neighbors: [String(neighbors)],
                neighbors_number: neighbors.length,
            },
        }))
        .sortBy(item => Number(item.id))
        .value();

    return newNBR;
};

const useFetchENT = async (url: string): Promise<interfaceENT[]> =>
{
    const response = await fetch(url);
    const data = await response.json();

    const newENT = _.chain(data)
        .map((ent) => ({
            id: ent.entityId,
            ent: {
                type: ent.entityType,
                centerUv: ent.centerUv,
                centerPoint: ent.centerPoint,
                centerNormal: ent.centerNormal,
                area: ent.area,
                minRadius: ent.minRadius,
                minPosRadius: ent.minPosRadius,
                minNegRadius: ent.minNegRadius,
                edgeCurveChains: ent.edgeCurveChains,
            },
        }))
        .sortBy(item => Number(item.id))
        .value();

    return newENT;
};

export default function PartLoader ()
{
    const [GEO, setGEO] = useState<interfaceGEO[]>([]);
    const [RGB, setRGB] = useState<interfaceRGB[]>([]);
    const [ENT, setENT] = useState<interfaceENT[]>([]);
    const [NBR, setNBR] = useState<interfaceNBR[]>([]);
    const [MESH, setMESh] = useState<any[]>([]);

    const { scene } = useGLTF('./colored_glb.glb');

    useEffect(() =>
    {
        if (!scene) return;

        useFetchGEO(scene).then(setGEO);
        useFetchRGB('./rgb_id_to_entity_id_map.json').then(setRGB);
        useFetchENT('./entity_geometry_info.json').then(setENT);
        useFetchNBR('./adjacency_graph.json').then(setNBR);

    }, [scene]);

    useEffect(() =>
    {
        if (RGB.length === 0 || GEO.length === 0 || ENT.length === 0 || NBR.length === 0) return;


        const mesh = _.merge(GEO, RGB, ENT, NBR)
        console.log(mesh)

        setMESh(mesh)

    }, [RGB, GEO, ENT, NBR]);

    return (
        <>
            <div className="flex h-screen w-full">

                {/* Left Sidebar */}
                <aside className="w-64 bg-gray-900 text-white p-4 overflow-y-auto">

                </aside>


                {/* Main 3D Canvas Section */}
                <main className="flex-1 bg-gray-700 flex items-center justify-center">
                    <div className="w-full h-full bg-black">
                        <Canvas shadows dpr={[1, 1.5]} camera={{ position: [4, 3, 2], fov: 35 }}>
                            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.9} />
                            <Stage intensity={0.1} shadows="contact" adjustCamera={3}>
                                <group>
                                    {MESH.map((meshData) => (
                                        <mesh key={meshData.id} geometry={meshData.geo}>
                                            <meshStandardMaterial color={meshData.rgb.code} />
                                        </mesh>
                                    ))}
                                </group>
                            </Stage>
                        </Canvas>
                    </div>
                </main>

                {/* Right Sidebar */}
                <aside className="w-64 bg-gray-900 text-white p-4 overflow-y-auto">

                </aside>
            </div>

        </>

    );
}

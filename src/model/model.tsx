import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, useSelect, } from '@react-three/drei';
import { useState, useEffect } from 'react';
import * as THREE from 'three';

import _ from "lodash"

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

export default function PartLoader ()
{

    const [GEO, setGEO] = useState<interfaceGEO[]>([]);
    const [RGB, setRGB] = useState<interfaceRGB[]>([]);
    const [ENT, setENT] = useState<interfaceENT[]>([]);


    const [MESH, setMESh] = useState<any[]>([]);

    const { scene } = useGLTF('./colored_glb.glb');

    const useFetchGEO = async (data: THREE.Group): Promise<void> =>
    {

        const meshes: THREE.Mesh[] = [];
        data.traverse((obj) =>
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
                    name: String(mesh.name),
                    geo: mesh.geometry,
                };
            })
            .value();

        setGEO(newGEO);
    };


    const useFetchRGB = async (url: string): Promise<void> =>
    {
        const response = await fetch(url);
        const data: { [key: string]: number } = await response.json();

        const newRGB = _.chain(data)
            .toPairs()
            .map(([code, id]) =>
            {
                const [R, G, B] = code.split('-');
                return {
                    id: String(id),
                    rgb: { code: `rgb(${R},${G},${B})` }
                };
            })
            .sortBy(item => Number(item.id))
            .value();

        setRGB(newRGB);
    };

    const useFetchENT = async (url: string): Promise<void> =>
    {
        const response = await fetch(url);
        const data = await response.json();

        const newENT = _.chain(data)
            //.toPairs() it already an array
            .map((ent) =>
            {
                return {
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
                };
            })
            .sortBy(item => Number(item.id))
            .value();

        setENT(newENT);
    };



    useEffect(() =>
    {
        if (!scene) return

        useFetchGEO(scene)
        useFetchRGB('./rgb_id_to_entity_id_map.json')
        useFetchENT('./entity_geometry_info.json')

    }, [scene])

    useEffect(() =>
    {
        if (RGB.length === 0 || GEO.length === 0 || ENT.length === 0) return


        console.log("🟩 GEO : ", GEO)
        console.log("🟥 RGB : ", RGB)
        console.log("🟨 ENT : ", ENT)

        const test = _.merge(RGB, GEO, ENT)


        setMESh(test)

    }, [RGB, GEO, ENT])

    useEffect(() =>
    {
        if (MESH.length === 0) return
        console.log('MESH', MESH)

    }, [MESH])


    return (

        <Canvas shadows dpr={[1, 1.5]} camera={{ position: [4, 3, 2], fov: 35 }}>
            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.9} />
            <Stage intensity={0.1} shadows="contact" adjustCamera={3}>
                <group>
                    {MESH.map((meshData: any) => (
                        <mesh key={meshData.id} geometry={meshData.geo}>
                            <meshStandardMaterial color="#cc3333" />
                        </mesh>
                    ))}
                </group>
            </Stage>
        </Canvas>

    );
}

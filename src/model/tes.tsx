// Three
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
// Hooks
import { useState, useEffect } from "react";
import { useFetchJson } from "./useFetchJson";

// TypeScript Interface for your Model
interface Model
{
    id: string
    entity: {
        type: number;
        centerUv: number[];
        centerPoint: number[];
        centerNormal: number[];
        area: number;
        minRadius: number;
        minPosRadius: number;
        minNegRadius: number;
        edgeCurveChains: any[];
    }
    color?: string
    geo?: THREE.BufferGeometry;
}

const PartLoader = () =>
{

    const [clone, setclone] = useState<Model[]>([]);

    const d_model = useGLTF('./colored_glb.glb'); // ADD THIS TO GEO

    const cloneModel = async () =>
    {
        const response = await fetch("./entity_geometry_info.json")
        const result = await response.json()

        const newModelEntities: Model[] = result.map((item: any) => ({
            id: item.entityId,
            entity: {
                type: item.entityType,
                centerUv: item.centerUv,
                centerPoint: item.centerPoint,
                centerNormal: item.centerNormal,
                area: item.area,
                minRadius: item.minRadius,
                minPosRadius: item.minPosRadius,
                minNegRadius: item.minNegRadius,
                edgeCurveChains: item.edgeCurveChains,
            }
        }));
        setclone(newModelEntities);

    }

    useEffect(() =>
    {
        cloneModel()
    }, []);

    useEffect(() =>
    {
        //console.log("heeeeeeeeeeeeeeeeeeeey", d_model)

    }, [clone])

    return (
        <Canvas>
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="orange" />
            </mesh>
        </Canvas>
    );
};

export default PartLoader;

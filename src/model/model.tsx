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
    // State to hold the array of Model objects
    const [models, setModels] = useState<Model[]>([]);

    const cloneModel = async () =>
    {
        const response = await fetch("./entity_geometry_info.json")
        const result = await response.json()

        const d_model = useGLTF('./colored_glb.glb');


        const newModelEntities: Model[] = result.map((item: any) => ({
            id: item.entityId, // assign the id from entityId in JSON
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
        setModels(newModelEntities);

    }

    useEffect(() =>
    {
        cloneModel()
    }, []);

    useEffect(() =>
    {
        console.log("heeeeeeeeeeeeeeeeeeeey", models)
    }, [models])

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

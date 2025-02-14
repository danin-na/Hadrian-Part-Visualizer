// Three
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
// Hooks
import { useState, useEffect } from "react";
import { useFetchJson } from "./useFetchJson";
// Model Interface
import { Model } from "./interface";


const PartLoader = () =>
{
    const [Clone, setClone] = useState<Model[]>([]);

    // Load Model
    const d_model = useGLTF('./colored_glb.glb');

    useEffect(() =>
    {
        if (!d_model.scene) return

        const newModelEntities: Model[] = [];

        d_model.scene.traverse((element) =>
        {
            if (element.type !== 'Mesh') return;
            const meshElement = element as THREE.Mesh;

            // Extract the ID from the mesh name (e.g., "Product_1_143")
            const nameParts = meshElement.name.split('_');

            newModelEntities.push({
                id: Number(nameParts[nameParts.length - 1]),
                color: '#cc3333',
                bufferGeometry: meshElement.geometry as THREE.BufferGeometry,
                entityGeometryInfo: undefined,
            });
        });

        setClone(newModelEntities);

    }, [d_model.scene]);

    // Load additional JSON data
    const { data: d_adj_met } = useFetchJson("./adjacency_graph_edge_metadata.json");
    const { data: d_adj_gra } = useFetchJson("./adjacency_graph.json");
    const { data: d_ent_inf } = useFetchJson("./entity_geometry_info.json");
    const { data: d_rgb_map } = useFetchJson("./rgb_id_to_entity_id_map.json");

    useEffect(() =>
    {
        if (Clone.length === 0) return;
        if (!d_adj_met || !d_adj_gra || !d_ent_inf || !d_rgb_map) return;
    }, [Clone, d_adj_met, d_adj_gra, d_ent_inf, d_rgb_map]);

    return (
        <Canvas shadows gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [4, 5, 2], fov: 35 }}>
            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.9} />
            <Stage intensity={0.5} preset="rembrandt" shadows="contact" adjustCamera={3}>
                <group>
                    {Clone.map((ent, index) => (
                        <mesh geometry={ent.bufferGeometry} key={index}>
                            <meshStandardMaterial color={ent.color} />
                        </mesh>
                    ))}
                </group>
            </Stage>
        </Canvas>
    );
};

export default PartLoader;

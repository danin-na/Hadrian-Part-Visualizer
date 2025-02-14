// Three Imports
import * as THREE from 'three';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
// use Hooks import
import { useState, useEffect } from "react";
import { useFetchJson } from "./useFetchJson";






interface ModelEntity
{
    bufferGeometry: THREE.BufferGeometry;
    color: string;
}

const PartLoader = () =>
{

    const { data: d_adj_met } = useFetchJson("./adjacency_graph_edge_metadata.json");
    const { data: d_adj_gra } = useFetchJson("./adjacency_graph.json");
    const { data: d_ent_inf } = useFetchJson("./entity_geometry_info.json");
    const { data: d_rgb_map } = useFetchJson("./rgb_id_to_entity_id_map.json");

    useEffect(() =>
    {
        if (d_adj_met && d_adj_gra && d_ent_inf && d_rgb_map) {
            console.log('adjacency_graph_edge_metadata:', d_adj_met);
            console.log('adjacency_graph:', d_adj_gra);
            console.log('entity_geometry_info:', d_ent_inf);
            console.log('rgb_id_to_entity_id_map:', d_rgb_map);
        }
    }, [d_adj_met, d_adj_gra, d_ent_inf, d_rgb_map]);



    const gltf = useGLTF('./colored_glb.glb');

    const [modelEnts, setModelEnts] = useState<ModelEntity[]>([]);

    useEffect(() =>
    {
        const newModelEntities: ModelEntity[] = [];
        gltf.scene.traverse((element) =>
        {
            if (element.type !== 'Mesh') return;
            const meshElement = element as THREE.Mesh;

            // Add a custom id using the userData property
            meshElement.userData.customId = `mesh-${Math.random().toString(36).substr(2, 9)}`;

            newModelEntities.push({
                bufferGeometry: meshElement.geometry as THREE.BufferGeometry,
                color: 'rgb(120, 120, 120)',
            });
        });
        setModelEnts(newModelEntities);
    }, [gltf.scene]);

    return (
        <Canvas shadows gl={{ antialias: false }} dpr={[1, 1.5]} camera={{ position: [4, 5, 2], fov: 35 }}>

            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.9} makeDefault />
            <Stage
                intensity={0.5}
                preset="rembrandt"
                shadows="contact"
                adjustCamera={3}
            >
                <group position={10}>
                    {
                        modelEnts.map((ent, index) => (
                            <mesh
                                geometry={ent.bufferGeometry}
                                key={index}
                            >
                                <meshStandardMaterial color={ent.color} />
                            </mesh>
                        ))
                    }
                </group>
            </Stage>
        </Canvas>
    );
}

export default PartLoader
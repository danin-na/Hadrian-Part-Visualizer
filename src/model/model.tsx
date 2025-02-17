import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { useFetchGEO, useFetchRGB, useFetchENT, useFetchNBR, interfaceGEO, interfaceRGB, interfaceENT, interfaceNBR } from './helpres';



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

        const updatedMeshes = GEO.map(geoItem =>
        {
            const rgbData = RGB.find(item => item.id === geoItem.id)?.rgb;
            const entData = ENT.find(item => item.id === geoItem.id)?.ent;
            const nbrData = NBR.find(item => item.id === geoItem.id)?.nbr;

            geoItem.geo.userData = {
                ...geoItem.geo.userData,
                id: geoItem.id,
                rgb: rgbData,
                ent: entData,
                nbr: nbrData,
            };

            return geoItem;
        });

        setMESh(updatedMeshes);
    }, [RGB, GEO, ENT, NBR]);

    const ss = (e: any) =>
    {
        console.log(e.object);
    };

    return (
        <Canvas shadows dpr={[1, 1.5]} camera={{ position: [4, 3, 2], fov: 35 }}>
            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.9} />
            <Stage intensity={0.1} shadows="contact" adjustCamera={3}>
                <group>
                    {MESH.map((meshData) => (
                        <mesh key={meshData.id} geometry={meshData.geo} onClick={ss}>
                            <meshStandardMaterial color="#cc3333" />
                        </mesh>
                    ))}
                </group>
            </Stage>
        </Canvas>
    );
}

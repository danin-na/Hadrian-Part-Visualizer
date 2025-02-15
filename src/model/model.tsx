import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF, } from '@react-three/drei';
import { useState, useEffect } from 'react';
import { Geo, Rgb, Ent, Cnc, Mesh } from './interface'
import { getRgb, getEnt, getGeo, getCnc } from './helpres'

export default function PartLoader ()
{
    const [geo, setGeo] = useState<Geo[]>([]);
    const [rgb, setRgb] = useState<Rgb[]>([]);
    const [ent, setEnt] = useState<Ent[]>([]);
    const [cnc, setCnc] = useState<Cnc[]>([]);
    const [meshes, setMeshes] = useState<Mesh[]>([]);




    const { scene } = useGLTF('./colored_glb.glb');

    useEffect(() =>
    {
        if (!scene) return

        getGeo(scene).then(G => setGeo(G));

        getCnc().then(C => setCnc(C))

        getRgb().then(R => setRgb(R))

        getEnt().then(E => setEnt(E))


    }, [scene]);

    useEffect(() =>
    {

        if (geo.length && rgb.length && ent.length && cnc.length) {

            const geoMap = new Map(geo.map((g) => [g.geo.id, g]));
            const rgbMap = new Map(rgb.map((r) => [r.rgb.id, r]));
            const entMap = new Map(ent.map((e) => [e.ent.id, e]));
            const cncMap = new Map(cnc.map((c) => [c.cnc.id, c]));

            const meshIds = new Set([
                ...geoMap.keys(),
                ...rgbMap.keys(),
                ...entMap.keys(),
                ...cncMap.keys(),
            ]);

            const createdMeshes: Mesh[] = [];

            meshIds.forEach((id) =>
            {
                const geoItem = geoMap.get(id);
                const rgbItem = rgbMap.get(id);
                const entItem = entMap.get(id);
                const cncItem = cncMap.get(id);

                if (geoItem && rgbItem && entItem && cncItem) {
                    createdMeshes.push({
                        id,
                        geo: geoItem,
                        rgb: rgbItem,
                        ent: entItem,
                        cnc: cncItem,
                    });
                }
            });

            console.log("Meshes", createdMeshes);
            setMeshes(createdMeshes);
        }
    }, [geo, rgb, ent, cnc]);

    return (
        <Canvas shadows dpr={[1, 1.5]} camera={{ position: [4, 3, 2], fov: 35 }}>

            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.9} />

            <Stage intensity={0.1} shadows="contact" adjustCamera={3}>
                <group>
                    {meshes.map((meshData) => (
                        <mesh key={meshData.id} geometry={meshData.geo.geo.source}>
                            <meshStandardMaterial color={meshData.cnc.cnc.sss ? "lightblue" : "#333333"} />
                        </mesh>
                    ))}
                </group>
            </Stage>
        </Canvas>

    );
}

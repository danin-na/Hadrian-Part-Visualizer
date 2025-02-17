import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFetchGEO, useFetchRGB, useFetchENT, useFetchNBR } from './loader_helper';
import { interfaceGEO, interfaceRGB, interfaceENT, interfaceNBR } from './loader_interface';

const useMesh = () =>
{
    const [GEO, setGEO] = useState<interfaceGEO[]>([]);
    const [RGB, setRGB] = useState<interfaceRGB[]>([]);
    const [ENT, setENT] = useState<interfaceENT[]>([]);
    const [NBR, setNBR] = useState<interfaceNBR[]>([]);
    const [MESH, setMESH] = useState<any[]>([]);
    const [loading, setLoading] = useState(true); // Track loading state

    const { scene } = useGLTF('./colored_glb.glb');

    useEffect(() =>
    {
        if (!scene) return;

        (async () =>
        {
            console.log("⏳ Fetching data...");

            const geoData = await useFetchGEO(scene);
            const rgbData = await useFetchRGB('./rgb_id_to_entity_id_map.json');
            const entData = await useFetchENT('./entity_geometry_info.json');
            const nbrData = await useFetchNBR('./adjacency_graph.json');

            setTimeout(() =>
            {  // FAKE DELAY: Simulates network delay
                setGEO(geoData);
                setRGB(rgbData);
                setENT(entData);
                setNBR(nbrData);
            }, 500); // 0.5-second delay
        })();
    }, [scene]);

    useEffect(() =>
    {
        if (RGB.length === 0 || GEO.length === 0 || ENT.length === 0 || NBR.length === 0) return;

        const mesh = _.merge(GEO, RGB, ENT, NBR);
        setTimeout(() =>
        {  // FAKE DELAY before finalizing
            console.log('✅ useMesh DONE', mesh);
            setMESH(mesh);
            setLoading(false);
        }, 500); // Another 0.5-second delay before setting final data
    }, [RGB, GEO, ENT, NBR]);

    return { MESH, loading };
};

export default useMesh;

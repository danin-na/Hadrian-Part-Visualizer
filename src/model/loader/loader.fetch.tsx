import { useState, useEffect } from 'react';
import _ from 'lodash';
import { useGLTF } from '@react-three/drei';
import { useFetchGEO, useFetchRGB, useFetchENT, useFetchNBR } from './loader.helper';

export const useMesh = (url: string) =>
{
    const [mesh, setMesh] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { scene } = useGLTF(url);

    useEffect(() =>
    {
        if (!scene) return;

        (async () =>
        {
            const [GEO, RGB, ENT, NBR] = await Promise.all([
                useFetchGEO(scene),
                useFetchRGB('./rgb_id_to_entity_id_map.json'),
                useFetchENT('./entity_geometry_info.json'),
                useFetchNBR('./adjacency_graph.json'),
            ]);

            await new Promise(resolve => setTimeout(resolve, 1000)); // Fake 1-second delay

            const mergedData = _.merge({}, GEO, RGB, ENT, NBR);

            console.log('✅ useMesh DONE', mergedData);
            setMesh(mergedData);
            setLoading(false);

        })();

    }, [scene]);

    return { mesh, loading };
};

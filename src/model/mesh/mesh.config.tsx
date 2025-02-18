import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFetchGEO, useFetchRGB, useFetchENT, useFetchNBR } from './mesh.config.helper';


export function MeshConfig (url: string)
{
    const [meshConfig, setMeshConfig] = useState<any>(null);
    const [meshConfig_loading, setLoading] = useState(true);

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

            // optional artificial delay
            await new Promise(resolve => setTimeout(resolve, 1000));


            const mergedData = _.merge([], GEO, RGB, ENT, NBR);

            console.log('✅ useMeshConfig DONE', mergedData);
            setMeshConfig(mergedData);
            setLoading(false);
        })();
    }, [scene]);

    return [meshConfig, meshConfig_loading];
}

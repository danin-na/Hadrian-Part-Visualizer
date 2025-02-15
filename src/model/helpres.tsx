import { Geo, Rgb, Ent, Nbr, Cnc, Mesh } from './interface'
import * as THREE from 'three';

const NBR_URL = "'./rgb_id_to_entity_id_map.json'"

export async function getRgb (): Promise<Rgb[]>
{
    const response = await fetch('./rgb_id_to_entity_id_map.json');
    const data = await response.json();

    const rgbArray: Rgb[] = Object.entries(data).map(([rgb, id]) =>
    {
        const [R, G, B] = rgb.split('-');
        return {
            rgb: {
                id: id as string,
                code: `rgb(${R},${G},${B})`,
            },
        };
    });

    console.log('RGB', rgbArray);
    return rgbArray;
}

export async function getNbr (): Promise<Nbr[]>
{
    const response = await fetch(NBR_URL);
    const data = (await response.json()) as Record<string, string[]>;

    const nbrArray: Nbr[] = Object.entries(data).map(([id, neighbors]) => ({
        nbr: {
            id,
            neighbors,
            neighbors_number: neighbors.length,
        },
    }));

    console.log('nbrArray', nbrArray);
    return nbrArray;
}

export async function getEnt (): Promise<Ent[]>
{
    const response = await fetch('./entity_geometry_info.json');
    const data = await response.json();

    const entArray: Ent[] = data.map((item: any) => ({
        ent: {
            id: item.entityId,
            type: item.entityType,
            centerUv: item.centerUv,
            centerPoint: item.centerPoint,
            centerNormal: item.centerNormal,
            area: item.area,
            minRadius: item.minRadius,
            minPosRadius: item.minPosRadius,
            minNegRadius: item.minNegRadius,
            edgeCurveChains: item.edgeCurveChains,
        },
    }));

    console.log('ENT', entArray);
    return entArray;
}

export async function getCnc (): Promise<Cnc[]>
{
    const response = await fetch('./adjacency_graph_edge_metadata.json')
    const data = await response.json();

    const C: Cnc[] = Object.entries(data)
        .map(([key, value]) =>
        {
            if (value.includes(0) as number) {
                const [id1, id2] = key.split('-');
                return {
                    cnc: {
                        id: id1,
                        sss: true,
                    },
                };
            } else {
                const [id1, id2] = key.split('-');
                return {
                    cnc: {
                        id: id1,
                        sss: false,
                    },
                };
            }

        });

    console.log("CNC", C)
    return C
};

export async function getGeo (scene: THREE.Group | null): Promise<Geo[]>
{
    if (!scene) return [];

    const g: Geo[] = [];
    scene.traverse((obj) =>
    {
        if ((obj as THREE.Mesh).isMesh) {
            const mesh = obj as THREE.Mesh;
            g.push({
                geo: {
                    id: mesh.name.split('_').pop() || '0',
                    name: mesh.name,
                    source: mesh.geometry,
                },
            });
        }
    });

    console.log('GEO', g);
    return g;
}



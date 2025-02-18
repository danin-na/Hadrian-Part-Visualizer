import _ from "lodash";
import * as THREE from "three";
import { interfaceGEO, interfaceRGB, interfaceENT, interfaceNBR } from "./loader.interface";

const useFetchGEO = async (group: THREE.Group): Promise<interfaceGEO[]> =>
{
    const meshes: THREE.Mesh[] = [];
    group.traverse((obj) =>
    {
        if ((obj as THREE.Mesh).isMesh) {
            meshes.push(obj as THREE.Mesh);
        }
    });

    const newGEO = _.chain(meshes)
        .map((mesh: THREE.Mesh) =>
        {
            const [name, num, id] = mesh.name.split('_');
            return {
                id: String(id),
                name: mesh.name,
                geo: mesh.geometry,
            };
        })
        .value();

    return newGEO;
};

const useFetchRGB = async (url: string): Promise<interfaceRGB[]> =>
{
    const response = await fetch(url);
    const data = await response.json();

    const newRGB = _.chain(data)
        .toPairs()
        .map(([code, id]) =>
        {
            const [R, G, B] = code.split('-');
            return {
                id: String(id),
                rgb: { code: `rgb(${R},${G},${B})` },
            };
        })
        .sortBy(item => Number(item.id))
        .value();

    return newRGB;
};

const useFetchNBR = async (url: string): Promise<interfaceNBR[]> =>
{
    const response = await fetch(url);
    const data = await response.json();

    const newNBR = _.chain(data)
        .toPairs()
        .map(([id, neighbors]) => ({
            id: String(id),
            nbr: {
                neighbors: [String(neighbors)],
                neighbors_number: neighbors.length,
            },
        }))
        .sortBy(item => Number(item.id))
        .value();

    return newNBR;
};

const useFetchENT = async (url: string): Promise<interfaceENT[]> =>
{
    const response = await fetch(url);
    const data = await response.json();

    const newENT = _.chain(data)
        .map((ent) => ({
            id: ent.entityId,
            ent: {
                type: ent.entityType,
                centerUv: ent.centerUv,
                centerPoint: ent.centerPoint,
                centerNormal: ent.centerNormal,
                area: ent.area,
                minRadius: ent.minRadius,
                minPosRadius: ent.minPosRadius,
                minNegRadius: ent.minNegRadius,
                edgeCurveChains: ent.edgeCurveChains,
            },
        }))
        .sortBy(item => Number(item.id))
        .value();

    return newENT;
};

export
{
    useFetchGEO,
    useFetchRGB,
    useFetchENT,
    useFetchNBR
}
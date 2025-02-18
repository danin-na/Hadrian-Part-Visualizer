import _ from "lodash";
import * as THREE from "three";

export const useFetchGEO = async (group: THREE.Group) =>
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
                _geo: mesh.geometry,
            };
        })
        .value();

    return newGEO;
};

export const useFetchRGB = async (url: string) =>
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
                _rgb: { code: `rgb(${R},${G},${B})` },
            };
        })
        .sortBy(item => Number(item.id))
        .value();

    return newRGB;
};

export const useFetchNBR = async (url: string) =>
{
    const response = await fetch(url);
    const data = await response.json();

    const newNBR = _.chain(data)
        .toPairs()
        .map(([id, neighbors]) => ({
            id: String(id),
            _nbr: {
                neighbors: [String(neighbors)],
                neighbors_number: neighbors.length,
            },
        }))
        .sortBy(item => Number(item.id))
        .value();

    return newNBR;
};

export const useFetchENT = async (url: string) =>
{
    const response = await fetch(url);
    const data = await response.json();

    const newENT = _.chain(data)
        .map((ent) => ({
            id: ent.entityId,
            _ent: {
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

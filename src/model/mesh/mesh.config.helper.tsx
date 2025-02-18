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
                _rgb: {
                    code: `rgb(${R},${G},${B})`,
                    wire: false,
                },
            };
        })
        .sortBy(item => Number(item.id))
        .value();

    return newRGB;
};


export const useFetchEDG = async (url: string) =>
{
    const response = await fetch(url);
    const data: any = await response.json();

    const uniqueEdges = _.chain(data)
        .toPairs()
        .map(([edgeKey, value]: any) =>
        {
            const [id1, id2] = edgeKey.split('-');
            const sorted = [id1, id2].sort((a: any, b: any) => Number(a) - Number(b));
            return { id1: sorted[0], id2: sorted[1], value };
        })
        .uniqBy((edge: any) => edge.id1 + '-' + edge.id2)
        .value();

    const nodes: any = {};
    _.forEach(uniqueEdges, ({ id1, id2, value }: any) =>
    {
        const concave = value.includes(0);
        const convex = value.includes(1);
        const tangent = value.includes(2);
        if (!nodes[id1]) nodes[id1] = { edges: [] };
        if (!nodes[id2]) nodes[id2] = { edges: [] };
        nodes[id1].edges.push({ neighbor: id2, concave, convex, tangent });
        nodes[id2].edges.push({ neighbor: id1, concave, convex, tangent });
    });

    return _.chain(nodes)
        .toPairs()
        .map(([id, nodeData]: any) => ({
            id: String(id),
            _edg: nodeData.edges
        }))
        .value();
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
                neighbors: neighbors.map((nbr: number) => String(nbr)),
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

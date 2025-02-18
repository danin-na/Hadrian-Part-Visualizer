import * as THREE from "three";

export interface INTERF_MESH
{
    id: string;
    name: string;
    _rgb: { code: string };
    _geo: THREE.Mesh;
    _ent: any;
    _nbr: { neighbors: string[]; neighbors_number: number };
}

// Simplified config with meshA and meshB at the top level
export interface INTERF_MESH_CONFIG
{
    meshA?: { mesh: INTERF_MESH[]; wireframe: boolean; color?: string };
    meshB?: { mesh: INTERF_MESH[]; wireframe: boolean; color?: string };
}

export interface INTERF_MESH_RENDER
{
    data: INTERF_MESH_CONFIG;
    onMeshClick?: (mesh: INTERF_MESH) => void;
}

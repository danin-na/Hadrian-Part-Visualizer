import * as THREE from 'three';

interface INTERF_RGB
{
    id: string;
    rgb: {
        code: string;
    }
}

interface INTERF_GEO
{
    id: string
    name: string
    geo: THREE.BufferGeometry
}

interface INTERF_ENT
{
    id: string
    ent: {
        type: number
        centerUv: number[]
        centerPoint: number[]
        centerNormal: number[]
        area: number
        minRadius: number
        minPosRadius: number
        minNegRadius: number
        edgeCurveChains: any[]
    }
}

interface INTERF_NBR
{
    id: string
    nbr:
    {
        neighbors: string[]
        neighbors_number: number
    }
}

export type
{
    INTERF_ENT,
    INTERF_GEO,
    INTERF_NBR,
    INTERF_RGB
}
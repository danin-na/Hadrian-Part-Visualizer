import * as THREE from 'three';

interface interfaceRGB
{
    id: string;
    rgb: {
        code: string;
    }

}

interface interfaceGEO
{
    id: string
    name: string
    geo: THREE.BufferGeometry
}

interface interfaceENT
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

interface interfaceNBR
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
    interfaceENT,
    interfaceGEO,
    interfaceNBR,
    interfaceRGB
}
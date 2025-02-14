import * as THREE from 'three';

export interface Geo 
{
    id: number
    name?: string
    geo?: THREE.BufferGeometry
}

export interface Rgb
{
    id: number
    rgb: string
}

export interface Ent
{
    id: number
    ent?: {
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

export interface Mesh
{
    id: number
    geo: Geo
    ent: Ent
    rgb: Rgb
}
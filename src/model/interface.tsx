// interfaces.ts
import * as THREE from 'three';

enum EntityType
{
    ENTITY_TYPE_PLANE = "ENTITY_TYPE_PLANE",
    ENTITY_TYPE_CYLINDER = "ENTITY_TYPE_CYLINDER",
    ENTITY_TYPE_ROTATIONAL = "ENTITY_TYPE_ROTATIONAL",
    ENTITY_TYPE_NURBS = "ENTITY_TYPE_NURBS",
}

enum EdgeType
{
    EDGE_TYPE_OUTER = "EDGE_TYPE_OUTER",
    EDGE_TYPE_INNER = "EDGE_TYPE_INNER",
}

interface EdgeCurve
{
    startPoint: number[];
    midPoint: number[];
    endPoint: number[];
    startPointNormal: number[];
}

interface EdgeCurveChain
{
    edgeType: EdgeType;
    edgeCurves: EdgeCurve[];
}

interface EntityGeometryInfo
{
    entityType: EntityType;
    entityId: string;
    centerUv: number[];
    centerPoint: number[];
    centerNormal: number[];
    area: number;
    minRadius: number;
    minPosRadius: number;
    minNegRadius: number;
    edgeCurveChains: EdgeCurveChain[];
}

interface Model
{
    id: number;
    color: string;
    bufferGeometry: THREE.BufferGeometry;
    entityGeometryInfo?: EntityGeometryInfo;
}

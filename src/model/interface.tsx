import * as THREE from 'three';

export interface Geo 
{
    geo: {
        id: string
        name?: string
        source: THREE.BufferGeometry
    }
}

export interface Rgb
{
    rgb: {
        id: string
        code: string
    }
}

export interface Ent
{
    ent: {
        id: string
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


export interface Cnc 
{
    cnc:
    {
        id: string
        sss: boolean
    }

}

export interface Nbr
{
    nbr:
    {
        id: string,
        neighbors: string[]
        neighbors_number: number
    }
}


export interface Mesh
{
    id: string
    geo: Geo
    ent: Ent
    rgb: Rgb
    cnc: Cnc
}


/*
Interface Documentation:

1. Geo
   - id: Unique identifier for the geometry.
   - name (optional): A name assigned to the geometry.
   - geo: Holds the Three.js BufferGeometry instance representing the actual geometry.
         (No direct C# equivalent exists, but it is the Three.js representation of geometry data.)

2. Rgb
   - id: Unique identifier for the RGB color entry.
   - rgb: A string that represents the color in RGB format (e.g., "#ff0000").
         (There is no direct C# counterpart for this, but it is used to assign a color to the mesh.)

3. Ent
   - id: Unique identifier for the entity.
   - ent (optional): Object containing entity geometry information, conceptually mirroring the C# 
                     `EntityGeometryInfo` structure. The fields are as follows:
     • type: A numeric value that corresponds to the C# `EntityType` enum.
             For example, it could represent ENTITY_TYPE_PLANE, ENTITY_TYPE_CYLINDER, ENTITY_TYPE_ROTATIONAL, or ENTITY_TYPE_NURBS.
     • centerUv: An array of numbers representing the center position in UV coordinates 
                 (maps to the C# `centerUv` field).
     • centerPoint: An array of numbers representing the center point in 3D space 
                    (maps to the C# `centerPoint` field).
     • centerNormal: An array of numbers representing the normal vector at the center 
                     (maps to the C# `centerNormal` field).
     • area: A number representing the area of the entity (corresponds to the C# `area` field).
     • minRadius: A number representing the minimum radius (maps to the C# `minRadius` field).
     • minPosRadius: A number representing the minimum positive radius (maps to the C# `minPosRadius` field).
     • minNegRadius: A number representing the minimum negative radius (maps to the C# `minNegRadius` field).
     • edgeCurveChains: An array representing chains of edge curves. Each element is intended to correspond 
                        to the C# `EdgeCurveChain` struct, which includes:
         - edgeType: Represents the type of edge (should map to the C# `EdgeType` enum with possible values such as EDGE_TYPE_OUTER or EDGE_TYPE_INNER).
         - edgeCurves: An array of curves, where each curve follows the structure of the C# `EdgeCurve` struct, including:
             • startPoint: The starting point coordinates.
             • midPoint: The midpoint coordinates.
             • endPoint: The end point coordinates.
             • startPointNormal: The normal vector at the start point.

4. Mesh
   - id: Unique identifier for the mesh.
   - geo: Contains geometry information as defined by the `Geo` interface.
   - ent: Contains entity geometry details as defined by the `Ent` interface.
   - rgb: Contains color information as defined by the `Rgb` interface.

Additional Note:
- The provided C# code also defines additional enums such as `GraphEdgeType` (with values CONCAVE, CONVEX, TANGENTIAL). 
  However, these are not represented in the TypeScript interfaces above.
*/

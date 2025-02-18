// MeshRenderer.tsx
import React from "react";
import * as THREE from "three";

export interface MeshData
{
    id: string;
    _geo: THREE.BufferGeometry;
    _rgb: {
        code: string;
        wire: boolean; // Wireframe flag for the mesh material.
    };
    // Additional properties can be added as needed.
}

interface MeshRendererProps
{
    meshes: MeshData[];
}

export const MeshRender: React.FC<MeshRendererProps> = ({ meshes }) =>
{
    return (
        <group position={[0, 7, 0]} scale={0.03}>
            {meshes.map((mesh) => (
                <mesh key={mesh.id} geometry={mesh._geo}>
                    <meshStandardMaterial
                        color={mesh._rgb.code}
                        wireframe={mesh._rgb.wire}
                    />
                </mesh>
            ))}
        </group>
    );
};


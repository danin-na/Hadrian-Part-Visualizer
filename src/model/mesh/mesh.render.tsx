// MeshRenderer.tsx
import React from "react";
import * as THREE from "three";

export interface MeshData
{
    id: string;
    _geo: THREE.BufferGeometry;
    _rgb: {
        code: string;
        wire: boolean;
    };
}

interface MeshRendererProps
{
    meshes: MeshData[];
    modifyMesh?: (mesh: MeshData) => { color?: string; wireframe?: boolean };
}

const MeshRenderer: React.FC<MeshRendererProps> = ({ meshes, modifyMesh }) =>
{
    return (
        <group position={[0, 7, 0]} scale={0.03}>
            {meshes.map((mesh) =>
            {
                let color = mesh._rgb.code;
                let wireframe = mesh._rgb.wire;

                if (modifyMesh) {
                    const modifications = modifyMesh(mesh);
                    if (modifications.color) color = modifications.color;
                    if (typeof modifications.wireframe === "boolean") wireframe = modifications.wireframe;
                }

                return (
                    <mesh key={mesh.id} geometry={mesh._geo}>
                        <meshStandardMaterial color={color} wireframe={wireframe} />
                    </mesh>
                );
            })}
        </group>
    );
};

export default MeshRenderer;

import * as THREE from "three";

interface RenderMeshProps
{
    meshes: {
        meshA: { geo: THREE.Mesh; wireframe: boolean; color?: string };
        meshB?: { geo: THREE.Mesh; wireframe: boolean; color?: string };
    };
    onMeshClick?: (mesh: any) => void;
}

export const RenderMesh = ({
    meshes: { meshA, meshB }, onMeshClick = () => { }, }: RenderMeshProps) => (
    <>

        {meshA && (
            <group name="meshA">
                {meshA.geo.map((M) => (
                    <mesh
                        key={M.id}
                        geometry={M.geo}
                        onClick={() => onMeshClick(M)}
                    >
                        <meshStandardMaterial
                            color={meshA.color || M.rgb?.code}
                            wireframe={meshA.wireframe}
                        />
                    </mesh>
                ))}
            </group>
        )}

        {meshB && (
            <group name="meshB">
                {meshB.geo.map((M) => (
                    <mesh
                        key={M.id}
                        geometry={M.geo}
                        onClick={() => onMeshClick(M)}
                    >
                        <meshStandardMaterial
                            color={meshB.color || M.rgb?.code}
                            wireframe={meshB.wireframe}
                        />
                    </mesh>
                ))}
            </group>
        )}
    </>
);

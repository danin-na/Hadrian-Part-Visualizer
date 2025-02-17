import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stage } from '@react-three/drei'
import { BufferGeometry } from 'three'


export interface M
{
    id: string | number
    geo: BufferGeometry
    rgb?: {
        code?: string
    }
}

export interface RednerProps
{

    geo1: any[]
    geo2?: any[]
    wireFrame1?: boolean
    wireFrame2?: boolean
    color1?: string
    color2?: string

    onMeshClick?: (M: M) => void
}

export const Redner: React.FC<RednerProps> = ({
    geo1,
    geo2,
    wireFrame1 = false,
    wireFrame2 = false,
    color1 = null,
    color2 = null,
    onMeshClick = () => { },
}) =>
{
    return (
        <Canvas shadows dpr={[1, 1.5]} camera={{ position: [4, 3, 2], fov: 35 }}>

            <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.9} />

            <Stage intensity={0.1} shadows="contact" adjustCamera={3}>

                <group name="geo1">
                    {geo1.map((M) => (
                        <mesh
                            key={M.id}
                            geometry={M.geo}
                            onClick={() => onMeshClick(M)}
                        >
                            <meshStandardMaterial
                                color={color1 || M.rgb?.code}
                                wireframe={wireFrame1}
                            />
                        </mesh>
                    ))}
                </group>

                {geo2 && geo2.length > 0 && (
                    <group name="geo2">
                        {geo2.map((M) => (
                            <mesh
                                key={M.id}
                                geometry={M.geo}
                                onClick={() => onMeshClick(M)}
                            >
                                <meshStandardMaterial
                                    color={M.rgb?.code || color2}
                                    wireframe={wireFrame2}
                                />
                            </mesh>
                        ))}
                    </group>
                )}
            </Stage>
        </Canvas>
    )
}

export default Redner

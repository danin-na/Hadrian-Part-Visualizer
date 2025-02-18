const GeoGroup = ({
    geo,
    wireframe,
    color,
    onMeshClick,
    groupName,
}: {
    geo: any[]
    wireframe: boolean
    color?: string
    onMeshClick: (mesh: any) => void
    groupName: string
}) => (
    <group name={groupName}>
        {geo.map((meshData) => (
            <mesh
                key={meshData.id}
                geometry={meshData.geo}
                onClick={() => onMeshClick(meshData)}
            >
                <meshStandardMaterial
                    color={color || meshData.rgb?.code}
                    wireframe={wireframe}
                />
            </mesh>
        ))}
    </group>
)

export const RenderMesh = ({
    geo1,
    geo2,
    wireFrame1 = false,
    wireFrame2 = false,
    color1,
    color2,
    onMeshClick = () => { },
}: {
    geo1: any[]
    geo2?: any[]
    wireFrame1?: boolean
    wireFrame2?: boolean
    color1?: string
    color2?: string
    onMeshClick?: (mesh: any) => void
}) => (
    <>
        <GeoGroup
            geo={geo1}
            color={color1}
            wireframe={wireFrame1}
            onMeshClick={onMeshClick}
            groupName="geo1"
        />
        {geo2 && geo2.length > 0 && (
            <GeoGroup
                geo={geo2}
                color={color2}
                wireframe={wireFrame2}
                onMeshClick={onMeshClick}
                groupName="geo2"
            />
        )}
    </>
)
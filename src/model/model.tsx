import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { useState, useEffect } from 'react';
//import { useFetchGEO, useFetchRGB, useFetchENT, useFetchNBR, interfaceGEO, interfaceRGB, interfaceENT, interfaceNBR } from './helpres';
import _ from 'lodash';
import * as THREE from 'three';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Box, Hash, ChevronRight, SquareDashed, MoveRight, MoveUp, MoveDownLeft } from "lucide-react"




import
{
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import Redner from './render';

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


const useFetchGEO = async (group: THREE.Group): Promise<interfaceGEO[]> =>
{
    const meshes: THREE.Mesh[] = [];
    group.traverse((obj) =>
    {
        if ((obj as THREE.Mesh).isMesh) {
            meshes.push(obj as THREE.Mesh);
        }
    });

    const newGEO = _.chain(meshes)
        .map((mesh: THREE.Mesh) =>
        {
            const [name, num, id] = mesh.name.split('_');
            return {
                id: String(id),
                name: mesh.name,
                geo: mesh.geometry,
            };
        })
        .value();

    return newGEO;
};

const useFetchRGB = async (url: string): Promise<interfaceRGB[]> =>
{
    const response = await fetch(url);
    const data = await response.json();

    const newRGB = _.chain(data)
        .toPairs()
        .map(([code, id]) =>
        {
            const [R, G, B] = code.split('-');
            return {
                id: String(id),
                rgb: { code: `rgb(${R},${G},${B})` },
            };
        })
        .sortBy(item => Number(item.id))
        .value();

    return newRGB;
};

const useFetchNBR = async (url: string): Promise<interfaceNBR[]> =>
{
    const response = await fetch(url);
    const data = await response.json();

    const newNBR = _.chain(data)
        .toPairs()
        .map(([id, neighbors]) => ({
            id: String(id),
            nbr: {
                neighbors: [String(neighbors)],
                neighbors_number: neighbors.length,
            },
        }))
        .sortBy(item => Number(item.id))
        .value();

    return newNBR;
};

const useFetchENT = async (url: string): Promise<interfaceENT[]> =>
{
    const response = await fetch(url);
    const data = await response.json();

    const newENT = _.chain(data)
        .map((ent) => ({
            id: ent.entityId,
            ent: {
                type: ent.entityType,
                centerUv: ent.centerUv,
                centerPoint: ent.centerPoint,
                centerNormal: ent.centerNormal,
                area: ent.area,
                minRadius: ent.minRadius,
                minPosRadius: ent.minPosRadius,
                minNegRadius: ent.minNegRadius,
                edgeCurveChains: ent.edgeCurveChains,
            },
        }))
        .sortBy(item => Number(item.id))
        .value();

    return newENT;
};

export default function PartLoader ()
{
    const [GEO, setGEO] = useState<interfaceGEO[]>([]);
    const [RGB, setRGB] = useState<interfaceRGB[]>([]);
    const [ENT, setENT] = useState<interfaceENT[]>([]);
    const [NBR, setNBR] = useState<interfaceNBR[]>([]);
    const [MESH, setMESh] = useState<any[]>([]);

    const [SM, setSM] = useState<any>(null);

    const { scene } = useGLTF('./colored_glb.glb');

    useEffect(() =>
    {
        if (!scene) return;

        useFetchGEO(scene).then(setGEO);
        useFetchRGB('./rgb_id_to_entity_id_map.json').then(setRGB);
        useFetchENT('./entity_geometry_info.json').then(setENT);
        useFetchNBR('./adjacency_graph.json').then(setNBR);

    }, [scene]);

    useEffect(() =>
    {
        if (RGB.length === 0 || GEO.length === 0 || ENT.length === 0 || NBR.length === 0) return;


        const mesh = _.merge(GEO, RGB, ENT, NBR)
        console.log(mesh)

        setMESh(mesh)

    }, [RGB, GEO, ENT, NBR]);

    return (
        <div className="flex h-screen w-full">
            {/* Left Sidebar */}
            <aside className="w-52 bg-gray-900 text-white p-4 overflow-y-auto">
            </aside>


            <Redner geo1={MESH} />

            <aside className="w-64">
                <Command>
                    <CommandInput placeholder="Search for mesh ..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            <ScrollArea className="h-[150px] pl-2 pr-3">
                                {MESH.map((M) => (
                                    <CommandItem
                                        key={M.id}
                                        value={M.id}
                                        onSelect={() => setSM(M)}  // Set selected mesh on click
                                    >
                                        <Box /> {M.name}
                                    </CommandItem>
                                ))}
                            </ScrollArea>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Suggestions">
                            <CommandItem ><Hash /> ID : {SM ? SM.id : "No mesh selected"}</CommandItem>
                            <CommandItem ><Box /> Name : {SM ? SM.name : "-"}</CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Color">
                            <CommandItem ><Box /> RGB Color : {SM ? SM.rgb.code : "-"}</CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Type">
                            <CommandItem ><SquareDashed /> Type : {SM ? SM.ent.type : "-"}</CommandItem>
                            <CommandItem disabled><ChevronRight /> 0 : PLANE </CommandItem>
                            <CommandItem disabled><ChevronRight /> 1 : CYLINDER </CommandItem>
                            <CommandItem disabled><ChevronRight /> 2 : ROTATIONAL </CommandItem>
                            <CommandItem disabled><ChevronRight /> 3 : NURBS </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Center Normal">
                            <CommandItem ><MoveUp /> Y : {SM ? SM.ent.centerNormal[1] : "-"}</CommandItem>
                            <CommandItem ><MoveRight /> X : {SM ? SM.ent.centerNormal[0] : "-"}</CommandItem>
                            <CommandItem ><MoveDownLeft /> Z : {SM ? SM.ent.centerNormal[2] : "-"}</CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Center UV">
                            <CommandItem ><MoveUp /> Y : {SM ? SM.ent.centerUv[0] : "-"}</CommandItem>
                            <CommandItem ><MoveRight /> X : {SM ? SM.ent.centerUv[1] : "-"}</CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </aside>
        </div>
    );
}
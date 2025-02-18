import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { useState, useEffect } from 'react';

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

export default function PartLoader ()
{


    const [SM, setSM] = useState<any>(null);




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
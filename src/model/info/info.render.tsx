// InfoRender.tsx
import React from "react";
import { Box, Hash, Info, Activity, Target, Layers, Users, AlertCircle, Grid, MoveUp, MoveRight, MoveDownLeft, } from "lucide-react";
import { Command, CommandList, CommandGroup, CommandItem, CommandSeparator, } from "@/components/ui/command";
import { INTERF_INFO_RENDER } from './info.interface'

export const InfoRender: React.FC<INTERF_INFO_RENDER> = ({ mesh }) =>
{
    return (
        <aside className="w-64 flex-none border-l overflow-y-auto">
            <Command>
                <CommandList className="pt-4">
                    {/* Basic Info */}
                    <CommandGroup heading="Basic Info">
                        <CommandItem>
                            <Hash className="mr-2" size={16} /> ID: {mesh ? mesh.id : "-"}
                        </CommandItem>
                        <CommandItem>
                            <Box className="mr-2" size={16} /> Name: {mesh ? mesh.name : "-"}
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />

                    {/* Geometry Info */}
                    <CommandGroup heading="Geometry Info">
                        <CommandItem>
                            <Grid className="mr-2" size={16} /> Type:{" "}
                            {mesh ? mesh._geo?.type : "-"}
                        </CommandItem>
                        <CommandItem>
                            <Info className="mr-2" size={16} /> UUID:{" "}
                            {mesh ? mesh._geo?.uuid : "-"}
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />

                    {/* Color Info */}
                    <CommandGroup heading="Color Info">
                        <CommandItem>
                            <Box className="mr-2" size={16} /> RGB:{" "}
                            {mesh ? mesh._rgb?.code : "-"}
                        </CommandItem>
                        <CommandItem>
                            <AlertCircle className="mr-2" size={16} /> Wireframe:{" "}
                            {mesh ? (mesh._rgb?.wire ? "Yes" : "No") : "-"}
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />

                    {/* Entity Details */}
                    <CommandGroup heading="Entity Details">
                        <CommandItem>
                            <Layers className="mr-2" size={16} /> Type:{" "}
                            {mesh
                                ? mesh._ent?.type !== undefined
                                    ? mesh._ent.type
                                    : "N/A"
                                : "-"}
                        </CommandItem>
                        {mesh && mesh._ent?.area !== undefined && (
                            <CommandItem>
                                <Activity className="mr-2" size={16} /> Area: {mesh._ent.area}
                            </CommandItem>
                        )}
                        {mesh && mesh._ent?.edgeCurveChains && (
                            <CommandItem>
                                <Activity className="mr-2" size={16} /> Edge Curves:{" "}
                                {mesh._ent.edgeCurveChains.length}
                            </CommandItem>
                        )}
                    </CommandGroup>
                    <CommandSeparator />

                    {/* Center Point */}
                    {mesh && mesh._ent?.centerPoint && (
                        <>
                            <CommandGroup heading="Center Point">
                                <CommandItem>
                                    <MoveRight className="mr-2" size={16} /> X: {mesh._ent.centerPoint[0]}
                                </CommandItem>
                                <CommandItem>
                                    <MoveUp className="mr-2" size={16} /> Y: {mesh._ent.centerPoint[1]}
                                </CommandItem>
                                <CommandItem>
                                    <MoveDownLeft className="mr-2" size={16} /> Z: {mesh._ent.centerPoint[2]}
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                        </>
                    )}

                    {/* Center Normal */}
                    {mesh && mesh._ent?.centerNormal && (
                        <>
                            <CommandGroup heading="Center Normal">
                                <CommandItem>
                                    <MoveRight className="mr-2" size={16} /> X: {mesh._ent.centerNormal[0]}
                                </CommandItem>
                                <CommandItem>
                                    <MoveUp className="mr-2" size={16} /> Y: {mesh._ent.centerNormal[1]}
                                </CommandItem>
                                <CommandItem>
                                    <MoveDownLeft className="mr-2" size={16} /> Z: {mesh._ent.centerNormal[2]}
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                        </>
                    )}

                    {/* Center UV */}
                    {mesh && mesh._ent?.centerUv && (
                        <>
                            <CommandGroup heading="Center UV">
                                <CommandItem>
                                    <MoveUp className="mr-2" size={16} /> Y: {mesh._ent.centerUv[0]}
                                </CommandItem>
                                <CommandItem>
                                    <MoveRight className="mr-2" size={16} /> X: {mesh._ent.centerUv[1]}
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                        </>
                    )}

                    {/* Minimum Radii */}
                    {mesh &&
                        (mesh._ent?.minRadius !== undefined ||
                            mesh._ent?.minPosRadius !== undefined ||
                            mesh._ent?.minNegRadius !== undefined) && (
                            <>
                                <CommandGroup heading="Minimum Radii">
                                    {mesh._ent?.minRadius !== undefined && (
                                        <CommandItem>
                                            <Activity className="mr-2" size={16} /> Min Radius:{" "}
                                            {mesh._ent.minRadius}
                                        </CommandItem>
                                    )}
                                    {mesh._ent?.minPosRadius !== undefined && (
                                        <CommandItem>
                                            <Activity className="mr-2" size={16} /> Min Positive Radius:{" "}
                                            {mesh._ent.minPosRadius}
                                        </CommandItem>
                                    )}
                                    {mesh._ent?.minNegRadius !== undefined && (
                                        <CommandItem>
                                            <Activity className="mr-2" size={16} /> Min Negative Radius:{" "}
                                            {mesh._ent.minNegRadius}
                                        </CommandItem>
                                    )}
                                </CommandGroup>
                                <CommandSeparator />
                            </>
                        )}

                    {/* Neighbors Info */}
                    <CommandGroup heading="Neighbors">
                        <CommandItem>
                            <Users className="mr-2" size={16} /> Count:{" "}
                            {mesh ? mesh._nbr?.neighbors_number ?? "N/A" : "-"}
                        </CommandItem>
                        {mesh && mesh._nbr?.neighbors && (
                            <CommandItem>
                                <Users className="mr-2" size={16} /> IDs: {mesh._nbr.neighbors.join(", ")}
                            </CommandItem>
                        )}
                    </CommandGroup>
                </CommandList>
            </Command>
        </aside>
    );
};


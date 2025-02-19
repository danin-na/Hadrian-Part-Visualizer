import React from "react";
import
{
    Command,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Box } from "lucide-react";

export interface Mesh
{
    id: string | number;
    name: string;
    _rgb: {
        code: string;
        wire: boolean;
    };
}

interface InfoMeshListProps
{
    meshConfig?: Mesh[];
    setSM: (mesh: Mesh) => void;
    setmeshModif: React.Dispatch<React.SetStateAction<Mesh[]>>;
}

export const InfoMeshList: React.FC<InfoMeshListProps> = ({
    meshConfig,
    setSM,
    setmeshModif,
}) =>
{
    return (
        <aside className="w-52 flex-none">
            <Command>
                <CommandInput placeholder="Search for mesh ..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <ScrollArea className="h-dvh pl-2 pr-3 pb-24">
                            {meshConfig?.map((M) => (
                                <CommandItem
                                    key={M.name}
                                    value={M.name}
                                    onSelect={() =>
                                    {
                                        setSM(M);
                                        setmeshModif((prev) =>
                                            prev.map((mesh) =>
                                                mesh.id === M.id
                                                    ? {
                                                        ...mesh,
                                                        _rgb: {
                                                            ...mesh._rgb,
                                                            code: M._rgb.code,
                                                            wire: false,
                                                        },
                                                    }
                                                    : {
                                                        ...mesh,
                                                        _rgb: {
                                                            ...mesh._rgb,
                                                            code: "black",
                                                            wire: true,
                                                        },
                                                    }
                                            )
                                        );
                                    }}
                                >
                                    <Box color={M._rgb.code} className="size-1/2" /> {M.name}
                                </CommandItem>
                            ))}
                        </ScrollArea>
                    </CommandGroup>
                </CommandList>
            </Command>
        </aside>
    );
};


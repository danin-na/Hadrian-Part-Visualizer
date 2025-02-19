// MeshSetting.tsx
import React from "react";
import { MeshData } from "./mesh.render";
import { Button } from "@/components/ui/button";
import
{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,

} from "@/components/ui/dropdown-menu"

import
{

    CircleDot,
    CircleDotDashed,
    Rainbow,
    PaintBucket,
    Box,
    Undo2,
    PackageOpen,
    SquareDashedBottom

} from "lucide-react"

interface MeshSettingProps
{
    meshConfig: MeshData[] | null; // or undefined depending on your data
    setmeshModif: React.Dispatch<React.SetStateAction<MeshData[]>>;
}

export const MeshSetting: React.FC<MeshSettingProps> = ({ meshConfig, setmeshModif }) =>
{

    /* ----------------
        Parts
    ---------------- */
    const handle_all_wire_off = () =>
    {
        setmeshModif((prevConfig) =>
            prevConfig.map((mesh) => ({
                ...mesh,
                _rgb: {
                    ...mesh._rgb,
                    wire: false,
                },
            }))
        );
    };

    const handle_all_wire_on = () =>
    {
        setmeshModif((prevConfig) =>
            prevConfig.map((mesh) => ({
                ...mesh,
                _rgb: {
                    ...mesh._rgb,
                    wire: true,
                },
            }))
        );
    };

    const handle_all_color_raibow = () =>
    {
        if (meshConfig) {
            setmeshModif((prevConfig) =>
                prevConfig.map((mesh, index) => ({
                    ...mesh,
                    _rgb: {
                        ...mesh._rgb,
                        code: meshConfig[index]._rgb.code,
                    },
                }))
            );
        }
    };

    const handle_all_color_black = () =>
    {
        if (meshConfig) {
            setmeshModif((prevConfig) =>
                prevConfig.map((mesh, index) => ({
                    ...mesh,
                    _rgb: {
                        ...mesh._rgb,
                        code: "#000000",
                    },
                }))
            );
        }
    };

    const handle_all_color_red = () =>
    {
        if (meshConfig) {
            setmeshModif((prevConfig) =>
                prevConfig.map((mesh, index) => ({
                    ...mesh,
                    _rgb: {
                        ...mesh._rgb,
                        code: "#cc3333",
                    },
                }))
            );
        }
    };

    const handle_reset = () =>
    {
        if (meshConfig) {
            setmeshModif(meshConfig);
        }

        set_all_wire("off")
        set_all_color("rainbow")
    };

    const [all_wire, set_all_wire] = React.useState("off")
    const [all_color, set_all_color] = React.useState("rainbow")

    /* ----------------
        Pocket
    ---------------- */

    const isPocket = (mesh: MeshData) => !mesh._edg.some(edge => edge.convex);

    const handle_pcoket_style1 = () =>
    {
        setmeshModif(prev =>
        {
            const neighborIds = new Set(
                prev.filter(isPocket).flatMap(mesh => mesh._nbr?.neighbors || [])
            );
            return prev.map(mesh => ({
                ...mesh,
                _rgb: {
                    ...mesh._rgb,
                    code: neighborIds.has(mesh.id) ? "#cc3333" : isPocket(mesh) ? "#cc3333" : "#000000",
                    wire: false
                },
            }));
        });
    };

    const handle_pcoket_style2 = () =>
    {
        setmeshModif(prev =>
        {
            const neighborIds = new Set(
                prev.filter(isPocket).flatMap(mesh => mesh._nbr?.neighbors || [])
            );
            return prev.map(mesh =>
            {
                const qualifies = neighborIds.has(mesh.id) || isPocket(mesh);
                return {
                    ...mesh,
                    _rgb: {
                        ...mesh._rgb,
                        code: qualifies ? "orange" : "black",
                        wire: qualifies ? false : true,
                    },
                };
            });
        });
    };

    const handle_pcoket_style3 = () =>
    {
        setmeshModif(prev =>
        {
            const neighborIds = new Set(
                prev.filter(isPocket).flatMap(mesh => mesh._nbr?.neighbors || [])
            );
            return prev.map(mesh =>
            {
                const qualifies = neighborIds.has(mesh.id) || isPocket(mesh);
                return {
                    ...mesh,
                    _rgb: {
                        ...mesh._rgb,
                        code: qualifies ? "white" : "black",
                        wire: qualifies ? true : false,
                    },
                };
            });
        });
    };

    const [pcket_style, set_pocket_style] = React.useState("style1")

    /* ----------------
        Side
    ---------------- */

    const handle_side_top = () =>
    {
        setmeshModif(prev =>
            prev.map(mesh => ({
                ...mesh,
                _rgb: {
                    ...mesh._rgb,
                    code: mesh._ent.centerNormal[2] === 1 ? "#cc3333" : "#000000",
                    wire: mesh._ent.centerNormal[2] === 1 ? false : true,
                },
            }))
        );
    };

    const handle_side_bottom = () =>
    {
        setmeshModif(prev =>
            prev.map(mesh => ({
                ...mesh,
                _rgb: {
                    ...mesh._rgb,
                    code: mesh._ent.centerNormal[2] === -1 ? "#cc3333" : "#000000",
                    wire: mesh._ent.centerNormal[2] === -1 ? false : true,
                },
            }))
        );
    };


    const handle_side_left = () =>
    {
        setmeshModif(prev =>
            prev.map(mesh => ({
                ...mesh,
                _rgb: {
                    ...mesh._rgb,
                    code: mesh._ent.centerNormal[1] === -1 ? "#cc3333" : "#000000",
                    wire: mesh._ent.centerNormal[1] === -1 ? false : true,
                },
            }))
        );
    };

    const handle_side_right = () =>
    {
        setmeshModif(prev =>
            prev.map(mesh => ({
                ...mesh,
                _rgb: {
                    ...mesh._rgb,
                    code: mesh._ent.centerNormal[1] === 1 ? "#cc3333" : "#000000",
                    wire: mesh._ent.centerNormal[1] === 1 ? false : true,
                },
            }))
        );
    };

    const handle_side_front = () =>
    {
        setmeshModif(prev =>
            prev.map(mesh => ({
                ...mesh,
                _rgb: {
                    ...mesh._rgb,
                    code: mesh._ent.centerNormal[0] === 1 ? "#cc3333" : "#000000",
                    wire: mesh._ent.centerNormal[0] === 1 ? false : true,
                },
            }))
        );
    };

    const handle_side_back = () =>
    {
        setmeshModif(prev =>
            prev.map(mesh => ({
                ...mesh,
                _rgb: {
                    ...mesh._rgb,
                    code: mesh._ent.centerNormal[0] === -1 ? "#cc3333" : "#000000",
                    wire: mesh._ent.centerNormal[0] === -1 ? false : true,
                },
            }))
        );
    };


    const [side_style, set_side_style] = React.useState("top")


    return (
        <div className="flex flex-wrap gap-2">


            <DropdownMenu>

                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <Box />
                        Parts
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">

                    <DropdownMenuLabel>Wierframe</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuRadioGroup value={all_wire} onValueChange={set_all_wire}>
                        <DropdownMenuRadioItem value="on" onClick={handle_all_wire_on}>
                            <CircleDot className="mr-2 size-4" />
                            Wierframe : ON
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="off" onClick={handle_all_wire_off}>
                            <CircleDotDashed className="mr-2 size-4" />
                            Wierframe : OFF
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuLabel>Colors</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuRadioGroup value={all_color} onValueChange={set_all_color}>
                        <DropdownMenuRadioItem value="rainbow" onClick={handle_all_color_raibow}>
                            <Rainbow className="mr-2 size-4" />
                            Rainbow
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="pure_black" onClick={handle_all_color_black}>
                            <PaintBucket className="mr-2 size-4" />
                            Pure Black
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="pure_red" onClick={handle_all_color_red}>
                            <PaintBucket className="mr-2 size-4" />
                            Pure Red
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={handle_reset}>
                        <Undo2 />
                        Reset
                    </DropdownMenuItem>


                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>

                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <PackageOpen />
                        Pocket Finder
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">

                    <DropdownMenuLabel>Style</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuRadioGroup value={pcket_style} onValueChange={set_pocket_style}>
                        <DropdownMenuRadioItem value="style1" onClick={handle_pcoket_style1}>
                            <PaintBucket className="mr-2 size-4" />
                            Dark Red
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="style2" onClick={handle_pcoket_style2}>
                            <PaintBucket className="mr-2 size-4" />
                            Wire Orange
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="style3" onClick={handle_pcoket_style3}>
                            <PaintBucket className="mr-2 size-4" />
                            Empty White
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>

                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>

                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <SquareDashedBottom />
                        Direction View
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-56">

                    <DropdownMenuLabel>Style</DropdownMenuLabel>

                    <DropdownMenuSeparator />

                    <DropdownMenuRadioGroup value={side_style} onValueChange={set_side_style}>
                        <DropdownMenuRadioItem value="top" onClick={handle_side_top}>
                            <PaintBucket className="mr-2 size-4" />
                            Top Direction
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="bottom" onClick={handle_side_bottom}>
                            <PaintBucket className="mr-2 size-4" />
                            Bottom Direction
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="left" onClick={handle_side_left}>
                            <PaintBucket className="mr-2 size-4" />
                            Left Direction
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="right" onClick={handle_side_right}>
                            <PaintBucket className="mr-2 size-4" />
                            Right Direction
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="front" onClick={handle_side_front}>
                            <PaintBucket className="mr-2 size-4" />
                            Front Direction
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="back" onClick={handle_side_back}>
                            <PaintBucket className="mr-2 size-4" />
                            Back Direction
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};








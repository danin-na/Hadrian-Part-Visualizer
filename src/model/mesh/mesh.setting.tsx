// MeshSetting.tsx
import React from "react";
import { MeshData } from "./mesh.render";
import { Button } from "@/components/ui/button";

interface MeshSettingProps
{
    meshConfig: MeshData[] | null; // or undefined depending on your data
    setmeshModif: React.Dispatch<React.SetStateAction<MeshData[]>>;
}

export const MeshSetting: React.FC<MeshSettingProps> = ({ meshConfig, setmeshModif }) =>
{

    const handle_odd_id = () =>
    {
        setmeshModif((prevConfig) =>
            prevConfig.map((mesh) =>
            {
                if (parseInt(mesh.id, 10) % 2 === 1) {
                    return {
                        ...mesh,
                        _rgb: {
                            ...mesh._rgb,
                            code: "yellow",
                        },
                    };
                }
                return mesh;
            })
        );
    };

    const handle_reset = () =>
    {
        if (meshConfig) {
            setmeshModif(meshConfig);
        }
    };

    // New button: keep all current settings, but make everything wireframe.
    const handle_wireframe_all = () =>
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

    // New button: just reset the colors using the original meshConfig.
    const handle_reset_colors = () =>
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

    // New button: turn wireframe off for all meshes, preserving other settings.
    const handle_wireframe_off = () =>
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

    const handle_red_with_conditions = () =>
    {
        setmeshModif((prevConfig) =>
            prevConfig.map((mesh) =>
            {
                if (mesh._ent.centerNormal[2] === 1 && mesh._nbr.neighbors_number === 8) {
                    return {
                        ...mesh,
                        _rgb: {
                            ...mesh._rgb,
                            code: "red",
                        },
                    };
                } else {
                    return {
                        ...mesh,
                        _rgb: {
                            ...mesh._rgb,
                            code: "black",
                        },
                    };
                }
            })
        );
    };

    return (
        <div className="flex flex-wrap gap-2">
            <Button onClick={handle_reset}>Reset</Button>
            <Button onClick={handle_odd_id}>odd id</Button>

            <Button onClick={handle_reset_colors}>  Reset Colors</Button>
            <Button onClick={handle_wireframe_all}> Wireframe ON</Button>
            <Button onClick={handle_wireframe_off}> Wireframe Off</Button>

            <Button onClick={handle_red_with_conditions}>Yellow Meshes</Button>
        </div>
    );
};

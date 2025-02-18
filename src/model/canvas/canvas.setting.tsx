import { Button } from "@/components/ui/button";
import
{
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { SquareDashedMousePointer, PaintBucket, Circle, Eye, EyeOff, Palette, Zap } from "lucide-react";

export const CanvasSetting = ({ config, onChange }: { config: any; onChange: any }) =>
{
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <SquareDashedMousePointer /> Canvas Setting
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    {/* Background Settings */}
                    <DropdownMenuLabel>Background</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <PaintBucket /> Color
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuRadioGroup
                                        value={config.background}
                                        onValueChange={(newColor: string) =>
                                            onChange({ ...config, background: newColor })
                                        }
                                    >
                                        <DropdownMenuRadioItem value="#0d1b2a">
                                            <Circle color="#0d1b2a" className="mr-2" /> Rich Black
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="#1b263b">
                                            <Circle color="#1b263b" className="mr-2" /> Oxford Blue
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioItem value="#333333">
                                            <Circle color="#333333" className="mr-2" /> Dark Grey
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="#000000">
                                            <Circle color="#000000" className="mr-2" /> Pure Black
                                        </DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    {/* Grid Settings */}
                    <DropdownMenuLabel>Grid</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        {/* Grid Enable/Disable */}
                        <DropdownMenuRadioGroup
                            value={config.grid?.enabled ? "enabled" : "disabled"}
                            onValueChange={(value: string) =>
                                onChange({
                                    ...config,
                                    grid: { ...config.grid, enabled: value === "enabled" },
                                })
                            }
                        >
                            <DropdownMenuRadioItem value="enabled" ><Eye className="mr-2 size-4" />Enabled</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="disabled" ><EyeOff className="mr-2 size-4" /> Disabled</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>

                        <DropdownMenuSeparator />

                        {/* Always show Grid Color */}
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <Palette />
                                Grid Color
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuRadioGroup
                                        value={config.grid?.color || "#333333"}
                                        onValueChange={(newColor: string) =>
                                            onChange({
                                                ...config,
                                                grid: { ...config.grid, color: newColor },
                                            })
                                        }
                                    >
                                        <DropdownMenuRadioItem value="#0d1b2a">
                                            <Circle color="#0d1b2a" className="mr-2" /> Rich Black
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="#1b263b">
                                            <Circle color="#1b263b" className="mr-2" /> Oxford Blue
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuRadioItem value="#333333">
                                            <Circle color="#333333" className="mr-2" /> Dark Grey
                                        </DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="#000000">
                                            <Circle color="#000000" className="mr-2" /> Pure Black
                                        </DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    {/* Environment Settings */}
                    <DropdownMenuLabel>Environment</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        {/* Environment Preset */}
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <Zap />Preset: {config.environment?.preset || "city"}
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuRadioGroup
                                        value={config.environment?.preset || "city"}
                                        onValueChange={(newPreset: string) =>
                                            onChange({
                                                ...config,
                                                environment: { ...config.environment, preset: newPreset },
                                            })
                                        }
                                    >
                                        <DropdownMenuRadioItem value="apartment">Apartment</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="city">City</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="dawn">Dawn</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="forest">Forest</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="lobby">Lobby</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="night">Night</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="park">Park</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="studio">Studio</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="sunset">Sunset</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="warehouse">Warehouse</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

// App.tsx
import React, { useState } from "react";
import Loading from "./components/ui/loading";
import Model from "./model";
import MeshRenderer, { MeshData } from "./model/mesh/mesh.render";
import { ScrollArea } from "@/components/ui/scroll-area";
import
{
  Box,
} from "lucide-react";
import
{
  Command,

  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,

} from "@/components/ui/command";



const App = () =>
{
  const { meshConfig, meshConfig_loading } = Model.Mesh.Config("./colored_glb.glb");
  const [canvasConfig, setCanvasConfig] = useState<any>(Model.Canvas.Config);
  // mode can be "odd", "even", or "reset"
  const [mode, setMode] = useState<"odd" | "even" | "reset">("reset");
  const [SM, setSM] = useState<any>(null);

  if (meshConfig_loading) return <Loading />;

  // Convert meshConfig object to an array
  const meshesArray: MeshData[] = Object.values(meshConfig);

  // This function modifies mesh properties based on the current mode.
  const modifyMesh = (mesh: MeshData) =>
  {
    const meshId = parseInt(mesh.id, 10);
    if (mode === "odd" && meshId % 2 !== 0) {
      return { color: "red", wireframe: true };
    } else if (mode === "even" && meshId % 2 === 0) {
      return { color: "red", wireframe: true };
    }
    // For "reset" or unmatched cases, return no modifications.
    return {};
  };

  return (
    <div className="flex h-screen w-full gap-1">
      <main className="relative flex-grow">
        <Model.Canvas.Render config={canvasConfig}>
          <MeshRenderer meshes={meshesArray} modifyMesh={modifyMesh} />
        </Model.Canvas.Render>

        {/* Absolute positioned div at bottom-left */}
        <div className="absolute bottom-16 right-32 rounded shadow">
          <Model.Canvas.Setting config={canvasConfig} onChange={setCanvasConfig} />
        </div>
      </main>

      <Model.Info.Render mesh={SM} />

      <aside className="w-52 flex-none">
        <Command>
          <CommandInput placeholder="Search for mesh ..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <ScrollArea className="h-dvh pl-2 pr-3 pb-24">
                {meshConfig.map((M) => (
                  <CommandItem
                    key={M.name}
                    value={M.name}
                    onSelect={() => setSM(M)} // Set selected mesh on click
                  >
                    <Box color={M._rgb.code} className="size-1/2" /> {M.name}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </aside>
    </div>
  );
};

export default App;

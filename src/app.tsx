import { useState, useEffect } from "react";
import Model from "./model";

import
{
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import
{
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const App = () =>
{
  const [meshConfig, meshConfig_loading] = Model.Mesh.Config("./colored_glb.glb");
  const [meshModif, setmeshModif] = useState<any[]>([]);
  const [canvasConfig, setCanvasConfig] = useState(Model.Canvas.Config);
  const [SM, setSM] = useState<any | null>(null);

  useEffect(() =>
  {
    if (!meshConfig) return;
    setmeshModif(meshConfig);
  }, [meshConfig, meshConfig_loading]);

  return (
    <Model.Mesh.Loading isLoading={meshConfig_loading}>
      <div className="flex h-screen w-full gap-1">

        <SidebarProvider>
          <Model.Sidebar.Render />

          <main className="relative flex-grow">
            <Model.Canvas.Render config={canvasConfig}>
              <Model.Mesh.Render meshes={meshModif} />
              <Model.Info.Performance />
            </Model.Canvas.Render>

            <div className="absolute bottom-16 left-16 rounded shadow">
              <Model.Canvas.Setting config={canvasConfig} onChange={setCanvasConfig} />
            </div>

            <div className="absolute top-16 left-16 flex gap-2">
              <Model.Mesh.Setting meshConfig={meshConfig} setmeshModif={setmeshModif} />
            </div>
          </main>

          <Model.Info.Render mesh={SM} />

          <Model.Info.MeshList meshConfig={meshConfig} setSM={setSM} setmeshModif={setmeshModif} />


        </SidebarProvider>


      </div>
    </Model.Mesh.Loading>
  );
};

export default App;

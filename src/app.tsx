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
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">
                        Building Your Application
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
                <div className="aspect-video rounded-xl bg-muted/50" />
              </div>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            </div>
          </SidebarInset>
        </SidebarProvider>

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

      </div>
    </Model.Mesh.Loading>
  );
};

export default App;

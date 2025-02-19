import { CanvasRender } from "./canvas/canvas.render";
import { CanvasSetting } from "./canvas/canvas.setting";
import { CanvasConfig } from "./canvas/canvas.config";

import { MeshRender } from "./mesh/mesh.render";
import { MeshSetting } from "./mesh/mesh.setting";
import { MeshConfig } from "./mesh/mesh.config";
import { MeshLoading } from "./mesh/mesh.loading";

import { InfoRender } from "./info/info.render";
import { InfoPerformance } from "./info/info.performance";
import { InfoMeshList } from "./info/info.mesh.list";
import { AppSidebar } from "./sidebar.tsx/sidebar";


const Model =
{
    Canvas:
    {
        Render: CanvasRender,
        Setting: CanvasSetting,
        Config: CanvasConfig
    },
    Mesh:
    {
        Render: MeshRender,
        Setting: MeshSetting,
        Config: MeshConfig,
        Loading: MeshLoading
    },
    Info:
    {
        Render: InfoRender,
        Performance: InfoPerformance,
        MeshList: InfoMeshList
    },
    Sidebar:
    {
        Render: AppSidebar
    }
};

export default Model;

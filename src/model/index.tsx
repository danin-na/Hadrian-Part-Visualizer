import { CanvasRender } from "./canvas/canvas.render";
import { CanvasConfig } from "./canvas/canvas.config";
import { CanvasSetting } from "./canvas/canvas.setting";

import { MeshConfig } from "./mesh/mesh.config";

import { InfoRender } from "./info/info.render";
import { InfoPerformance } from "./info/info.performance";


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
        Config: MeshConfig,
    },
    Info:
    {
        Render: InfoRender,
        Performance: InfoPerformance
    }
};

export default Model;

import { CanvasRender } from "./canvas/canvas.render";
import { CanvasConfig } from "./canvas/canvas.config";
import { CanvasSetting } from "./canvas/canvas.setting";
import { useMesh } from "./loader/loader.fetch";


const Model =
{
    Loader:
    {
        Fetch: useMesh,
    },
    Canvas:
    {
        Render: CanvasRender,
        Setting: CanvasSetting,
        Config: CanvasConfig
    }
};

export default Model;

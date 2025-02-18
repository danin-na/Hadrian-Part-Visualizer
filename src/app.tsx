// App.tsx
import { useState, useEffect } from "react";
import Loading from "./components/ui/loading";
import Model from "./model";
import MeshRenderer, { MeshData } from "./model/mesh/mesh.render";


const App = () =>
{

  const [meshConfig, meshConfig_loading] = Model.Mesh.Config("./colored_glb.glb");
  const [meshModif, setmeshModif] = useState<MeshData[]>([]);
  const [canvasConfig, setCanvasConfig] = useState<any>(Model.Canvas.Config);

  useEffect(() =>
  {
    if (!meshConfig) return
    setmeshModif(meshConfig);

  }, [meshConfig, meshConfig_loading]);


  // Button 1: Change meshes with odd IDs to yellow.
  const handleButton1 = () =>
  {
    setmeshModif((prevConfig) =>
      prevConfig.map((mesh) =>
      {
        // Assuming mesh.id is a string that can be parsed to a number.
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

  // Button 2: Change meshes with even IDs to red.
  const handleButton2 = () =>
  {
    setmeshModif((prevConfig) =>
      prevConfig.map((mesh) =>
      {
        if (parseInt(mesh.id, 10) % 2 === 0) {
          return {
            ...mesh,
            _rgb: {
              ...mesh._rgb,
              code: "red",
            },
          };
        }
        return mesh;
      })
    );
  };

  // Button 3: Reset meshes to the original configuration.
  const handleButton3 = () =>
  {
    setmeshModif(meshConfig);
  };

  if (meshConfig_loading)

    return <Loading />

  else

    return (
      <div className="flex h-screen w-full gap-1">
        <main className="relative flex-grow">
          <Model.Canvas.Render config={canvasConfig}>
            <MeshRenderer meshes={meshModif} />
            <Model.Info.Performance />
          </Model.Canvas.Render>

          <div className="absolute bottom-16 left-16 rounded shadow">
            <Model.Canvas.Setting config={canvasConfig} onChange={setCanvasConfig} />
          </div>

          {/* Render the buttons for changing mesh colors */}
          <div className="absolute top-16 left-16 flex gap-2">
            <button onClick={handleButton1} className="px-4 py-2 bg-blue-500 text-white rounded">
              Button 1 - Odd to Yellow
            </button>
            <button onClick={handleButton2} className="px-4 py-2 bg-blue-500 text-white rounded">
              Button 2 - Even to Red
            </button>
            <button onClick={handleButton3} className="px-4 py-2 bg-blue-500 text-white rounded">
              Button 3 - Reset
            </button>
          </div>
        </main>
      </div>
    );

};

export default App;

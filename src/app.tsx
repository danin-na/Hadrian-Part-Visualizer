import { useState } from "react";

import Loading from "./components/ui/loading";
import Model from "./model";
import { Sphere, Box, Cylinder, Cone, Torus } from "@react-three/drei";



const App = () =>
{
  const { loading } = Model.Loader.Fetch('./colored_glb.glb');



  const [canvasConfig, setCanvasConfig] = useState<any>(Model.Canvas.Config);

  if (loading) return <Loading />;

  return (
    <div className="flex h-screen w-full flex-col">
      <Model.Canvas.Setting config={canvasConfig} onChange={setCanvasConfig} />

      <Model.Canvas.Render config={canvasConfig}>
        <Sphere args={[0.5, 32, 32]} position={[-2, 1, 0]}>
          <meshStandardMaterial color="red" roughness={0.5} metalness={0.3} />
        </Sphere>
        <Box args={[1, 1, 1]} position={[0, 1, 0]}>
          <meshStandardMaterial color="blue" roughness={0.5} metalness={0.3} />
        </Box>
        <Cylinder args={[0.5, 0.5, 1.5, 32]} position={[2, 1, 0]}>
          <meshStandardMaterial color="green" roughness={0.5} metalness={0.3} />
        </Cylinder>
        <Cone args={[0.5, 1.5, 32]} position={[-1, 2, 1]}>
          <meshStandardMaterial color="yellow" roughness={0.5} metalness={0.3} />
        </Cone>
        <Torus args={[0.5, 0.2, 16, 100]} position={[1, 2, -1]}>
          <meshStandardMaterial color="purple" roughness={0.5} metalness={0.3} />
        </Torus>
      </Model.Canvas.Render>
    </div>
  );
};

export default App;

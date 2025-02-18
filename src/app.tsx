import { useState } from "react";
import useMesh from "./model/loader/loader";
import Loading from "./components/ui/loading";
import Model from "./model";

import { Sphere, Box, Cylinder, Cone, Torus } from "@react-three/drei";

const App = () =>
{
  const { MESH, loading } = useMesh(); // there is 2 second FAKE network delay
  const [canvasConfig, setCanvasConfig] = useState(Model.Canvas.Config);

  if (loading) {
    return <Loading />;
  }

  const changeBackgroundToRed = () =>
  {
    setCanvasConfig((prevConfig) => ({
      ...prevConfig,
      background: "red",
    }));
  };

  return (
    <div className="flex h-screen w-full flex-col">
      <button
        onClick={changeBackgroundToRed}
        style={{ padding: "0.5rem 1rem", margin: "1rem" }}
      >
        Change Background to Red
      </button>
      <Model.Canvas config={canvasConfig}>
        {/* Sphere */}
        <Sphere args={[0.5, 32, 32]} position={[-2, 1, 0]}>
          <meshStandardMaterial color="red" roughness={0.5} metalness={0.3} />
        </Sphere>

        {/* Cube */}
        <Box args={[1, 1, 1]} position={[0, 1, 0]}>
          <meshStandardMaterial color="blue" roughness={0.5} metalness={0.3} />
        </Box>

        {/* Cylinder */}
        <Cylinder args={[0.5, 0.5, 1.5, 32]} position={[2, 1, 0]}>
          <meshStandardMaterial color="green" roughness={0.5} metalness={0.3} />
        </Cylinder>

        {/* Cone */}
        <Cone args={[0.5, 1.5, 32]} position={[-1, 2, 1]}>
          <meshStandardMaterial color="yellow" roughness={0.5} metalness={0.3} />
        </Cone>

        {/* Torus */}
        <Torus args={[0.5, 0.2, 16, 100]} position={[1, 2, -1]}>
          <meshStandardMaterial color="purple" roughness={0.5} metalness={0.3} />
        </Torus>
      </Model.Canvas>
    </div>
  );
};

export default App;

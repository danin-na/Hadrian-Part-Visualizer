import useMesh from "./loader/loader";
import Loading from "./Loading/Loading";

const App = () =>
{
  const { MESH, loading } = useMesh(); // It 4 second network delay

  if (loading) {
    return <Loading />;
  }

  return (

    <div className="flex h-screen w-full">


      <aside className="w-64">

      </aside>
    </div>
  );
};

export default App;


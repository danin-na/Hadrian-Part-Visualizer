import useMesh from "./useMesh/useMesh";
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, useGLTF } from '@react-three/drei';
import { useState, useEffect } from 'react';

import { ScrollArea } from "@/components/ui/scroll-area"
import { Box, LoaderCircle, Hash, ChevronRight, SquareDashed, MoveRight, MoveUp, MoveDownLeft } from "lucide-react"

import
{
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import Redner from './render';

import { Progress } from "@/components/ui/progress"
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
        <Command>
          <CommandInput placeholder="Search for mesh ..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <ScrollArea className="h-[150px] pl-2 pr-3">
                {MESH.map((M) => (
                  <CommandItem
                    key={M.name}
                    value={M.name}
                  >
                    <Box /> {M.name}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
            <CommandSeparator />

          </CommandList>
        </Command>
      </aside>
    </div>
  );
};

export default App;


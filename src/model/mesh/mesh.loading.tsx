import React from "react";
import { LoaderCircle } from "lucide-react"

interface LoadingWrapperProps
{
    isLoading: boolean;
    children: React.ReactNode;
}

export const MeshLoading: React.FC<LoadingWrapperProps> = ({ isLoading, children }) =>
{
    return <>{isLoading ? <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex space-x-2">
            <div className="animate-none md:animate-spin ...">
                <LoaderCircle />
            </div>
            <span>Loading Your Mesh ...</span>
        </div>

        <p className="text-lg font-semibold text-gray-700 mt-4">Please Wait</p>
    </div> : children}</>;
};

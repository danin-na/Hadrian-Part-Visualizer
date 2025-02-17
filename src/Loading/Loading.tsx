import React from 'react'
import { Box, LoaderCircle, Hash, ChevronRight, SquareDashed, MoveRight, MoveUp, MoveDownLeft } from "lucide-react"

const Loading = () =>
{
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="flex space-x-2">
                <div className="animate-none md:animate-spin ...">
                    <LoaderCircle />
                </div>
                <span>Loading Your Mesh ...</span>
            </div>

            <p className="text-lg font-semibold text-gray-700 mt-4">Please Wait</p>
        </div>
    )
}

export default Loading
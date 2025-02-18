import { Perf } from "r3f-perf";

export const InfoPerformance = () =>
{
    return (
        <Perf showGraph style={{ "position": "absolute", "bottom": "2rem", "top": "auto", "right": "3rem" }} />
    )
}

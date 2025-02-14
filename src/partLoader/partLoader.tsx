import { useEffect } from "react";
import useFetchJson from "./useFetchJson";

const PartLoader = () =>
{

    const { data: d_adj_met } = useFetchJson("./adjacency_graph_edge_metadata.json");
    const { data: d_adj_gra } = useFetchJson("./adjacency_graph.json");
    const { data: d_ent_inf } = useFetchJson("./entity_geometry_info.json");
    const { data: d_rgb_map } = useFetchJson("./rgb_id_to_entity_id_map.json");

    useEffect(() =>
    {
        if (d_adj_met && d_adj_gra && d_ent_inf && d_rgb_map) {
            console.log('adjacency_graph_edge_metadata:', d_adj_met);
            console.log('adjacency_graph:', d_adj_gra);
            console.log('entity_geometry_info:', d_ent_inf);
            console.log('rgb_id_to_entity_id_map:', d_rgb_map);
        }
    }, [d_adj_met, d_adj_gra, d_ent_inf, d_rgb_map]);

    return (
        <div>partLoader</div>
    )
}

export default PartLoader
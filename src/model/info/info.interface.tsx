export interface INTERF_INFO_RENDER
{
    mesh: {
        id: string;
        name: string;
        _geo?: {
            metadata?: {
                version?: number;
                type?: string;
                generator?: string;
            };
            uuid?: string;
            type?: string;
            data?: {
                boundingSphere?: {
                    center?: number[];
                    radius?: number;
                };
            };
        };
        _rgb?: {
            code?: string;
            wire?: boolean;
        };
        _ent?: {
            type?: number;
            centerUv?: number[];
            centerPoint?: number[];
            centerNormal?: number[];
            area?: number;
            minRadius?: number;
            minPosRadius?: number;
            minNegRadius?: number;
            edgeCurveChains?: any[];
        };
        _nbr?: {
            neighbors?: string[];
            neighbors_number?: number;
        };
    } | null;
}

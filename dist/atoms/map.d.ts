import type { Map, Style, Layer } from 'mapbox-gl';
import type { MapProps } from 'types/map';
declare const mapState: import("jotai").PrimitiveAtom<Map | null> & {
    init: Map | null;
};
declare const isMapLoadedState: import("jotai").PrimitiveAtom<boolean> & {
    init: boolean;
};
declare const mapPropsState: import("jotai").PrimitiveAtom<MapProps> & {
    init: MapProps;
};
declare const styleURLState: import("jotai").PrimitiveAtom<string> & {
    init: string;
};
declare const spriteState: import("jotai").PrimitiveAtom<string | undefined> & {
    init: string | undefined;
};
declare const styleObjState: import("jotai").PrimitiveAtom<Style | null> & {
    init: Style | null;
};
declare const selectedLayerIDState: import("jotai").PrimitiveAtom<string | undefined> & {
    init: string | undefined;
};
declare const layerState: import("jotai").Atom<Layer>;
export { mapState, isMapLoadedState, mapPropsState, styleURLState, spriteState, styleObjState, selectedLayerIDState, layerState, };

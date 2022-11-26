declare function useGetStyleKey(type: string): {
    styleKey: "zoom" | "layout" | "paint" | undefined;
    property: "icon-size" | "icon-opacity" | "line-color" | "line-width" | "line-opacity" | "fill-color" | "fill-outline-color" | "fill-opacity" | "circle-radius" | "circle-color" | "circle-opacity" | "circle-stroke-width" | "circle-stroke-color" | "circle-stroke-opacity" | undefined;
};
export default useGetStyleKey;

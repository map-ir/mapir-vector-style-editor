/// <reference types="react" />
import type { CircleLayer, FillLayer, LineLayer, SymbolLayer } from 'mapbox-gl';
export interface ITab<T> {
    id: T;
    disabled?: boolean;
}
declare const symbolPageIds: readonly ["symbol", "other", "title"];
export declare type SymbolPageIdsType = typeof symbolPageIds[number];
export declare const symbolTabs: ITab<SymbolPageIdsType>[];
declare const circlePageIds: readonly ["circle", "circle-outline", "title", "other"];
export declare type CirclePageIdsType = typeof circlePageIds[number];
export declare const circleTabs: ITab<CirclePageIdsType>[];
declare const linePageIds: readonly ["line", "line-type", "title", "other"];
export declare type LinePageIdsType = typeof linePageIds[number];
export declare const lineTabs: ITab<LinePageIdsType>[];
declare const fillPageIds: readonly ["fill", "fill-outline", "title", "other"];
export declare type FillPageIdsType = typeof fillPageIds[number];
export declare const fillTabs: ITab<FillPageIdsType>[];
export declare const components: Record<string, JSX.Element>;
export declare const DefaultSymbolLayer: Partial<SymbolLayer>;
export declare const DefaultTextLayer: Partial<SymbolLayer>;
export declare const DefaultCircleLayer: Partial<CircleLayer>;
export declare const DefaultLineLayer: Partial<LineLayer>;
export declare const DefaultFillLayer: Partial<FillLayer>;
export {};

import { TextStyleAlign, TextStyleFontWeight } from 'pixi.js';

export interface ITextTransform {
  align?: TextStyleAlign;
  anchorX?: number;
  fill: any;
  fontFamily: string[];
  fontSize: number;
  fontWeight: TextStyleFontWeight;
  positionX?: number;
  positionY?: number;
  text: string;
}

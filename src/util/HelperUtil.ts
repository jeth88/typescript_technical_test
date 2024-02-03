import { Text } from 'pixi.js';
import { ITextTransform } from '../interface/ITextTransform';

type IScreenOrientation = 'landscape' | 'portrait';

export class HelperUtil {
  public static createStaticText(textTransform: ITextTransform): Text {
    const {
      align,
      anchorX,
      fill,
      fontFamily,
      fontSize,
      fontWeight,
      text,
      positionX,
      positionY,
    } = textTransform;
    const staticText = new Text(text, {
      align,
      fill,
      fontFamily,
      fontSize,
      fontWeight,
    });
    staticText.anchor.x = anchorX || 0;
    staticText.x = positionX || 0;
    staticText.y = positionY || 0;
    return staticText;
  }

  public static createInteractiveText(
    textTransform: ITextTransform,
    callBackFnc?: Function,
  ): Text {
    const {
      align,
      anchorX,
      fill,
      fontFamily,
      fontSize,
      fontWeight,
      text,
      positionX,
      positionY,
    } = textTransform;
    const dynamicText = new Text(text, {
      align,
      fill,
      fontFamily,
      fontSize,
      fontWeight,
    });
    dynamicText.anchor.x = anchorX || 0;
    dynamicText.x = positionX || 0;
    dynamicText.y = positionY || 0;

    dynamicText.interactive = true;
    dynamicText.cursor = 'pointer';

    dynamicText.on('pointerup', () => {
      callBackFnc && callBackFnc();
    });
    return dynamicText;
  }

  public static getOrientation(): IScreenOrientation {
    const { clientWidth, clientHeight } = document.documentElement;
    return clientWidth > clientHeight ? 'landscape' : 'portrait';
  }
}

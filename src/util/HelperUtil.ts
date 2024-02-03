import { Text } from 'pixi.js';
import { ITextTransform } from '../interface/ITextTransform';

type IScreenOrientation = 'landscape' | 'portrait';

export class HelperUtil {
  public static createStaticText(
    text: string,
    style: any,
    textTransform?: ITextTransform,
  ): Text {
    const staticText = new Text(text, style);
    if (textTransform) {
      const { anchorX, positionX, positionY } = textTransform;
      staticText.anchor.x = anchorX || 0;
      staticText.x = positionX || 0;
      staticText.y = positionY || 0;
    }
    return staticText;
  }

  public static createInteractiveText(
    text: string,
    style: any,
    textTransform?: ITextTransform,
    callBackFnc?: Function,
  ): Text {
    const dynamicText = new Text(text, style);
    if (textTransform) {
      const { anchorX, positionX, positionY } = textTransform;
      dynamicText.anchor.x = anchorX || 0;
      dynamicText.x = positionX || 0;
      dynamicText.y = positionY || 0;
    }
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

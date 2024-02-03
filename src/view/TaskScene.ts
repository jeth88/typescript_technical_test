import { Text } from 'pixi.js';
import { COMMON_GAME_TEXT_STYLE } from '../config/commonConfig';
import { TEXT_MENU } from '../constant/gameConstant';
import { HelperUtil } from '../util/HelperUtil';
import { MenuScene } from './MenuScene';
import { Scene } from './Scene';

export class TaskScene extends Scene {
  protected getBackMenuText(): Text {
    return HelperUtil.createInteractiveText(
      '<< BACK',
      COMMON_GAME_TEXT_STYLE,
      {
        anchorX: 0.5,
        positionX: 0,
        positionY: 780,
      },
      () => this.getCallBackFunc(TEXT_MENU.back),
    );
  }

  protected override getCallBackFunc(textMenu: TEXT_MENU): void {
    let taskScene;
    switch (textMenu) {
      case TEXT_MENU.back:
        taskScene = MenuScene;
        break;
    }
    taskScene &&
      this.sceneController.gotoScene(new taskScene(this.sceneController));
  }
}

import { Container } from 'pixi.js';
import {
  MENU_TEXT_STYLE,
  COMMON_HEADER_TEXT_STYLE,
} from '../config/commonConfig';
import { TEXT_MENU } from '../constant/gameConstant';
import { HelperUtil } from '../util/HelperUtil';
import { Scene } from './Scene';
import { Task1Scene } from './Task1Scene';
import { Task2Scene } from './Task2Scene';
import { Task3Scene } from './Task3Scene';

export class MenuScene extends Scene {
  public override onStart(parentCnt: Container): Promise<void> {
    return new Promise((resolve: Function) => {
      super.onStart(parentCnt);
      this.setupTexts();
      resolve();
    });
  }

  private setupTexts(): void {
    const menuText = HelperUtil.createStaticText(
      'GAME MENU',
      COMMON_HEADER_TEXT_STYLE,
      {
        anchorX: 0.5,
        positionX: this.POS_X,
        positionY: 100,
      },
    );
    const game1Text = HelperUtil.createInteractiveText(
      'CARD DECK GAME',
      MENU_TEXT_STYLE,
      {
        anchorX: 0.5,
        positionX: this.POS_X,
        positionY: 250,
      },
      () => this.getCallBackFunc(TEXT_MENU.card),
    );
    const game2Text = HelperUtil.createInteractiveText(
      'RANDOM OBJECTS GAME',
      MENU_TEXT_STYLE,
      {
        anchorX: 0.5,
        positionX: this.POS_X,
        positionY: 350,
      },
      () => this.getCallBackFunc(TEXT_MENU.random),
    );
    const game3Text = HelperUtil.createInteractiveText(
      'FLAME EFFECT GAME',
      MENU_TEXT_STYLE,
      {
        anchorX: 0.5,
        positionX: this.POS_X,
        positionY: 450,
      },
      () => this.getCallBackFunc(TEXT_MENU.flame),
    );

    this._parentCnt.addChild(menuText, game1Text, game2Text, game3Text);
    this.sceneController.handleResize(true);
  }

  protected override getCallBackFunc(textMenu: TEXT_MENU): void {
    let taskScene;
    switch (textMenu) {
      case TEXT_MENU.card:
        taskScene = Task1Scene;
        break;
      case TEXT_MENU.random:
        taskScene = Task2Scene;
        break;
      case TEXT_MENU.flame:
        taskScene = Task3Scene;
        break;
    }
    taskScene &&
      this.sceneController.gotoScene(new taskScene(this.sceneController));
  }
}

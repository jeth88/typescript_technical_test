import { Application, Container, Graphics, IPointData } from 'pixi.js';
import { TEXT_MENU } from '../constant/gameConstant';
import { SceneController } from '../controller/SceneController';

export class Scene {
  protected readonly POS_X: number = 0;

  protected _parentCnt!: Container;
  private _sceneController!: SceneController;

  constructor(sceneController: SceneController) {
    this._sceneController = sceneController;
  }

  protected get sceneController(): SceneController {
    return this._sceneController;
  }

  protected get app(): Application {
    return this._sceneController.app;
  }

  public setScale(scale: number) {
    this._parentCnt.scale.set(scale);
  }

  public setPosition(pointData: IPointData) {
    this._parentCnt.position = pointData;
  }

  public onStart(parentCnt: Container): Promise<void> {
    this._parentCnt = parentCnt;
    const bg: Graphics = this._parentCnt.addChild(new Graphics());
    bg.beginFill('#FFE5B4');
    bg.drawRect(-250, 190, 500, 500);
    return Promise.resolve();
  }

  public onUpdate(delta: number): void {}

  public onFinish(): void {
    this.reset();
  }

  protected getCallBackFunc(textMenu: TEXT_MENU): void {}

  protected reset(): void {}
}

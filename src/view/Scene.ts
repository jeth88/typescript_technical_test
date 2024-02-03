import { Application, Container, IPointData } from 'pixi.js';
import { TEXT_MENU } from '../constant/gameConstant';
import { SceneController } from '../controller/SceneController';

export class Scene {
  protected readonly POS_X: number = 550;

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
    return Promise.resolve();
  }

  public onUpdate(delta: number): void {}

  public onFinish(): void {
    this.reset();
  }

  protected getCallBackFunc(textMenu: TEXT_MENU): void {}

  protected reset(): void {}
}

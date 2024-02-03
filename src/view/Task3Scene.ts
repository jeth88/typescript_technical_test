import { Emitter } from '@pixi/particle-emitter';
import { Container } from 'pixi.js';
import { COMMON_HEADER_TEXT_STYLE } from '../config/commonConfig';
import { SceneController } from '../controller/SceneController';
import { ITextTransform } from '../interface/ITextTransform';
import { HelperUtil } from '../util/HelperUtil';
import * as flameJson from './../particles/blueFlame.json';
import { TaskScene } from './TaskScene';

export class Task3Scene extends TaskScene {
  private _particleContainer!: Container;
  private _emitter!: Emitter;

  constructor(sceneController: SceneController) {
    super(sceneController);

    this.reset();
  }

  public override onStart(parentCnt: Container): Promise<void> {
    return new Promise((resolve: Function) => {
      super.onStart(parentCnt);
      const gameText = HelperUtil.createStaticText(
        Object.assign({}, COMMON_HEADER_TEXT_STYLE, {
          positionX: this.POS_X,
          positionY: 50,
          text: 'FLAME EFFECT GAME',
        } as ITextTransform),
      );
      const backMenuText = this.getBackMenuText();

      parentCnt.addChild(gameText, backMenuText);
      this.setupParticlesAndPlay();
      resolve();
    });
  }

  private setupParticlesAndPlay(): void {
    this._particleContainer = this._parentCnt.addChild(new Container());
    this._particleContainer.x = this.POS_X;
    this._particleContainer.y = 600;

    this._emitter = new Emitter(this._particleContainer, flameJson);
    this._emitter.emit = true;
    this.sceneController.handleResize(true);
  }

  public override onUpdate(delta: number): void {
    this._emitter && this._emitter.update(delta * 0.001);
  }

  protected override reset(): void {
    if (this._particleContainer && this._particleContainer.children.length) {
      this._particleContainer.removeChildren();
    }

    if (this._emitter) {
      this._emitter.emit = false;
      this._emitter.cleanup();
      this._emitter.destroy();
    }
  }
}

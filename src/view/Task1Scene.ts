import { gsap } from 'gsap';
import { Container, IPointData, Sprite, Text, Ticker } from 'pixi.js';
import {
  COMMON_GAME_TEXT_STYLE,
  COMMON_HEADER_TEXT_STYLE,
} from '../config/commonConfig';
import { SceneController } from '../controller/SceneController';
import { ITextTransform } from '../interface/ITextTransform';
import { HelperUtil } from '../util/HelperUtil';
import { TaskScene } from './TaskScene';

export class Task1Scene extends TaskScene {
  private readonly MAX_CARDS: number = 144;
  private readonly CARD_START_DELAY: number = 1;
  private readonly CARD_TRANSFER_DURATION: number = 2;

  private _leftDeckCnt!: Container;
  private _rightDeckCnt!: Container;
  private _cardSprites!: Sprite[];
  private _fpsText!: Text;
  private _ticker!: Ticker;

  private _descCtr!: number;
  private _ascCtr!: number;

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
          text: 'CARD DECK GAME',
        } as ITextTransform),
      );
      this._fpsText = HelperUtil.createStaticText(
        Object.assign({}, COMMON_GAME_TEXT_STYLE, {
          anchorX: 0,
          positionX: 30,
          positionY: 20,
          text: 'FPS: 0',
        } as ITextTransform),
      );
      const backMenuText = this.getBackMenuText();

      parentCnt.addChild(gameText, this._fpsText, backMenuText);
      this.runFPSTicker();
      this.generateDeckOfCards();
      resolve();
    });
  }

  private runFPSTicker(): void {
    this._ticker = new Ticker();
    this._ticker.stop();
    this._ticker.add(() => {
      this._fpsText.text = `FPS: ${this._ticker.FPS.toFixed(2)}`;
    });
    this._ticker.start();
  }

  private generateDeckOfCards(): void {
    const position = { x: -150, y: 0 };
    this._leftDeckCnt = this.getNewContainer(position);
    this._rightDeckCnt = this.getNewContainer(position);

    const gameCnt = this._parentCnt.addChild(new Container());
    gameCnt.addChild(this._rightDeckCnt, this._leftDeckCnt);
    gameCnt.position.x = this.POS_X;
    gameCnt.position.y = 280;

    const cardImgSrc = './img/cardDown.jpg';
    for (let i = 0; i < this.MAX_CARDS; i++) {
      const sprite = Sprite.from(cardImgSrc);
      sprite.scale.set(0.5);
      sprite.y = 200 - i * 2;
      this._leftDeckCnt.addChild(sprite);
      this._cardSprites.push(sprite);
    }
    this.transferOneCard();
    this.sceneController.handleResize(true);
  }

  private getNewContainer(pointData: IPointData): Container {
    const cnt = new Container();
    cnt.position = pointData;
    return cnt;
  }

  private transferOneCard(): void {
    if (this._ascCtr < this.MAX_CARDS) {
      this._ascCtr++;
      this._descCtr > 0 && this._descCtr--;

      const currentCard = this._cardSprites[this._descCtr];
      gsap.to(currentCard, {
        delay: this._ascCtr ? this.CARD_START_DELAY : 0,
        x: 200,
        y: 200 - this._ascCtr * 2,
        duration: this.CARD_TRANSFER_DURATION,
        onComplete: () => {
          this._rightDeckCnt.addChild(currentCard);
          this.transferOneCard();
        },
      });
    } else {
      gsap.killTweensOf(this._cardSprites);
    }
  }

  protected override reset(): void {
    if (this._cardSprites && this._cardSprites.length) {
      gsap.killTweensOf(this._cardSprites);
    }
    this._cardSprites = [];
    this._cardSprites.length = 0;

    if (this._leftDeckCnt && this._leftDeckCnt.children.length) {
      this._leftDeckCnt.removeChildren();
    }
    if (this._rightDeckCnt && this._rightDeckCnt.children.length) {
      this._rightDeckCnt.removeChildren();
    }

    if (this._ticker) {
      this._ticker.stop();
      this._ticker.destroy();
    }

    this._descCtr = this.MAX_CARDS;
    this._ascCtr = -1;
  }
}

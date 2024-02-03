import { Container, IPointData, Sprite, Text } from 'pixi.js';
import {
  COMMON_HEADER_TEXT_STYLE,
  RANDOM_TEXT_STYLE,
} from '../config/commonConfig';
import { SceneController } from '../controller/SceneController';
import { HelperUtil } from '../util/HelperUtil';
import { TaskScene } from './TaskScene';

export class Task2Scene extends TaskScene {
  private readonly _loadObjectsIntervalinMS: number = 2000;
  private readonly _fontSizes: number[] = [25, 30, 35, 40, 45];

  private readonly _activityNames: string[] = [
    'Coding',
    'Debugging',
    'Planning',
    'Programming',
    'Reading',
  ];

  private readonly _textureImages: string[] = [
    './img/bat.jpg',
    './img/bee.jpg',
    './img/cat.jpg',
    './img/heart.jpg',
    './img/snowman.jpg',
  ];

  private _objects!: Array<Text | Sprite>;
  private _intervalId!: any;

  constructor(sceneController: SceneController) {
    super(sceneController);

    this.reset();
  }

  public override onStart(parentCnt: Container): Promise<void> {
    return new Promise((resolve: Function) => {
      super.onStart(parentCnt);
      const gameText = HelperUtil.createStaticText(
        'RANDOM OBJECTS GAME',
        COMMON_HEADER_TEXT_STYLE,
        {
          anchorX: 0.5,
          positionX: this.POS_X,
          positionY: 100,
        },
      );
      const backMenuText = this.getBackMenuText();

      parentCnt.addChild(gameText, backMenuText);
      const gameCnt = parentCnt.addChild(new Container());
      this.generateRandomObjects(gameCnt);
      this._intervalId = setInterval(() => {
        this.generateRandomObjects(gameCnt);
      }, this._loadObjectsIntervalinMS);
      this.sceneController.handleResize(true);
      resolve();
    });
  }

  private generateRandomObjects(gameCnt: Container): void {
    this.clearObjects();

    const firstRandomObject = this.generateRandomObject({ x: 0, y: 0 });
    const secondRandomObject = this.generateRandomObject({ x: 0, y: 150 });
    const thirdRandomObject = this.generateRandomObject({ x: 0, y: 300 });

    gameCnt.addChild(firstRandomObject, secondRandomObject, thirdRandomObject);
    gameCnt.position.x = this.POS_X;
    gameCnt.position.y = 240;
    this._objects.push(
      firstRandomObject,
      secondRandomObject,
      thirdRandomObject,
    );
  }

  private generateRandomObject(pointData: IPointData): Text | Sprite {
    const randomNumber = this.getRandomIdxByParam(2);

    const randomObject =
      randomNumber === 0 ? this.getRandomText() : this.getRandomImage();
    randomObject.x = pointData.x;
    randomObject.y =
      randomObject instanceof Text ? pointData.y + 30 : pointData.y;
    return randomObject;
  }

  private getRandomText(): Text {
    const randomIdx = this.getRandomIdxByParam(this._activityNames.length);
    const text = HelperUtil.createStaticText(
      this._activityNames[randomIdx],
      Object.assign({}, RANDOM_TEXT_STYLE, {
        fontSize: this._fontSizes[randomIdx],
      }),
      {
        anchorX: 0.5,
      },
    );
    return text;
  }

  private getRandomImage(): Sprite {
    const randomIdx = this.getRandomIdxByParam(this._textureImages.length);
    const sprite = Sprite.from(this._textureImages[randomIdx]);
    sprite.anchor.x = 0.5;
    sprite.scale.set(0.5);
    return sprite;
  }

  private getRandomIdxByParam(length: number): number {
    return Math.floor(Math.random() * length);
  }

  private clearObjects(): void {
    this._objects?.forEach((obj) => {
      obj.destroy();
    });
    this._objects = [];
    this._objects.length = 0;
  }

  protected override reset(): void {
    clearInterval(this._intervalId);
    this.clearObjects();
  }
}

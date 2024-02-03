import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import * as PIXI from 'pixi.js';
import { Application, Container } from 'pixi.js';
import { responsive } from '../constant/gameConstant';
import { HelperUtil } from '../util/HelperUtil';
import { MenuScene } from '../view/MenuScene';
import { Scene } from '../view/Scene';
import './../index.css';

export class SceneController {
  // (resize event fires twice => https://github.com/nwjs/nw.js/issues/5678)
  private readonly RESIZE_DELAY: number = 100;

  private _app: Application;
  private _currentScene!: Scene;
  private _boundHandler: any;
  private _resizeTimeoutId!: ReturnType<typeof setTimeout>;

  constructor(window: Window) {
    this._app = new Application({
      autoDensity: true,
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      resolution: window.devicePixelRatio || 1,
    });

    const canvas = document.getElementById('canvasContainer');
    canvas!.appendChild(this._app.view as any);

    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);

    gsap.ticker.lagSmoothing(100, 16);
    gsap.ticker.add((delta) => {
      this._app.renderer.render(this._app.stage);
      this.update(delta);
    });
    this.gotoScene(new MenuScene(this));

    this._boundHandler = this.handleResize.bind(this);
    if (window.screen.orientation) {
      window.screen.orientation.addEventListener('change', this._boundHandler);
    }
    window.addEventListener('resize', this._boundHandler);

    process.env.NODE_ENV === 'development' && this.setupPixiDebug();
  }

  public get app(): Application {
    return this._app;
  }

  public handleResize(isCalledManually = false): void {
    this._resizeTimeoutId && clearTimeout(this._resizeTimeoutId);
    this._resizeTimeoutId = setTimeout(
      () => this.resizeCanvasAndElements(),
      isCalledManually ? 0 : this.RESIZE_DELAY,
    );
  }

  private resizeCanvasAndElements(): void {
    const { clientWidth, clientHeight } = document.documentElement;
    this._app.renderer.resize(clientWidth, clientHeight);

    if (this._currentScene) {
      const orientation = HelperUtil.getOrientation();
      const { width: gameWidth, height: gameHeight } = responsive[orientation];
      const xScale = clientWidth / gameWidth;
      const yScale = clientHeight / gameHeight;

      const scale = Math.min(xScale, yScale);
      const xOffset = (clientWidth - gameWidth * scale) / 2;
      const yOffset = (clientHeight - gameHeight * scale) / 2;

      this._currentScene.setScale(scale);
      this._currentScene.setPosition({ x: xOffset, y: yOffset });
    }
  }

  private setupPixiDebug(): void {
    // This is for PixiJS DevTools chrome plugin
    let pixiGlobal = global as typeof globalThis & {
      __PIXI_STAGE__: any;
      __PIXI_RENDERER__: any;
    };
    if (!pixiGlobal.__PIXI_STAGE__) {
      pixiGlobal.__PIXI_STAGE__ = this._app.stage;
    }
    if (!pixiGlobal.__PIXI_RENDERER__) {
      pixiGlobal.__PIXI_RENDERER__ = this._app.renderer;
    }
  }

  // Replace the current scene with the new one
  public gotoScene(newScene: Scene): void {
    this.removeCurrentScene();
    this.addNewScene(newScene);
  }

  private removeCurrentScene(): void {
    if (this._currentScene) {
      this._currentScene.onFinish();
      this._app.stage.removeChildren();
    }
  }

  private async addNewScene(newScene: Scene): Promise<void> {
    const parentCnt = new Container();
    await newScene.onStart(parentCnt);
    this._app.stage.addChild(parentCnt);
    this._currentScene = newScene;
  }

  private update(delta: number): void {
    this._currentScene && this._currentScene.onUpdate(delta);
  }
}

import {
  Animation,
  AnimationGroup,
  ArcRotateCamera,
  Engine,
  Mesh,
  MeshBuilder,
  Scene,
  TransformNode,
  Vector3,
} from "@babylonjs/core";

export default class AppCore {
  engine: Engine;
  scene: Scene;

  constructor(private canvas: HTMLCanvasElement) {
    this.engine = new Engine(this.canvas, true);
    this.scene = new Scene(this.engine);

    this.scene.createDefaultCamera(true, true, true);
    this.scene.createDefaultLight();
    this.scene.createDefaultEnvironment();
    // this.scene.useRightHandedSystem=true;
    (this.scene.activeCamera as ArcRotateCamera).beta -= 0.3;
    // new AxesViewer(this.scene,0.1);

    this.init();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });
  }
  init() {
    this.animation();
  }
}

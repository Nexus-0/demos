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
  baseScene() {
    const box = MeshBuilder.CreateBox("box", {
      size: 0.1,
    });
    box.position.x = 0.05;
    const sphere = MeshBuilder.CreateSphere("sphere", {
      diameter: 0.1,
    });
    sphere.position.x = 0.2;
    sphere.position.y = 0.05;
    const cylinder = MeshBuilder.CreateCylinder("cylinder", {
      diameter: 0.1,
      height: 0.1,
    });
    cylinder.position.x = -0.2;
    cylinder.position.y = 0.05;
  }
  objTransform() {
    const ground = MeshBuilder.CreateGround(
      "ground",
      {
        width: 0.5,
        height: 0.5,
      },
      this.scene
    );
    ground.position.y = 0.001;
  }
  animation() {
    const cylinder = new TransformNode("cylinder", this.scene);
    cylinder.position = new Vector3(0, 0.2, 0);

    const cylinderTop = MeshBuilder.CreateCylinder(
      "cylinderTop",
      {
        height: 0.1,
        diameterTop: 0,
        diameterBottom: 0.12,
        tessellation: 4,
      },
      this.scene
    );
    cylinderTop.parent = cylinder;
    cylinderTop.position = new Vector3(0, 0.05, 0);

    const cylinderBottom = cylinderTop.clone("cylinderBottom");
    cylinderBottom.position = new Vector3(0, -0.05, 0);
    cylinderBottom.rotation.z = Math.PI;

    const cylinderBaseA = MeshBuilder.CreateCylinder("cylinderBaseA", {
      height: 0.03,
      diameterTop: 0.15,
      diameterBottom: 0.17,
    });
    cylinderBaseA.position = new Vector3(0, 0.015, 0);
    const cylinderBaseB = MeshBuilder.CreateCylinder("cylinderBaseB", {
      height: 0.02,
      diameterTop: 0.09,
      diameterBottom: 0.11,
    });
    cylinderBaseB.position = new Vector3(0, 0.04, 0);

    function random(min: number, max: number) {
      const ratio = 1000;
      return (
        (Math.floor(Math.random() * (max * ratio - min * ratio + 1)) +
          min * ratio) /
        ratio
      );
    }

    const balls: Mesh[] = [];

    for (let i = 1; i <= 8; ++i) {
      const sphere = MeshBuilder.CreateSphere(
        `sphere${i}`,
        {
          diameter: random(0.005, 0.012),
        },
        this.scene
      );

      sphere.position.x = random(-0.2, 0.2);
      sphere.position.y = random(0.05, 0.3);
      sphere.position.z = random(-0.2, 0.2);

      sphere.setPivotPoint(
        new Vector3(-sphere.position.x, 0, -sphere.position.z)
      );

      balls.push(sphere);
    }

    const frameRate = 30;

    const anim01 = new Animation(
      "anim01",
      "position.y",
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );
    // const anim02 = new Animation('anim02',)
    anim01.setKeys([
      {
        frame: 0,
        value: 0.2,
      },
      {
        frame: 4 * frameRate,
        value: 0.18,
      },
      {
        frame: 8 * frameRate,
        value: 0.2,
      },
    ]);

    const anim02 = new Animation(
      "anim02",
      "rotation.y",
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );
    anim02.setKeys([
      {
        frame: 0,
        value: 0,
      },
      {
        frame: 5 * frameRate,
        value: Math.PI,
      },
      {
        frame: 10 * frameRate,
        value: Math.PI * 2,
      },
    ]);
    const anim03 = new Animation(
      "anim03",
      "rotation.z",
      frameRate,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE
    );
    anim03.setKeys([
      {
        frame: 0,
        value: 0,
      },
      {
        frame: 5 * frameRate,
        value: Math.PI / 8,
      },
      {
        frame: 10 * frameRate,
        value: 0,
      },
    ]);
    // cylinder.animations.push(anim01);
    // cylinder.animations.push(anim02);
    // const animatable = this.scene.beginAnimation(cylinder,0,10 * frameRate,true,1);
    // balls.map(sphere =>{
    //     const animatable = this.scene.beginDirectAnimation(sphere,[
    //         anim01,anim02,anim03
    //     ], 10 * frameRate, 0, true ,1.5);
    // })
    // animatable.stop();
    // animatable.pause();
    // animatable.restart();

    const group01 = new AnimationGroup("group1", this.scene);
    // const group02 = new AnimationGroup('group2',this.scene);

    group01.addTargetedAnimation(anim01, cylinder);
    group01.addTargetedAnimation(anim02, cylinder);
    group01.play(true);

    // balls.map(sphere =>{
    //     group02.addTargetedAnimation(anim01,sphere);
    //     group02.addTargetedAnimation(anim02,sphere);
    //     group02.addTargetedAnimation(anim03,sphere);

    // })
    // group02.normalize(10*frameRate,0);
    // group02.speedRatio = 1.5;
    // group02.play(true);

    this.scene.registerBeforeRender(() => {
      balls[0].rotation.y += 0.01;
      balls[1].rotation.y += 0.02;
      balls[2].rotation.y -= 0.01;
      balls[3].rotation.y -= 0.02;
    });
    this.scene.registerAfterRender(() => {
      balls[4].rotation.y += 0.01;
      balls[5].rotation.y += 0.02;
      balls[6].rotation.y -= 0.01;
      balls[7].rotation.y -= 0.02;
    });
  }
}

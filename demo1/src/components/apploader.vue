<template>
    <div ref="renderCanvas"></div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import * as BABYLON from 'babylonjs';
  
  const renderCanvas = ref<HTMLDivElement | null>(null);
  
  onMounted(() => {
    loadModel();
  });
  
  function loadModel() {
    if (!renderCanvas.value) return;
  
    const canvas = renderCanvas.value;
    const engine = new BABYLON.Engine(canvas, true);
    const scene = new BABYLON.Scene(engine);
  
    BABYLON.SceneLoader.ImportMesh(
      '',
      '',
      'model.obj', // 模型路径，你可以传递参数来支持不同的模型
      scene,
      (meshes) => {
        const camera = new BABYLON.ArcRotateCamera('Camera', -Math.PI / 2, Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
        camera.attachControl(canvas, true);
        const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
  
        camera.setTarget(meshes[0].getAbsolutePosition());
  
        engine.runRenderLoop(() => {
          if (scene) {
            scene.render();
          }
        });
      }
    );
  }
  </script>
  
  <style scoped>
  #renderCanvas {
    width: 100%;
    height: 100%;
  }
  </style>
  
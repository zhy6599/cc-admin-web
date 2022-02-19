<template>
  <div/>
</template>
<script>
import * as THREE from 'three';
import * as maptalks from 'maptalks';
import { OrbitControls } from 'three-orbitcontrols-ts';
import {MTLLoader, OBJLoader} from 'three-obj-mtl-loader';
import { createMap } from 'boot/map';

export default {
  data() {
    return {
      scene: null,
      renderer: null,
      camera: null,
      controls: null,

    };
  },
  mounted() {
    /**
     * 创建场景对象Scene
     */
    const scene = new THREE.Scene();
    const textureLoader = new THREE.TextureLoader();
    const textureBg = textureLoader.load('statics/image/0.jpg');
    scene.background = textureBg;
    /**
    * OBJ文件加载  只加载obj文件中的几何信息，不加载材质文件.mtl
    */
    const loader = new OBJLoader();
    loader.load('statics/js/3d_obj/002.obj', (obj) => {
      const mesh = obj.children[0];
      mesh.rotateZ(Math.PI);
      mesh.material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('statics/js/3d_obj/002.png'),
        side: THREE.DoubleSide,
        transparent: true,
        clipIntersection: true,
      });
      mesh.translateY(-20);
      mesh.translateZ(5);

      for (let j = -2; j < 3; j++) {
        for (let i = -2; i < 3; i++) {
          const obj2 = obj.clone();
          obj2.position.x = 30 * i;
          obj2.position.z = 30 * j;
          scene.add(obj2);
        }
      }
    });

    /**
     * 光源设置
     */
    // 点光源
    const point = new THREE.PointLight(0x888888);
    point.position.set(400, 200, 300); // 点光源位置
    scene.add(point); // 点光源添加到场景中

    // 环境光:环境光颜色RGB成分分别和物体材质颜色RGB成分分别相乘
    const ambient = new THREE.AmbientLight(0x666666);
    scene.add(ambient);// 环境光对象添加到scene场景中

    // 辅助三维坐标系AxisHelper
    const axisHelper = new THREE.AxisHelper(250);
    scene.add(axisHelper);

    /**
     * 相机设置
     */
    const width = window.innerWidth; // 窗口宽度
    const height = window.innerHeight; // 窗口高度
    const k = width / height; // 窗口宽高比
    const s = 100; // 三维场景显示范围控制系数，系数越大，显示的范围越大
    // 创建相机对象
    const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(100, 200, 100); // 设置相机位置
    camera.lookAt(scene.position); // 设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);// 设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色
    document.body.appendChild(renderer.domElement); // body元素中插入canvas对象
    function render() {
      renderer.render(scene, camera);// 执行渲染操作
      // mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
      requestAnimationFrame(render);// 请求再次执行渲染函数render
    }
    render();
    const controls = new OrbitControls(camera, renderer.domElement);// 创建控件对象
  },
  methods: {
    load3dObj() {
      /**
    * OBJ文件加载  只加载obj文件中的几何信息，不加载材质文件.mtl
    */
      const loader = new OBJLoader();
      loader.load('/statics/js/3d_obj/002.obj', (obj) => {
        const mesh = obj.children[0];
        mesh.rotateZ(Math.PI);
        mesh.material = new THREE.MeshBasicMaterial({
          map: new THREE.TextureLoader().load('/statics/js/3d_obj/002.png'),
          side: THREE.DoubleSide,
          transparent: true,
          clipIntersection: true,
        });
        mesh.translateY(-20);
        mesh.translateZ(5);

        for (let j = -2; j < 3; j++) {
          for (let i = -2; i < 3; i++) {
            const obj2 = obj.clone();
            obj2.position.x = 30 * i;
            obj2.position.z = 30 * j;
            this.scene.add(obj2);
          }
        }
      });
    },
    createGround() {
      /**
    * 创建一个草地地面
    */
      const geometry = new THREE.PlaneGeometry(1000, 1000); // 矩形平面
      // 加载草地纹理贴图
      const texture = new THREE.TextureLoader().load('/statics/image/grass.jpg');
      // 设置纹理的重复模式
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      // uv两个方向纹理重复数量
      texture.repeat.set(10, 10);
      // MeshLambertMaterial 漫反射    MeshLambertMaterial 镜面反射
      const material = new THREE.MeshLambertMaterial({
        color: 0x777700,
      // map:texture,
      });
      const mesh = new THREE.Mesh(geometry, material); // 网格模型对象Mesh
      this.scene.add(mesh); // 网格模型添加到场景中
      mesh.rotateX(-Math.PI / 2);
    },
    createLight() {
      /**
     * 光源设置
     */
      // 点光源
      const point = new THREE.PointLight(0x888888);
      point.position.set(400, 200, 300); // 点光源位置
      this.scene.add(point); // 点光源添加到场景中

      // 环境光:环境光颜色RGB成分分别和物体材质颜色RGB成分分别相乘
      const ambient = new THREE.AmbientLight(0x666666);
      this.scene.add(ambient);// 环境光对象添加到scene场景中

      // 辅助三维坐标系AxisHelper
      const axisHelper = new THREE.AxisHelper(250);
      this.scene.add(axisHelper);
    },
    createCamera() {
      /**
     * 相机设置
     */
      const width = window.innerWidth; // 窗口宽度
      const height = window.innerHeight; // 窗口高度
      const k = width / height; // 窗口宽高比
      const s = 100; // 三维场景显示范围控制系数，系数越大，显示的范围越大
      // 创建相机对象
      this.camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
      this.camera.position.set(200, 300, 200); // 设置相机位置
      this.camera.lookAt(this.scene.position); // 设置相机方向(指向的场景对象)

      /**
     * 创建渲染器对象
     */
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height);// 设置渲染区域尺寸
      this.renderer.setClearColor(0xb9d3ff, 1); // 设置背景颜色
      document.body.appendChild(this.renderer.domElement); // body元素中插入canvas对象
    },
    createControl() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },

  },
};
</script>

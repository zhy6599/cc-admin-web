<template>
  <div class="login-container">
    <div id="login-three-container"></div>
    <div class="login-plane" :style="{width:$q.screen.xs?'400px':'600px'}">
      <div class="login-plane-container">
        <img
          class="login-plane-human"
          :style="{right:$q.screen.xs?'-200px':'-120px'}"
          src="img/login/login_human.png"
          alt
        />
        <div class="login-plane-title">
          欢迎登陆CC-ADMIN
          <img
            class="login-plane-title-line"
            src="img/login/login_horizontal_line.png"
            alt
          />
        </div>
        <div class="login-plane-form">
          <q-form @submit="submit" class="q-pa-md">
            <div class="q-gutter-y-sm">
              <div class="row">
                <div class="col">
                  <q-input
                    outlined
                    clearable
                    clear-icon="cancel"
                    v-model.trim="form.username"
                    dense
                    debounce="500"
                    bg-color="blue-2"
                    color="blue"
                    lazy-rules
                    square
                    :rules="[
                      (val) => (val && val.length > 0) || '请输入用户名'
                    ]"
                  >
                    <template #prepend>
                      <q-icon name="face" />
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <q-input
                    outlined
                    clearable
                    clear-icon="cancel"
                    :type="isPwd ? 'password' : 'text'"
                    v-model.trim="form.password"
                    dense
                    debounce="500"
                    bg-color="blue-2"
                    color="blue"
                    lazy-rules
                    square
                    :rules="[(val) => (val && val.length > 0) || '请输入密码']"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="q-mx-md">
                <div class="row">
                  <div class="col text-left text-white">
                    <q-checkbox v-model="autoLogin" label="自动登录" />
                  </div>
                  <div class="col text-right">
                    <q-btn color="white" flat label="忘记密码" />
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <q-btn
                      dense
                      unelevated
                      label="登 录"
                      size="17px"
                      color="primary q-mt-sm"
                      class="full-width no-border-radius"
                      type="submit"
                      :loading="loading"
                    >
                      <template v-slot:loading>
                        <q-spinner-ios class="on-left" />登录...
                      </template>
                    </q-btn>
                  </div>
                </div>
              </div>
            </div>
          </q-form>
        </div>
      </div>
    </div>
    <div class="login-ground">
      <div class="fixed-bottom text-blue">
        <div class="text-center q-mb-sm">
          <q-btn
            type="a"
            target="_blank"
            unelevated
            size="12px"
            dense
            label="访问源码"
            href="https://gitee.com/zhy6599/cc-admin-web"
          ></q-btn>
        </div>
        <div class="text-center">Copyright@2020 zhy6599作品！</div>
        <div class="text-center">
          <a class="text-body2" href="https://beian.miit.gov.cn" target="_blank">京ICP备17070540号-2</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'Login',
  data() {
    return {
      title: process.env.PRODUCT_NAME,
      form: {
        username: 'guest',
        password: '123456',
      },
      isPwd: true,
      autoLogin: true,
      loading: false,

      scene: null,
      renderer: null,
      camera: null,
      controls: null,

      width: window.innerWidth,
      height: window.innerHeight,
      // 盒模型的深度
      depth: 1400,
      zAxisNumber: 0,
      // 声明点材质
      materials: [],
      // 声明点的参数
      parameters: null,
      // 声明点在z轴上移动的进度
      zprogress: null,
      // 声明同上（第二个几何点）
      zprogress_second: null,
      // 声明粒子1
      particles_first: null,
      // 声明粒子1
      particles_second: null,
      // 声明粒子1的初始化位置
      particles_init_position: null,
      // 声明流动的云对象1（包含路径、云实例）
      cloudParameter_first: null,
      // 声明流动的云对象2（包含路径、云实例）
      cloudParameter_second: null,
      // 声明云流动的渲染函数1
      renderCloudMove_first: null,
      // 声明云流动的渲染函数1
      renderCloudMove_second: null,
      container: null,
      Sphere_Group: null,
    };
  },
  methods: {
    imTr(menu) {
      const result = [];
      menu.forEach((v) => {
        result.push({
          ...v,
          component: () => import(`pages/${v.component}`),
          children: v.children ? this.imTr(v.children) : null,
        });
      });
      return result;
    },
    initMenu(menuInfo) {
      let { menu } = menuInfo;
      const { auth } = menuInfo;
      if (menu.length === 0) {
        this.$error('您没有任何可供访问的菜单，请联系管理员');
      }
      this.$store.commit('Rule/updateRoutes', menu);
      this.$store.commit('Rule/updateAuth', auth);
      menu = this.imTr(menu);
      this.$router.addRoute({
        path: '/',
        component: () => import('layouts'),
        redirect: '/home',
        children: menu,
      });
    },
    submit() {
      this.loading = true;
      this.$axios.post('/sys/login', this.form)
        .then((r) => {
          this.$store.commit('User/updateAuthorization', r.result.token);
          this.$store.commit('User/updateInfo', r.result.userInfo);
          this.initMenu(r.result.permissionInfo);
          this.$router.push('/home');
        });
    },
    createLight() {
      /**
     * 光源设置
     */
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      // 右下角点光源
      const lightRightBottom = new THREE.PointLight(0x0655fd, 5, 0);
      lightRightBottom.position.set(0, 100, -200);

      this.scene.add(lightRightBottom);
      this.scene.add(ambientLight);
    },
    createCamera() {
      /**
         * 方式1：固定视野的距离，求满足完整的视野画面需要多大的视域角度
         * tan正切值（直角边除以临边）
         * const mathTan_value = width / 2 / depth
         * 视域角度
         * const fov_angle = (Math.atan(mathTan_value) * 180) / Math.PI
         * 创建透视相机
         * new THREE.PerspectiveCamera(fov_angle, width / height, 1, depth)
         * 场景是一个矩形容器（坐标(0, 0, 0)是矩形容器的中心），相机能看到的距离是depth，
         * camera.position.set(0, 0, depth / 2)
         */

      /**
       * 使用透视相机
       * 参数值分别是：
       * fov（field of view） — 摄像机视锥体垂直视野角度
       * aspect — 摄像机视锥体长宽比
       * near — 摄像机视锥体近端面
       * far — 摄像机视锥体远端面
       * 这里需要注意：透视相机是鱼眼效果，如果视域越大，边缘变形越大。
       * 为了避免边缘变形，可以将fov角度设置小一些，距离拉远一些
       */

      /**
       * 方式2:固定视域角度，求需要多少距离才能满足完整的视野画面
       * 15度等于(Math.PI / 12)
       */
      const fov = 15;
      this.camera = new THREE.PerspectiveCamera(fov, this.width / this.height, 1, 30000);
      /**
       * 这里给z轴的距离加了100，原因是做调整，使得视域更完整
       * 这么做并不代表前面计算错误了，根据前面的计算值并不能很完整的看到
       * 至于原因，我想大概就类似于0.1+0.2不等于0.3吧
       * 所以我自作主张地加了100的值做调整（但是不建议，因为当屏幕足够宽时候会看到边缘）
       */
      // this.camera.position.set(0, 0, this.zAxisNumber + 100)
      // 声明相机目标点
      const cameraTarget = new THREE.Vector3(0, 0, 0);
      this.camera.position.set(0, 0, this.zAxisNumber);
      this.camera.lookAt(cameraTarget);
    },
    createControl() {
    },
    createEarth() {
      // 材质
      const material = new THREE.MeshPhongMaterial();
      material.map = new THREE.TextureLoader().load('img/login/earth_bg.png');
      material.blendDstAlpha = 1;
      // 几何体
      const sphereGeometry = new THREE.SphereGeometry(50, 64, 32);
      // 模型
      const sphere = new THREE.Mesh(sphereGeometry, material);
      this.Sphere_Group = new THREE.Group();
      this.Sphere_Group.add(sphere);
      this.Sphere_Group.position.x = -400;
      this.Sphere_Group.position.y = 200;
      this.Sphere_Group.position.z = -200;
      this.scene.add(this.Sphere_Group);
    },

    // 渲染星球的自转
    renderSphereRotate() {
      this.Sphere_Group.rotateY(0.003);
    },

    // 初始化流动路径
    initTubeRoute(route, geometryWidth, geometryHeigh) {
      const curve = new THREE.CatmullRomCurve3(route, false);
      const tubeGeometry = new THREE.TubeGeometry(curve, 100, 2, 50, false);
      const tubeMaterial = new THREE.MeshBasicMaterial({
        // color: '0x4488ff',
        opacity: 0,
        transparent: true,
      });
      const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
      this.scene.add(tube);

      const clondGeometry = new THREE.PlaneGeometry(geometryWidth, geometryHeigh);
      const textureLoader = new THREE.TextureLoader();
      const cloudTexture = textureLoader.load('img/login/cloud.png');
      const clondMaterial = new THREE.MeshBasicMaterial({
        map: cloudTexture,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        transparent: true,
      });
      const cloud = new THREE.Mesh(clondGeometry, clondMaterial);
      this.scene.add(cloud);
      return {
        cloud,
        curve,
      };
    },
    // 初始化场景星星效果
    initSceneStar(initZposition) {
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      const pointsGeometry = [];
      const textureLoader = new THREE.TextureLoader();
      const sprite1 = textureLoader.load('img/login/starflake1.png');
      const sprite2 = textureLoader.load('img/login/starflake2.png');
      this.parameters = [
        [[0.6, 100, 0.75], sprite1, 50],
        [[0, 0, 1], sprite2, 20],
      ];
      // 初始化500个节点
      for (let i = 0; i < 500; i += 1) {
        /**
         * const x: number = Math.random() * 2 * width - width
         * 等价
         * THREE.MathUtils.randFloatSpread(width)
         */
        const x = Math.random() * 2 * this.width - this.width;
        const y = Math.round((Math.random() * this.height) / 2);
        const z = Math.round(Math.random() * (this.zAxisNumber + this.depth / 2)) - this.depth / 2;
        vertices.push(x, y, z);
      }

      geometry.attributes.position = new THREE.Float32BufferAttribute(vertices, 3);

      // 创建2种不同的材质的节点（500 * 2）
      for (let i = 0; i < this.parameters.length; i += 1) {
        const color = this.parameters[i][0];
        const sprite = this.parameters[i][1];
        const size = this.parameters[i][2];

        this.materials[i] = new THREE.PointsMaterial({
          size,
          map: sprite,
          blending: THREE.AdditiveBlending,
          depthTest: true,
          transparent: true,
        });
        this.materials[i].color.setHSL(color[0], color[1], color[2]);
        const particles = new THREE.Points(geometry, this.materials[i]);
        particles.rotation.x = Math.random() * 0.2 - 0.15;
        particles.rotation.z = Math.random() * 0.2 - 0.15;
        particles.rotation.y = Math.random() * 0.2 - 0.15;
        particles.position.setZ(initZposition);
        pointsGeometry.push(particles);
        this.scene.add(particles);
      }
      return pointsGeometry;
    },
    // 渲染星星的运动
    renderStarMove() {
      const time = Date.now() * 0.00005;
      this.zprogress += 1;
      this.zprogress_second += 1;
      if (this.zprogress >= this.zAxisNumber + this.depth / 2) {
        this.zprogress = this.particles_init_position;
      } else {
        this.particles_first.forEach((item) => {
          item.position.setZ(this.zprogress);
        });
      }
      if (this.zprogress_second >= this.zAxisNumber + this.depth / 2) {
        this.zprogress_second = this.particles_init_position;
      } else {
        this.particles_second.forEach((item) => {
          item.position.setZ(this.zprogress_second);
        });
      }
      for (let i = 0; i < this.materials.length; i += 1) {
        const color = this.parameters[i][0];

        const h = ((360 * (color[0] + time)) % 360) / 360;
        this.materials[i].color.setHSL(color[0], color[1], parseFloat(h.toFixed(2)));
      }
    },
    // 初始化云的运动函数
    initCloudMove(
      cloudParameter,
      speed,
      scaleSpeed = 0.0006,
      maxScale = 1,
      startScale = 0,
    ) {
      let cloudProgress = 0;
      return () => {
        if (startScale < maxScale) {
          startScale += scaleSpeed;
          cloudParameter.cloud.scale.setScalar(startScale);
        }
        if (cloudProgress > 1) {
          cloudProgress = 0;
          startScale = 0;
        } else {
          cloudProgress += speed;
          if (cloudParameter.curve) {
            const point = cloudParameter.curve.getPoint(cloudProgress);
            if (point && point.x) {
              cloudParameter.cloud.position.set(point.x, point.y, point.z);
            }
          }
        }
      };
    },
    initRenderer() {
      // 开启抗锯齿
      // 在 css 中设置背景色透明显示渐变色
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      // 定义渲染器的尺寸；在这里它会填满整个屏幕
      this.renderer.setSize(this.width, this.height);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.container.appendChild(this.renderer.domElement);
      this.renderCloudMove_first = this.initCloudMove(this.cloudParameter_first, 0.0002);
      this.renderCloudMove_second = this.initCloudMove(this.cloudParameter_second, 0.0008, 0.001);
    },
    render() {
      this.renderer.render(this.scene, this.camera);// 执行渲染操作
      // mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
      this.renderSphereRotate();
      this.renderSphereRotate();
      this.renderStarMove();
      this.renderCloudMove_first();
      this.renderCloudMove_second();
      requestAnimationFrame(this.render);// 请求再次执行渲染函数render
    },

  },
  mounted() {
    if (this.$store.state.User.authorization) {
      this.$router.replace('#/home');
    } else {
      this.$store.commit('User/clear');
    }

    /**
     * 创建场景对象Scene
     */

    this.width = window.innerWidth; // 窗口宽度
    this.height = window.innerHeight; // 窗口高度
    // 盒模型的深度
    this.depth = 1400;
    this.container = document.getElementById('login-three-container');
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x000000, 0, 10000);
    const textureLoader = new THREE.TextureLoader();
    const textureBg = textureLoader.load('statics/image/sky.png');
    this.scene.background = textureBg;

    const distance = this.width / 2 / Math.tan(Math.PI / 12);
    this.zAxisNumber = Math.floor(distance - this.depth / 2);

    this.particles_init_position = -this.depth / 2;
    this.zprogress = this.particles_init_position;
    this.zprogress_second = this.particles_init_position;

    this.particles_first = this.initSceneStar(this.particles_init_position + 200);
    this.particles_second = this.initSceneStar(this.zprogress_second);
    this.cloudParameter_first = this.initTubeRoute(
      [
        new THREE.Vector3(-this.width / 10, 0, -this.depth / 2),
        new THREE.Vector3(-this.width / 4, this.height / 8, 0),
        new THREE.Vector3(-this.width / 4, 0, this.zAxisNumber),
      ],
      400,
      200,
    );
    this.cloudParameter_second = this.initTubeRoute(
      [
        new THREE.Vector3(this.width / 8, this.height / 8, -this.depth / 2),
        new THREE.Vector3(this.width / 8, this.height / 8, this.zAxisNumber),
      ],
      200,
      100,
    );

    this.createEarth();
    this.createLight();
    this.createCamera();
    this.initRenderer();
    this.render();
  },
  computed: {
    loginIcon() {
      return this.iconObject;
    },
  },
};
</script>

<style lang="stylus">
.login-container
  width 100%
  height 100vh
  background-image url('~assets/login/sky.png')
  background-repeat no-repeat
  background-size 100% 100%
  position relative
  #login-three-container
    width 100%
    height 100%
  .login-plane
    position absolute
    z-index 9999
    height 500px
    background-image url('~assets/login/login_border.png')
    background-repeat no-repeat
    background-size 100% 100%
    top 50%
    left 50%
    transform translate(-50%, -50%)
    .login-plane-container
      width 100%
      height 100%
      border-radius 18px
      background-color #007eff2e
      position relative
      @keyframes humanMove
        0%
          top -100px
        25%
          top -120px
        50%
          top -100px
        75%
          top -80px
        100%
          background -100px
      .login-plane-human
        position absolute
        width 260px
        top -100px
        animation humanMove 8s linear 0s infinite normal
      .login-plane-title
        width 100%
        height 100px
        display flex
        align-items center
        justify-content center
        position relative
        font-size 35px
        color #fff
        font-weight 700
        img
          width 50%
        .login-plane-title-line
          width 80%
          position absolute
          bottom 0
      .login-plane-form
        padding 45px 55px
        box-sizing border-box
        .login-code-container
          display flex
          align-items flex-start
          justify-content space-between
          .login-code
            cursor pointer
            width 45%
            height 40px
            background-color #c8c8c8
            img
              width 100%
              height 100%
  .login-ground
    position absolute
    z-index 9998
    width 100%
    height 400px
    background-image url('~assets/login/ground.png')
    background-repeat no-repeat
    background-size 100% 100%
    bottom 0
    left 0
</style>

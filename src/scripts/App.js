import WebGLView from "./webgl/WebGLView";
import GUIView from "./gui/GUIView";
import "zuck.js";

export default class App {
  constructor() {}

  init() {
    this.initWebGL();
    this.initGUI();
    this.addListeners();
    this.animate();
    this.resize();
    this.initZuck();
  }

  initZuck() {
    var stories = new Zuck("stories", {
      backNative: true,
      previousTap: true,
      skin: "snapgram",
      autoFullScreen: false,
      avatars: true,
      list: false,
      cubeEffect: false,
      localStorage: true,
      stories: [
        Zuck.buildTimelineItem(
          "indigo",
          "/images/works/indigo/1.jpg",
          "Indigo",
          "https://indigo.ai",
          "2019",
          [
            [
              "ramon-1",
              "photo",
              3,
              "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/1.jpg",
              "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/1.jpg",
              "",
              false,
              false
            ],
            [
              "ramon-2",
              "video",
              0,
              "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.mp4",
              "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/2.jpg",
              "",
              false,
              false
            ],
            [
              "ramon-3",
              "photo",
              3,
              "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/3.png",
              "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/3.png",
              "https://ramon.codes",
              "Visit my Portfolio",
              false
            ]
          ]
        ),
        Zuck.buildTimelineItem(
          "lanificio marilina",
          "/images/works/marilina/1.jpg",
          "Lanificio Marilina",
          "",
          "2018",
          [
            [
              "gorillaz-1",
              "video",
              0,
              "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/4.mp4",
              "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/4.jpg",
              "",
              false,
              false
            ],
            [
              "gorillaz-2",
              "photo",
              3,
              "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/5.jpg",
              "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/5.jpg",
              "",
              false,
              false
            ]
          ]
        ),
        Zuck.buildTimelineItem(
          "vari",
          "/images/works/vari/1.jpg",
          "Vari",
          "",
          "2016",
          [
            [
              "ladygaga-1",
              "photo",
              5,
              "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/6.jpg",
              "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/6.jpg",
              "",
              false,
              false
            ],
            [
              "ladygaga-2",
              "photo",
              3,
              "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/7.jpg",
              "https://raw.githubusercontent.com/ramon82/assets/master/zuck.js/stories/7.jpg",
              "http://ladygaga.com",
              false,
              false
            ]
          ]
        )
      ]
    });
  }

  initWebGL() {
    this.webgl = new WebGLView(this);
    document
      .querySelector(".js-particles")
      .appendChild(this.webgl.renderer.domElement);
  }

  initGUI() {
    this.gui = new GUIView(this);
  }

  addListeners() {
    this.handlerAnimate = this.animate.bind(this);

    window.addEventListener("resize", this.resize.bind(this));
    window.addEventListener("keyup", this.keyup.bind(this));

    const el = this.webgl.renderer.domElement;
    el.addEventListener("click", this.click.bind(this));
  }

  animate() {
    this.update();
    this.draw();

    this.raf = requestAnimationFrame(this.handlerAnimate);
  }

  // ---------------------------------------------------------------------------------------------
  // PUBLIC
  // ---------------------------------------------------------------------------------------------

  update() {
    if (this.gui.stats) this.gui.stats.begin();
    if (this.webgl) this.webgl.update();
    if (this.gui) this.gui.update();
  }

  draw() {
    if (this.webgl) this.webgl.draw();
    if (this.gui.stats) this.gui.stats.end();
  }

  // ---------------------------------------------------------------------------------------------
  // EVENT HANDLERS
  // ---------------------------------------------------------------------------------------------

  resize() {
    if (this.webgl) this.webgl.resize();
  }

  keyup(e) {
    // g
    if (e.keyCode == 71) {
      if (this.gui) this.gui.toggle();
    }
  }

  click(e) {
    this.webgl.next();
  }
}

import * as THREE from "../node_modules/three/build/three.module.js";

const TAU = Math.PI * 2;
const EPS = 1e-6;

const modules = [
  {
    title: "What is differential geometry?",
    topic: "Maps, charts, and why flat drawings distort curved worlds",
    chapter: "Textbook start",
    surface: "sphere",
    preset: { amp: 0.4, stretchU: 1, stretchV: 1, twist: 0, u: 0.58, v: 0.38, angle: 0.8, showContours: true, showCurvature: true },
    intro: "Begin with the cartographer's problem: a curved surface can be locally described by coordinates, but distance, angle, and area may change under the map.",
    formal: "A chart assigns coordinates to a patch. Differential geometry asks what survives when coordinates change.",
    watch: "The sphere rotates with latitude contours and a coordinate net. The color shows intrinsic curvature, not just how the object sits in space.",
    experiment: "Stretch one horizontal direction. The surface still looks sphere-like, but the metric readout changes because the coordinate rulers changed."
  },
  {
    title: "Manifolds and coordinates",
    topic: "Local patches, atlases, smooth maps",
    chapter: "Foundations",
    surface: "bump",
    preset: { amp: 0.65, stretchU: 1, stretchV: 1, twist: 0.1, u: 0.5, v: 0.5, angle: 0.15, showContours: true, showCurvature: false },
    intro: "A manifold is a space that looks like ordinary Euclidean space when you zoom into a small enough patch.",
    formal: "Charts overlap smoothly; the transition maps are the glue that makes calculus possible without one global coordinate grid.",
    watch: "The parameter net is the coordinate grid drawn on a curved graph. Nearby points have coordinates even though the surface bends in 3D.",
    experiment: "Move the u and v probe sliders. The highlighted tangent data follows the chart point instead of a fixed location in the room."
  },
  {
    title: "Tangent spaces",
    topic: "Velocity vectors, derivatives, tangent planes",
    chapter: "Foundations",
    surface: "paraboloid",
    preset: { amp: 1.05, stretchU: 1, stretchV: 1, twist: 0, u: 0.56, v: 0.44, angle: 0.7, showTangent: true, showVectors: true },
    intro: "A tangent vector is the instantaneous velocity of a curve passing through a point on the manifold.",
    formal: "The tangent space is the linear plane of all possible first-order directions at the point.",
    watch: "Blue and green arrows are coordinate tangent vectors. The translucent square is the tangent plane they span.",
    experiment: "Increase the height slider. The same coordinate movement becomes a steeper physical movement, and the metric coefficients change."
  },
  {
    title: "Vector fields and flows",
    topic: "A vector attached to every point",
    chapter: "Foundations",
    surface: "torus",
    preset: { amp: 0.4, stretchU: 1, stretchV: 1, twist: 0.25, u: 0.18, v: 0.34, angle: 1.35, showVectors: true, showGeodesic: false },
    intro: "A vector field chooses a tangent direction at each point. Following those directions creates flow lines.",
    formal: "Locally, a vector field is a smooth assignment p -> X(p) in the tangent space at p.",
    watch: "Amber arrows form a tangent vector field. They never leave the surface because each one is made from the local coordinate tangents.",
    experiment: "Switch to the cylinder and turn twist up. You will see a field can be simple in coordinates while the embedded picture winds around."
  },
  {
    title: "Hypersurfaces in Euclidean space",
    topic: "Normals, shape operator, second fundamental form",
    chapter: "Classical surfaces",
    surface: "bump",
    preset: { amp: 1.15, stretchU: 1, stretchV: 0.8, twist: 0, u: 0.45, v: 0.5, angle: 0.9, showVectors: true, showTangent: true },
    intro: "For a surface in 3D, the normal vector records which way the surface faces, and its change measures bending.",
    formal: "The second fundamental form is the normal component of the second derivative. It is the first real curvature detector.",
    watch: "The coral arrow is the unit normal. Gold and violet arrows mark principal bending directions at the probe point.",
    experiment: "Move the probe from the top of the bump to the side. The principal curvatures separate as the normal starts turning faster in one direction."
  },
  {
    title: "Metrics and first fundamental form",
    topic: "Length, angle, area from E, F, G",
    chapter: "Riemannian start",
    surface: "saddle",
    preset: { amp: 0.75, stretchU: 1.15, stretchV: 0.9, twist: 0, u: 0.58, v: 0.48, angle: 0.4, showCurvature: false },
    intro: "A metric tells the manifold how to measure lengths and angles without needing a ruler in the surrounding space.",
    formal: "For a parametrized surface r(u,v), E=<ru,ru>, F=<ru,rv>, G=<rv,rv>. These three numbers are the local measuring device.",
    watch: "The readout reports E, F, G and the area scale sqrt(EG-F^2) at the probe point.",
    experiment: "Squish one direction. Curves that looked visually similar acquire different lengths because the metric is changing."
  },
  {
    title: "Curvature",
    topic: "Gaussian, mean, principal, positive and negative bending",
    chapter: "Curvature",
    surface: "saddle",
    preset: { amp: 1.2, stretchU: 1, stretchV: 1, twist: 0.15, u: 0.5, v: 0.5, angle: 0.95, showCurvature: true },
    intro: "Curvature is how the surface departs from its tangent plane to second order. Gaussian curvature multiplies the two principal curvatures.",
    formal: "Positive curvature bends the same way in every direction; negative curvature bends up in one direction and down in another.",
    watch: "Red means positive Gaussian curvature, blue means negative, and pale zones are close to flat.",
    experiment: "Change the height through zero. The saddle flattens, the heat fades, and K approaches zero."
  },
  {
    title: "Connections and parallel transport",
    topic: "Comparing tangent vectors at different points",
    chapter: "Levi-Civita connection",
    surface: "sphere",
    preset: { amp: 0.1, stretchU: 1, stretchV: 1, twist: 0, u: 0.64, v: 0.42, angle: 1.15, showGeodesic: true, showVectors: true },
    intro: "Tangent spaces at different points are different planes. A connection tells you how to carry a vector along a path.",
    formal: "The Levi-Civita connection is the unique connection that preserves the metric and has no torsion.",
    watch: "Small arrows along the curve show a transported frame. On a sphere, returning around loops can rotate a vector.",
    experiment: "Move the geodesic angle. Notice how the carried arrows stay tangent while the normal keeps turning."
  },
  {
    title: "Geodesics and the exponential map",
    topic: "Shortest paths and locally straight motion",
    chapter: "Geodesics",
    surface: "sphere",
    preset: { amp: 0.25, stretchU: 1, stretchV: 1, twist: 0, u: 0.55, v: 0.48, angle: 0.35, showGeodesic: true, showContours: true },
    intro: "A geodesic is a curve that goes as straight as the geometry allows. Locally it minimizes length.",
    formal: "The exponential map takes an initial tangent vector and follows the geodesic starting with that velocity.",
    watch: "The gold curve is a numerically integrated geodesic. The faint fan shows nearby exponential-map directions.",
    experiment: "Try the cylinder: geodesics become helices because a straight line on the unwrapped rectangle wraps around the tube."
  },
  {
    title: "Isometries and Theorema Egregium",
    topic: "Same intrinsic metric, different embedding",
    chapter: "Isometries",
    surface: "cylinder",
    preset: { amp: 0, stretchU: 1, stretchV: 1, twist: 0, u: 0.28, v: 0.52, angle: 0.82, showCurvature: true, showContours: true },
    intro: "An isometry preserves the metric: lengths, angles, and geodesics remain the same even if the picture changes in space.",
    formal: "Gauss's Theorema Egregium says Gaussian curvature is intrinsic. A cylinder has K=0 like a plane, while a sphere cannot flatten without distortion.",
    watch: "The cylinder curves extrinsically, but the heat map stays near flat because one principal curvature is zero.",
    experiment: "Increase stretch around the cylinder and compare the metric numbers. You are changing the intrinsic ruler, not just the visual pose."
  },
  {
    title: "Forms, integration, and Gauss-Bonnet",
    topic: "Curvature accumulates into topology",
    chapter: "Global geometry",
    surface: "torus",
    preset: { amp: 0.5, stretchU: 1, stretchV: 1, twist: 0, u: 0.16, v: 0.5, angle: 1.65, showCurvature: true, showContours: true },
    intro: "Differential forms let you integrate geometry over curves, surfaces, and regions in a coordinate-free way.",
    formal: "Gauss-Bonnet links total Gaussian curvature to topology: local bending adds up to a global invariant.",
    watch: "The torus has positive curvature outside and negative curvature inside, balancing in a way a sphere does not.",
    experiment: "Rotate the torus and look at the color distribution. Local signs change over the surface, but the global story is stable."
  },
  {
    title: "Constant curvature and global comparison",
    topic: "Flat, spherical, and hyperbolic geometries",
    chapter: "Geometry and topology",
    surface: "pseudosphere",
    preset: { amp: 0.8, stretchU: 1, stretchV: 1, twist: 0, u: 0.52, v: 0.42, angle: 1.1, showCurvature: true, showGeodesic: true },
    intro: "The big comparison theorems ask how curvature controls global behavior: completeness, conjugate points, and how geodesics spread.",
    formal: "Positive curvature tends to focus geodesics; negative curvature tends to separate them.",
    watch: "The pseudosphere patch is a model of negative curvature behavior. Nearby geodesic rays diverge visibly.",
    experiment: "Switch between sphere, plane, and pseudosphere. The same geodesic fan focuses, stays neutral, or spreads apart."
  }
];

const surfaceDefs = {
  plane: {
    label: "Plane",
    closedU: false,
    closedV: false,
    sample(s, t, state) {
      const x = (s * 4 - 2) * state.stretchU;
      const z = (t * 4 - 2) * state.stretchV;
      return twistY(new THREE.Vector3(x, 0, z), state.twist * 0.18 * z);
    }
  },
  cylinder: {
    label: "Cylinder",
    closedU: true,
    closedV: false,
    sample(s, t, state) {
      const theta = s * TAU;
      const radius = 1.22 * state.stretchU;
      const y = (t * 4 - 2) * state.stretchV;
      return twistY(new THREE.Vector3(radius * Math.cos(theta), y, radius * Math.sin(theta)), state.twist * y);
    }
  },
  sphere: {
    label: "Sphere / ellipsoid",
    closedU: true,
    closedV: false,
    sample(s, t, state) {
      const theta = s * TAU;
      const phi = 0.08 + t * (Math.PI - 0.16);
      const r = 1.45;
      const vertical = 1 + state.amp * 0.08;
      const p = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta) * state.stretchU,
        r * Math.cos(phi) * vertical,
        r * Math.sin(phi) * Math.sin(theta) * state.stretchV
      );
      return twistY(p, state.twist * p.y * 0.35);
    }
  },
  saddle: {
    label: "Saddle graph",
    closedU: false,
    closedV: false,
    sample(s, t, state) {
      const x = (s * 4 - 2) * state.stretchU;
      const z = (t * 4 - 2) * state.stretchV;
      const y = state.amp * (x * x - z * z) / 3 + state.twist * 0.35 * x * z;
      return new THREE.Vector3(x, y, z);
    }
  },
  bump: {
    label: "Gaussian bump",
    closedU: false,
    closedV: false,
    sample(s, t, state) {
      const x = (s * 4 - 2) * state.stretchU;
      const z = (t * 4 - 2) * state.stretchV;
      const r2 = x * x + z * z;
      const y = state.amp * 1.5 * Math.exp(-0.72 * r2) + state.twist * 0.16 * x * z;
      return new THREE.Vector3(x, y, z);
    }
  },
  paraboloid: {
    label: "Paraboloid",
    closedU: false,
    closedV: false,
    sample(s, t, state) {
      const x = (s * 3.4 - 1.7) * state.stretchU;
      const z = (t * 3.4 - 1.7) * state.stretchV;
      const y = state.amp * (x * x + z * z) / 2.8 + state.twist * 0.18 * x * z;
      return new THREE.Vector3(x, y - 0.55, z);
    }
  },
  torus: {
    label: "Torus",
    closedU: true,
    closedV: true,
    sample(s, t, state) {
      const theta = s * TAU;
      const phi = t * TAU;
      const R = 1.35 * state.stretchU;
      const r = 0.5 * state.stretchV;
      const tubeY = 1 + state.amp * 0.05;
      const p = new THREE.Vector3(
        (R + r * Math.cos(phi)) * Math.cos(theta),
        r * Math.sin(phi) * tubeY,
        (R + r * Math.cos(phi)) * Math.sin(theta)
      );
      return twistY(p, state.twist * Math.sin(phi) * 0.7);
    }
  },

  klein: {
    label: "Klein bottle",
    closedU: true,
    closedV: true,
    sample(s, t, state) {
      /*
        Refined Klein bottle immersion.

        This version is tuned for visual intuition:
        - fuller lower bulb
        - thicker entering hose
        - smoother S-like handle
        - semi-transparent rendering is enabled separately in buildSurfaceMesh()

        Mathematical note:
        A true Klein bottle cannot be embedded in ordinary R^3 without
        self-intersection. This is an immersed visualization.
      */
      const u = s * TAU;
      const v = t * TAU;

      const cu = Math.cos(u);
      const su = Math.sin(u);
      const cv = Math.cos(v);
      const sv = Math.sin(v);

      /*
        a controls the tube radius.
        hoseBoost thickens the handle/neck part so it does not look like
        a thin thread entering a bulky body.
      */
      const a = 1 - 0.5 * cu;
      const hoseBoost = 1.35 + 0.35 * Math.max(0, -cu);

      let xRaw;
      let yRaw;

      if (u < Math.PI) {
        xRaw =
          4.8 * cu * (1 + 0.55 * su) +
          3.2 * hoseBoost * a * cu * cv;

        yRaw =
          10.0 * su +
          3.2 * hoseBoost * a * su * cv;
      } else {
        xRaw =
          4.8 * cu * (1 + 0.55 * su) +
          3.2 * hoseBoost * a * Math.cos(v + Math.PI);

        yRaw = 10.0 * su;
      }

      const zRaw = 4.25 * hoseBoost * a * sv;

      /*
        Display transform.
        The goal is not to change topology, only to make the visual object
        similar in scale to the original sphere/torus surfaces.
      */
      const p = new THREE.Vector3(
        0.185 * xRaw * state.stretchU,
        0.160 * yRaw - 0.04,
        0.215 * zRaw * state.stretchV
      );

      return twistY(p, state.twist * 0.08 * p.y);
    }
  }

,

  mobius: {
    label: "Mobius strip",
    closedU: true,
    closedV: false,
    sample(s, t, state) {
      /*
        Wider and more visually appealing Möbius strip.
        It remains non-orientable and has one boundary component.
      */
      const u = s * TAU;
      const w = (t * 2 - 1) * 0.66 * state.stretchV;
      const R = 1.12 * state.stretchU;

      const p = new THREE.Vector3(
        (R + w * Math.cos(u / 2)) * Math.cos(u),
        0.95 * w * Math.sin(u / 2) * (1 + 0.04 * state.amp),
        (R + w * Math.cos(u / 2)) * Math.sin(u)
      );

      return twistY(p, state.twist * 0.10 * Math.sin(u));
    }
  }

,

  helicoid: {
    label: "Helicoid",
    closedU: false,
    closedV: false,
    sample(s, t, state) {
      /*
        Helicoid with more visible separation between folds.

        u controls the number of turns.
        pitch controls the vertical gap between successive sheets.
      */
      const u = (s * 2 - 1) * Math.PI * 3.5;
      const v = (t * 2 - 1) * 0.34 * state.stretchU;
      const pitch = (0.125 + 0.020 * state.amp) * state.stretchV;

      const p = new THREE.Vector3(
        v * Math.cos(u),
        pitch * u,
        v * Math.sin(u)
      );

      return twistY(p, state.twist * 0.015 * u);
    }
  }

,

  pseudosphere: {
    label: "Pseudosphere patch",
    closedU: true,
    closedV: false,
    sample(s, t, state) {
      const theta = s * TAU;
      const v = 0.16 + t * 1.55;
      const a = 1.55;
      const sech = 1 / Math.cosh(v);
      const radius = a * sech * state.stretchU;
      const y = (a * (v - Math.tanh(v)) - 0.95) * state.stretchV;
      const p = new THREE.Vector3(radius * Math.cos(theta), y, radius * Math.sin(theta));
      return twistY(p, state.twist * y);
    }
  }
};

const state = {
  moduleIndex: 0,
  surface: "sphere",
  amp: 0.4,
  stretchU: 1,
  stretchV: 1,
  twist: 0,
  u: 0.58,
  v: 0.38,
  angle: 0.8,
  contourCount: 8,
  showGrid: true,
  showContours: true,
  showVectors: true,
  showTangent: true,
  showGeodesic: true,
  showCurvature: true,
  autoRotate: true
};

const moduleDefaults = {
  amp: 0.7,
  stretchU: 1,
  stretchV: 1,
  twist: 0,
  u: 0.52,
  v: 0.48,
  angle: 0.7,
  contourCount: 8,
  showGrid: true,
  showContours: true,
  showVectors: true,
  showTangent: true,
  showGeodesic: true,
  showCurvature: true
};

const els = {
  canvas: document.querySelector("#sceneCanvas"),
  moduleList: document.querySelector("#moduleList"),
  sceneTitle: document.querySelector("#sceneTitle"),
  chapterTag: document.querySelector("#chapterTag"),
  lessonTitle: document.querySelector("#lessonTitle"),
  lessonIntro: document.querySelector("#lessonIntro"),
  formalSeed: document.querySelector("#formalSeed"),
  watchFor: document.querySelector("#watchFor"),
  miniExperiment: document.querySelector("#miniExperiment"),
  progressText: document.querySelector("#progressText"),
  progressPercent: document.querySelector("#progressPercent"),
  progressFill: document.querySelector("#progressFill"),
  metricReadout: document.querySelector("#metricReadout"),
  sceneLegend: document.querySelector("#sceneLegend"),
  surfaceSelect: document.querySelector("#surfaceSelect"),
  autoRotateBtn: document.querySelector("#autoRotateBtn"),
  resetCameraBtn: document.querySelector("#resetCameraBtn"),
  prevModule: document.querySelector("#prevModule"),
  nextModule: document.querySelector("#nextModule"),
  showGrid: document.querySelector("#showGrid"),
  showContours: document.querySelector("#showContours"),
  showVectors: document.querySelector("#showVectors"),
  showTangent: document.querySelector("#showTangent"),
  showGeodesic: document.querySelector("#showGeodesic"),
  showCurvature: document.querySelector("#showCurvature"),
  ampSlider: document.querySelector("#ampSlider"),
  stretchUSlider: document.querySelector("#stretchUSlider"),
  stretchVSlider: document.querySelector("#stretchVSlider"),
  twistSlider: document.querySelector("#twistSlider"),
  uSlider: document.querySelector("#uSlider"),
  vSlider: document.querySelector("#vSlider"),
  angleSlider: document.querySelector("#angleSlider"),
  contourSlider: document.querySelector("#contourSlider")
};

let scene;
let camera;
let renderer;
let surfaceGroup;
let mesh;
let cameraOrbit = { theta: 0.75, phi: 1.05, radius: 7.35 };
let pointer = { active: false, x: 0, y: 0 };
let rebuildQueued = false;

init();

function init() {
  setupRenderer();
  setupUi();
  applyModule(0);
  animate();
}

function setupRenderer() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xf7f3ea, 7, 15);

  camera = new THREE.PerspectiveCamera(42, 1, 0.01, 80);
  updateCamera();

  renderer = new THREE.WebGLRenderer({ canvas: els.canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const hemi = new THREE.HemisphereLight(0xffffff, 0xb7c2c9, 2.3);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xffffff, 2.5);
  key.position.set(4, 6, 5);
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xf0e1c5, 1.1);
  fill.position.set(-5, 3, -2);
  scene.add(fill);

  surfaceGroup = new THREE.Group();
  scene.add(surfaceGroup);

  new ResizeObserver(resizeRenderer).observe(els.canvas.parentElement);
  resizeRenderer();
  setupPointerOrbit();
}

function setupUi() {
  modules.forEach((module, index) => {
    const button = document.createElement("button");
    button.className = "module-button";
    button.type = "button";
    button.innerHTML = `
      <span class="module-index">${index + 1}</span>
      <span>
        <span class="module-name">${module.title}</span>
        <span class="module-topic">${module.topic}</span>
      </span>
    `;
    button.addEventListener("click", () => applyModule(index));
    els.moduleList.append(button);
  });

  Object.entries(surfaceDefs).forEach(([key, def]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = def.label;
    els.surfaceSelect.append(option);
  });

  els.surfaceSelect.addEventListener("change", () => {
    state.surface = els.surfaceSelect.value;
    queueRebuild();
  });

  [
    ["ampSlider", "amp"],
    ["stretchUSlider", "stretchU"],
    ["stretchVSlider", "stretchV"],
    ["twistSlider", "twist"],
    ["uSlider", "u"],
    ["vSlider", "v"],
    ["angleSlider", "angle"],
    ["contourSlider", "contourCount"]
  ].forEach(([id, key]) => {
    els[id].addEventListener("input", () => {
      state[key] = Number(els[id].value);
      queueRebuild();
    });
  });

  ["showGrid", "showContours", "showVectors", "showTangent", "showGeodesic", "showCurvature"].forEach((key) => {
    els[key].addEventListener("change", () => {
      state[key] = els[key].checked;
      queueRebuild();
    });
  });

  els.autoRotateBtn.addEventListener("click", () => {
    state.autoRotate = !state.autoRotate;
    els.autoRotateBtn.setAttribute("aria-pressed", String(state.autoRotate));
  });

  els.resetCameraBtn.addEventListener("click", () => {
    cameraOrbit = { theta: 0.75, phi: 1.05, radius: 7.35 };
    updateCamera();
  });

  els.prevModule.addEventListener("click", () => applyModule(Math.max(0, state.moduleIndex - 1)));
  els.nextModule.addEventListener("click", () => applyModule(Math.min(modules.length - 1, state.moduleIndex + 1)));
}

function applyModule(index) {
  state.moduleIndex = index;
  const module = modules[index];
  Object.assign(state, moduleDefaults, module.preset, { surface: module.surface });
  updateControls();
  updateLesson();
  queueRebuild();
}

function updateControls() {
  els.surfaceSelect.value = state.surface;
  els.ampSlider.value = state.amp;
  els.stretchUSlider.value = state.stretchU;
  els.stretchVSlider.value = state.stretchV;
  els.twistSlider.value = state.twist;
  els.uSlider.value = state.u;
  els.vSlider.value = state.v;
  els.angleSlider.value = state.angle;
  els.contourSlider.value = state.contourCount;
  ["showGrid", "showContours", "showVectors", "showTangent", "showGeodesic", "showCurvature"].forEach((key) => {
    els[key].checked = Boolean(state[key]);
  });
  els.autoRotateBtn.setAttribute("aria-pressed", String(state.autoRotate));
}

function updateLesson() {
  const module = modules[state.moduleIndex];
  els.sceneTitle.textContent = module.title;
  els.chapterTag.textContent = module.chapter;
  els.lessonTitle.textContent = module.title;
  els.lessonIntro.textContent = module.intro;
  els.formalSeed.textContent = module.formal;
  els.watchFor.textContent = module.watch;
  els.miniExperiment.textContent = module.experiment;
  els.progressText.textContent = `Module ${state.moduleIndex + 1} of ${modules.length}`;
  const percent = Math.round(((state.moduleIndex + 1) / modules.length) * 100);
  els.progressPercent.textContent = `${percent}%`;
  els.progressFill.style.width = `${percent}%`;
  [...els.moduleList.children].forEach((button, i) => button.classList.toggle("active", i === state.moduleIndex));
}

function queueRebuild() {
  if (rebuildQueued) return;
  rebuildQueued = true;
  requestAnimationFrame(() => {
    rebuildQueued = false;
    rebuildScene();
  });
}

function rebuildScene() {
  surfaceGroup.clear();
  const def = surfaceDefs[state.surface];
  const grid = buildSurfaceMesh(def);
  surfaceGroup.add(grid.mesh);
  mesh = grid.mesh;

  if (state.showGrid) surfaceGroup.add(buildParameterNet(def));
  if (state.showContours) surfaceGroup.add(buildContours(grid));
  if (state.showTangent || state.showVectors) surfaceGroup.add(buildProbeVectors(def));
  if (state.showGeodesic) surfaceGroup.add(buildGeodesicLayer(def));

  updateReadout(def);
  updateLegend();
}

function buildSurfaceMesh(def) {
  const uSeg = 88;
  const vSeg = 58;
  const positions = [];
  const colors = [];
  const indices = [];
  const points = [];
  let minY = Infinity;
  let maxY = -Infinity;

  for (let j = 0; j <= vSeg; j += 1) {
    const row = [];
    const t = j / vSeg;
    for (let i = 0; i <= uSeg; i += 1) {
      const s = i / uSeg;
      const p = def.sample(s, t, state);
      positions.push(p.x, p.y, p.z);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
      row.push(p);

      const { K } = localGeometry(def, s, t);
      const c = curvatureColor(K);
      colors.push(c.r, c.g, c.b);
    }
    points.push(row);
  }

  for (let j = 0; j < vSeg; j += 1) {
    for (let i = 0; i < uSeg; i += 1) {
      const a = j * (uSeg + 1) + i;
      const b = a + 1;
      const c = a + (uSeg + 1);
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  const isKlein = state.surface === "klein";

  const material = new THREE.MeshStandardMaterial({
    color: state.showCurvature ? 0xffffff : 0x9ec9bb,
    vertexColors: state.showCurvature,
    metalness: 0.02,
    roughness: 0.58,
    side: THREE.DoubleSide,
    transparent: isKlein,
    opacity: isKlein ? 0.68 : 1.0,
    depthWrite: !isKlein
  });

  const surfaceMesh = new THREE.Mesh(geometry, material);
  surfaceMesh.name = "curvature-surface";
  surfaceMesh.renderOrder = isKlein ? 2 : 0;
  return { mesh: surfaceMesh, points, uSeg, vSeg, minY, maxY };
}

function buildParameterNet(def) {
  const group = new THREE.Group();
  const matU = new THREE.LineBasicMaterial({ color: 0x1f2a33, transparent: true, opacity: 0.18 });
  const matV = new THREE.LineBasicMaterial({ color: 0x1f2a33, transparent: true, opacity: 0.24 });
  const count = 10;
  for (let i = 0; i <= count; i += 1) {
    const s = i / count;
    group.add(makeSampleLine((t) => def.sample(s, t, state), matU, 120));
  }
  for (let j = 0; j <= count; j += 1) {
    const t = j / count;
    group.add(makeSampleLine((s) => def.sample(s, t, state), matV, 160));
  }
  return group;
}

function buildContours(grid) {
  const group = new THREE.Group();
  const span = grid.maxY - grid.minY;
  if (span < 0.05) return group;

  const material = new THREE.LineBasicMaterial({ color: 0x263039, transparent: true, opacity: 0.42 });
  const vertices = [];
  const count = Math.max(3, Math.min(16, Math.round(state.contourCount)));
  const levels = Array.from({ length: count }, (_, i) => grid.minY + ((i + 1) / (count + 1)) * span);

  for (const level of levels) {
    for (let j = 0; j < grid.vSeg; j += 1) {
      for (let i = 0; i < grid.uSeg; i += 1) {
        const p00 = grid.points[j][i];
        const p10 = grid.points[j][i + 1];
        const p11 = grid.points[j + 1][i + 1];
        const p01 = grid.points[j + 1][i];
        const hits = contourHits([p00, p10, p11, p01], level);
        if (hits.length === 2) pushSegment(vertices, hits[0], hits[1]);
        if (hits.length === 4) {
          pushSegment(vertices, hits[0], hits[1]);
          pushSegment(vertices, hits[2], hits[3]);
        }
      }
    }
  }

  if (vertices.length) {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    group.add(new THREE.LineSegments(geometry, material));
  }
  return group;
}

function contourHits(corners, level) {
  const hits = [];
  for (let i = 0; i < 4; i += 1) {
    const a = corners[i];
    const b = corners[(i + 1) % 4];
    const da = a.y - level;
    const db = b.y - level;
    if (Math.abs(da) < EPS && Math.abs(db) < EPS) continue;
    if ((da <= 0 && db >= 0) || (da >= 0 && db <= 0)) {
      const denom = da - db;
      if (Math.abs(denom) < EPS) continue;
      const f = da / denom;
      hits.push(a.clone().lerp(b, f));
    }
  }
  return hits;
}

function buildProbeVectors(def) {
  const group = new THREE.Group();
  const geo = localGeometry(def, state.u, state.v);
  const p = geo.p;

  if (state.showTangent) {
    const tangentPlane = makeTangentPlane(p, geo.ru, geo.rv);
    group.add(tangentPlane);
  }

  if (state.showVectors) {
    group.add(new THREE.ArrowHelper(geo.ru.clone().normalize(), p, 0.58, 0x2666a5, 0.13, 0.07));
    group.add(new THREE.ArrowHelper(geo.rv.clone().normalize(), p, 0.58, 0x3b7d5f, 0.13, 0.07));
    group.add(new THREE.ArrowHelper(geo.normal.clone().normalize(), p, 0.68, 0xaf4638, 0.14, 0.08));

    const principal = principalDirections(geo);
    if (principal.dir1.lengthSq() > EPS) {
      group.add(new THREE.ArrowHelper(principal.dir1, p, 0.66, 0xbb7d22, 0.13, 0.07));
      group.add(new THREE.ArrowHelper(principal.dir2, p, 0.66, 0x6750a4, 0.13, 0.07));
    }

    for (let j = 1; j < 6; j += 1) {
      for (let i = 1; i < 8; i += 1) {
        const s = i / 8;
        const t = j / 6;
        const local = localGeometry(def, s, t);
        const field = local.ru.clone().multiplyScalar(Math.cos(TAU * t)).add(local.rv.clone().multiplyScalar(Math.sin(TAU * s)));
        if (field.lengthSq() > EPS) {
          group.add(new THREE.ArrowHelper(field.normalize(), local.p, 0.22, 0xd18b20, 0.06, 0.035));
        }
      }
    }
  }
  return group;
}

function makeTangentPlane(p, ru, rv) {
  const e1 = ru.clone().normalize();
  const e2 = rv.clone().sub(e1.clone().multiplyScalar(rv.dot(e1))).normalize();
  const size = 0.5;
  const corners = [
    p.clone().add(e1.clone().multiplyScalar(size)).add(e2.clone().multiplyScalar(size)),
    p.clone().add(e1.clone().multiplyScalar(-size)).add(e2.clone().multiplyScalar(size)),
    p.clone().add(e1.clone().multiplyScalar(size)).add(e2.clone().multiplyScalar(-size)),
    p.clone().add(e1.clone().multiplyScalar(-size)).add(e2.clone().multiplyScalar(-size))
  ];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(flattenVectors([corners[0], corners[1], corners[2], corners[2], corners[1], corners[3]]), 3));
  const material = new THREE.MeshBasicMaterial({ color: 0x2666a5, transparent: true, opacity: 0.18, side: THREE.DoubleSide });
  return new THREE.Mesh(geometry, material);
}

function principalDirections(geo) {
  const det = geo.E * geo.G - geo.F * geo.F;
  if (Math.abs(det) < EPS) {
    return { dir1: new THREE.Vector3(), dir2: new THREE.Vector3() };
  }
  const s00 = (geo.G * geo.e - geo.F * geo.f) / det;
  const s01 = (geo.G * geo.f - geo.F * geo.g) / det;
  const s10 = (-geo.F * geo.e + geo.E * geo.f) / det;
  const s11 = (-geo.F * geo.f + geo.E * geo.g) / det;
  const trace = s00 + s11;
  const determinant = s00 * s11 - s01 * s10;
  const disc = Math.sqrt(Math.max(0, trace * trace - 4 * determinant));
  const k1 = (trace + disc) / 2;
  const k2 = (trace - disc) / 2;

  const dir1 = coordinateEigenDirection(s00, s01, s10, s11, k1, geo);
  const dir2 = coordinateEigenDirection(s00, s01, s10, s11, k2, geo);
  return { dir1, dir2 };
}

function coordinateEigenDirection(a, b, c, d, lambda, geo) {
  let x = b;
  let y = lambda - a;
  if (Math.abs(x) + Math.abs(y) < EPS) {
    x = lambda - d;
    y = c;
  }
  const dir = geo.ru.clone().multiplyScalar(x).add(geo.rv.clone().multiplyScalar(y));
  if (dir.lengthSq() < EPS) return new THREE.Vector3();
  return dir.normalize();
}

function buildGeodesicLayer(def) {
  const group = new THREE.Group();
  const mainPath = integrateGeodesic(def, state.u, state.v, state.angle, 220);
  const mainMaterial = new THREE.LineBasicMaterial({ color: 0xd18b20, linewidth: 2 });
  group.add(makeLineFromPoints(mainPath, mainMaterial));

  const fanMaterial = new THREE.LineBasicMaterial({ color: 0xd18b20, transparent: true, opacity: 0.25 });
  for (let i = 0; i < 10; i += 1) {
    const angle = (i / 10) * TAU;
    const path = integrateGeodesic(def, state.u, state.v, angle, 60, 0.68);
    group.add(makeLineFromPoints(path, fanMaterial));
  }

  const transportMaterial = new THREE.MeshBasicMaterial({ color: 0x1f2a33 });
  for (let i = 12; i < mainPath.length - 12; i += 34) {
    const p = mainPath[i];
    const next = mainPath[Math.min(mainPath.length - 1, i + 2)];
    const dir = next.clone().sub(p);
    if (dir.lengthSq() > EPS) {
      const arrow = new THREE.ArrowHelper(dir.normalize(), p, 0.28, 0x1f2a33, 0.07, 0.04);
      arrow.cone.material = transportMaterial;
      arrow.line.material = new THREE.LineBasicMaterial({ color: 0x1f2a33 });
      group.add(arrow);
    }
  }
  return group;
}

function integrateGeodesic(def, s0, t0, angle, steps, speedScale = 1) {
  const startMetric = localGeometry(def, s0, t0);
  let vs = Math.cos(angle);
  let vt = Math.sin(angle);
  const metricSpeed = Math.sqrt(Math.max(EPS, startMetric.E * vs * vs + 2 * startMetric.F * vs * vt + startMetric.G * vt * vt));
  const targetSpeed = 0.16 * speedScale;
  vs = (vs / metricSpeed) * targetSpeed;
  vt = (vt / metricSpeed) * targetSpeed;

  const backward = traceGeodesic(def, s0, t0, -vs, -vt, steps).reverse();
  const forward = traceGeodesic(def, s0, t0, vs, vt, steps);
  return backward.concat(forward.slice(1));
}

function traceGeodesic(def, s0, t0, vs0, vt0, steps) {
  const points = [];
  let s = s0;
  let t = t0;
  let vs = vs0;
  let vt = vt0;
  const dt = 0.075;

  for (let i = 0; i < steps; i += 1) {
    points.push(def.sample(wrap01(s, def.closedU), wrap01(t, def.closedV), state));
    const gamma = christoffel(def, wrap01(s, def.closedU), wrap01(t, def.closedV));
    const as = -(gamma[0][0][0] * vs * vs + 2 * gamma[0][0][1] * vs * vt + gamma[0][1][1] * vt * vt);
    const at = -(gamma[1][0][0] * vs * vs + 2 * gamma[1][0][1] * vs * vt + gamma[1][1][1] * vt * vt);
    vs += as * dt;
    vt += at * dt;
    s += vs * dt;
    t += vt * dt;

    if (!def.closedU && (s < 0.015 || s > 0.985)) break;
    if (!def.closedV && (t < 0.015 || t > 0.985)) break;
  }
  return points;
}

function christoffel(def, s, t) {
  const h = 0.004;
  const g = metricAt(def, s, t);
  const gs1 = metricAt(def, shiftParam(s, h, def.closedU), t);
  const gs0 = metricAt(def, shiftParam(s, -h, def.closedU), t);
  const gt1 = metricAt(def, s, shiftParam(t, h, def.closedV));
  const gt0 = metricAt(def, s, shiftParam(t, -h, def.closedV));

  const dg = [
    [
      (gs1.E - gs0.E) / (2 * h),
      (gs1.F - gs0.F) / (2 * h),
      (gs1.G - gs0.G) / (2 * h)
    ],
    [
      (gt1.E - gt0.E) / (2 * h),
      (gt1.F - gt0.F) / (2 * h),
      (gt1.G - gt0.G) / (2 * h)
    ]
  ];

  const det = Math.max(EPS, g.E * g.G - g.F * g.F);
  const inv = [
    [g.G / det, -g.F / det],
    [-g.F / det, g.E / det]
  ];
  const metricIndex = (i, j) => (i === 0 && j === 0 ? 0 : i === 1 && j === 1 ? 2 : 1);
  const gamma = [
    [[0, 0], [0, 0]],
    [[0, 0], [0, 0]]
  ];

  for (let k = 0; k < 2; k += 1) {
    for (let i = 0; i < 2; i += 1) {
      for (let j = 0; j < 2; j += 1) {
        let value = 0;
        for (let l = 0; l < 2; l += 1) {
          value += inv[k][l] * (dg[i][metricIndex(j, l)] + dg[j][metricIndex(i, l)] - dg[l][metricIndex(i, j)]);
        }
        gamma[k][i][j] = value * 0.5;
      }
    }
  }
  return gamma;
}

function localGeometry(def, s, t) {
  const h = 0.0025;
  const su1 = shiftParam(s, h, def.closedU);
  const su0 = shiftParam(s, -h, def.closedU);
  const tv1 = shiftParam(t, h, def.closedV);
  const tv0 = shiftParam(t, -h, def.closedV);
  const p = def.sample(s, t, state);
  const pu1 = def.sample(su1, t, state);
  const pu0 = def.sample(su0, t, state);
  const pv1 = def.sample(s, tv1, state);
  const pv0 = def.sample(s, tv0, state);
  const p11 = def.sample(su1, tv1, state);
  const p10 = def.sample(su1, tv0, state);
  const p01 = def.sample(su0, tv1, state);
  const p00 = def.sample(su0, tv0, state);

  const ru = pu1.clone().sub(pu0).multiplyScalar(1 / (2 * h));
  const rv = pv1.clone().sub(pv0).multiplyScalar(1 / (2 * h));
  const ruu = pu1.clone().add(pu0).sub(p.clone().multiplyScalar(2)).multiplyScalar(1 / (h * h));
  const rvv = pv1.clone().add(pv0).sub(p.clone().multiplyScalar(2)).multiplyScalar(1 / (h * h));
  const ruv = p11.clone().sub(p10).sub(p01).add(p00).multiplyScalar(1 / (4 * h * h));
  const normal = ru.clone().cross(rv).normalize();

  const E = ru.dot(ru);
  const F = ru.dot(rv);
  const G = rv.dot(rv);
  const e = normal.dot(ruu);
  const f = normal.dot(ruv);
  const g = normal.dot(rvv);
  const det = Math.max(EPS, E * G - F * F);
  const K = (e * g - f * f) / det;
  const H = (E * g - 2 * F * f + G * e) / (2 * det);
  return { p, ru, rv, normal, E, F, G, e, f, g, det, K, H };
}

function metricAt(def, s, t) {
  const geo = localGeometry(def, s, t);
  return { E: geo.E, F: geo.F, G: geo.G };
}

function updateReadout(def) {
  const geo = localGeometry(def, state.u, state.v);
  const area = Math.sqrt(Math.max(0, geo.det));
  const normal = geo.normal;
  const entries = [
    ["Metric I", `E ${fmt(geo.E)} / F ${fmt(geo.F)} / G ${fmt(geo.G)}`],
    ["Area scale", `sqrt(det g) ${fmt(area)}`],
    ["Gaussian K", fmt(geo.K)],
    ["Mean H", fmt(geo.H)],
    ["Normal n", `(${fmt(normal.x)}, ${fmt(normal.y)}, ${fmt(normal.z)})`]
  ];
  els.metricReadout.innerHTML = entries.map(([label, value]) => `
    <div class="metric-item">
      <span class="metric-label">${label}</span>
      <span class="metric-value">${value}</span>
    </div>
  `).join("");
}

function updateLegend() {
  const chips = [];
  if (state.showCurvature) {
    chips.push(["#2f6bb2", "negative K"]);
    chips.push(["#f0efe3", "near flat"]);
    chips.push(["#af4638", "positive K"]);
  }
  if (state.showVectors) {
    chips.push(["#2666a5", "u tangent"]);
    chips.push(["#3b7d5f", "v tangent"]);
    chips.push(["#af4638", "normal"]);
    chips.push(["#bb7d22", "principal / flow"]);
  }
  if (state.showGeodesic) chips.push(["#d18b20", "geodesic"]);
  els.sceneLegend.innerHTML = chips.map(([color, label]) => `
    <span class="legend-chip"><span class="legend-swatch" style="background:${color}"></span>${label}</span>
  `).join("");
}

function setupPointerOrbit() {
  els.canvas.addEventListener("pointerdown", (event) => {
    pointer = { active: true, x: event.clientX, y: event.clientY };
    els.canvas.setPointerCapture(event.pointerId);
  });
  els.canvas.addEventListener("pointermove", (event) => {
    if (!pointer.active) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    cameraOrbit.theta -= dx * 0.006;
    cameraOrbit.phi = clamp(cameraOrbit.phi + dy * 0.006, 0.22, Math.PI - 0.18);
    updateCamera();
  });
  els.canvas.addEventListener("pointerup", () => {
    pointer.active = false;
  });
  els.canvas.addEventListener("wheel", (event) => {
    event.preventDefault();
    cameraOrbit.radius = clamp(cameraOrbit.radius + event.deltaY * 0.006, 3.0, 10.5);
    updateCamera();
  }, { passive: false });
}

function resizeRenderer() {
  const rect = els.canvas.parentElement.getBoundingClientRect();
  const width = Math.max(320, Math.floor(rect.width));
  const height = Math.max(320, Math.floor(rect.height));
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  if (state.autoRotate && !pointer.active) {
    cameraOrbit.theta += 0.0022;
    updateCamera();
  }
  renderer.render(scene, camera);
}

function updateCamera() {
  const r = cameraOrbit.radius;
  const sinPhi = Math.sin(cameraOrbit.phi);
  camera.position.set(
    r * sinPhi * Math.cos(cameraOrbit.theta),
    r * Math.cos(cameraOrbit.phi),
    r * sinPhi * Math.sin(cameraOrbit.theta)
  );
  camera.lookAt(0, 0, 0);
}

function makeSampleLine(sample, material, steps = 120) {
  const points = [];
  for (let i = 0; i <= steps; i += 1) points.push(sample(i / steps));
  return makeLineFromPoints(points, material);
}

function makeLineFromPoints(points, material) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(flattenVectors(points), 3));
  return new THREE.Line(geometry, material);
}

function flattenVectors(points) {
  const values = [];
  points.forEach((p) => values.push(p.x, p.y, p.z));
  return values;
}

function pushSegment(vertices, a, b) {
  vertices.push(a.x, a.y, a.z, b.x, b.y, b.z);
}

function curvatureColor(K) {
  const x = clamp(K / 2.5, -1, 1);
  const negative = new THREE.Color(0x2f6bb2);
  const neutral = new THREE.Color(0xf0efe3);
  const positive = new THREE.Color(0xaf4638);
  if (x < 0) return neutral.clone().lerp(negative, Math.sqrt(-x));
  return neutral.clone().lerp(positive, Math.sqrt(x));
}

function shiftParam(value, delta, closed) {
  if (closed) return wrap01(value + delta, true);
  return clamp(value + delta, 0.003, 0.997);
}

function wrap01(value, closed) {
  if (!closed) return value;
  return ((value % 1) + 1) % 1;
}

function twistY(p, amount) {
  const c = Math.cos(amount);
  const s = Math.sin(amount);
  return new THREE.Vector3(c * p.x - s * p.z, p.y, s * p.x + c * p.z);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function fmt(value) {
  if (!Number.isFinite(value)) return "0.000";
  if (Math.abs(value) >= 100) return value.toExponential(2);
  return value.toFixed(3);
}

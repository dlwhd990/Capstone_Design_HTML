let canvas;
let canvasBox;
let cancon;
let canvasItem;
let upper_canvas;
let lower_canvas;
let imgLoaderBox;
let imgLoader;
let flipY;
let flipX;
let rotate_left;
let rotate_right;
let rotate_origin;
let putText;
let putIcon;
let discardSelect;
let removeImage;
let blackwhite;
let grayScale;
let invert;
let sepia;
let emboss;
let vintage;
let bright;
let contrast;
let bluur;
let noise;
let pixelate;
let gamma_red;
let gamma_green;
let gamma_blue;
let canvas_width;
let canvas_height;
let canvas_size_button;
let text_size;
let text_color;
let download;
let sourceList;
let sourceKeyList;
let sourceImage;
let sourceImageBox;
let searchButton;
let searchPopup;
let popupClose;
let icon_button;
let bg_button;
let icon_tag;
let bg_tag;
let iconList = [];
let bgList = [];
let popupTagContainer;
let tagClickList = [];
let recommandHelpPopup;
let recommandHelpPopupClose;
let showRecommandHelp;
let toggle = document.querySelector(".toggle");
let menu = document.querySelector(".header_buttons");
let toggleOn = false;
let sourceContainer;
let popupImageContainer;

function checkToggle() {
  if (toggleOn) {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}

toggle.addEventListener("click", () => {
  toggleOn = !toggleOn;
  console.log(toggleOn);
  checkToggle();
});

window.onbeforeunload = function () {
  return "";
};

window.onload = () => {
  canvas = new fabric.Canvas("c");
  canvas_section = document.querySelector(".canvas_section");
  upper_canvas = document.querySelector(".upper-canvas");
  lower_canvas = document.querySelector(".lower-canvas");
  canvasBox = document.querySelector(".canvas_box");
  cancon = document.querySelector(".canvas-container");
  canvasItem = document.querySelector(".canvas");
  imgLoaderBox = document.querySelector(".imgLoaderBox");
  imgLoader = document.querySelector(".imgLoader");
  flipY = document.querySelector(".flipY");
  flipX = document.querySelector(".flipX");
  rotate_left = document.querySelector(".rotate_left");
  rotate_right = document.querySelector(".rotate_right");
  rotate_origin = document.querySelector(".rotate_origin");
  putText = document.querySelector(".putText");
  putIcon = document.querySelector(".putIcon");
  discardSelect = document.querySelector(".discardSelect");
  removeImage = document.querySelector(".removeImage");
  blackwhite = document.querySelector(".blackwhite");
  grayScale = document.querySelector(".grayScale");
  invert = document.querySelector(".invert");
  sepia = document.querySelector(".sepia");
  emboss = document.querySelector(".emboss");
  vintage = document.querySelector(".vintage");
  bright = document.querySelector(".bright");
  contrast = document.querySelector(".contrast");
  bluur = document.querySelector(".blur");
  noise = document.querySelector(".noise");
  pixelate = document.querySelector(".pixelate");
  gamma_red = document.querySelector(".gamma_red");
  gamma_green = document.querySelector(".gamma_green");
  gamma_blue = document.querySelector(".gamma_blue");
  canvas_width = document.querySelector(".canvas_width");
  canvas_height = document.querySelector(".canvas_height");
  canvas_size_button = document.querySelector(".canvas_size_button");
  text_size = document.querySelector(".text_size");
  text_color = document.querySelector(".text_color");
  download = document.querySelector(".download");
  searchButton = document.querySelector(".source_image_title_button");
  searchPopup = document.querySelector(".search_popup");
  popupClose = document.querySelector(".popup_close");
  icon_button = document.querySelector(".icon_button");
  bg_button = document.querySelector(".bg_button");
  icon_tag = document.querySelector(".icon_tag");
  bg_tag = document.querySelector(".bg_tag");
  tagContainer = document.querySelector(".icon_tag");
  sourceImageBox = document.querySelector(".source_image_box");
  recommandHelpPopup = document.querySelector(".recommand_help_popup");
  recommandHelpPopupClose = document.querySelector(
    ".recommand_help_popup_close"
  );
  showRecommandHelp = document.querySelector(".recommand_help");
  sourceContainer = document.querySelector(".source_container");

  if (fabric.isWebglSupported()) {
    fabric.textureSize = fabric.maxTextureSize;
  }

  canvas.uniScaleTransform = true;
  let canvasSizeWidth = window.innerWidth;
  let canvasSizeHeight = canvas_section.getBoundingClientRect().height * 0.99;

  upper_canvas.style.width = `${canvasSizeWidth}px`;
  upper_canvas.style.height = `${canvasSizeHeight}px`;

  lower_canvas.style.width = `${canvasSizeWidth}px`;
  lower_canvas.style.height = `${canvasSizeHeight}px`;

  canvasBox.style.width = `${canvasSizeWidth}px`;
  canvasBox.style.height = `${canvasSizeHeight}px`;

  canvasItem.style.width = `${canvasSizeWidth}px`;
  canvasItem.style.height = `${canvasSizeHeight}px`;

  cancon.style.width = `${canvasSizeWidth}px`;
  cancon.style.height = `${canvasSizeHeight}px`;

  function setIconAndBg() {
    sourceKeyList.map(
      (key) =>
        sourceList[key].usage === "icon" && iconList.push(sourceList[key])
    );

    sourceKeyList.map(
      (key) =>
        sourceList[key].usage === "background" && bgList.push(sourceList[key])
    );
    setSourceImages(iconList);
  }

  function makeSourceList(value, callback) {
    sourceList = value;
    sourceKeyList = Object.keys(sourceList);
    sourceList && sourceKeyList && callback();
  }

  function setSourceImages(value) {
    valueList = value;
    valueKeyList = Object.keys(valueList);
    sourceContainer.innerHTML = "";
    valueKeyList.map((key) => {
      const image = document.createElement("img");
      image.setAttribute("class", "source_image");
      image.setAttribute("data-key", `${valueList[key].id}`);
      image.setAttribute("src", `${valueList[key].uri}`);
      sourceContainer.appendChild(image);
    });
  }

  function settingSource(callback) {
    const ref = firebase.database().ref("source");
    ref.on("value", (item) => {
      const value = item.val();
      value && callback(value, setIconAndBg);
    });

    return () => ref.off();
  }

  settingSource(makeSourceList);

  sourceContainer.addEventListener("click", (event) => {
    console.log(event.target.src);
    if (event.target.src) {
      let imgObj = new Image();
      imgObj.lockUniScaling = true;
      imgObj.src = event.target.src;
      fabric.Image.fromURL(
        event.target.src,
        function (imgObj) {
          imgObj.scale(0.3).set({
            crossOrigin: "anonymous",
            angle: 0,
            padding: 0,
            cornersize: 10,
            height: imgObj.height,
            width: imgObj.width,
          });

          imgObj.filters[6] = new fabric.Image.filters.Brightness({
            brightness: 0,
          });
          imgObj.filters[7] = new fabric.Image.filters.Contrast({
            contrast: 0,
          });
          imgObj.filters[8] = new fabric.Image.filters.Blur({
            blur: 0,
          });
          imgObj.filters[9] = new fabric.Image.filters.Noise({ noise: 0 });
          imgObj.filters[10] = new fabric.Image.filters.Pixelate({
            blocksize: 1,
          });
          imgObj.filters[11] = new fabric.Image.filters.Gamma({
            gamma: [1, 1, 1],
          });
          canvas.centerObject(imgObj);
          canvas.add(imgObj);
          canvas.renderAll();
        },
        { crossOrigin: "anonymous" }
      );
    }
  });

  icon_button.addEventListener("click", () => {
    bg_tag.style.display = "none";
    icon_tag.style.display = "block";
    icon_button.style.opacity = "1";
    bg_button.style.opacity = "0.5";
    setSourceImages(iconList);
    tagContainer = document.querySelector(".icon_tag");
    tagContainer.addEventListener("click", (event) => {
      if (event.target.className === "tag") {
        tagClickList = [];
        sourceKeyList.map(
          (key) =>
            sourceList[key].tag === event.target.innerText.slice(1) &&
            tagClickList.push(sourceList[key])
        );
        sourceContainer.innerHTML = "";
        setSourceImages(tagClickList);
      }
    });
  });

  bg_button.addEventListener("click", () => {
    icon_tag.style.display = "none";
    bg_tag.style.display = "block";
    bg_button.style.opacity = "1";
    icon_button.style.opacity = "0.5";

    setSourceImages(bgList);
    tagContainer = document.querySelector(".bg_tag");
    tagContainer.addEventListener("click", (event) => {
      if (event.target.className === "tag") {
        tagClickList = [];
        sourceKeyList.map(
          (key) =>
            sourceList[key].tag === event.target.innerText.slice(1) &&
            tagClickList.push(sourceList[key])
        );
        sourceContainer.innerHTML = "";
        setSourceImages(tagClickList);
      }
    });
  });

  tagContainer.addEventListener("click", (event) => {
    if (event.target.className === "tag") {
      tagClickList = [];
      sourceKeyList.map(
        (key) =>
          sourceList[key].tag === event.target.innerText.slice(1) &&
          tagClickList.push(sourceList[key])
      );
      sourceContainer.innerHTML = "";
      setSourceImages(tagClickList);
    }
  });

  imgLoaderBox.addEventListener("click", () => {
    imgLoader.click();
  });

  canvasBox.addEventListener("click", () => {
    seperateEffect();
  });

  //footer button part
  flipY.addEventListener("click", () => {
    const targeted = canvas.getActiveObject();
    targeted.set("flipY", !targeted.flipY);
    canvas.renderAll();
  });

  flipX.addEventListener("click", () => {
    const targeted = canvas.getActiveObject();
    targeted.set("flipX", !targeted.flipX);
    canvas.renderAll();
  });

  rotate_left.addEventListener("click", () => {
    const targeted = canvas.getActiveObject();
    const center = targeted.getCenterPoint();
    targeted.set("angle", targeted.angle - 90);
    targeted.setPositionByOrigin(center);
    canvas.renderAll();
  });

  rotate_right.addEventListener("click", () => {
    const targeted = canvas.getActiveObject();
    const center = targeted.getCenterPoint();
    targeted.set("angle", targeted.angle + 90);
    targeted.setPositionByOrigin(center);
    canvas.renderAll();
  });

  rotate_origin.addEventListener("click", () => {
    const targeted = canvas.getActiveObject();
    const center = targeted.getCenterPoint();
    targeted.set("angle", targeted.angle - targeted.angle);
    targeted.setPositionByOrigin(center);
    canvas.renderAll();
  });

  putText.addEventListener("click", () => {
    let textbox = new fabric.Textbox("text", {
      left: 50,
      top: 50,
      width: 150,
      fontSize: 36,
      fontFamily: "Quicksand",
    });
    canvas.centerObject(textbox);
    canvas.add(textbox).setActiveObject(textbox);
  });

  text_size.oninput = () => {
    const targeted = canvas.getActiveObject();
    targeted.set("fontSize", parseInt(text_size.value));
    canvas.renderAll();
  };

  text_color.oninput = () => {
    const targeted = canvas.getActiveObject();
    targeted.set("fill", text_color.value);
    canvas.renderAll();
  };

  discardSelect.addEventListener("click", () => {
    canvas.discardActiveObject();
    canvas.requestRenderAll();
  });

  removeImage.addEventListener("click", () => {
    const targeted = canvas.getActiveObject();
    if (!targeted) {
      window.alert("제거할 이미지를 먼저 선택해주세요.");
    } else {
      canvas.remove(targeted);
    }
  });

  //filter part
  function applyFilter(index, filter) {
    var targeted = canvas.getActiveObject();
    targeted.filters[index] = filter;
    targeted.applyFilters();
    canvas.renderAll();
  }

  function applyFilterValue(index, prop, value) {
    let targeted = canvas.getActiveObject();
    targeted.filters[index][prop] = value;
    targeted.applyFilters();
    canvas.renderAll();
  }

  function blackwhiteOn() {
    applyFilter(0, blackwhite.checked && new fabric.Image.filters.BlackWhite());
  }

  blackwhite.addEventListener("click", () => {
    blackwhiteOn();
  });

  function grayScaleOn() {
    applyFilter(1, grayScale.checked && new fabric.Image.filters.Grayscale());
  }

  grayScale.addEventListener("change", () => {
    grayScaleOn();
  });

  function invertOn() {
    applyFilter(2, invert.checked && new fabric.Image.filters.Invert());
  }

  invert.addEventListener("change", () => {
    invertOn();
  });

  function sepiaOn() {
    applyFilter(3, sepia.checked && new fabric.Image.filters.Sepia());
  }

  sepia.addEventListener("change", () => {
    sepiaOn();
  });

  function embossOn() {
    applyFilter(
      4,
      emboss.checked &&
        new fabric.Image.filters.Convolute({
          matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
        })
    );
  }

  emboss.addEventListener("change", () => {
    embossOn();
  });

  function vintageOn() {
    applyFilter(5, vintage.checked && new fabric.Image.filters.Vintage());
  }

  vintage.addEventListener("change", () => {
    vintageOn();
  });

  bright.oninput = () => {
    applyFilterValue(6, "brightness", parseFloat(bright.value));
  };

  contrast.oninput = () => {
    applyFilterValue(7, "contrast", parseFloat(contrast.value));
  };

  bluur.oninput = () => {
    applyFilterValue(8, "blur", parseFloat(bluur.value));
  };

  noise.oninput = () => {
    applyFilterValue(9, "noise", parseFloat(noise.value));
  };

  pixelate.oninput = () => {
    applyFilterValue(10, "blocksize", parseInt(pixelate.value));
  };

  gamma_red.oninput = function () {
    let current = canvas.getActiveObject().filters[11].gamma;
    current[0] = parseFloat(gamma_red.value);
    current[1] = parseFloat(gamma_green.value);
    current[2] = parseFloat(gamma_blue.value);
    applyFilterValue(11, "gamma", current);
  };
  gamma_green.oninput = function () {
    let current = canvas.getActiveObject().filters[11].gamma;
    current[0] = parseFloat(gamma_red.value);
    current[1] = parseFloat(gamma_green.value);
    current[2] = parseFloat(gamma_blue.value);
    applyFilterValue(11, "gamma", current);
  };
  gamma_blue.oninput = function () {
    let current = canvas.getActiveObject().filters[11].gamma;
    current[0] = parseFloat(gamma_red.value);
    current[1] = parseFloat(gamma_green.value);
    current[2] = parseFloat(gamma_blue.value);
    applyFilterValue(11, "gamma", current);
  };

  //image upload / download part
  imgLoader.onchange = function handleImage(e) {
    toggleOn = false;
    checkToggle();
    let reader = new FileReader();
    reader.onload = function (event) {
      let imgObj = new Image();
      imgObj.lockUniScaling = true;
      imgObj.src = event.target.result;
      imgObj.onload = function () {
        let image = new fabric.Image(imgObj);
        image.scale(0.4).set({
          angle: 0,
          padding: 0,
          cornersize: 10,
          height: image.height,
          width: image.width,
        });

        image.filters[6] = new fabric.Image.filters.Brightness({
          brightness: 0,
        });
        image.filters[7] = new fabric.Image.filters.Contrast({
          contrast: 0,
        });
        image.filters[8] = new fabric.Image.filters.Blur({
          blur: 0,
        });
        image.filters[9] = new fabric.Image.filters.Noise({ noise: 0 });
        image.filters[10] = new fabric.Image.filters.Pixelate({ blocksize: 1 });
        image.filters[11] = new fabric.Image.filters.Gamma({
          gamma: [1, 1, 1],
        });
        canvas.centerObject(image);
        canvas.add(image);
        canvas.renderAll();
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  download.addEventListener("click", saveImage, false);

  //function part
  function saveImage(e) {
    toggleOn = false;
    checkToggle();
    this.href = canvas.toDataURL({
      format: "jpg",
      quality: 1,
    });
    this.download = "Imager.jpg";
  }

  function seperateEffect() {
    const targeted = canvas.getActiveObject();
    if (!targeted) {
      blackwhite.checked = false;
      grayScale.checked = false;
      invert.checked = false;
      sepia.checked = false;
      emboss.checked = false;
      vintage.checked = false;
      bright.value = 0;
      contrast.value = 0;
      bluur.value = 0;
      noise.value = 0;
      pixelate.value = 0;
      gamma_red.value = 0;
      gamma_green.value = 0;
      gamma_blue.value = 0;
    } else if (targeted.filters) {
      targeted.filters[0]
        ? (blackwhite.checked = true)
        : (blackwhite.checked = false);
      targeted.filters[1]
        ? (grayScale.checked = true)
        : (grayScale.checked = false);
      targeted.filters[2] ? (invert.checked = true) : (invert.checked = false);
      targeted.filters[3] ? (sepia.checked = true) : (sepia.checked = false);
      targeted.filters[4] ? (emboss.checked = true) : (emboss.checked = false);
      targeted.filters[5]
        ? (vintage.checked = true)
        : (vintage.checked = false);
      bright.value = targeted.filters[6]["brightness"];
      contrast.value = targeted.filters[7]["contrast"];
      bluur.value = targeted.filters[8]["blur"];
      noise.value = targeted.filters[9]["noise"];
      pixelate.value = targeted.filters[10]["blocksize"];
      gamma_red.value = targeted.filters[11].gamma[0];
      gamma_green.value = targeted.filters[11].gamma[1];
      gamma_blue.value = targeted.filters[11].gamma[2];
    }
  }

  let list = {
    0: {
      count: 0,
    },
    1: {
      count: 0,
    },
    2: {
      count: 0,
    },
    3: {
      count: 0,
    },
    4: {
      count: 0,
    },
    5: {
      count: 0,
    },
    6: {
      count: 0,
    },
    7: {
      count: 0,
    },
    8: {
      count: 0,
    },
    9: {
      count: 0,
    },
    10: {
      count: 0,
    },
    11: {
      count: 0,
    },
    12: {
      count: 0,
    },
    13: {
      count: 0,
    },
    14: {
      count: 0,
    },
    15: {
      count: 0,
    },
    16: {
      count: 0,
    },
    17: {
      count: 0,
    },
    18: {
      count: 0,
    },
    19: {
      count: 0,
    },
    20: {
      count: 0,
    },
    21: {
      count: 0,
    },
    22: {
      count: 0,
    },
    23: {
      count: 0,
    },
    24: {
      count: 0,
    },
    25: {
      count: 0,
    },
    26: {
      count: 0,
    },
    27: {
      count: 0,
    },
    28: {
      count: 0,
    },
    29: {
      count: 0,
    },
    30: {
      count: 0,
    },
    31: {
      count: 0,
    },
    32: {
      count: 0,
    },
    33: {
      count: 0,
    },
  };
  function save() {
    firebase.database().ref("bigData/6570/female/hobby").set(list);
  }
};

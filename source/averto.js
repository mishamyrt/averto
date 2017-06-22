"use strict";
let Averto = class Averto {
  constructor() {
    let avertoBlock = document.createElement("div");
    avertoBlock.className = "averto";
    avertoBlock.innerHTML =
      '<div class="averto-box"><div class="averto-gradient"><span class="averto-title"></span><span class="averto-message"></span></div></div>';
    let style = document.createElement("style");
    style.innerHTML =
      ".averto{pointer-events:none;position:fixed;top:0;left:0;width:100%;height:100%}.averto.is__blocking{pointer-events:all}.averto-box{bottom:85px;position:absolute;display:inline-block;opacity:0;transition:opacity .2s .15s ease-out,transform .5s cubic-bezier(.43,.18,.78,.36);color:#fff;max-width:470px;min-width:270px;border-radius:4px;transform:translateY(150px);margin:0 auto}.averto.is__visible .averto-box{opacity:1;transform:translateY(0);transition:opacity .25s ease-out,transform .5s cubic-bezier(.075,.82,.165,1)}.averto-gradient{padding:22px 23px;box-shadow:0 16px 31px -2px rgba(0,0,0,.17);background:linear-gradient(to bottom,rgba(255,255,255,.1) 0%,rgba(0,0,0,.1) 100%)}.averto-message,.averto-title{font-size:1.1em}.averto-title{line-height:1.1em;display:block;font-weight:700}.averto-title,.avertoBox-message{cursor:default}";
    document.body.appendChild(avertoBlock);
    document.body.appendChild(style);
    this.message = document.querySelector(".averto-message");
    this.box = document.querySelector(".averto-box");
    this.gradient = document.querySelector(".averto-gradient");
    this.title = document.querySelector(".averto-title");
    this.wrapper = document.querySelector(".averto");
    this.visible = false;
    this.isListen = false;
  }
  throw(data) {
    if (!this.visible && data.message != undefined) {
      let timeout = data.timeout ? data.timeout : 3000;
      let autohide = data.autohide != undefined ? data.autohide : true;
      let blocking = data.blocking != undefined ? data.blocking : false;
      let title = data.title ? data.title : "";
      let color = data.color ? data.color : "#f31d2f";
      let message = data.message;

      this.title.innerText = title;
      this.message.innerText = message;
      this.box.style.left =
        window.innerWidth / 2 - this.box.offsetWidth / 2 + "px";
      let RGB = hexToRgb(color);
      this.box.style.backgroundColor = color;
      this.box.style.boxShadow =
        "0px 12px 85px 0px rgba(" +
        RGB.r +
        ", " +
        RGB.g +
        ", " +
        RGB.b +
        ", 0.61)";
      let contrastLevel = Math.round(
        (RGB.r * 299 + RGB.g * 587 + RGB.b * 114) / 1000
      );
      this.box.style.color = contrastLevel > 135 ? "black" : "white";
      window.requestAnimationFrame(() => {
        if (blocking) this.wrapper.classList.add("is__blocking");
        this.wrapper.classList.add("is__visible");
        this.visible = true;
        this._listen();
        if (autohide) {
          this.timeout = setTimeout(() => {
            this.hide();
          }, timeout);
        }
      });
    
      function hexToRgb(hex) {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result
          ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
            }
          : null;
      }
    }
  }
  hide() {
    if (this.visible) {
      clearTimeout(this.timeout);
      this.wrapper.classList.remove("is__visible");
      this.wrapper.classList.remove("is__blocking");
      this.visible = false;
    }
  }
  _wiggle() {
    draw(0, 70, this.box);
    function draw(min, max, box) {
      box.style.transition = "opacity 0.2s";
      let pos = (19 / (Math.pow(min, 1.15) / 10 + 0.5 - 0.05) * Math.sin(min / 2));
      min += 1;
      box.style.transform = "translateX(" + pos + "px)";
      if (min < max) {
        requestAnimationFrame(function() {
          draw(min, max, box);
        });
      }
      else{
          box.style.transition = "";
          box.style.transform = "";
      }
    }
  }
  _listen() {
    if (!this.isListen) {
      this.isListen = true;
      window.addEventListener(
        "keydown",
        e => {
          if ((e.keyCode == 13 || e.keyCode == 27) && this.visible) {
            e.preventDefault();
            this.hide();
          }
          else{
              this._wiggle();
          }
        },
        true
      );
      this.wrapper.onclick = () => {
        if (this.wrapper.classList.contains('is__blocking')){
            this._wiggle();
        }
      };
      this.gradient.onclick = () => {
          if (this.wrapper.classList.contains('is__blocking')){
          this.hide();
        }
      }
    }
  }
};

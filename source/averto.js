"use strict";
let Averto;
(function() {
  let instance;
  let anticlone_proxy;
  let inited = false;
  let message, box, gradient, title, wrapper;
  let visible = false;
  let isBlocking = false;
  let isListening = false;
  let onWiggle = false;
  let timeoutInstance;
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
  function wiggle() {
    function draw(min, max) {
      if (onWiggle) {
        box.style.transition = "opacity 0.2s";
        let pos = (15 / ((Math.pow(min, 1.15) / 10 + 0.5)) * Math.sin(min / 2));
        ++min;
        box.style.transform = "translateX(" + pos + "px)";
        if (min < max) {
          requestAnimationFrame(function() {
            draw(min, max);
          });
        } else {
          box.style.transition = "";
          box.style.transform = "";
          onWiggle = false;
        }
      }
    }
    onWiggle = true;
    draw(0, 50);
  }
  function listen() {
    if (!isListening) {
      isListening = true;
      window.addEventListener(
        "keydown",
        function(e) {
          if (
            (e.keyCode == 13 || e.keyCode == 27 || e.keyCode == 32) &&
            visible
          ) {
            e.preventDefault();
            hide();
          } else if (isBlocking && !onWiggle) {
            wiggle();
          }
        },
        true
      );
      wrapper.onclick = function() {
        if (isBlocking && !onWiggle) {
          wiggle();
        }
      };
      gradient.onclick = function() {
        hide();
      };
    }
  }
  function hide() {
    if (visible) {
      if (onWiggle) {
          box.style.transition = "";
          box.style.transform = "";
          onWiggle = false;
      }
      clearTimeout(timeoutInstance);
      window.requestAnimationFrame(function() {
        wrapper.classList.remove("is__visible");
        wrapper.classList.remove("is__blocking");
        visible = false;
        isBlocking = false;
      });
    }
  }
  Averto = function() {
    if (instance) {
      return instance;
    }

    instance = {
      hex: function(text) {
        hexToRgb(text);
      },
      throw: function(parameters) {
        if (!visible && parameters.message != undefined) {
          let timeout = parameters.timeout ? parameters.timeout : 3000;
          let autohide =
            parameters.autohide != undefined ? parameters.autohide : true;
          let color = parameters.color ? parameters.color : "#f31d2f";
          let RGB = hexToRgb(color);
          title.innerText = parameters.title ? parameters.title : "";
          message.innerText = parameters.message;
          box.style.backgroundColor = color;
          box.style.boxShadow =
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
          box.style.color = contrastLevel > 135 ? "black" : "white";
          if (parameters.blocking) {
            isBlocking = true;
            wrapper.classList.add("is__blocking");
          }
          window.requestAnimationFrame(function() {
            wrapper.classList.add("is__visible");
            visible = true;
            listen();
            if (autohide) {
              timeoutInstance = setTimeout(function() {
                hide();
              }, timeout);
            }
          });
        }
      }
    };

    anticlone_proxy = {
      throw: function(parameters) {
        return instance.throw(parameters);
      }
    };
    if (!inited) {
      let avertoBlock = document.createElement("div");
      avertoBlock.className = "averto";
      avertoBlock.innerHTML =
        '<div class="averto-box"><div class="averto-gradient"><span class="averto-title"></span><span class="averto-message"></span></div></div>';
      let style = document.createElement("style");
      style.innerHTML = `.averto{
            pointer-events:none;
            position: fixed;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            top: 0;
            -webkit-box-pack: center;
                -ms-flex-pack: center;
                    justify-content: center;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .averto.is__blocking{
            pointer-events:all;
        }
        .averto-box{
            z-index: 1000;
            bottom:85px;
            position:absolute;
            display:inline-block;
            opacity:0;
            -webkit-transition:opacity .2s .15s ease-out,-webkit-transform .5s cubic-bezier(.43,.18,.78,.36);
            transition:opacity .2s .15s ease-out,-webkit-transform .5s cubic-bezier(.43,.18,.78,.36);
            -o-transition:opacity .2s .15s ease-out,transform .5s cubic-bezier(.43,.18,.78,.36);
            transition:opacity .2s .15s ease-out,transform .5s cubic-bezier(.43,.18,.78,.36);
            transition:opacity .2s .15s ease-out,transform .5s cubic-bezier(.43,.18,.78,.36),-webkit-transform .5s cubic-bezier(.43,.18,.78,.36);
            color:#fff;
            max-width:470px;
            min-width:270px;
            border-radius:4px;
            -webkit-transform:translateY(150px);
                -ms-transform:translateY(150px);
                    transform:translateY(150px);
            margin:0 auto;
        }
        .averto.is__visible .averto-box{
            opacity:1;
            -webkit-transform:translateY(0);
                -ms-transform:translateY(0);
                    transform:translateY(0);
            -webkit-transition:opacity .25s ease-out,-webkit-transform .5s cubic-bezier(.075,.82,.165,1);
            transition:opacity .25s ease-out,-webkit-transform .5s cubic-bezier(.075,.82,.165,1);
            -o-transition:opacity .25s ease-out,transform .5s cubic-bezier(.075,.82,.165,1);
            transition:opacity .25s ease-out,transform .5s cubic-bezier(.075,.82,.165,1);
            transition:opacity .25s ease-out,transform .5s cubic-bezier(.075,.82,.165,1),-webkit-transform .5s cubic-bezier(.075,.82,.165,1);
        }
        .averto-gradient{
            pointer-events: all;
            padding:22px 23px;
            -webkit-box-shadow:0 16px 31px -2px rgba(0,0,0,.17);
                    box-shadow:0 16px 31px -2px rgba(0,0,0,.17);
            background:-webkit-gradient(linear,left top, left bottom,from(rgba(255,255,255,.1)),to(rgba(0,0,0,.1)));
            background:-webkit-linear-gradient(top,rgba(255,255,255,.1) 0%,rgba(0,0,0,.1) 100%);
            background:-o-linear-gradient(top,rgba(255,255,255,.1) 0%,rgba(0,0,0,.1) 100%);
            background:linear-gradient(to bottom,rgba(255,255,255,.1) 0%,rgba(0,0,0,.1) 100%);
        }
        .averto-message,.averto-title{
            font-size:1.1em;
        }
        .averto-title{
            line-height:1.1em;
            display:block;
            font-weight:700;
        }
        .averto-title, .averto-message{
            cursor:default;
        }`;
      avertoBlock.appendChild(style);
      document.body.appendChild(avertoBlock);
      message = document.querySelector(".averto-message");
      box = document.querySelector(".averto-box");
      gradient = document.querySelector(".averto-gradient");
      title = document.querySelector(".averto-title");
      wrapper = document.querySelector(".averto");
      inited = true;
    }
    return anticlone_proxy;
  };
})();

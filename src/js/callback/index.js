/* eslint-disable no-continue */
export default class CallbackWidget {
  constructor(colorVariable, openModalFn) {
    this.colorVariable = colorVariable;

    if (openModalFn) this.openModalFn = openModalFn;

    this.buildCallbackWidget();
    this.addStyles();
  }

  buildCallbackWidget () {
    const callbackButton = document.createElement('button');
    callbackButton.setAttribute('id', 'callback-widget-button');
    callbackButton.classList.add('callback-button');
    const callbackIcon = document.createElement('i');
    callbackIcon.classList.add('callback-button__icon');
    callbackButton.append(callbackIcon);

    callbackButton.addEventListener('click', this.openModalFn);
    document.querySelector('body').append(callbackButton);
  }

  openModalFn = () => console.log('callback widget clicked');

  addStyles() {
    const style = document.createElement('style');
    style.type = 'text/css';
    const keyFrames = `
      @keyframes callback-button-phone {
        0% {
            transform: rotate(0)
        }

        3% {
            transform: rotate(10deg)
        }

        6% {
            transform: rotate(0)
        }

        9% {
            transform: rotate(-10deg)
        }

        12% {
            transform: rotate(0)
        }

        15% {
            transform: rotate(10deg)
        }

        18% {
            transform: rotate(0)
        }

        21% {
            transform: rotate(-10deg)
        }

        24% {
            transform: rotate(0)
        }

        100% {
            transform: rotate(0)
        }
      }

      @keyframes callback-button-border {
        0% {
            width: 2.5em;
            height: 2.5em;
            opacity: 1
        }

        100% {
            width: 5em;
            height: 5em;
            opacity: 0
        }
      }

      @keyframes callback-button-border1 {
        0% {
            width: 2.5em;
            height: 2.5em;
            opacity: .3
        }

        100% {
            width: 5em;
            height: 5em;
            opacity: 0
        }
      }
    `;
    style.innerHTML = keyFrames;
    document.getElementsByTagName('head')[0].appendChild(style);

    this.createCSSSelector('.callback-button:before', `
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      border-radius: 50%;
      border: solid ${this.colorVariable} 1px;
      width: 5em;
      height: 5em;
      animation: callback-button-border 2s infinite
    `);

    this.createCSSSelector('.callback-button:after', `
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      border-radius: 50%;
      background-color: ${this.colorVariable};
      opacity: .1;
      width: 4em;
      height: 4em;
      animation: callback-button-border1 2s infinite;
      animation-delay: 1s
    `);

    this.createCSSSelector('.callback-button i', `
      color: inherit;
      position: relative;
      z-index: 1;
      animation: callback-button-phone 2s infinite;
      animation-timing-function: ease-out;  
    `);

    this.createCSSSelector('.callback-button', `
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      background-color: ${this.colorVariable};
      color: #fff;
      cursor: pointer;
      display: block;
      position: fixed;
      font-size: inherit;
      right: 2em;
      bottom: 2em;
      width: 2.5em;
      height: 2.5em;
      line-height: 2.5em;
      border-radius: 50%;
      text-align: center;
      transition: all .2s;
      border: none;
      z-index: 100;  
    `);

    this.createCSSSelector('.callback-button__icon', `
      background: url('data:image/svg+xml,<%3Fxml version="1.0" %3F><svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48h-48z" fill="none"/><path fill="white" d="M13.25 21.59c2.88 5.66 7.51 10.29 13.18 13.17l4.4-4.41c.55-.55 1.34-.71 2.03-.49 1.24.74 4.65 1.14 7.14 1.14 1.11 0 2 .89 2 2v7c0 1.11-.89 2-2 2-18.78 0-34-15.22-34-34 0-1.11.9-2 2-2h7c1.11 0 2 .89 2 2 0 2.49.4 4.9 1.14 7.14.22.69.06 1.48-.49 2.03l-4.4 4.42z"/></svg>') center no-repeat;
      width: 100%;
      height: 100%;
      display: block;
      background-size: 27px;
    `);
  }

  createCSSSelector (selector, style) {
    if (!document.styleSheets) return;
    if (document.getElementsByTagName('head').length === 0) return;

    let styleSheet; let mediaType;

    if (document.styleSheets.length > 0) {
      for (let i = 0, l = document.styleSheets.length; i < l; i++) {
        if (document.styleSheets[i].disabled) { continue; }
        const { media } = document.styleSheets[i];
        mediaType = typeof media;

        if (mediaType === 'string') {
          if (media === '' || (media.indexOf('screen') !== -1)) {
            styleSheet = document.styleSheets[i];
          }
        } else if (mediaType === 'object') {
          if (media.mediaText === '' || (media.mediaText.indexOf('screen') !== -1)) {
            styleSheet = document.styleSheets[i];
          }
        }

        if (typeof styleSheet !== 'undefined') { break; }
      }
    }

    if (typeof styleSheet === 'undefined') {
      const styleSheetElement = document.createElement('style');
      styleSheetElement.type = 'text/css';
      document.getElementsByTagName('head')[0].appendChild(styleSheetElement);

      for (let i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].disabled) {
          continue;
        }
        styleSheet = document.styleSheets[i];
      }

      mediaType = typeof styleSheet.media;
    }

    if (mediaType === 'string') {
      for (let i = 0, l = styleSheet.rules.length; i < l; i++) {
        if (styleSheet.rules[i].selectorText && styleSheet.rules[i].selectorText.toLowerCase() === selector.toLowerCase()) {
          styleSheet.rules[i].style.cssText = style;
          return;
        }
      }
      styleSheet.addRule(selector, style);
    } else if (mediaType === 'object') {
      const styleSheetLength = (styleSheet.cssRules) ? styleSheet.cssRules.length : 0;
      for (let i = 0; i < styleSheetLength; i++) {
        if (styleSheet.cssRules[i].selectorText && styleSheet.cssRules[i].selectorText.toLowerCase() === selector.toLowerCase()) {
          styleSheet.cssRules[i].style.cssText = style;
          return;
        }
      }
      styleSheet.insertRule(selector + '{' + style + '}', styleSheetLength);
    }
  }
}

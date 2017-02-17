const THEME_LIGHT = 'light';
const THEME_DARK = 'dark';

const THEME = {
  [THEME_LIGHT]: {
    backgroundColor: '#fff',
    color: '#000',
    boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.75)'
  },
  [THEME_DARK]: {
    backgroundColor: '#000',
    color: '#fff',
    boxShadow: '0px 0px 8px 0px rgba(255,255,255,0.75)'
  }
};

class Appversion {
  constructor({ version, date, theme = THEME_LIGHT, wrapperStyle = {}, isOpen = false }) {
    this.version = version;
    this.date = date;
    this.theme = theme;
    this.wrapperStyle = wrapperStyle;
    this.isOpen = isOpen;

    this.wrapper = null;
  }

  initialize() {
    this.createWrapper();

    document.body.appendChild(this.wrapper);

    this.transitionOffset = this.wrapper.getBoundingClientRect().right - this.textElement.getBoundingClientRect().left;

    if (!this.isOpen) {
      this.close();
    }

    requestAnimationFrame(() => {
      this.wrapper.style.msTransition = 'transform 0.2s ease-in-out';
      this.wrapper.style.webkitTransition = 'transform 0.2s ease-in-out';
      this.wrapper.style.MozTransition = 'transform 0.2s ease-in-out';
      this.wrapper.style.Otransition = 'transform 0.2s ease-in-out';
      this.wrapper.style.transition = 'transform 0.2s ease-in-out';
    });
  }

  setStyle(element, style) {
    Object.keys(style).forEach((styleKey) => {
      element.style[styleKey] = style[styleKey];
    });
  }

  defaults() {
    let result = {};
    Array.apply(null, arguments).forEach((object) => {
      Object.keys(object).forEach((key) => {
        result[key] = object[key];
      });
    });
    return result;
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.wrapper.style.msTransform = `translateX(0)`;
    this.wrapper.style.webkitTransform = `translateX(0)`;
    this.wrapper.style.MozTransform = `translateX(0)`;
    this.wrapper.style.OTransform = `translateX(0)`;
    this.wrapper.style.transform = `translateX(0)`;
    this.toggleButton.innerHTML = '[-]';
  }

  close() {
    this.isOpen = false;
    this.wrapper.style.msTransform = `translateX(${this.transitionOffset}px)`;
    this.wrapper.style.webkitTransform = `translateX(${this.transitionOffset}px)`;
    this.wrapper.style.MozTransform = `translateX(${this.transitionOffset}px)`;
    this.wrapper.style.OTransform = `translateX(${this.transitionOffset}px)`;
    this.wrapper.style.transform = `translateX(${this.transitionOffset}px)`;
    this.toggleButton.innerHTML = '[+]';
  }

  createWrapper() {
    this.wrapper = document.createElement('div');
    this.setStyle(this.wrapper, this.defaults({
      position: 'fixed',
      top: 0,
      right: 0,
      zIndex: 9999,
      padding: '5px',
      fontSize: '14px',
      cursor: 'pointer',
    }, THEME[this.theme], this.wrapperStyle));

    this.toggleButton = document.createElement('span');
    this.toggleButton.innerHTML = '[-]';
    this.toggleButton.style.marginRight = '5px';
    this.wrapper.appendChild(this.toggleButton);

    this.textElement = document.createElement('span');
    this.textElement.innerHTML = `${this.version} build on ${this.date}`;
    this.wrapper.appendChild(this.textElement);

    this.wrapper.onclick = this.toggle.bind(this);
  }
}

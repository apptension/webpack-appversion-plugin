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

    if (this.isOpen) {
      this.open();
    }
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
    this.wrapper.innerHTML = `${this.version} build on ${this.date} [-]`;
  }

  close() {
    this.isOpen = false;
    this.wrapper.innerHTML = '[+]';
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
    this.wrapper.innerHTML = '[+]';
    this.wrapper.onclick = this.toggle.bind(this);
  }
}

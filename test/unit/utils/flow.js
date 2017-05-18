export default class Flow {
  constructor(attrs) {
    if (attrs) {
      Object.keys(attrs).forEach((key) => {
        this[key] = attrs[key];
      });
    }
  }

  get(property) {
    return this[property];
  }

  set(property, value) {
    this[property] = value;
  }
}

class Parent {
  constructor() {
    this.setup();
  }

  setup = () => {
    console.log('parent');
  };
}

class Child extends Parent {
  constructor() {
    super();
  }

  setup = () => {
    console.log('child');
  };
}

const child = new Child(); // parent

class Parent2 {
  constructor() {
    this.setup();
  }

  setup() {
    console.log('parent');
  }
}

class Child2 extends Parent2 {
  constructor() {
    super();
  }
  setup() {
    console.log('child');
  }
}

const child2 = new Child2(); // child

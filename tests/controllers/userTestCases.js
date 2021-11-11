const user = require('../../src/controllers/user.js');

const resMock = {
  status() {
    return this;
  }
  send() {
    return this;
  }
}

const reqMock = {
  body : {
    secret: ""
  }
}

const nextMock = jest.fn();

const userMock = jest.fn(() => {
  return {
    insert : () => {}
  };
});

const resMockF = jest.fn(() => {
  return new ResMock();
});

jest.mock('../models/user.js', () => userMock);

test('Should call user.insert', async () => {
  user.register(reqMock, resMockF, nextMock);
});

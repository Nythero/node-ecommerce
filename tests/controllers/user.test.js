let reqMock;
let nextMock;
let resMock;
let user;
let userModel;

beforeAll(() => {
  jest.mock('../../src/models/user.js', () => {
    return {
      "insert" : jest.fn()
    };
  });
 
  user = require('../../src/controllers/user.js');
  userModel = require('../../src/models/user.js');
});

beforeEach(() => {
  reqMock = {
    body : {
      secret: ""
    }
  }
  
  nextMock = jest.fn();
  
  resMock = {
    status: jest.fn(),
    send: jest.fn()
  };
  
  resMock.status.mockReturnThis();
  resMock.send.mockReturnThis();
});

afterEach(() => {
  jest.clearAllMocks();
});

test('Should call user.insert and send response', async () => {
  await user.register(reqMock, resMock, nextMock);
  expect(userModel.insert).toHaveBeenCalled();
  expect(resMock.status).toHaveBeenCalledWith(201);
  expect(resMock.send).toHaveBeenCalled();

});

test('Should call next since insert throws error', async () => {
  userModel.insert.mockImplementation(() => {
    throw new Error();
  });

  await user.register(reqMock, resMock, nextMock);
  expect(userModel.insert).toThrow();
  expect(nextMock).toHaveBeenCalled();
  
  jest.unmock('../../src/models/user.js');
});

let reqMock;
let resMock;
let nextMock;
let cart;
let cartModel;

beforeAll(() => {
  resMock = {
    locals: { user: true },
    status: jest.fn(),
    send: jest.fn()
  };
 
  reqMock = {
    body: jest.fn()
  }

  nextMock = jest.fn();
  
  jest.mock('../../src/models/carts.js', () => {
    return {
      insert: jest.fn(),
      exists: jest.fn(),
      delete: jest.fn()
    };
  });

  cart = require('../../src/controllers/carts.js');
  cartModel = require('../../src/models/carts.js');

  resMock.status.mockReturnThis();
  resMock.send.mockReturnThis();
});

afterEach(() => {
  jest.clearAllMocks();
});

test('Should call carts.insert and send response', async () =>{
  await cart.insert(reqMock, resMock, nextMock);

  expect(cartModel.insert).toHaveBeenCalled();
  expect(resMock.status).toHaveBeenCalledWith(201);
  expect(resMock.send).toHaveBeenCalled();
});

test('Should call carts.insert and call next', async () => {
  cartModel.insert.mockImplementation(() => {
    throw new Error();
  });
  
  await cart.insert(reqMock, resMock, nextMock);

  expect(cartModel.insert).toThrow();
  expect(nextMock).toHaveBeenCalledWith(expect.anything());
});

test('Should call carts.delete and send response with 204', async () => {
  cartModel.exists.mockImplementation(() => true);
  
  await cart.delete(reqMock, resMock, nextMock);
  
  expect(cartModel.delete).toHaveBeenCalled();
  expect(resMock.status).toHaveBeenCalledWith(204);
  expect(resMock.send).toHaveBeenCalled();
});

test('Should send response with 404', async () => {
  cartModel.exists.mockImplementation(() => false);
  
  await cart.delete(reqMock, resMock, nextMock);
  
  expect(cartModel.delete).not.toHaveBeenCalled();
  expect(resMock.status).toHaveBeenCalledWith(404);
  expect(resMock.send).toHaveBeenCalled();
});

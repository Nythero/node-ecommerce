let reqMock;
let nextMock;
let resMock;
let categories;
let categoriesModel;

beforeAll(() => {
  jest.mock('../../src/models/productCategories.js', () => {
    return {
      "insert" : jest.fn()
    };
  });
 
  categories = require('../../src/controllers/categories.js');
  categoriesModel = require('../../src/models/productCategories.js');
});

beforeEach(() => {
  reqMock = {
    body : {
      category: ""
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

test('Should call categories.insert and send response with status 201', async () => {
  await categories.insert(reqMock, resMock, nextMock);

  expect(categoriesModel.insert).toHaveBeenCalledWith(expect.anything());
  expect(resMock.status).toHaveBeenCalledWith(201);
  expect(resMock.send).toHaveBeenCalled();
  expect(nextMock).not.toHaveBeenCalled();
});

test('Should call categories.insert and call next', async () => {
  categoriesModel.insert.mockImplementation(() => {
    throw new Error();
  });

  await categories.insert(reqMock, resMock, nextMock);

  expect(categoriesModel.insert).toHaveBeenCalledWith(expect.anything());
  expect(nextMock).toHaveBeenCalledWith(expect.any(Error)); 
  expect(resMock.send).not.toHaveBeenCalled();
});

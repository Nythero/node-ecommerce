let products
let productsModels
let reqMock
let resMock
let nextMock
let productDto

beforeAll(() => {
  jest.mock('../../src/models/products.js', () => {
    return {
      selectId: jest.fn(),
      select: jest.fn(),
      insert: jest.fn(),
      remove: jest.fn()
    }
  })

  jest.mock('../../src/Dtos/products.js')

  products = require('../../src/controllers/products.js')
  productsModels = require('../../src/models/products.js')
  productDto = require('../../src/Dtos/products.js')
  
  reqMock = {
    params: {},
    body: {}
  } 
  resMock = {
    status: jest.fn(),
    send: jest.fn(),
    json: jest.fn(),
    locals: { user : {}}
  }
  
  resMock.status.mockReturnThis()

  nextMock = jest.fn()
})

beforeEach(() => {

})

afterEach(() => {
  jest.clearAllMocks()
})

test('Should call products.select and send response with 200 status code', async () => {
  await products.getWithId(reqMock, resMock, nextMock)

  expect(productsModels.selectId).toHaveBeenCalled()
  expect(resMock.status).toHaveBeenCalledWith(200)
  expect(resMock.json).toHaveBeenCalledWith(expect.any(productDto))
})

test('Should call products.select and call next', async () => {
  productsModels.selectId.mockImplementation(() => {
    throw new Error()
  })

  await products.getWithId(reqMock, resMock, nextMock)

  expect(productsModels.selectId).toHaveBeenCalled()
  expect(resMock.status).not.toHaveBeenCalled()
  expect(resMock.json).not.toHaveBeenCalled()
  expect(nextMock).toHaveBeenCalledWith(expect.any(Error))
})

test('Should call products.select and send a json with 200 status code', async () => {
  await products.getAll(reqMock, resMock, nextMock)

  expect(productsModels.select).toHaveBeenCalled()
  expect(resMock.status).toHaveBeenCalledWith(200)
  expect(resMock.json).toHaveBeenCalledWith(expect.any(productDto))
  expect(nextMock).not.toHaveBeenCalled()
})

test('Should call products.select and call next', async () => {
  productsModels.select.mockImplementation(() => {
    throw new Error
  })

  await products.getAll(reqMock, resMock, nextMock)

  expect(productsModels.select).toHaveBeenCalled()
  expect(resMock.status).not.toHaveBeenCalled()
  expect(resMock.json).not.toHaveBeenCalled()
  expect(nextMock).toHaveBeenCalledWith(expect.any(Error))
})

test('Should call products.insert and send a response with status code 201', async () => {
  await products.insert(reqMock, resMock, nextMock)

  expect(productsModels.insert).toHaveBeenCalled()
  expect(resMock.status).toHaveBeenCalledWith(201)
  expect(resMock.send).toHaveBeenCalled()
  expect(nextMock).not.toHaveBeenCalled()
})

test('Should call products.insert and call next', async () => {
  productsModels.insert.mockImplementation(() => {
    throw new Error()
  })

  await products.insert(reqMock, resMock, nextMock)

  expect(productsModels.insert).toHaveBeenCalled()
  expect(resMock.status).not.toHaveBeenCalledWith(201)
  expect(resMock.send).not.toHaveBeenCalled()
  expect(nextMock).toHaveBeenCalled()
})

test('Should call products.remove and send response with status code 204', async () => {
  await products.remove(reqMock, resMock, nextMock)

  expect(productsModels.remove).toHaveBeenCalled()
  expect(resMock.status).toHaveBeenCalledWith(204)
  expect(resMock.send).toHaveBeenCalled()
  expect(nextMock).not.toHaveBeenCalled()
})

test('Should call products.remove and call next', async () => {
  productsModels.remove.mockImplementation(() => {
    throw new Error()
  })

  await products.remove(reqMock, resMock, nextMock)

  expect(productsModels.remove).toHaveBeenCalled()
  expect(resMock.status).not.toHaveBeenCalledWith()
  expect(resMock.send).not.toHaveBeenCalled()
  expect(nextMock).toHaveBeenCalled()
})

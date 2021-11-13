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
      select: jest.fn()
      
    }
  })

  jest.mock('../../src/Dtos/products.js')

  products = require('../../src/controllers/products.js')
  productsModels = require('../../src/models/products.js')
  productDto = require('../../src/Dtos/products.js')
  
  reqMock = {
    params: {}
  } 
  resMock = {
    status: jest.fn(),
    send: jest.fn(),
    json: jest.fn(),
    locals: {}
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

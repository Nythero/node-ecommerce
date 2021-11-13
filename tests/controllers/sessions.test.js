let sessions
let sessionsModels
let resMock
let reqMock
let nextMock

beforeAll(() => {
  jest.mock('../../src/models/sessions.js', () => {
    return {
      insert: jest.fn(),
      deleteS: jest.fn()
    }
  })

  sessions = require('../../src/controllers/sessions.js')
  sessionsModels = require('../../src/models/sessions.js')

  resMock = {
    status: jest.fn(),
    send: jest.fn(),
    cookie: jest.fn(),
    locals: { credentials: {} },
    clearCookie: jest.fn()
  }
  reqMock = {
    cookies: { sid: "algo" }
  }
  nextMock = jest.fn()

  resMock.status.mockReturnThis()
})

afterEach(() => {
  jest.clearAllMocks()
})

test('Should call sessions.insert and send response with status code 200', async () => {
  sessionsModels.insert.mockImplementation(() => "")

  await sessions.insert(reqMock, resMock)

  expect(resMock.cookie).toHaveBeenCalledWith('sid', expect.any(String))
  expect(resMock.status).toHaveBeenCalledWith(200)
  expect(resMock.send).toHaveBeenCalled()
})

test('Should call sessions.remove and send response with status code 204', async () => {
  await sessions.remove(reqMock, resMock)

  expect(sessionsModels.deleteS).toHaveBeenCalledWith(expect.any(String))
  expect(resMock.clearCookie).toHaveBeenCalledWith('sid')
  expect(resMock.status).toHaveBeenCalledWith(204)
  expect(resMock.send).toHaveBeenCalled()
})

test('Should call sessions.remove and send response with status code 401', async () => {
  reqMock.cookies.sid = ""

  await sessions.remove(reqMock, resMock)

  expect(sessionsModels.deleteS).not.toHaveBeenCalled()
  expect(resMock.clearCookie).not.toHaveBeenCalled()
  expect(resMock.status).toHaveBeenCalledWith(401)
  expect(resMock.send).toHaveBeenCalled()
})

import request from 'supertest'
import app from '../src/index'

const req = request(app)
describe('Test endpoint responses', () => {
  it('gets the main endpoint', (done) => {
    req
      .get('/')
      .expect(200)
      .expect('Home', done)
  })

  it('gets the api endpoint', async () => {
    const response = await req.get('/api')
    expect(response.status).toBe(200)
    expect(response.text).toBe('api working')
  })

  it('gets the 404 endpoint', async () => {
    const response = await req.get('/test')
    expect(response.status).toBe(404)
  })
})

describe('Test image endpoints', () => {
  it('gets the image endpoint', async () => {
    const response = await req.get('/api/images')
    expect(response.status).toBe(404)
  })

  it('gets error with image', async () => {
    const response = await req.get('/api/images?filename=inputs')
    expect(response.status).toBe(404)
  })

  it('gets image', async () => {
    const response = await req.get('/api/images?filename=input')
    expect(response.status).toBe(200)
  })
})

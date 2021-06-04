import request from 'supertest'
import app from '../src/index'

const req = request(app)
describe('Test endpoint responses', () => {
  it('gets the main endpoint', (done) => {
    req
      .get('/')
      .expect(200)
      .expect('working', done)
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

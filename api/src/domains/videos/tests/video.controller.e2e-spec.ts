import { TestHelper } from '~shared/helpers/test.helper';
import { VideoRepository } from '../repositories/video.repository';

describe('VideoController', () => {
  const testHelper = new TestHelper();
  let accessToken: string;

  beforeAll(async () => {
    await testHelper.initialize();

    accessToken = await testHelper.getAccessToken();
  });

  afterAll(async () => {
    await testHelper.close();
  });

  it('throws unauthenticated when not logged in yet', async () => {
    const response = await testHelper.get('/videos');

    expect(response.status).toBe(401);
    expect({
      message: 'Unauthorized',
      statusCode: 401,
    }).toEqual(response.body);
  });

  it('throws error when url is not valid youtube url', async () => {
    const response = await testHelper
      .post('/videos')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        url: 'https://www.google.com',
      });

    expect(response.status).toBe(422);
    expect({
      message: 'Invalid video url',
      statusCode: 422,
      error: 'Unprocessable Entity',
    }).toEqual(response.body);
  });

  it('should create video entity when request is valid', async () => {
    const response = await testHelper
      .post('/videos')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        url: 'https://www.youtube.com/watch?v=XrxXvkrjVVg',
      });

    expect(response.status).toBe(201);

    const videoRepository =
      await testHelper.getService<VideoRepository>(VideoRepository);

    const videos = await videoRepository.find();
    expect(videos).toHaveLength(1);

    const video = videos[0];
    expect({
      id: expect.any(String),
      sharedById: expect.any(String),
      url: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
      likes: 0,
      dislikes: 0,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    }).toEqual(video);
  });

  it('should return list of videos', async () => {
    const response = await testHelper
      .get('/videos')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect({
      id: expect.any(String),
      sharedById: expect.any(String),
      url: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
      likes: 0,
      dislikes: 0,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    }).toEqual(response.body.videos[0]);
  });
});

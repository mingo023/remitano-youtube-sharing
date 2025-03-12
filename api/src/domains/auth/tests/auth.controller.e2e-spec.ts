import { TestHelper } from '~shared/helpers/test.helper';

describe('AuthController', () => {
  const testHelper = new TestHelper();

  beforeAll(async () => {
    await testHelper.initialize();
  });

  afterAll(async () => {
    await testHelper.close();
  });

  it('should return 201 when signing up', async () => {
    const response = await testHelper.post('/auth/sign-up').send({
      email: 'test@gmail.com',
      password: 'password',
    });

    expect(response.status).toBe(201);
    expect({
      user: {
        email: 'test@gmail.com',
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
      accessToken: expect.any(String),
    }).toEqual(response.body);
  });

  it('should throw error when email exist on sign-up', async () => {
    const response = await testHelper.post('/auth/sign-up').send({
      email: 'test@gmail.com',
      password: 'password',
    });

    expect(response.status).toBe(400);
    expect({
      statusCode: 400,
      message: 'Email has been taken',
      error: 'Bad Request',
    }).toEqual(response.body);
  });

  it('should return 200 when signing in', async () => {
    const response = await testHelper.post('/auth/sign-in').send({
      email: 'test@gmail.com',
      password: 'password',
    });

    expect(response.status).toBe(200);
    expect({
      user: {
        email: 'test@gmail.com',
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
      accessToken: expect.any(String),
    }).toEqual(response.body);
  });

  it('should throw error when email not found on sign-in', async () => {
    const response = await testHelper.post('/auth/sign-in').send({
      email: 'test-not-found@gmail.com',
      password: 'password',
    });

    expect(response.status).toBe(400);
    expect({
      statusCode: 400,
      message: 'Email or password is incorrect',
      error: 'Bad Request',
    }).toEqual(response.body);
  });

  it('should throw error when email is not valid on sign-in', async () => {
    const response = await testHelper.post('/auth/sign-in').send({
      email: 'not-email',
      password: 'password',
    });

    expect(response.status).toBe(400);
    expect({
      statusCode: 400,
      message: ['email must be an email'],
      error: 'Bad Request',
    }).toEqual(response.body);
  });

  it('should throw error when email is not valid on sign-up', async () => {
    const response = await testHelper.post('/auth/sign-up').send({
      email: 'not-email',
      password: 'password',
    });

    expect(response.status).toBe(400);
    expect({
      statusCode: 400,
      message: ['email must be an email'],
      error: 'Bad Request',
    }).toEqual(response.body);
  });
});

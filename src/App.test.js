const faker = require('faker');
const puppeteer = require('puppeteer');

let browser, page;

const baseUrl = 'http://localhost:3000';

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
});

async function login(user, pass) {
  await page.goto(`${baseUrl}/login`);
  await page.waitForSelector('#login-form');
  await page.click('input[name=username]');
  await page.type('input[name=username]', user);
  await page.click('input[name=password]');
  await page.type('input[name=password]', pass);
  await page.click('button[type=submit]');
}

async function register(user, pass1, pass2) {
  await page.goto(`${baseUrl}/register`);
  await page.waitForSelector('#register-form');
  await page.click('input[name=username]');
  await page.type('input[name=username]', user);
  await page.click('input[name=password]');
  await page.type('input[name=password]', pass1);
  await page.click('input[name=password-confirmation]');
  await page.type('input[name=password-confirmation]', pass2);
  await page.click('button[type=submit]');
}

describe('Login tests', () => {
  test('users can login with valid credentials', async () => {
    await login('test-user', 'testing123');
    await page.waitForNavigation();
  }, 30000);

  test('error is displayed when invalid credentials used', async () => {
    await login('test-user', 'testing456');
    await page.waitForSelector('#login-error');
    const error = await page.$eval('#login-error', e => e.innerText);
    expect(error).toEqual('Invalid username or password specified');
  }, 30000);

  test('users are redirected to login page after signing out', async () => {
    await page.goto(`${baseUrl}/dashboard`);
    await page.waitForSelector('button[title=Logout]');
    await page.click('button[title=Logout]');
    await page.waitForSelector('#login-form');
  }, 30000);

  test('users that are not logged in are redirected to login page', async () => {
    await page.goto(`${baseUrl}/dashboard`);
    await page.waitForSelector('#login-form');
  }, 30000);
});

describe('Registration tests', () => {
  test('users can register with unique username and valid password', async () => {
    const username = faker.internet.userName().substring(0, 15);
    const password = faker.internet.password(8);
    await register(username, password, password);
    await page.waitForNavigation();
  }, 30000);

  test('error is displayed when provided passwords do not match', async () => {
    const username = faker.internet.userName().substring(0, 15);
    await register(username, 'testing123', 'testing456');
    await page.waitForSelector('#username-helper-text');
    const error = await page.$eval('#password-helper-text', e => e.innerText);
    expect(error).toEqual('Your passwords do not match. Please try again.');
  }, 30000);

  test('error is displayed when attempting to register a non unique username', async () => {
    await register('test-user', 'testing123', 'testing123');
    await page.waitForSelector('#username-helper-text');
    const error = await page.$eval('#username-helper-text', e => e.innerText);
    expect(error).toEqual('This username is already in use. Please choose another.');
  }, 30000);

  test('error is displayed when password is less than 8 characters in length', async () => {
    const username = faker.internet.userName().substring(0, 15);
    await register(username, '2short', '2short');
    await page.waitForSelector('#username-helper-text');
    const error = await page.$eval('#password-helper-text', e => e.innerText);
    expect(error).toEqual('Passwords must be at least 8 characters');
  }, 30000);
});

describe('CRUD functionality tests', () => {
  test('users can create a draft quiz with valid title and subject selected', async () => {
    await login('test-user', 'testing123');
    await page.waitForSelector('#menu-create-btn');
    await page.click('#menu-create-btn');
    await page.waitForSelector('input#title');
    await page.click('input#title');
    await page.type('input#title', 'Test Quiz');
    await page.click('div#subject');
    await page.click('ul[role=listbox] > li:nth-child(5)');
    await page.evaluate(() => document.querySelector('#submit-quiz-btn').click());
    await page.waitForSelector('div#editor');
  }, 30000);

  test('users are prevented from creating a draft quiz without providing a title', async () => {
    await login('test-user', 'testing123');
    await page.waitForSelector('#menu-create-btn');
    await page.click('#menu-create-btn');
    await page.waitForSelector('div#subject');
    await page.click('div#subject');
    await page.click('ul[role=listbox] > li:nth-child(5)');
    const isBtnDisabled = await page.$('#submit-quiz-btn[disabled]');
    expect(isBtnDisabled).toBeTruthy();
  }, 30000);

  test('users are prevented from creating a draft quiz without selecting a subject', async () => {
    await login('test-user', 'testing123');
    await page.waitForSelector('#menu-create-btn');
    await page.click('#menu-create-btn');
    await page.waitForSelector('input#title');
    await page.click('input#title');
    await page.type('input#title', 'Test Quiz');
    const isBtnDisabled = await page.$('#submit-quiz-btn[disabled]');
    expect(isBtnDisabled).toBeTruthy();
  }, 30000);

  test('users can add question when required fields are completed', async () => {
    await login('test-user', 'testing123');
    await page.waitForSelector('#games-list');
    await page.click('#games-list > ul > a:nth-child(2)');
    await page.waitForSelector('#edit-quiz-btn');
    await page.click('#edit-quiz-btn');
    await page.waitForSelector('#add-question-btn');
    await page.click('#add-question-btn');
    await page.click('input#text');
    await page.type('input#text', 'Test Question');
    await page.click('#choices > div:nth-child(1) > div > div > input');
    await page.type('#choices > div:nth-child(1) > div > div > input', 'choice1');
    await page.click('#choices > div:nth-child(2) > div > div > input');
    await page.type('#choices > div:nth-child(2) > div > div > input', 'choice2');
    await page.click('#submit-question-btn');
  }, 30000);

  test('error is displayed when question text is not provided', async () => {
    await login('test-user', 'testing123');
    await page.waitForSelector('#games-list');
    await page.click('#games-list > ul > a:nth-child(2)');
    await page.waitForSelector('#edit-quiz-btn');
    await page.click('#edit-quiz-btn');
    await page.waitForSelector('#add-question-btn');
    await page.click('#add-question-btn');
    await page.click('#submit-question-btn');
    await page.waitForSelector('#question-error');
    const error = await page.$eval('#question-error', e => e.innerText);
    expect(error).toEqual('You must provide text for the question');
  }, 30000);

  test('error is displayed when less than two answer options are provided', async () => {
    await login('test-user', 'testing123');
    await page.waitForSelector('#games-list');
    await page.click('#games-list > ul > a:nth-child(2)');
    await page.waitForSelector('#edit-quiz-btn');
    await page.click('#edit-quiz-btn');
    await page.waitForSelector('#add-question-btn');
    await page.click('#add-question-btn');
    await page.click('input#text');
    await page.type('input#text', 'Test Question');
    await page.click('#choices > div:nth-child(1) > div > div > input');
    await page.type('#choices > div:nth-child(1) > div > div > input', 'choice1');
    await page.click('#submit-question-btn');
    await page.waitForSelector('#question-error');
    const error = await page.$eval('#question-error', e => e.innerText);
    expect(error).toEqual('You must provide at least two answer options');
  }, 30000);

  test('error is displayed when attempting to publish a quiz with no questions', async () => {
    await login('test-user', 'testing123');
    await page.waitForSelector('#games-list');
    await page.click('#games-list > ul > a:nth-child(2)');
    await page.waitForSelector('#edit-quiz-btn');
    await page.click('#edit-quiz-btn');
    await page.waitForSelector('button[title="Save changes"]');
    await page.click('button[title="Save changes"]');
    const error = await page.$eval('div[role=alert]', e => e.textContent);
    expect(error).toEqual('You cannot publish a quiz without first adding a question!');
  }, 30000);

  test('users should have the option to edit quizzes where they are the creator', async () => {
    await login('test-user', 'testing123');
    await page.waitForSelector('#games-list');
    await page.click('#games-list > ul > a:nth-child(2)');
    await page.waitForSelector('#quiz-overview');
    const editBtn = await page.$('#edit-quiz-btn');
    expect(editBtn).toBeTruthy();
  }, 30000);

  test('users should have the option to delete quizzes where they are the creator', async () => {
    await login('test-user', 'testing123');
    await page.waitForSelector('#games-list');
    await page.click('#games-list > ul > a:nth-child(2)');
    await page.waitForSelector('#quiz-overview');
    const deleteBtn = await page.$('#delete-quiz-btn');
    expect(deleteBtn).toBeTruthy();
  }, 30000);

  test('users should NOT have the option to edit where they are NOT the creator', async () => {
    await login('test-user', 'testing123');
    await page.waitForSelector('#recents-list');
    await page.click('#recents-list > ul > a:nth-child(2)');
    await page.waitForSelector('#quiz-overview');
    const editBtn = await page.$('#edit-quiz-btn');
    expect(editBtn).toBeFalsy();
  }, 30000);

  test('users should NOT have the option to delete where they are NOT the creator', async () => {
    await login('test-user', 'testing123');
    await page.waitForSelector('#recents-list');
    await page.click('#recents-list > ul > a:nth-child(2)');
    await page.waitForSelector('#quiz-overview');
    const deleteBtn = await page.$('#delete-quiz-btn');
    expect(deleteBtn).toBeFalsy();
  }, 30000);

  test('users are able to add favourite from quiz overview page', async () => {
    await login('test-user', 'testing123');
    await page.waitForSelector('#recents-list');
    await page.click('#recents-list > ul > a:nth-child(2)');
    await page.waitForSelector('#set-favourite-btn');
    await page.click('#set-favourite-btn');
    await page.goto(`${baseUrl}/dashboard`);
    await page.waitForSelector('#favourites-list');
    const numFavourites = (await page.$$('#favourites-list > ul > a')).length;
    expect(numFavourites).toEqual(1);
  }, 30000);

  test('users are able to remove favourite from quiz overview page', async () => {
    await login('test-user', 'testing123');
    await page.waitForSelector('#recents-list');
    await page.click('#recents-list > ul > a:nth-child(2)');
    await page.waitForSelector('#set-favourite-btn');
    await page.click('#set-favourite-btn');
    await page.goto(`${baseUrl}/dashboard`);
    await page.waitForSelector('#favourites-list');
    const numFavourites = (await page.$$('#favourites-list > ul > a')).length;
    expect(numFavourites).toEqual(0);
  }, 30000);
});

afterAll(() => browser.close());

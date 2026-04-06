import {Page,test,expect} from '@playwright/test';

const invalidLogins  = [
    { username: 'studentss', password: 'Password123!', expectedError: 'Your username is invalid!' },
    { username: 'incorrectUser', password: 'Password123', expectedError: 'Your username is invalid!' },
    { username: 'student', password: 'wrongPassword', expectedError: 'Your password is invalid!' }
];

test.use({storageState:{cookies:[],origins:[]}});
let i=1;
for(const login of invalidLogins){

test(`Data Provider Test : ${i} with ${login.username}`, async({page})=>{
    await page.goto("https://practicetestautomation.com/practice-test-login/");
    await page.getByRole("textbox",{name:/username/i}).fill(login.username);
    await page.getByLabel(/password/i).fill(login.password);
    await page.getByRole("button",{name:/submit/i}).click();
    // await page.pause();
    await expect(page.getByText(login.expectedError).first()).toBeHidden(); 
});
    i++;
}
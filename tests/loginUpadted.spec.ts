import {expect,test} from '@playwright/test';

test.describe("All Tests in this block",() => {

    test.beforeEach(async ({page})=>{
        await page.goto("https://the-internet.herokuapp.com/login");
    });


    test("Validate Successful Navigation Test",async ({page}) =>{
        await expect(page).toHaveTitle("The Internet");
        await expect(page).toHaveURL(/login/);
    });
});
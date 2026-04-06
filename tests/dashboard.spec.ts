import {Locator} from '@playwright/test';
import {test,expect} from '../fixtures/myFixture';
import { PracticalPage } from '../pages/PracticalPage';

test.use({storageState:{cookies:[],origins:[]}});

test("Login with auth", async({page})=>{
    await page.goto("https://practicetestautomation.com/logged-in-successfully/");
    const logOut : Locator =  page.getByRole("link",{name:/log ?out/i});
    await expect(logOut).toBeVisible();
});


test("Logout",async({page,dashboardPage})=>{
    await page.goto("https://practicetestautomation.com/logged-in-successfully/");
    await dashboardPage.verifySuccessMessage();
    await dashboardPage.logOutClick();
});


test("Test Login",async({practical})=>{

    await practical.navigateTo();
    await practical.clickTestLoginPage();
});

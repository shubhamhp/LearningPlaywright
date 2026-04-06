import {expect,test} from '@playwright/test';


test("Valid Login", async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.setViewportSize({width:1920,height:1080});
    await page.getByLabel("Username").fill("tomsmith");
    await page.getByLabel("Password").fill("SuperSecretPassword!");
    await page.pause();
    await page.locator('button[type ="submit"]').click();
    const text : string = await page.locator('#flash').innerText();
    text.trim();
    console.log(text);
    await expect(page.locator('#flash')).toContainText("You logged into a secure area!");
});
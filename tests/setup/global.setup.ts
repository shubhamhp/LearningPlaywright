import {test as setup,expect} from '@playwright/test';


const AUTH_FILE = 'playwright/.auth/student-session.json'
setup("Authorization from Global Setup",async({page})=>{

    await page.goto("https://practicetestautomation.com/practice-test-login/");
    
    await page.getByRole("textbox",{name:/username/i}).fill("student");
    await page.getByLabel(/password/i).fill("Password123");
    await page.getByRole("button",{name:/submit/i}).click();
    await expect(page.getByText(/Logged In Successfully/)).toBeVisible();

    await page.context().storageState({path:AUTH_FILE});
});
import {test} from '@playwright/test';


test("Mocking 500 Internal", async({page})=>{

   await page.route("**/*.{png,jpg,jpeg}", async(route)=>{
        route.abort(); 
   });

   await page.goto("https://practicetestautomation.com/practice/");
});
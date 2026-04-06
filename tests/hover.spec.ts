import {test,Page,expect} from '@playwright/test';
import { Hovers } from '../pages/Hovers';
import { request } from 'node:http';

test("Hovering test",async({page})=>{

    const hovers = new Hovers(page);
    await hovers.navigateTo();
    await hovers.hoverFunction();
});


test("Get Request", async({request})=>{

    const response = await request.get("https://jsonplaceholder.typicode.com/users/1");
    const status = await response.status();
    expect(status).toBe(200);
    const jsonData = await response.json();
    console.log(jsonData);
    
    expect(jsonData.name).toEqual("Leanne Graham");
    expect(jsonData.company.name).toEqual("Romaguera-Crona")
});


test("Post Request",async({request})=>{

    const newPostData = {
        title: "My First Automated Post",
        body: "Playwright API testing is awesome.",
        userId: 101
    }

    const response = await request.post("https://jsonplaceholder.typicode.com/posts",{
        data: newPostData
    });
    const status = response.status();
    expect(status).toBe(201);
    const jsonData = await response.json();
    console.log(jsonData);
    expect(jsonData.title).toEqual("My First Automated Post");
});


test("Put Request",async({request})=>{
    const updateData = {
        id:1,
        title: "Updated Title", 
        body: "This is overwritten",  
        userId: 1
    }

    const targetId =1;
    const response = await request.put(`https://jsonplaceholder.typicode.com/posts/${targetId}`,{
        data:updateData
    })

    expect(response.status()).toBe(200);
    const jsonData = await response.json();
    console.log(jsonData);
    expect(jsonData.title).toEqual("Updated Title");
});


test("Delete Request",async({request})=>{
    const targetId = 1;

    const response = await request.delete(`https://jsonplaceholder.typicode.com/posts/${targetId}`);
    expect(response.status()).toBe(200);
    const jsonData = await response.json();
    console.log(jsonData);
    expect(jsonData).toEqual({});
});


test("Mocking API",async({page})=>{

    await page.route('*/**/api/v1/fruits', async(route)=>{
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            json: [
                { name: "Bhai's Special Apple", id: 1 } 
            ]
        });
    });

    await page.goto('https://demo.playwright.dev/api-mocking');

    const fakeFruitOnScreen = page.getByText("Bhai's Special Apple");
    
    // Now we assert that the locator is actually visible on the screen
    await expect(fakeFruitOnScreen).toBeVisible();
});


test("Mocking API 2",async({page})=>{

    await page.route("*/**/api/v1/fruits", async(route)=>{

        const response = await route.fetch();
        const jsonData = await response.json();
        jsonData[0].name = 'Bad Apple';

        await route.fulfill({
            response : response,
            json: jsonData
        });
    });

    await page.goto('https://demo.playwright.dev/api-mocking');

    const fakeFruitOnScreen = page.getByText("Bad Apple");
    await expect(fakeFruitOnScreen).toBeVisible();
});


test("Critical Failure Mocking",async({page})=>{

    await page.route("*/**/api/v1/fruits", async(route)=>{
        await route.fulfill({
            status: 500,
            contentType: 'plain/text',
            body: "CRITICAL DATABASE FAILURE"
        });
    });

    const [response] =await Promise.all([
    page.waitForResponse('*/**/api/v1/fruits'),
    page.goto("https://demo.playwright.dev/api-mocking")
    ]);
    
    await expect(response.status()).toBe(500);
    const error = page.getByText("Strawberry");
    await expect(error).toBeHidden();
});


test("Final API Exercise", async({page})=>{

    await page.route("*/**/a[i/v1/fruits", async(route)=>{

        const response = await route.fetch();
        const jsonData = await response.json();

        await route.fulfill({
            status:200,
            response:response,
            json:[]
        });
    });

    await page.goto("https://demo.playwright.dev/api-mocking")
    const strawberry = page.getByText("Strawberry");
    expect(strawberry).toBeHidden();
});
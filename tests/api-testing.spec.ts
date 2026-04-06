import { expect, test } from "@playwright/test";

test.use({storageState:{cookies:[],origins:[]}});

test("API: Create User via POST", async ({ request }) => {

    // 1. Fire the payload
    const response = await request.post("https://jsonplaceholder.typicode.com/posts", {
    data: {
        title: "Senior SDET",
        body: "Testing the firewall",
        userId: 1
    }
});

    // 2. Assert Network Status (Function call!)
    expect(response.status()).toBe(201);

    // 3. Parse and Assert Data (No await, No toHaveText)
    const json = await response.json();
    expect(json.title).toBe("Senior SDET");
    
    console.log(`Successfully created user ID: ${json.id}`);
});
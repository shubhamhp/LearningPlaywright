import {test,expect} from '@playwright/test';

test.use({storageState:{cookies:[], origins:[]}});

test("Performing small things",async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/infinite_scroll");

    await page.evaluate(()=> window.scrollTo(0,document.body.scrollHeight));
    await page.waitForTimeout(1000);

    const title = await page.evaluate(()=> {return document.title;});
    console.log(title);
});

test("Drag and Drop", async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/drag_and_drop");
    const boxA = page.locator("#column-a");
    const boxB = page.locator("#column-b");
    await boxA.dragTo(boxB);
    await expect(boxA).toHaveText(/B/i);
});


test("Window Handling",async({page,context})=>{
    await page.goto("https://the-internet.herokuapp.com/windows");
    await Promise.all([
        context.waitForEvent('page'),
        await page.getByRole("link",{name:/Click ?Here/i}).click()
    ]);
    const allTabs = context.pages();
    await allTabs[1].waitForLoadState();
    await expect(allTabs[1].getByText("New Window")).toBeVisible();
    await allTabs[1].close();
});


test("Frame Handling",async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/iframe");
    const frame = page.frameLocator("#mce_0_ifr");
    const paragraph = await frame.locator("body>p");
    await paragraph.evaluate((node)=>{node.textContent=''});
    await page.pause();
    await paragraph.evaluate((node)=>{node.textContent="Bhai, I just hacked the iFrame."});
    await expect(paragraph).toHaveText("Bhai, I just hacked the iFrame.");

});
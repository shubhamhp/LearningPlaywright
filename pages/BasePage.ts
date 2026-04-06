import {Locator, Page,test} from '@playwright/test';

export class BasePage{
    readonly page : Page;

    constructor(page:Page) {
        this.page = page;
    }

    async waitAndClick(locator : Locator,elementName : string){
        await test.step(`Clicking the element ${elementName}`,async()=>{
            await locator.click();
        });
    }

    async enterText(locator : Locator,text:string,elementName : string){
        await test.step(`Entering text into the ${elementName}`, async()=>{
            await locator.fill(text);
        })
    }
}
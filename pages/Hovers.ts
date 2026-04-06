import {test,Page, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class Hovers extends BasePage {
    
    constructor(page:Page){
        super(page);
    }

    async navigateTo(){
        await this.page.goto("https://the-internet.herokuapp.com/hovers");
    }

    async hoverFunction() {
        const fig = await this.page.locator(".figure").all();
        const figCaption = await this.page.locator(".figcaption").all();
        let i=0;
        for(const figure of fig){

            await figure.hover();
            const header = await figCaption[i].getByRole("heading");
            const link = await figCaption[i].getByRole("link");
            expect(header).toBeVisible();
            expect(link).toBeVisible();
            const headerText = await header.innerText();
            const linkText = await link.innerText();
            expect(headerText).toEqual(`name: user${i+1}`);
            expect(linkText).toContain("View profile");
            i++;
        }

    }
}
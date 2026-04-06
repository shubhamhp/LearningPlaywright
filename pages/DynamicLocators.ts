import { expect, Page,test } from '@playwright/test';
import { BasePage } from './BasePage';


export class DynamicLocators extends BasePage{

    constructor(page:Page){
        super(page);
    }

    async navigateTo(){
        await this.page.goto("https://the-internet.herokuapp.com/dynamic_controls");
    }

    async assertFunction(){

        const checkbox = this.page.getByRole("checkbox");
        this.waitAndClick(checkbox,"checkbox");
        const remove = this.page.getByText("Remove",{exact:true});
        await this.waitAndClick(remove,"remove");
        await expect(checkbox).toBeHidden();
        const msg = this.page.locator("#message");
        await expect(msg).toHaveText("It's gone!");
    }
}

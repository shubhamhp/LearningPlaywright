import {Locator, Page,expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class PracticalPage extends BasePage {
    constructor(page:Page){
        super(page);
    }

    get testLoginPageLink() : Locator {
        return this.page.getByRole("link", {name:/test login page/i});
    }

    get exceptionsLink() {
        return this.page.getByRole("link",{name:/test exceptions/i});
    }

    async navigateTo(){
        await this.page.goto("https://practicetestautomation.com/practice/");
    }

    async clickTestLoginPage() {
        await this.testLoginPageLink.click();
    }
}

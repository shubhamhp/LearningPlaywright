import {Page,Locator,expect} from '@playwright/test';
import {BasePage} from './BasePage';

export class DashboardPage extends BasePage {

    readonly sucessButton : Locator;
    readonly logOutButton : Locator;


    constructor(page:Page){
        super(page);
        this.sucessButton = page.getByRole("heading",{name:/logged in successfully/i});
        this.logOutButton = page.getByRole("link", {name: /log ?out/i});

    }

    async verifySuccessMessage(){
        await expect(this.sucessButton).toBeVisible();
    }

    async logOutClick(){
        await this.logOutButton.click();
    }

}
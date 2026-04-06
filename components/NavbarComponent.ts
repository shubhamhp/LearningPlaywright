import {Page,Locator} from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class NavbarComponents extends BasePage {

    constructor(page : Page){
        super(page);
    }

    get logoutLink() : Locator {
        return this.page.getByRole('link', {name:'Logout'});
    }

    async performLogout() {
        await this.waitAndClick(this.logoutLink,`Logged out by clicking on ${this.logoutLink}`);
    }
}
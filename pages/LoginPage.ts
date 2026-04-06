import {Locator, Page} from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
   

    constructor(page : Page){
        super(page);
    }

    get userName() : Locator {
        return this.page.getByLabel("Username");
    }

    get password() : Locator {
        return this.page.getByLabel("Password");
    }

    get loginButton() : Locator {
        return this.page.getByRole('button',{name: /login/i});
    }
    async navigateTo() {
        await this.page.goto("https://the-internet.herokuapp.com/login");
    }

    async login(user : string, password : string){
        // await this.userName.fill(user);
        // await this.password.fill(password);
        // await this.loginButton.click();


        await this.enterText(this.userName,user,"Username field");
        await this.enterText(this.password,password,"Password field");
        await this.waitAndClick(this.loginButton,"Clicking on Login button");
    }
}
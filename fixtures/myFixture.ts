import {Page} from '@playwright/test';
import {test as BaseTest} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {DashboardPage} from '../pages/DashboardPage';
import { SecureArea } from '../pages/SecureArea';
import { PracticalPage } from '../pages/PracticalPage';

type myFixture = {
    loginPage : LoginPage;
    dashboardPage : DashboardPage;
    secureArea : SecureArea;
    practical : PracticalPage;
};


export const test = BaseTest.extend<myFixture>({

    loginPage : async ({page},use)=>{

        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    dashboardPage : async ({page},use)=>{
        const dashboard = new DashboardPage(page);
        await use(dashboard);
    },

    secureArea : async ({page},use)=>{
        const secureArea = new SecureArea(page);
        await use(secureArea);
    },

    practical : async({page},use)=>{
        const practical = new PracticalPage(page);
        await use(practical);
    }

});

export {expect} from '@playwright/test';
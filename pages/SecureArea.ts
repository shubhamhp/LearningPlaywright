import {Locator,Page} from '@playwright/test';
import { BasePage } from './BasePage';
import { NavbarComponents } from '../components/NavbarComponent';

export class SecureArea extends BasePage {
    readonly navBar : NavbarComponents;

    constructor(page : Page){
        super(page);
        this.navBar = new NavbarComponents(page);
    }

    get flashAlert() : Locator {
        return this.page.locator('#flash');
    }
    
}
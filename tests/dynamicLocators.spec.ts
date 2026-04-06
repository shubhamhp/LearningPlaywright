import {Page,test} from '@playwright/test';
import { DynamicLocators } from '../pages/DynamicLocators';

test("Checkbox assertion",async({page})=>{
    const dL = new DynamicLocators(page);

    await dL.navigateTo();
    await dL.assertFunction();
});
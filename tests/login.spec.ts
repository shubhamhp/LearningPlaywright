import {test,expect} from '../fixtures/myFixture';


test('Valid Login Testcase',async({loginPage,secureArea})=>{
    console.log("Starting browser test");
    await loginPage.navigateTo();
    await loginPage.login("tomsmith","SuperSecretPassword!");
    await expect(secureArea.flashAlert).toContainText("You logged into a secure area!");
    await secureArea.navBar.performLogout();
})
import {test,Page} from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { DataTable } from '../pages/DataTable';


test("Verifying the data table function",async({page})=>{

    const dataTable = new DataTable(page);
    await dataTable.navigateTo();
    await dataTable.deleteUserByEmail("jsmith@gmail.com");
    await dataTable.deleteUserByEmail("fbach@yahoo.com");

});


test("Printing the fetched table",async({page})=>{
    console.log("Starting test");
    const dataTable = new DataTable(page);
    await dataTable.navigateTo();
    let list : Record<string,string>[] = [];
    list = await dataTable.fetchDataFromTable1();
    console.log(`TOTAL ROWS GRABBED: ${list.length}`);
    for(const row of list){
        console.log(row);

        for(const[key,value] of Object.entries(row)){
            console.log(`${key} : ${value}`);
        }
    }
    await dataTable.sortingVerification("Due");
});
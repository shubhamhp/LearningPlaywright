import {test,Page,Locator, expect} from '@playwright/test';
import { BasePage } from './BasePage';

export class DataTable extends BasePage {

    constructor(page: Page){
        super(page);
    }

    async navigateTo(){
        await this.page.goto("https://the-internet.herokuapp.com/tables");
    }

    async deleteUserByEmail(email: string) {
        const table1Rows = this.page.locator("#table1").getByRole('row');
        const deleteIndividuals = table1Rows.filter({hasText: email}).getByRole('link',{name:/delete/i});
        await this.waitAndClick(deleteIndividuals,email);
    }

    async fetchDataFromTable1() : Promise<Record<string,string>[]> {

        const table = this.page.locator("#table1");
        const firstRow = await table.locator("tbody tr").first().waitFor({state: 'attached'});
        const tableHeader = await table.locator("th").allInnerTexts();
        const rows = await table.locator("tbody tr").all();
        const fullTableData : Record<string,string>[] = [] ;
        for(const row of rows){
            const rowObj : Record<string,string> = {};
            const cell = await row.locator('td').allInnerTexts();

            for(let i=0;i<tableHeader.length;i++){
                rowObj[tableHeader[i]] = cell[i];
            }

             fullTableData.push(rowObj);
        }
         return fullTableData;
        
    }

    async sortingVerification(columnName:string) {
       const table = this.page.locator("#table1");
       const header =  table.locator("th span").filter({hasText: columnName});
       await header.click({force:true});
       
       const dueValues = await this.page.locator("//*[@id='table1']/tbody/tr/td[starts-with(text(),'$')]").allInnerTexts();
       const values : number[] = [];
       for(const value of dueValues){
         let dueAmt : number =    parseFloat(value.replaceAll('$','').trim());
         console.log(dueAmt);
         values.push(dueAmt);
       }
       const sortedValues = [...values].sort((a,b)=>a-b);
       expect(values).toEqual(sortedValues);
    }
}
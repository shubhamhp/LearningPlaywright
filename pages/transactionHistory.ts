import {test,Page} from '@playwright/test';
import { BasePage } from './BasePage';

export class transactionHistory extends BasePage{
    constructor(page:Page){
        super(page);
    }

    async downloadReceipt(transactionId: string){
        while(true){
           const targetRow = this.page.getByRole('row').filter({hasText: transactionId});
           if(await targetRow.count()>0){
                this.waitAndClick(targetRow,"transactionId");
                break;
           }
           else{
            const nextButton = this.page.getByRole('button',{name:/next/i});
            this.waitAndClick(nextButton,"NextButton");
           }
        }
    }

    async getPortfolioData2() : Promise<Record<string,string>[]> {
        const table = this.page.locator("#crypto-portfolio");
        const headers = await table.locator("th").allInnerTexts();
        const rows = await this.page.locator('tbody tr').all();
        const fullTableData : Record<string,string>[] =[];
        for(const row of  rows){
            const rowObj : Record<string,string> = {};
            const cells = await row.locator('td').allInnerTexts();
            for(let i=0;i<headers.length;i++){
                rowObj[headers[i]] = cells[i];
            }

            fullTableData.push(rowObj);
        }
    
        return fullTableData;
    }

    async getPortfolioData(): Promise<Record<string, string>[]> {
        const table = this.page.locator("#crypto-portfolio");
        
        // 1. Grab headers using 'th'
        const headers = await table.locator('th').allInnerTexts();
        
        // 2. Grab physical rows from the body using .all()
        const rows = await table.locator('tbody tr').all();
        
        const fullTableData: Record<string, string>[] = [];
        
        for (const row of rows) {
            const rowObj: Record<string, string> = {};

            // 3. Grab the cell texts for THIS specific row
            const cells = await row.locator('td').allInnerTexts();

            for (let i = 0; i < headers.length; i++) {
                // Map the header to the specific cell
                rowObj[headers[i]] = cells[i];
            }

            fullTableData.push(rowObj);
        }
    
        return fullTableData;
    }
}
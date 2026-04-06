import {Page,test} from '@playwright/test';
import { BasePage } from './BasePage';

export class PortfolioPage extends BasePage{

    constructor(page:Page){
        super(page);
    }

    async sellStock(stockName: string) {
        
        const allRows  = this.page.getByRole('row');
        const specificRow = allRows.filter({hasText: stockName}).getByRole('button',{name:/sell/i});
        await this.waitAndClick(specificRow,stockName);

    }
}
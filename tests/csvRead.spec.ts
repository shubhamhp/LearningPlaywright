import {Page,test,expect} from '@playwright/test';
import * as fs from 'fs';
import { wrap } from 'module';
import * as xlsx from 'xlsx';

const rawCsvData = `Last Name,First Name,Email,Due,Web Site
Smith,John,jsmith@gmail.com,$50.00,http://www.jsmith.com
Bach,Frank,fbach@yahoo.com,$51.00,http://www.frank.com
Doe,Jason,jdoe@hotmail.com,$100.00,http://www.jdoe.com
Conway,Tim,tconway@earthlink.net,$50.00,http://www.timconway.com`;

fs.writeFileSync("testData.csv",rawCsvData);

const expectedData = fs.readFileSync("testData.csv",'utf-8').split('\n')
.slice(1).map(row => {
    const cols = row.split(',');
    return {lastName: cols[0], firstName: cols[1], email: cols[2], due: cols[3], website: cols[4]};
});

test.use({storageState:{cookies:[],origins:[]}});
test("CSV Reading",async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/tables");

    const actualUI = await page.evaluate(()=>{
        const rows = Array.from(document.querySelectorAll("#table1 tbody tr"));
        
        return rows.map(row => {
            const cols = row.querySelectorAll("td");
            return {
                lastName: cols[0].innerText.trim()
                , firstName: cols[1].innerText.trim()
                , email: cols[2].innerText.trim()
                , due: cols[3].innerText.trim()
                , website: cols[4].innerText.trim()
            }
        });
    });

    expect(expectedData).toEqual(actualUI);
});



// const xlsx = require('xlsx');
const expectedDataExcel = [
    { lastName: 'Smith', firstName: 'John', email: 'jsmith@gmail.com', due: '$50.00', website: 'http://www.jsmith.com' },
    { lastName: 'Bach', firstName: 'Frank', email: 'fbach@yahoo.com', due: '$51.00', website: 'http://www.frank.com' },
    { lastName: 'Doe', firstName: 'Jason', email: 'jdoe@hotmail.com', due: '$100.00', website: 'http://www.jdoe.com' },
    { lastName: 'Conway', firstName: 'Tim', email: 'tconway@earthlink.net', due: '$50.00', website: 'http://www.timconway.com' }
];

const worksheet = xlsx.utils.json_to_sheet(expectedDataExcel);
const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook,worksheet,"ExcelData");
xlsx.writeFile(workbook,"testExcelData.csv");
console.log("Excel Created");


test("Excel Verification",async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/tables");

    const actualUI = await page.evaluate(()=>
        {
            const rows = Array.from(document.querySelectorAll("#table1 tbody tr"));
            return rows.map((row)=>{
                const cols = row.querySelectorAll("td");
                return{
                    lastName: cols[0].innerText.trim()
                , firstName: cols[1].innerText.trim()
                , email: cols[2].innerText.trim()
                , due: cols[3].innerText.trim()
                , website: cols[4].innerText.trim()
                }
            });    
        });

    xlsx.readFile("testExcelData.csv");
    const sheet = workbook.Sheets['ExcelData'];
    const expectedData = xlsx.utils.sheet_to_json(sheet);
    expect(expectedData).toEqual(actualUI);

});

const maxRetry = 3;
let role : string = "admin";
let stocks : string[] = ["HDFC","Bandhan","ATL"];
let auditTestCase = (expectedResults:string,actualResults:string): boolean =>{
    return expectedResults===actualResults;
}

console.log("Retry Limit:", maxRetry);
console.log("User Role:", role);
console.log("Tickers:", stocks);
console.log("Audit Match?", auditTestCase("Pass", "Pass")); 
console.log("Audit Fail?", auditTestCase("Pass", "Fail"));
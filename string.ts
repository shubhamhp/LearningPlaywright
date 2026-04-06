const message = "  Success! Transaction ID: TXN-8943  ";
const extractTransactionId = (message:string) : string =>{
    return message.split(":")[1].trim();
}

console.log("Id is = ", extractTransactionId(message));

let url : string = "https://abc-admin.com";
let url2 : string ="https://abc.com";
let url3 : string ="htt//abc.com";

const isValidAdminUrl = (url:string):boolean =>{
    if(url.includes("admin") && url.startsWith("https://")){
        return true;
    }
    return false;
}

console.log("URL 1 ", isValidAdminUrl(url));
console.log("URL 2 ", isValidAdminUrl(url2));
console.log("URL 3 ", isValidAdminUrl(url3));
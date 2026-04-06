interface TradeRequest {
    assetSymbol : string,
    amount : number,
    isBuyOrder : boolean
}

let trade : TradeRequest = {
    assetSymbol : "Rupees",
    amount : 444,
    isBuyOrder: true
}

class TradingTerminal {

    readonly url: string;

    constructor(){
        this.url = "https://trade.iss-stoxx.com";
    }

    submitTrade(request : TradeRequest) : void{
        console.log(`Navigated to ${this.url}. Submitting order for ${request.amount} units of BTC.`)
    }
}

const terminal = new TradingTerminal();
terminal.submitTrade(trade);
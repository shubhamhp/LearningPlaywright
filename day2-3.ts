interface TraderCredentials {
    username : string,
    accessLevel : string
}


let adminUser : TraderCredentials = {
    username: "SP",
    accessLevel : "Goat"
}

class PortfolioDashboard {
    readonly dashboardUrl: string;
    readonly maxLoad : number;

    constructor(url:string,maxLoad:number){
        this.dashboardUrl = url;
        this.maxLoad = maxLoad;
    }

    accessDashboard(user : TraderCredentials) : void {
        console.log(`Loading ${this.dashboardUrl} with a ${this.maxLoad}ms timeout. Authenticating trader: ${user.username} with ${user.accessLevel} access.`)
    }
}

const qaDashboard = new PortfolioDashboard("http//:abc.com",4);
qaDashboard.accessDashboard(adminUser);

const devDashboard = new PortfolioDashboard("https//:bc.com",500);
devDashboard.accessDashboard(adminUser);
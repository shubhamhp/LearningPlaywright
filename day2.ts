interface EnvironmentConfig {
    envName : string,
    baseUrl : string,
    maxRetries : number
}

let qaEnvironment : EnvironmentConfig = {
    envName: "QA",
    baseUrl: "sexy",
    maxRetries: 3
};

const runTestSetup = (config :EnvironmentConfig) : void =>{
    console.log(`Starting test with ${config.baseUrl}  With max retries  ${config.maxRetries}`);
}

runTestSetup(qaEnvironment);
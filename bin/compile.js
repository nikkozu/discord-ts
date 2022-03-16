const { exec } = require("./Exec");
const { log, time, timeEnd, error } = require("console");

(async () => {
    try {
        // Start the compiler
        log("[COMPILE] Starting compile command...");

        // Removing old dist folder
        time("[COMPILE] Compile time");
        log("[CLEANUP] Removing old dist folder...");
        await exec("rm -rf ./dist");
        log("[CLEANUP] Finished removing the old dist folder.");

        // Compiling the project
        log("[COMPILE] Compile the project using the TSC compiler...");
        await exec("tsc");
        log("[COMPILE] Finished compiling the project!");
        timeEnd("[COMPILE] Compile time");
    } catch (err) { // Catch if there is an error from command
        error(err);
        timeEnd("[COMPILE] Compile time");
    }
})();
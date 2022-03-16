const { exec } = require("./Exec");
const { log, time, timeEnd, error } = require("console");

(async () => {
    try {
        const argv = process.argv.slice(2);
        const command = "eslint --ext ts .";

        log("[LINT] Starting lint command...");

        time("[LINT] Linter time");
        if (argv[0] == "fix") {
            time("[LINT FIX] Linter fixing time");
            log("[LINT FIX] Fixing your code using eslint...");
            await exec(`${command} --fix`);
            log("[LINT FIX] Finished fixing your code!");
            timeEnd("[LINT FIX] Linter fixing time");
            return;
        }
        log("[LINT] Linting your code, checking for error...");
        await exec(command);

        log("[LINT] No error has found on your code, good work!");
        timeEnd("[LINT] Linter time");
    } catch (err) {
        if (err.code === 1) {
            log("[LINT] Error has occurred on your code! Use `lint:fix` command to fix the error!");
            timeEnd("[LINT] Linter time");
            return;
        }

        error(err);
        timeEnd("[LINT] Linter time");
    }
})();
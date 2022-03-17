/**
 * Execute shell command as it would happen in BASH script
 * @param {string} command command to execute
 * @param {Object} [options] set `capture` to TRUE, to capture and set `echo` to TRUE, to echo command passed.
 * @returns {Promise<{code: number, data: string | undefined, error: Object}>}
 */
module.exports.exec = (command, { capture = false, echo = false } = {}) => {
    if (echo) console.log(`> ${command}`);

    const { spawn } = require("child_process");
    const childProcess = spawn("bash", ["-c", command], {
        stdio: capture ? "pipe" : "inherit",
    });

    return new Promise((resolve, reject) => {
        let stdout = "";

        if (capture) {
            childProcess.stdout.on("data", (data) => {
                stdout += data;
            });
        }

        childProcess.on("error", (error) => {
            reject({ code: 1, error: error });
        });

        childProcess.on("close", (code) => {
            if (code > 0) {
                return reject({
                    code: code,
                    error: `Command failed with code ${code}`
                });
            }
            
            resolve({ code: code, data: stdout });
        });
    });
};


/**
 * Compare 2 arrays
 * @param {any[]} a First array
 * @param {any[]} b Second array
 * @return {boolean} True if the arrays are the same, false otherwise
 * @throws {Error} No arrays given
 */
export async function compareArrays(a: any[], b: any[]): Promise<boolean> {
    if (a.length === 0 || b.length === 0) throw new Error("No arrays given");
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        const objA = a[i];
        const objB = b[i];
        if (JSON.stringify(objA) !== JSON.stringify(objB)) return false;
    }
    return true;
}

/**
 * Ping an IP Address
 * @param {string} ip
 * @returns {Promise<string[]>} True if the IP Address is reachable, false otherwise + ping info
 */
export async function ping (ip: string) : Promise<string[]> {
    const config = require("../config.json");
    const pingConfig = {
        timeout: config.ping.timeout,
        extra: config.ping.extra,
    }
    const ping = require('ping');
    const res = await ping.promise.probe(ip, pingConfig);
    const output: string[] = extractPingInfo(res.output);
    output.unshift(res.alive.toString());
    return output;
}

/**
 * Function to extract ping information from ping output
 * @param {string} pingOutput The output of the ping command
 * @returns {string[]} Array that contains the number of packets sent, received and lost
 */
function extractPingInfo (pingOutput: string) : string[] {
    const temp: string[] = pingOutput.trim().split("\n");
    return temp[temp.length - 2].split(",").map((part: string) => part.trim());
}

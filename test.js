const {verifyProof} = require("./lib/verify");

const input = {
    "a" : "5",
    "b" : "10"
};

const path = "./simple";

async function main() {
    const res = await verifyProof(input, path);
    console.log(res);
}

main();
# zero-shield

> **Zero-knowledge, zero friction.** Write Circom. Compile. Deploy. Verify — powered by Base.

`zero-shield` is a developer-first SDK that lets any JavaScript developer integrate zero-knowledge proofs into their product — no cryptography background, no Web3 scripting, no ABI wrangling.

---

## Why zero-shield?

ZK proofs are powerful but notoriously hard to integrate. zero-shield abstracts the entire pipeline — from writing a Circom circuit to verifying a proof on-chain — into a single CLI and one JavaScript function.

| Without zero-shield | With zero-shield |
|---|---|
| Manually run `snarkjs` commands | `npx zero-shield compile` |
| Write deployment scripts | `npx zero-shield deploy` |
| Handle ABI, calldata formatting | `verifyProof({ input, path })` |
| Deep Web3 and ZK knowledge required | Just know your circuit inputs |

---

## Features

- **Compile** Circom circuits with full Groth16 trusted setup in one command
- **Test** ZK proofs locally before going on-chain
- **Deploy** verifier contracts to Base with no Web3 setup
- **Verify** proofs programmatically with a single JavaScript function call
- Zero dependency on snarkjs or ethers directly — fully abstracted

---

## Installation

```bash
npm install zero-shield
```

---

## Usage

### 1. Compile a Circom circuit

```bash
npx zero-shield compile <path-to-your-circom-file>
```

Generates the following in a folder named after your circuit (e.g. `./yourCircuit/`):

| Output | Description |
|---|---|
| `.r1cs` | Constraint system |
| `.wasm` | WebAssembly witness generator |
| `circuit_final.zkey` | Groth16 proving key |
| `verifier.sol` | Solidity verifier contract |

---

### 2. Test the circuit locally

```bash
npx zero-shield test <path-to-generated-folder> <path-to-input.json>
```

Runs your ZK circuit against real inputs and produces:

- `proof.json` — smart contract calldata parameters for on-chain verification
- `public.json` — human-readable public signals and outputs

---

### 3. Deploy the verifier to Base

```bash
npx zero-shield deploy <path-to-generated-folder> <PRIVATE_KEY>
```

Compiles `verifier.sol` using `solc` and deploys it to Base. Gas fees are deducted from the provided wallet.

---

### 4. Verify a proof programmatically

```js
const { verifyProof } = require("zero-shield");

const result = await verifyProof({
  input: {
    // your circuit inputs here
  },
  folderPath: "./yourCircuit"
});

console.log(result ? "✅ Proof valid" : "❌ Proof invalid");
```

Internally, this:
1. Generates the ZK proof from your inputs
2. Formats calldata for the Solidity verifier
3. Calls the deployed contract on Base
4. Returns a boolean result

No snarkjs. No web3 calls. No ABI handling.

---

## CLI Reference

| Command | Description |
|---|---|
| `npx zero-shield compile <circuit.circom>` | Compile circuit and run Groth16 trusted setup |
| `npx zero-shield test <output-folder> <input.json>` | Test circuit locally, generate proof and public signals |
| `npx zero-shield deploy <output-folder> <private-key>` | Deploy verifier contract to Base |
| `verifyProof({ input, folderPath })` | Generate and verify proof on-chain *(programmatic)* |

---

## How it works

```
Your Circom Circuit
       │
       ▼
  zero-shield compile
       │
       ├── .r1cs  (constraints)
       ├── .wasm  (witness generation)
       ├── .zkey  (proving key)
       └── verifier.sol
                │
                ▼
       zero-shield deploy
                │
                ▼
     Base (on-chain verifier)
                │
                ▼
      verifyProof({ input })
                │
                ▼
         true / false
```

---

## Built With

- [Circom](https://docs.circom.io/) — circuit language
- [snarkjs](https://github.com/iden3/snarkjs) — ZK proof generation (abstracted)
- [Base](https://www.coinbase.com/) — EVM-compatible deployment target
- [solc](https://docs.soliditylang.org/en/latest/using-the-compiler.html) — Solidity compiler

---

## License

MIT
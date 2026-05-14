# shadow-vault-interface

Frontend for the **Void State Protocol** — a dead man's switch system built on Stellar/Soroban. Encrypt files locally, split the master key using Shamir's Secret Sharing, and deploy shards to an on-chain contract. Beneficiaries claim vaults anonymously via ZK-SNARK proofs.

## How it works

1. **Create a vault** — configure shard count and recovery threshold, encrypt a file locally (AES-256, never leaves your machine), split the master key into shards, and deploy to the `shadow-core-contract` on Stellar.
2. **Heartbeat monitor** — dashboard showing active vaults, TTL countdowns, and shard counts. Vaults must be periodically "fed" to stay alive.
3. **Shadow Portal** — beneficiaries enter a claim key, generate a ZK-SNARK proof locally (via snarkjs), submit it to the contract, and reconstruct the data from released shards — identity never revealed.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Stellar/Soroban** — smart contract backend
- ZK proofs via **snarkjs** (WASM, runs locally)

## Getting started

```bash
npm install
cp .env.local.example .env.local
# fill in your contract ID and RPC URL
npm run dev
```

## Environment variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SOROBAN_RPC_URL` | Soroban RPC endpoint (default: testnet) |
| `NEXT_PUBLIC_CORE_CONTRACT_ID` | Deployed `shadow-core-contract` address |
| `NEXT_PUBLIC_GUARDIAN_API` | Void State guardian API URL |

## Routes

| Path | Description |
|---|---|
| `/` | Heartbeat monitor dashboard |
| `/create` | Vault designer (encrypt → shard → deploy) |
| `/portal` | Anonymous beneficiary claim flow |

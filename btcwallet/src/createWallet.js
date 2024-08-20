//Import dependecies

const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//Set network (bitcoin or testnet)
const network = bitcoin.networks.testnet

//Address HD Wallet
const path = `m/49'/1'/0'/0'`

let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//Root seed
let root = bip32.fromSeed(seed, network)

//Create account pub and pvt keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Wallet created")
console.log("Address: ", btcAddress)
console.log("Private key: ", node.toWIF())
console.log("Seed: ", mnemonic)
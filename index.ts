import Web3 from "web3"

const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/")

const main = async () => {
  const TerryAccount = web3.eth.accounts.privateKeyToAccount("4bd2e642a117cecf1184841799a95707685b66c7f001d3e4a1a2df132fa15abe")
  console.info("Terry address:", TerryAccount.address)

  const AliceAccount = web3.eth.accounts.privateKeyToAccount("e24a5ea109c74c170303e1e380978b19aaa84c1f9b310aa933c32005ecc3b0e0")
  console.log("Alice address:", AliceAccount.address)

  const balance = await web3.eth.getBalance(TerryAccount.address)
  console.log("Terry balance", balance)

  // nonce
  const nonce = await web3.eth.getTransactionCount(TerryAccount.address)
  console.log("Terry Nonce:", nonce)

  // gas price
  const gasPrice = await web3.eth.getGasPrice()

  // with send ETH, gas will be 21000
  const gas = 21000

  // chain id
  const networkId = await web3.eth.net.getId()

  // send some ether from Terry to Alice
  const rawTransaction = {
    to: AliceAccount.address,
    gas,
    gasPrice,
    nonce,
    value: 0x1, // 1 wei
    chainId: networkId
  }
  console.log("Raw Transaction:", rawTransaction)

  const signedTransaction = await TerryAccount.signTransaction(rawTransaction)
  console.log("Signed Transaction:", signedTransaction)

  console.log("Send Transaction")

  const receipt = signedTransaction.rawTransaction ? await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction): "" ;
  console.log("Receipt:", receipt)
}

main()

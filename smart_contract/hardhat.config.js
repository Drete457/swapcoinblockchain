require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity : '0.8.0',
  networks : {
    ropsten : {
      url: 'https://eth-ropsten.alchemyapi.io/v2/ykd3yCOi1excc3vBcAmhDY6Zy0B5y6SJ',
      accounts: ['dca6d945ec132de413018f241fd902a7058049a67ee16956876a711c936fad66'],
    }
  }
}
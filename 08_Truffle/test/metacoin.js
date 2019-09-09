const MetaCoin = artifacts.require("MetaCoin");

contract('MetaCoin', (accounts) => {
  // console.log(accounts);

  // 배포된 컨트랙트로부터 MetaCoin 인스턴스 생성
  // const metaCoinInstance = await MetaCoin.deployed();
  // const balance = await metaCoinInstance.getBalance.call(accounts[0]);
  // const metaCoinEthBalance = await metaCoinInstance.getBalanceInEth.call(accounts[0]);

  // console.log('Balance accounts[0] = ', balance);
  // console.log('Eth balance accounts[0] = ', metaCoinEthBalance);

  // await metaCoinInstance.sendCoin(accounts[1], 1000, { from: accounts[0] });

  // 테스트 스크립트
  // 함수 별로 테스트 스크립트 작성
  it("should put 10000 MetaCoin in the first account", function () {
    return MetaCoin.deployed().then(function (instance) {
      return instance.getBalance.call(accounts[0]);
    }).then(function (balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    });
  });
  it("should call a function that depends on a linked library", function () {
    var meta;
    var metaCoinBalance;
    var metaCoinEthBalance;

    return MetaCoin.deployed().then(function (instance) {
      meta = instance;
      return meta.getBalance.call(accounts[0]);
    }).then(function (outCoinBalance) {
      metaCoinBalance = parseInt(outCoinBalance);
      return meta.getBalanceInEth.call(accounts[0]);
    }).then(function (outCoinBalanceEth) {
      metaCoinEthBalance = parseInt(outCoinBalanceEth);
    }).then(function () {
      assert.equal(metaCoinEthBalance, 2 * metaCoinBalance, "Library function returned unexpected function, linkage may be broken");
    });
  });
  it("should send coin correctly", function () {
    var meta;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return MetaCoin.deployed().then(function (instance) {
      meta = instance;
      return meta.getBalance.call(account_one);
    }).then(function (balance) {
      account_one_starting_balance = parseInt(balance);
      return meta.getBalance.call(account_two);
    }).then(function (balance) {
      account_two_starting_balance = parseInt(balance);
      return meta.sendCoin(account_two, amount, { from: account_one });
    }).then(function () {
      return meta.getBalance.call(account_one);
    }).then(function (balance) {
      account_one_ending_balance = parseInt(balance);
      return meta.getBalance.call(account_two);
    }).then(function (balance) {
      account_two_ending_balance = parseInt(balance);

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});
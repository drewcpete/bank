///////////// Business Logic //////////////////
////////// Account Object ///////////////
function Account(name, balance) {
  this.name = name,
  this.balance = balance;
}

Account.prototype.deposit = function(amount) {
  this.balance += amount;
}

Account.prototype.withdrawl = function(amount) {
  if(amount > this.balance) {
    alert("Not enough funds! You only have: $" + this.balance);
  } else {
    this.balance -= amount;
  }
}

Account.prototype.seeBalance = function() {
  alert("Current Balance: $" + this.balance);
}

//////////// Bank Object //////////////////
function Bank() {
  this.accounts = [],
  this.currentID = 0;
}

Bank.prototype.addAccount = function(account) {
  this.currentID += 1;
  account.id = this.currentID;
  this.accounts.push(account);
}

Bank.prototype.findAccount = function(id) {
  var output = false;
  for(let i=0; i<this.accounts.length; i++) {
    if(this.accounts[i]) {
      if(this.accounts[i].id === id) {
        output = this.accounts[i];
      }
    }
  }
  return output;
}

Bank.prototype.removeAccount = function(id) {
  for(let i=0; i<this.accounts.length; i++) {
    if(this.accounts[i]) {
      if(this.accounts[i].id === id) {
        this.accounts.splice(i, 1);
      }
    }
  }
}

///////////////// UI ////////////////////
var bank = new Bank();

$(function() {

  $("input:radio[value=new]").click(function() {
      $("#current").hide();
      $("#new").fadeIn("slow");
  });
  $("input:radio[value=current]").click(function() {
      $("#current").fadeIn("slow");
      $("#new").hide();
  });

  $("#newAccForm").submit(function() {
    var name = $("#inputName").val();
    var deposit = $("#initialDeposit").val();

    var newAcc = new Account(name, deposit);
    bank.addAccount(newAcc);


    $("#inputName").val("");
    $("#initialDeposit").val("");
    displayAccs(bank);
  });
  $(".transactionForm").submit(function() {
    var deposit = $("#newDeposit").val();
    var withdraw = $("#newWithdraw").val();




  });
  displayAccs(bank);
});
function displayAccs(bank){
  var accList = $("#accSelect");
  var accHTML = "";

  for (var i = 0; i < bank.accounts.length; i++) {
    accHTML += "<option id=" + bank.accounts[i].id + ">" + bank.accounts[i].name + " " + bank.accounts[i].balance + "</option>"
  }
  accList.append(accHTML);
}

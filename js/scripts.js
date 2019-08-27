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
$(function() {
  $(".form").submit(function() {

  });
});

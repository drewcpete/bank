///////////// Business Logic //////////////////
////////// Account Object ///////////////
function Account(name, balance) {
  this.name = name,
  this.balance = balance,
  this.history = [balance];
}

Account.prototype.makeDeposit = function(amount) {
  this.balance += parseInt(amount);
  this.history.push(amount);
}

Account.prototype.makeWithdrawl = function(amount) {
  if(amount > this.balance) {
    alert("Not enough funds! You only have: $" + this.balance);
  } else {
    this.balance -= parseInt(amount);
    this.history.push("-" + amount);
  }
}

Account.prototype.seeBalance = function() {
  alert("Current Balance: $" + this.balance);
}

Account.prototype.getHistory = function() {
  var output = "";
  for(let i=0; i<this.history.length; i++) {
    if(this.history[i].toString().includes("-")){
      output += "<span class='negative'>$" + this.history[i] + "</span>";
    } else {
      output += "$" + this.history[i];
    }
    if(i < this.history.length-1) {
      output += ", ";
    }
  }
  return output;
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

  $("#newAccForm").submit(function(event) {
    event.preventDefault();
    var name = $("#inputName").val();
    var deposit = parseInt($("#initialDeposit").val());
    var newAcc = new Account(name, deposit);
    bank.addAccount(newAcc);
    $("#inputName").val("");
    $("#initialDeposit").val("");
    displayAccs(bank);
    showAccInfo(getSelectedAccount());
  });

  $(".transactionForm").submit(function(event) {
    event.preventDefault();
    var deposit = $("#newDeposit").val();
    var withdraw = $("#newWithdraw").val();
    $("#newDeposit").val("");
    $("#newWithdraw").val("");

    if(getSelectedAccount()) {
      if(deposit) {
        bank.findAccount(getSelectedAccount()).makeDeposit(deposit);
      }
      if(withdraw) {
        bank.findAccount(getSelectedAccount()).makeWithdrawl(withdraw);
      }
      showAccInfo(getSelectedAccount());

    }
  });

  $("#accSelect").change(function() {
    showAccInfo(getSelectedAccount());
  });
});


function displayAccs(bank){
  var accList = $("#accSelect");
  var accHTML = "";

  for (var i = 0; i < bank.accounts.length; i++) {
    accHTML += "<option id=" + bank.accounts[i].id + ">" + bank.accounts[i].name + "</option>";
  }

  accList.html(accHTML);

}

function getSelectedAccount() {
  return parseInt($("#accSelect").children(":selected").attr("id"));
}

function showAccInfo(id) {
  var acc = bank.findAccount(id);
  $("#balanceDisp").show();
  $("#accName").html(acc.name);
  $("#accNum").html(acc.id);
  $("#curBal").html("$" + acc.balance);
  $("#accHistory").html(acc.getHistory());

}

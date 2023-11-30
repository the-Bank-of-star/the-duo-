//////////////// id genrater ///////////////////////
function generateID() {
  var count = 1;
  return function () {
    return count++;
  };
}

id = generateID();

var options = {
  weekday: "numeric",
  year: "numeric",
  month: "numeric",
  day: "numeric",
};

/////////////////////////////// function to  create account objects ////////////////////////////////////////////
function Acount(firstname, lastname, solde) {
  var obj = {};
  obj.id = id();
  obj.firstname = firstname;
  obj.lastname = lastname;
  obj.solde = solde;
  obj.date = new Date().toLocaleDateString();
  obj.transfer = transfer;
  obj.receive = receive;
  return obj;
}

var receive = function (amount) {
  this.solde += amount;
};

var transfer = function (amount) {
  if (this.solde > amount) {
    this.solde = this.solde - amount;
  }

  return "you don't have enough ";
};

function clickii() {
  let firstName = $("#fname").val();
  let lastName = $("#lname").val();
  let amount = $("#amount").val();
  let date = $("#date").val();
  let account = Acount(firstName, lastName, amount);
  accounts.push(account);
  console.log(accounts);
  var new1 =
    $(`<div><p>${account.firstname} ${account.lastname}</p><p> Amout :${account.solde}$</p><p>account-id :${account.id}  </p><p> the-date : ${account.date}</p> <label > send money babyy</label>
        <input type="text" id="amount" name="lname" placeholder="enter your amount" />
        <p>Enter the account you want to send to</p>
        <input type="text" id="amount" name="lname" placeholder="the name of account" />
        <button>send money</button>
        </div>`);
  $("#all").append(new1);
}

//////////////////////////////////////// array  of  accounts(objects) ////////////////////////////////////////////////////////
var accounts = [];
//   var account1=Acount("hechmi","bensassi",10000)
//   var account2=Acount("aymen","slim",15000)
//   console.log(account1)

//    accounts.push(account1,account2)
////////////////////////////////////// display account /////////////////////////////////////

//////////////////////////////////////////function  add an account  ///////////////////////////////////////////

function each(array, func) {
  for (var i = 0; i < array.length; i++) {
    func(array[i], i);
  }
}

function each_obj(obj, f) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      f(obj[key], key, obj);
    }
  }
}

////////////////////////////////// function virement ///////////////////////////////////
historique = [];
$("send-button").click(function () {
  var amount = $("#send-amount").val();
  var receiver_id = $("#receiver").val();
  var sender_id = $("#sender_id").val();
  each(accounts, function (element, i) {
    each(accounts, function (element2, i) {
      if (element.id === receiver_id && element2.id === sender_id) {
        element.receive(amount);
        element2.transfer(amount);
      }
    });
  });
  historique.psuh({
    sender: sender_id,
    receiver: receiver_id,
    amount: amount,
    virement_date: new Date().toLocaleDateString(),
  });
});

///////////////////////////////////////////////////////////////////////////////////////////
function filter(array, predicate) {
  var acc = [];
  each(array, function (element, i) {
    if (predicate(element, i)) {
      acc.push(element);
    }
  });
  return acc;
}

////////////////////////////////////// display historique////////////////////////////////////////////////7

////display all/////

$().click(function () {
  var id = $("#").val();
  each(historique, function (element, i) {
    console.log(
      "sender id : " +
        element.sender_id +
        " receiver id : " +
        element.receiver_id +
        " amount : " +
        element.amount
    );
  });
});

/////////////display specefic id ////////////////////
$().click(function () {
  var id = $("#").val();
  var filtred = filter(historique, function (element, i) {
    return element.id === id;
  });

  return filter(accounts, function (element, i) {
    return element.id === id;
  });
});

console.log();
//hello
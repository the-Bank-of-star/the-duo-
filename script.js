//////////////// id genrater ///////////////////////
var idsArray = [];

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
  return obj

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
  let amount = Number($("#amount").val());
  let date = $("#date").val();
  let account = Acount(firstName, lastName, amount);
  accounts.push(account);
  console.log(accounts);
  var new1 =
    $(`<div ><p>${account.firstname} ${account.lastname}</p><p> Amout :${account.solde}$</p><p>account-id :${account.id}  </p><p> the-date : ${account.date}</p> <label > send money babyy</label>
        <input type="text" id="amount" name="lname" placeholder="enter your amount" />
        <p>Enter the account you want to send to</p>
        <input type="text" id="amount" name="lname" placeholder="the name of account" />
        <button>send money</button>
        </div>`);
  $("#all").append(new1)
}

//////////////////////////////////////// array  of  accounts(objects) ////////////////////////////////////////////////////////
var accounts = [];

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
let seend = function (arr) {


  var amount = Number($("#send-amount").val());
  // console.log("amount", amount);
  var receiver_id = Number($("#receiver").val())
  var sender_id =Number()
  each(accounts, function (element, i) {
    if (receiver_id === element.id) {
      element.receive(Number(amount))
      // console.log("receiver element", element);

      $(`#${receiver_id}`).text(element.solde)

    }
    if (sender_id === element.id) {
      element.transfer(Number(amount))
      // console.log("sender element", element);
      $(`#${sender_id}`).text(element.solde)

    }
    console.log(accounts)

  });
  historique.push({
    sender: sender_id,
    receiver: receiver_id,
    amount: amount,
    virement_date: new Date().toLocaleDateString(),
  });
}
console.log(historique + "his")
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

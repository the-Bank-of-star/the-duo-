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
    $(`<div class ="account-demo" id="account-demo-${account.id}"  ><p>${account.firstname} ${account.lastname}</p><p id=${account.id}> Amout :${account.solde}$</p><p id=${account.id}>account-id :${account.id}  </p><p> the-date : ${account.date}</p> <label > send money babyy</label>
        <input type="text" id="send-amount-${account.id}" name="lname" placeholder="enter your amount" />
        <p>Enter The Id of receiver</p>
        <input type="text" id="receiver-${account.id}" name="lname" placeholder="Enter the Account you want to send to" />
        <p>Enter Your ID PLS</p>
        <input type="text" id="sender_id" name="lname" placeholder="Enter Your ID PLS" />
        <button  onclick="seend()">send money</button>
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



  each(accounts, function (element, i) {
    var amount = Number($(`#send-amount-${element.id}`).val());
    console.log("amount", amount);
    var sender_id = Number($(`#sender_id-${element.id}`).val())
    console.log("sender_id", sender_id);
    if (sender_id === element.id) {
      element.transfer(Number(amount))
      console.log("sender element", element);
      $(`#${sender_id}`).text(element.solde)
      each(accounts, function (element, i) {
        var receiver_id = Number($(`#receiver-${element.id}`).val())
        console.log("receiver_id", receiver_id);
        if (receiver_id === element.id) {
          element.receive(Number(amount))
          console.log("receiver element", element);

          $(`#${receiver_id}`).text(element.solde)
          
          return
        }

      })

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
console.log(historique)
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
  return filter(accounts, function (element, i) {
    return element.id === id;
  });
});

console.log();

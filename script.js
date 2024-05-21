'use strict';
const account1 = {
  owner: 'karthick R',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Balaji T',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Garpaha Ganesh',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account4 = {
  owner: 'Suriya Sivakumar',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};
const account5 = {
  owner: 'KarpagaSelvi A',
  movements: [4300, 1000, 700, 550, 900],
  interestRate: 1,
  pin: 5555,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};


const accounts = [account1, account2, account3, account4 ,account5];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
labelDate.innerHTML=`${new Date().toLocaleDateString()}`

const displayMovements=function(acc, sort=false)
{
  containerMovements.innerHTML="";
  
  
const movs=sort?acc.movements.slice().sort((a,b)=>a-b):acc.movements;

movs.forEach(function(mov,i)
{
  const type=mov>0?`deposit`:`withdrawal`;
  const date=new Date(acc.movementsDates[i]);
  let day=`${date.getDate()}`.padStart(2,0);
  let month=`${date.getMonth()+1}`.padStart(2,0);
  let year= `${date.getFullYear()}`;
  year=parseInt(year);
  day=parseInt(day);
  month=parseInt(month);
  const displayDate=`${day}/${month}/${year}`;
  console.log(displayDate)
  const html=`
  <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
     <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${mov} ₹</div>
  </div>`;
  containerMovements.insertAdjacentHTML('afterbegin',html);
})
}



function createUserName(accs){
  accs.forEach(function(acc)
{
  acc.username=acc.owner.toLowerCase().split(' ').map((e)=>e[0]).join('');
})
};
createUserName(accounts);
const calcsprintBalance=function(acc)
{
  acc.balance=acc.movements.reduce((acc,curr)=>acc+curr,0);
  
  labelBalance.textContent=`${acc.balance}₹`;
}


const calcDisplaySummary=function(acc)
{
  const totalDeposit=acc.movements.filter((mov)=>mov>0).reduce((acc,curr)=>acc+curr,0);
  const totalWithdraw=acc.movements.filter((mov)=>mov<0).reduce((acc,curr)=>acc+curr,0);
  const intrest=acc.movements.filter(mov=>mov>0).map(deposit=>deposit*acc.interestRate/100).filter((int,i,arr)=>int>1).reduce((acc,curr)=>acc+curr,0)
  labelSumInterest.innerHTML=`${intrest}₹`
  labelSumOut.innerHTML=`${Math.abs(totalWithdraw)}₹`;
  labelSumIn.innerHTML=`${totalDeposit}₹`;
}

let currentAccount ;
let timmer;
const updateUi=function(acc)
{
  displayMovements(acc);
  calcsprintBalance(acc);
  calcDisplaySummary(acc);
}
const startLogoutTimer=function()
{
  const  tic=function()
  {
   const min=String(Math.trunc(t/60)).padStart(2,0);
   const sec=String(t % 60).padStart(2,0);
    labelTimer.innerHTML=`${min}:${sec}`;
    //decrease 1 seconds
    
    if(t===0)
    {
      clearInterval(timmer);
      labelWelcome.textContent='Log in to get started';
      containerApp.style.opacity=0;
  
    }
    t--;
  }
// set timer out to 5 min

let t=65;
tic();
//call the timer every second
const timmer =setInterval(tic,1000)
return timmer;
}
btnLogin.addEventListener('click',function(e)
{
  e.preventDefault();
  currentAccount=accounts.find(acc=>acc.username===inputLoginUsername.value);
  // console.log(currentAccount);
  if(currentAccount&& currentAccount.pin===Number(inputLoginPin.value))
  {
    
    labelWelcome.innerHTML=`Welcome back ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity=1;
    inputLoginPin.value=inputLoginUsername.value='';
    inputLoginPin.blur();
    if(timmer) clearInterval(timmer);
    timmer=startLogoutTimer();
    updateUi(currentAccount);
  }
  
 
})
btnTransfer.addEventListener('click',function(e)
{
  e.preventDefault();
  const amount=Number(inputTransferAmount.value);
  const receiveraAcc=accounts.find(acc=>acc.username==inputTransferTo.value);
  inputTransferAmount.value=inputTransferTo.value='';
  
  if(amount>0 &&receiveraAcc && currentAccount.balance>=amount && receiveraAcc.username!==currentAccount.username)
  {
 currentAccount.movements.push(-amount);
 receiveraAcc.movements.push(amount);
 currentAccount.movementsDates.push(new Date().toISOString());
 receiveraAcc.movementsDates.push(new Date().toISOString());
 updateUi(currentAccount);

 //reset the timer

 clearInterval(timmer);
 timmer=startLogoutTimer();
}
})
btnClose.addEventListener('click',function(e)
{
  e.preventDefault();
  if(inputCloseUsername.value===currentAccount.username && Number(inputClosePin.value)===currentAccount.pin)
  {
    const index= accounts.findIndex(acc=>acc.username===currentAccount.username);
    inputCloseUsername.value=inputClosePin.value='';
    accounts.splice(index,1);
    containerApp.style.opacity=0;
  }
})
btnLoan.addEventListener('click',function(e)
{
  e.preventDefault();
  const amt=Number(inputLoanAmount.value);
  if(amt>0 && currentAccount.movements.some(mov=>mov>=amt*0.1)) 
  {

   setTimeout(function() {
    currentAccount.movements.push(amt);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUi(currentAccount);
    clearInterval(timmer);
    timmer=startLogoutTimer();
    },2000) 
  }
})
let sorted=false;
btnSort.addEventListener('click',function(e)
{
  e.preventDefault();
displayMovements(currentAccount,!sorted);
sorted=!sorted;
})

///////////////////////////////////////////////
///////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);


// const temp = [200, 450, -400, 3000, -650, -130, 70, 1300];
// /////////////////////////////////////////////////
// console.log(temp.slice(-2))
// movements.forEach(function(mov)
// {
//   if(mov>0) 
//   {

//     console.log(`You deposited ${mov}`);
//   }
//   else{
//       console.log(`You witvhdrew ${Math.abs(mov)}`);
//   }
// })
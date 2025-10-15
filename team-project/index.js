	// •	Calculate:
	// •	Total expenses.
	// •	Each member’s total spending.
	// •	Each member’s balance (positive → should get money back, negative → owes money).
	// •	Average expense per member.
	// •	Display a clear, formatted report in the console.



const expenses =[
    {name:"ismail",amount:1200},
    {name:"haider", amount:4000},
    {name:"tahir", amount:500},
    {name: "sara", amount: 349}
]

let totalExpenses = 0;

for(let i = 0; i<expenses.length;i++){
totalExpenses += expenses[i].amount;
}

let memberSpendings = {};

for(let i =0 ; i< expenses.length;i++){
    let person = expenses[i].name;
  let amount = expenses[i].amount;

if(!memberSpendings[person]){
memberSpendings[person] = 0;
}

memberSpendings[person] +=amount

}

let member = Object.keys(memberSpendings);
let avgExpenses = totalExpenses/member.length;



let balance = {};
for(let i =0; i< member.length;i++){
    let person = member[i];
    balance[person] = memberSpendings[person] - avgExpenses;

}


console.log("========= GROUP EXPENSE REPORT =========");
console.log(`Total Expenses = $${totalExpenses}`);
console.log(`Average expense of per person is ${avgExpenses.toFixed(3)}\n`)


console.log("Members Details")
for(let i = 0; i<member.length;i++){
    let person = member[i];
    let spent = memberSpendings[person];
    let bal = balance[person]


if(bal>0){
    console.log(`${person} spent $${spent} -> get back ${bal.toFixed(2)}\n`)
} else if(bal<0){
    console.log(`${person} spents $${spent} -> owes to ${Math.abs(bal).toFixed(2)}\n`)

} else{
    console.log(`${person} spents ${spent} -> settled up`)
}






}

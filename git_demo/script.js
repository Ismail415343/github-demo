let products = [
    { id: 1, name: 'trousers', price:60, stock:50},
    { id: 2, name: 'shirt', price: 67, stock:55},
    { id: 3, name: 'pants', price: 90, stock:70},
    { id: 4, name: 'cap', price: 25, stock:40},
    { id: 5, name: 'bracelet', price: 30, stock:10}
]

let totalRevenue =0;
let userSpending={}

function order(user, ids, quantities) {


    for (let i = 0; i < ids.length; i++) {
  let id = ids[i];
  let quantity = quantities[i];

 for (let j = 0; j < products.length; j++) {
   if (products[j].id === id) {

  if (products[i].stock >= quantity) {
  products[i].stock -= quantity;

 let orderTotal = products[i].price * quantity;
 totalRevenue += orderTotal;

console.log(`${user} bougth (${quantity}) of product ${products[i].name}`)

if(userSpending[user]){
    userSpending[user] +=orderTotal;

} else{
    userSpending[user] =orderTotal
}
  }


  else{
 console.log(`Sorry ${user}, we don't have enough quantity of ${products[i].name}`);

  }
}
}
}
console.log("total revenue ", totalRevenue)


console.log("user spends ", userSpending)

    console.log("\n📦 Remaining Stock After Shopping:");
    for (let p of products) {
        console.log(`${p.name}: ${p.stock} left`);
        if (p.stock < 5) {
            console.log(`⚠️ Low Stock Alert: ${p.name}`)};
    }


let topUser = null;
let mxSpent = 0;
for(let user in userSpending){
    if(userSpending[user]>mxSpent){
        mxSpent = userSpending[user];
        topUser = user
    }
}
    console.log(`👑 Top spender so far: ${topUser} ($${mxSpent})`);

}


order("Ismail", [1, 4, 5], [4, 7, 2]);
order("Haider", [2, 4, 1], [6, 9, 10]);
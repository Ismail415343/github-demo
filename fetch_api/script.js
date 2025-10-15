async function getPost(){
try {
 const response = await fetch('https://jsonplaceholder.typicode.com/posts')

const data = await response.json()

// console.log('data',data)
console.log("data fetch sucessfully")
data.slice(0,5).forEach(post=> {
    console.log(`ID = ${post.id}`)
    console.log(`TITLE = ${post.title}`)
    console.log(`BODY ${post.body}`)
});







} catch(err){
console.log("error")
}



}
getPost()
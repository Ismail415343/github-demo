// let students  = [
//     {id:1, name: "musa", marks:{english:40, fop:68, ict:98}},
//        {id:2, name: "musab", marks:{english:50, fop:62, ict:68}},
//     {id:3, name: "momin", marks:{english:49, fop:33, ict:90}},

// ]


// function findAvg(marks){
// let value = Object.values(marks);
// let sum =0;
// for(let i=0;i<value.length;i++){
// sum +=value[i];
// }
// return sum/value.length;
// }

// function assignGrades(students){
//         let avg = findAvg(students[i].marks);

// for(let i =0;i < students.length;i++){
// let avg = findAvg(students[i].marks)
// if(avg>=90) console.log(`${students[i].name} get 'A' grade`)
// if(avg>=80) console.log(`${students[i].name} get 'b' grade`)
//     if(avg>=70) console.log(`${students[i].name} get 'c' grade`)
//         if(avg>=60) console.log(`${students[i].name} get 'd' grade`)
          

// }
// }

// let findTopper=(students)=>{
// let topper = students[0];
// let topperAvg = findAvg(topper.marks)

// for(let i =0; i<students.length;i++){
//     let avg = findAvg(students[i].name);
//     if(topper>students[i]){
//     topper = students[i]
//     }
// }
// return topper;
// }



// function listFailure(){
// let failure = []

// for(let i =0;i<students.length;i++){
//       let avg = findAvg(students[i].marks);

//     if(avg<=50){    
// //   let avg = findAvg(students[i].marks);
//  failure.push(students[i]);
//     }
// }
// assignGrades();


// }



//  console.log("Topper:", findTopper(students));
//  console.log("Failures:", listFailure(students));
// console.table(students.map(s => ({
//     Name: s.name,
//     Average: findAvg(s.marks),
//     Grade: s.grade
// })));


// Student Grading System

let students = [
    { id:1, name:"Ismail", marks:{english:79,maths:40,ds:90}},
    {id:2, name:"haider", marks:{english:70,maths:44,ds:90}},
    {id:3, name:"hassan", marks:{english:79,maths:80,ds:50}},
    {id:4, name:"ali", marks:{english:98,maths:85,ds:30}}

]

function findAvg(marks){
    let value = Object.values(marks)
    let sum =0
    for(let i=0;i<value.length;i++){
        sum+=value[i]
    }
    return sum/value.length;
}

let assignGrades=(students)=>{

for(let i=0;i<students.length;i++){
    let avg = findAvg(students[i].marks);

 if (avg >= 90) {
    students[i].grade="GRADE A";
    console.log(students[i].name, "GRADE A")
 }
   else if (avg >= 80){
    students[i].grade="GRADE B";
    console.log(students[i].name,"GRADE B")
   }
      else if (avg >= 70){
    students[i].grade="GRADE C";
    console.log(students[i].name,"GRADE C")
   }
   else if (avg >= 60){
    students[i].grade="GRADE D";
    console.log(students[i].name,"GRADE D")
   }

 else {
    console.log(students[i].name,"Grade: F");
 }
    }
    return students;
}


let findTopper=(students)=>{
    let topper = students[0]
let topperAvg = findAvg(topper.marks);

    for(let i=0; i<students.length;i++){
     let avg = findAvg(students[i].marks);
      if(avg>topperAvg){
            topper = students[i] 
        }
    }
    return topper;
}


let listFailures=(students)=>{
    let failure =[];
 for(let i=0;i<students.length;i++){
    let avg = findAvg(students[i].marks);
    if(avg<=50){
    failure.push(students[i])
    }
 }   
 return failure;
}

assignGrades(students);

// console.log("All Students with Grades:",students);
 console.log("Topper:", findTopper(students));
 console.log("Failures:", listFailures(students));
console.table(students.map(s => ({
    Name: s.name,
    Average: findAvg(s.marks),
    Grade: s.grade
})));




let arrayres = [];
let fin = []

async function getTasks() {
    const { data } = await axios.get('http://127.0.0.1:3000/tasks')
    return data;
}

async function onload(){
    const { tasks } = await getTasks();
    const taskarray = tasks;
    taskarray.map((t)=>{
        arrayres.push(t.name)
    })
}
        
onload()
console.log(arrayres)

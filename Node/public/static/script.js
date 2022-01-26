
let getTask = '';
let task = '';
function handleChangeTask() {
    var x = document.getElementById('task');
    getTask = x.value
}

function handleClick(value) {
    task = { "name": value }
    console.log(task)
    console.log(typeof(task))
    axios.post('http://127.0.0.1:3000/html/posttasks', task)
        .then(response => {
            const addedTask = response.data;
            console.log(`POST: task is added`, addedTask);
        })
        .catch (error => console.error(error))
}
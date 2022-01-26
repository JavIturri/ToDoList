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
} 
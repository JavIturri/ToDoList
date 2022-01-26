const axios = require('axios')

let task = '';
function handleChangeTask() {
    var x = document.getElementById('task');
    task = x.value
}

function handleClick(value) {
    task = ''
    task = { "task": value }
    axios.post('http://127.0.0.1:3000/html/tasks', task).then(console.log(task))
}
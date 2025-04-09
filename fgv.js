function osszead() {
    const szam = parseFloat(document.getElementById('szam').value);
    const szam1 = parseFloat(document.getElementById('szam1').value);
    const eredmeny = szam + szam1;
    document.getElementById('eredmeny').textContent = eredmeny;
}

function kivon() {
    const szam = parseFloat(document.getElementById('szam').value);
    const szam1 = parseFloat(document.getElementById('szam1').value);
    const eredmeny = szam - szam1;
    document.getElementById('eredmeny').textContent = eredmeny;
}

function Rm(){
    const RandomSzam = Math.floor(Math.random() * 100) + 1;
    document.getElementById('RandomSzam').textContent = RandomSzam;
}

function RandomSzin() {
    const szinek = ['red', 'blue', 'green', 'purple', 'orange'];
    const veletlenszin = szinek[Math.floor(Math.random() * szinek.length)];
    document.getElementById('szoveg').style.color = veletlenszin;
}

function menubar(){
    document.querySelector('.menu-toggle').addEventListener('click', function() {
        this.classList.toggle('active');
        document.querySelector('.menu').classList.toggle('show');
    });
}

function addTask() {
    const taskInput = document.getElementById('newTask');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');

    if (taskInput.value.trim() !== '') {
        const newTask = document.createElement('li');
        newTask.textContent = document.createElement('br');
        newTask.textContent = `${taskList.children.length + 1}. ${taskInput.value.trim()}`;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.style.color = 'RED';
        deleteButton.onclick = function() {
            taskList.removeChild(newTask);
            updateTaskCount();
        };
        newTask.appendChild(deleteButton);
        taskList.appendChild(newTask);
        taskInput.value = '';
        updateTaskCount();
    }
}

function updateTaskCount() {
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    taskCount.textContent = taskList.children.length;
}


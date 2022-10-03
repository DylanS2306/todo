window.addEventListener('load', ()=> {
    goals = JSON.parse(localStorage.getItem('goals')) || [];
    const name = document.querySelector("#name");
    const newGoal = document.querySelector('#new-goal-form');
    const username = localStorage.getItem("username") || [];
    name.value = username;
    name.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value);
    })
    newGoal.addEventListener('submit', e => {
        e.preventDefault();
        const goal = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime(),
        }
        goals.push(goal);
        localStorage.setItem('goals', JSON.stringify(goals));
        e.target.removeEventListener();
        DisplayGoals() 
    })
    DisplayGoals()
})






function DisplayGoals(){
    const goalList = document.querySelector('#goal-list');
    goalList.innerHTML = "";

    goals.forEach(goal => {
        const goalItem = document.createElement('div');
        goalItem.classList.add('goal-item');
        const label = document.createElement('label');
        const input = document.createElement('input')
        const span = document.createElement('span')
        const content = document.createElement('div')
        const actions = document.createElement('div')
        const edit = document.createElement('button')
        const deleteButton = document.createElement('button')

        input.type = 'checkbox';
        input.checked = goal.done;
        span.classList.add('bubble');
        if (goal.category == 'academic'){
            span.classList.add('academic')
        }
        else if (goal.category == "social"){
            span.classList.add("social");
        }
        else{
            span.classList.add("physical")
        }
        content.classList.add("goal-content");
        actions.classList.add("actions");
        edit.classList.add("edit");
        deleteButton.classList.add("delete");
        content.innerHTML = `<input type="text" value="${goal.cotent}" readonly>`;
        edit.innerHTML = 'Edit';
        deleteButton.innerHTML = "Delete";

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        goalItem.appendChild(label)
        goalItem.appendChild(content);
        goalItem.appendChild(actions);
        
        goalList.appendChild(goalItem);
        if (goal.done){
            goalItem.classList.add('done');
        }
        input.addEventListener('change', (e) => {
			goal.done = e.target.checked;
			localStorage.setItem('goals', JSON.stringify(goals));

			if (goal.done) {
				goalItem.classList.add('done');
			} else {
				goalItem.classList.remove('done');
			}

			DisplayTodos()

		})

        edit.addEventListener('click', (e) =>{
            const input = cpntent.querySelector("input");
            input.removeAttribute("readonly");
            input.focus();
            input.addEventListener("blur", (e) => {
                input.setAttribute("readonly", true);
                goal.content = e.target.value;
                localStorage.setItem("goals", JSON.stringify(goals));
                DisplayGoals();

            })
        })

        deleteButton.addEventListener("click", (e) => {
            goals = goals.filter(t => t != goal);
            localStorage.setItem("goals", JSON.stringify(goals));
            DisplayGoals();
        })
    })
}
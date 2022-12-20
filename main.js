let Model = {

}


let View = {

}


let Controller = {

}

let displayDiv = document.getElementById('general-display');
fetch('https://jsonplaceholder.typicode.com/users').then(
    (e)=>{
        return e.json();
        
    }).then((users)=>{
        console.log(users);

        k = users.map(value=>`<div class="users-list">${value.name}</div>`).join('');

        displayDiv.innerHTML = k
    });


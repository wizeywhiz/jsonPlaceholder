let displayDiv = document.getElementById('general-display');
let navLinks = document.getElementById('nav-container');

navLinks.addEventListener('click',(e)=>{
    console.log(e.target.textContent);
    e.target.classList.add('active-nav');
    switch (e.target.textContent){
        case 'User':
            
            Controller.users();
            break;
        
        case 'Album':
            Controller.albums();
            break;

        case 'Photos':
            Controller.photos();
            break;

        case 'Todos':
            Controller.todos();
            break;        

        case 'Post':
            Controller.posts();
            break;
        case 'Comments':
            Controller.comments();
            break;
        default: console.log('clicked', e.target.textContent);

    }
});


let Model = {
    userUrl : 'https://jsonplaceholder.typicode.com/users',
    todoUrl : '', 
    albumUrl : 'https://jsonplaceholder.typicode.com/albums',
    photoUrl : '', 
    postUrl : '',
    commentUrl : '', 
    data : []

}


let View = {
    hide(){

    },
    show(){

    }, 
    render(){

    }

}


let Controller = {

    users(){
        fetch(Model.userUrl).then(e => e.json())
    .then((allUsers)=>{
        let userlist = allUsers.map(value=>`<div class="users-list" id="${value.id + ''}">
        <p>${value.name}</p>
        <div><span>${[value.email,value.phone,value.website].join('</span><span>')}</span></div>
        </div>`).join('');
        displayDiv.innerHTML = userlist;
    })
                       
    },

    
    async albums(){

        let allAlbums =  await this.getData(Model.albumUrl);
        console.log(allAlbums);
        let albumList =  allAlbums.map(album =>  `<div><h3>${album.title}</h3><p>Album by user with Id: 
        ${album.userId}
        </p></div>`).join('');
        displayDiv.innerHTML = albumList;
        

    },
    photos(){

    },
    posts(){

    },
    comments(){

    },
    todos(){

    },
    async getData(url){
        
      let response = await fetch(url).then(e => e.json()).then(res => res);
      console.log(response, 'this is resposnse');
       return response;

    }

}




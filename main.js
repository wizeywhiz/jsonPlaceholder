let displayDiv = document.getElementById('general-display');
let navLinks = document.getElementById('nav-container');
let filterForm = document.forms[0];
let idList = filterForm.idDropDown;
let activeTab = '';
console.log(navLinks.children);
console.log(filterForm);
filterForm['formSubmit'].addEventListener('click', e => {
    e.preventDefault();
   switch(activeTab){
    case 'User':
        if(idList.value !== 'Select'){
            Model.userUrlFil = Model.userUrl + `/${idList.value}`;
            Controller.users(Model.userUrlFil, true);
        }
   }
});

navLinks.addEventListener('click',(e)=>{
    activeTab = e.target.textContent;
    console.log(e.target.textContent);
    for (child of navLinks.children){
        if (child.classList.contains('active-nav')){
            child.classList.remove('active-nav');
        }
    }
    e.target.classList.add('active-nav');
    switch (e.target.textContent){
        case 'User':
            Controller.filterReset();
            Controller.users(Model.userUrl);
            break;
        
        case 'Album':
            Controller.albums(Model.albumUrl);
            break;

        case 'Photos':
            Controller.photos(Model.photoUrl);
            break;

        case 'Todos':
            Controller.todos(Model.todoUrl);
            break;        

        case 'Post':
            Controller.posts(Model.postUrl);
            break;
        case 'Comments':
            Controller.comments(Model.commentUrl);
            break;
        default: console.log('clicked', e.target.textContent);

    }
});


let Model = {
    userUrl : 'https://jsonplaceholder.typicode.com/users',
    userUrlFil : '',
    todoUrl : 'https://jsonplaceholder.typicode.com/todos', 
    todoUrlFil : '',
    albumUrl : 'https://jsonplaceholder.typicode.com/albums',
    albumUrlFil : '',
    photoUrl : 'https://jsonplaceholder.typicode.com/photos',
    photoUrlFil : '', 
    postUrl : 'https://jsonplaceholder.typicode.com/posts',
    postUrlFil : '',
    commentUrl : 'https://jsonplaceholder.typicode.com/comments', 
    commentUrlFil : '',
    data : []

}


let View = {
    hide(element){
        element.style.display = 'none';        
    },
    show(element){
        element.style.display = 'block';
    }, 
    render(element, content, attributes={}){
        let attrkeys = Object.keys(attributes);
        for (key in attrkeys){
            console.log(key,attributes.key);
            element.setAttribute(key,attributes.key);
        }
        
        element.innerHTML = content;
        console.log(attributes.keys());
        // if (attributes != {}){
        //     for (const key in attributes.keys()){
        //         // element.children.setAttribute(key,attribute[key]);
        //         element.children.forEach(child => {
        //             child.setAttribute(key,attributes[key]);
        //         });
        //     }
        // }        

    }

}


let Controller = {

    users(url, filt=false){
       if (!filt){
        this.getData(url)
    .then((allUsers)=>{
        let userlist = allUsers.map(value=>`<div class="users-list" id="${value.id + ''}">
        <p>${value.name}</p>
        <div><span>${[value.email,value.phone,value.website].join('</span><span>')}</span></div>
        </div>`).join('');
        displayDiv.innerHTML = '<div><h2>All Users</h2></div>'+userlist;
    })
       } else{
        this.getData(url)
    .then((value)=>{
        let userlist = `<div class="users-list" id="${value.id + ''}">
        <p>${value.name}</p>
        <div><span>${[value.email,value.phone,value.website].join('</span><span>')}</span></div>
        </div>`;
        displayDiv.innerHTML = '<div><h2>All Users</h2></div>'+userlist;
    })
       }
        
                       
    },

    
    albums(url){
        this.filterReset();
        this.getData(url).then(allAlbums => {
            console.log(allAlbums);
        let albumList =  allAlbums.map(album =>  `<div class=" list album-list"><h3>${album.title}</h3><p>Album by user with Id: 
        ${album.userId}
        </p></div>`).join('');
        // displayDiv.innerHTML = albumList;
        View.render(displayDiv,'<div><h2>All Allbums</h2></div>'+albumList);
        });
        
        

    },
    photos(url){
        this.filterReset();
        this.getData(url).then(allPhoto => {
            console.log(allPhoto);
        let photoList =  allPhoto.map(photo =>  `<div class="photo-list list"><h3>${photo.title}</h3><div><img src="${photo.thumbnailUrl}" alt="Pics not foung">
        </div></div>`).join('');
        displayDiv.innerHTML = '<div><h2>All Photo</h2></div>'+photoList;
        });
    },
    posts(url){
        this.filterReset();
        this.getData(url).then(allPost => {
            console.log(allPost);
        let postList =  allPost.map(post =>  `<div class="list post-list"><h3>${post.title}</h3><p>Post by user with Id: 
        ${post.userId}
        </p></div>`).join('');
        displayDiv.innerHTML = '<div><h2>All Post</h2></div>'+postList;
        });
        
    },
    comments(url){
        this.filterReset();
        this.getData(url).then(comment => {
            displayDiv.innerHTML = '<div><h2>All Comments</h2></div>'+ comment.map(comt =>  `<div class="list comments-list"><h3>${comt.name}</h3><div><span>${[comt.email,comt.postId].join('</span><span>From post with Id: ')}</span></div></div>`).join('');
        }).catch(error => console.log(error));
    },
    todos(url){
        this.filterReset();
        this.getData(url).then(allTodo => {
            console.log(allTodo);
        let todoList =  allTodo.map(todo =>  `<div class="todo-list list"><h3>${todo.title}</h3><span class="${todo.completed?'completed':'uncompleted'}">${todo.completed?'&check;':'&times;'}</span><p>Todos by user with Id: 
        ${todo.userId}
        </p></div>`).join('');
        displayDiv.innerHTML = '<div><h2>All Todos</h2></div>'+todoList;             
        });
               
    },
    filterReset(){
        filterForm.reset();
    },
    async getData(url){
        
      let response = await fetch(url).then(e => e.json());
      console.log(response, 'this is resposnse');
       return response;

    }

}




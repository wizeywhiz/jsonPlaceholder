const displayDiv = document.getElementById('general-display');
const detailDisp = document.getElementById('detail-display');
const navLinks = document.getElementById('nav-container');
const userNavLink = document.querySelector('#nav-container > #user');
const userDropDown = document.getElementById('userDropDown');
const idDropDown = document.getElementById('idDropDown');
const albumDropDown = document.getElementById('albumDropDown');
const postDropDown = document.getElementById('postDropDown');
const filterForm = document.forms[0];
const idList = filterForm.idDropDown;
let activeTab = '';

filterForm['formSubmit'].addEventListener('click', e => {
    e.preventDefault();
   switch(activeTab){
    case 'User':
        if(idList.value !== 'Select'){
            Model.userUrlFil = Model.userUrl + `/${idList.value}`;
            Controller.users(Model.userUrlFil);
        }
        break;
    
    case 'Album':
        if(idList.value !== 'Select'){
            Model.albumUrlFil = Model.albumUrl + `/${idList.value}`;
            Controller.albums(Model.albumUrlFil);
        }
        break;
    

    case 'Photos':
        if(idList.value !== 'Select'){
            Model.photoUrlFil = Model.photoUrl + `/${idList.value}`;
            Controller.photos(Model.photoUrlFil);
        }
        break;
    
    case 'Todos':
        if(idList.value !== 'Select'){
            Model.todoUrlFil = Model.todoUrl + `/${idList.value}`;
            Controller.todos(Model.todoUrlFil);
        }
        break;

    case 'Post':
        if(idList.value !== 'Select'){
            Model.postUrlFil = Model.postUrl + `/${idList.value}`;
            Controller.posts(Model.postUrlFil);
        }
        break;
    case 'Comments':
        if(idList.value !== 'Select'){
            Model.commentUrlFil = Model.commentUrl + `/${idList.value}`;
            Controller.comments(Model.commentUrlFil);
        }
        break;
    default: console.log('Kindly select an active Tab.');
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
            View.hide([userDropDown, albumDropDown, postDropDown]);
            Controller.users(Model.userUrl);
            break;
        
        case 'Album':
            Controller.filterReset();
            View.hide([albumDropDown, postDropDown]);
            View.show([userDropDown]);
            Controller.albums(Model.albumUrl);
            break;

        case 'Photos':
            Controller.filterReset();
            View.hide([postDropDown, userDropDown]);
            View.show([albumDropDown]);
            Controller.photos(Model.photoUrl);
            break;

        case 'Todos':
            Controller.filterReset();
            View.hide([albumDropDown, postDropDown]);
            View.show([userDropDown]);
            Controller.todos(Model.todoUrl);
            break;        

        case 'Post':
            Controller.filterReset();
            View.hide([albumDropDown, postDropDown]);
            View.show([userDropDown]);
            Controller.posts(Model.postUrl);
            break;
        case 'Comments':
            Controller.filterReset();
            View.hide([albumDropDown, userDropDown]);
            View.show([postDropDown]);
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
    hide(elements){
        if (typeof(elements)==='object'){
            elements.forEach(element => {
                element.style.display = 'none';
            });
        }else {elements.style.display = 'none';}        
    },
    show(elements){
        if (typeof(elements)==='object'){
            elements.forEach(element => {
                element.style.display = 'block';
            });
        }else {elements.style.display = 'block';} 
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

    users(url){
       
        this.getData(url)
    .then((allUsers)=>{
        if(this.isArray(allUsers)){
            let userlist = allUsers.map(value=>`<div class="list users-list" id="${value.id + ''}">
        <p>${value.name}</p>
        <div><span>${[value.email,value.phone,value.website].join('</span><span>')}</span></div>
        </div>`).join('');
        idDropDown.innerHTML += allUsers.map(user => `<option value="${user.id}">${user.id}</option>`).join('');
        displayDiv.innerHTML = '<div><h2>All Users</h2></div>'+userlist;
        }else{
            let userlist = `<div class="list users-list" id="${allUsers.id + ''}">
        <p>${allUsers.name}</p>
        <div><span>${[allUsers.email,allUsers.phone,allUsers.website].join('</span><span>')}</span></div>
        </div>`;
        displayDiv.innerHTML = '<div><h2>Filtered Users</h2></div>'+userlist;
        }

        ulist = document.getElementsByClassName('users-list');
    console.log(ulist);
    for(user of ulist){
        user.addEventListener('click',function(e){
            console.log(user.id);
            detailDisp.classList.add('active-display');
            Controller.getData(Model.userUrl +'/' + user.id).then(userDetails => {
                detailDisp.textContent = JSON.stringify(userDetails);
                let detailDiv = document.createElement('div');
                let details = `<div class="detailDisp">
                <div><h3>${userDetails.name}</h3>
                <h6>${userDetails.username}</h6>
                <div style="display: flex; justify-content: space-between;"><span>Email: ${userDetails.email}</span> <span>Phone: ${userDetails.phone}</span></div></div>

                <div><h5>Address</h5>
                <p>${userDetails.address.suite + ", " + userDetails.address.street + ", " + userDetails.address.city }</p>
                <p>Zipcode: ${userDetails.address.zipcode}</p>
                <div id="mapDiv"></div>
                </div>

                <div><h5>Company</h5>
                <h4>${userDetails.company.name}</h4>
                <p>${userDetails.company.catchPhrase}</p>
                
                </div>

                </div>`
                detailDiv.innerHTML = details;
                detailDisp.innerHTML = details;


            })
        })
    }
    
    });

        
                       
    },

    
    albums(url){
        
        this.getData(url).then(allAlbums => {
            if(this.isArray(allAlbums)){
                console.log(allAlbums);
        let albumList =  allAlbums.map(album =>  `<div class=" list album-list"><h3>${album.title}</h3><p>Album by user with Id: 
        ${album.userId}
        </p></div>`).join('');
        // displayDiv.innerHTML = albumList;
        console.log(idList.firstChild);
        idList.innerHTML = `<option value="select">Select Id</option>`
        idDropDown.innerHTML += allAlbums.map(album => `<option value="${album.id}">${album.id}</option>`).join('');
        View.render(displayDiv,'<div><h2>All Allbums</h2></div>'+albumList);
            }else{
                let albumList =  `<div class=" list album-list"><h3>${allAlbums.title}</h3><p id="user${allAlbums.userId}">Album by user with Id: 
        ${this.getData(Model.userUrl + `/${allAlbums.userId}`).then(user => {
            document.querySelector(`.album-list > #user${allAlbums.userId}`).textContent = 'Album by: ' + user.name;
        }) }
        </p></div>`;
        // displayDiv.innerHTML = albumList;
        View.render(displayDiv,'<div><h2>Filtered Allbums</h2></div>'+albumList);
            }
            
        });
        
        
        
        
        

    },
    photos(url){
        this.filterReset();
        this.getData(url).then(allPhoto => {
            if (this.isArray(allPhoto)){
                console.log(allPhoto);
        let photoList =  allPhoto.map(photo =>  `<div class="photo-list list"><h3>${photo.title}</h3><div><img src="${photo.thumbnailUrl}" alt="Pics not foung">
        </div></div>`).join('');
        displayDiv.innerHTML = '<div><h2>All Photo</h2></div>'+photoList;
            }else{
                let photoList =  `<div class="photo-list list"><h3>${allPhoto.title}</h3><div><img src="${allPhoto.thumbnailUrl}" alt="Pics not found">
        </div></div>`;
        displayDiv.innerHTML = '<div><h2>Filtered Photo</h2></div>'+photoList;
            }
            
        });
    },
    posts(url){
        this.filterReset();
        this.getData(url).then(allPost => {
            if(this.isArray(allPost)){
                console.log(allPost);
        let postList =  allPost.map(post =>  `<div class="list post-list"><h3>${post.title}</h3><p>Post by user with Id: 
        ${post.userId}
        </p></div>`).join('');
        displayDiv.innerHTML = '<div><h2>All Post</h2></div>'+postList;
            }else{
                let postList =  `<div class="list post-list"><h3>${allPost.title}</h3><p>Post by user with Id: 
        ${allPost.userId}
        </p></div>`;
        displayDiv.innerHTML = '<div><h2>Filtered Post</h2></div>'+postList;
            }
            
        });
        
    },
    comments(url){
        this.getData(url).then(comment => {
            if(this.isArray(comment)){
                displayDiv.innerHTML = '<div><h2>All Comments</h2></div>'+ comment.map(comt =>  `<div class="list comments-list"><h3>${comt.name}</h3><div><span>${[comt.email,comt.postId].join('</span><span>From post with Id: ')}</span></div></div>`).join('');
            }else{
                displayDiv.innerHTML = '<div><h2>Filtered Comment</h2></div>'+  `<div class="list comments-list"><h3>${comment.name}</h3><div><span>${[comment.email,comment.postId].join('</span><span>From post with Id: ')}</span></div></div>`;
            }
            
        }).catch(error => console.log(error));
    },
    todos(url){
        this.getData(url).then(allTodo => {
            if (this.isArray(allTodo)){
                let todoList =  allTodo.map(todo =>  `<div class="todo-list list"><h3>${todo.title}</h3><span class="${todo.completed?'completed':'uncompleted'}">${todo.completed?'&check;':'&times;'}</span><p>Todos by user with Id: 
        ${todo.userId}
        </p></div>`).join('');
        displayDiv.innerHTML = '<div><h2>All Todos</h2></div>'+todoList;  
            }else{
                let todoList =  `<div class="todo-list list"><h3>${allTodo.title}</h3><span class="${allTodo.completed?'completed':'uncompleted'}">${allTodo.completed?'&check;':'&times;'}</span><p>Todos by user with Id: 
        ${allTodo.userId}
        </p></div>`
        displayDiv.innerHTML = '<div><h2>Filtered Todos</h2></div>'+todoList; 
            }
                   
        });
               
    },
    filterReset(){
        filterForm.reset();
    },

    isArray(res) {
        return Object.prototype.toString.call(res) === '[object Array]';
    },

    initialPageSetup(){
        userNavLink.classList.add('active-nav');
        activeTab = 'User';
        View.hide([userDropDown, albumDropDown, postDropDown]);
        this.users(Model.userUrl);


    },
    
    
    async getData(url){
        
      let response = await fetch(url).then(e => e.json());
      console.log(response, 'this is resposnse');
       return response;

    }

}

Controller.initialPageSetup();




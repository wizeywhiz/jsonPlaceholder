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
        if(userDropDown.value !== 'Select'){
            Model.albumUrlFil = Model.userUrl + `/${userDropDown.value}/albums`;
            Controller.albums(Model.albumUrlFil);
        }else if(idList.value !== 'Select'){
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
        if(userDropDown.value !== 'Select'){
            Model.todoUrlFil = Model.userUrl + `/${userDropDown.value}/todos`;
            Controller.todos(Model.todoUrlFil);
        }else if(idList.value !== 'Select'){
            Model.todoUrlFil = Model.todoUrl + `/${idList.value}`;
            Controller.todos(Model.todoUrlFil);
        }
        break;

    case 'Post':
        if(userDropDown.value !== 'Select'){
            Model.postUrlFil = Model.userUrl + `/${userDropDown.value}/posts`;
            Controller.posts(Model.postUrlFil);
        }else if(idList.value !== 'Select'){
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
    for (child of navLinks.children){
        if (child.classList.contains('active-nav')){
            child.classList.remove('active-nav');
        }
    }
    e.target.classList.add('active-nav');
    switch (e.target.textContent){
        case 'User':
            Controller.filterReset();
            View.hide([userDropDown.parentElement, albumDropDown.parentElement, postDropDown.parentElement, detailDisp]);
            Controller.users(Model.userUrl);
            Controller.userDetails();
            break;
        
        case 'Album':
            Controller.filterReset();
            View.hide([albumDropDown.parentElement, postDropDown.parentElement, detailDisp]);
            View.show([userDropDown.parentElement]);
            Controller.albums(Model.albumUrl);
            break;

        case 'Photos':
            Controller.filterReset();
            View.hide([postDropDown.parentElement, userDropDown.parentElement, detailDisp]);
            View.show([albumDropDown.parentElement]);
            Controller.photos(Model.photoUrl);
            break;

        case 'Todos':
            Controller.filterReset();
            View.hide([albumDropDown.parentElement, postDropDown.parentElement, detailDisp]);
            View.show([userDropDown.parentElement]);
            Controller.todos(Model.todoUrl);
            break;        

        case 'Post':
            Controller.filterReset();
            View.hide([albumDropDown.parentElement, postDropDown.parentElement, detailDisp]);
            View.show([userDropDown.parentElement]);
            Controller.posts(Model.postUrl);
            break;
        case 'Comments':
            Controller.filterReset();
            View.hide([albumDropDown.parentElement, userDropDown.parentElement, detailDisp]);
            View.show([postDropDown.parentElement]);
            Controller.comments(Model.commentUrl);
            break;
        default: console.log('');

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
            element.setAttribute(key,attributes.key);
        }
        
        element.innerHTML = content;
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

    async users(url){
        View.show([displayDiv]);
        View.hide([detailDisp]);
        await this.getData(url)
    .then((allUsers)=>{
        if(this.isArray(allUsers)){
            idDropDown.innerHTML += allUsers.map(user => `<option value="${user.id}">${user.id}</option>`).join('');
            let userlist = allUsers.map(value=>`<div class="list users-list" id="${value.id + ''}">
        <p>${value.name}</p>
        <div><span>${[value.email,value.phone,value.website].join('</span><span>')}</span></div>
        </div>`).join('');
        displayDiv.innerHTML = '<div><h2>All Users</h2></div>'+userlist;
        }else{
            let userlist = `<div class="list users-list" id="${allUsers.id + ''}">
        <p>${allUsers.name}</p>
        <div><span>${[allUsers.email,allUsers.phone,allUsers.website].join('</span><span>')}</span></div>
        </div>`;
        displayDiv.innerHTML = '<div><h2>Filtered Users</h2></div>'+userlist;
        }

    
    
    });

     this.userDetails();   
                       
    },

    userDetails(){
        let userList = document.querySelectorAll('#general-display > div');
        userList.forEach(user =>{
            user.addEventListener('click',function(){
                    detailDisp.classList.add('active-display');
            Controller.getData(Model.userUrl +'/' + user.id).then(userDetails => {
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
                let userLinks = `<br><button onclick="Controller.albums('${Model.userUrl + '/' + userDetails.id + '/albums'}', '${userDetails.name.toString()}');">view albums >></button>
                <button onclick="Controller.posts('${Model.userUrl + '/' + userDetails.id + '/posts'}', '${userDetails.name.toString()}');">view Posts >></button>
                <button onclick="Controller.todos('${Model.userUrl + '/' + userDetails.id + '/todos'}', '${userDetails.name.toString()}');">view Todos >></button>`
                detailDisp.innerHTML += details + userLinks;
                View.show([detailDisp]);

                // adding maps to the details
                // Initialize and add the map
            

                document.querySelector('#detail-display > #closebtn').addEventListener('click', ()=>{
                    let initialDisp = detailDisp.firstElementChild;
                    detailDisp.innerHTML = '';
                    detailDisp.append(initialDisp);
                    View.hide([detailDisp]);
                    View.show([displayDiv]);
                })
                View.hide([displayDiv]);


                
    })})})

  

    },

    
    albums(url, filtername=''){
        View.hide([detailDisp]);
        detailDisp.classList.remove('active-display');
        View.hide([detailDisp]);
        
        this.getData(url).then(allAlbums => {
            if(this.isArray(allAlbums)){
        let albumList =  allAlbums.map(album =>  `<div class="list album-list"><h3>${album.title}</h3><p>Album by user with Id: 
        ${album.userId}
        </p></div>`).join('');
        
        idList.innerHTML = `<option value="Select">Select Id</option>`
        idDropDown.innerHTML += allAlbums.map(album => `<option value="${album.id}">${album.id}</option>`).join('');
        View.show([displayDiv]);
        View.render(displayDiv,`${filtername === ''? '<div><h2>All Allbums</h2></div>': '<div><h2>'+ filtername + ' Albums</h2></div>'}`+albumList);
            }else{
                let albumList =  `<div class="list album-list"><h3>${allAlbums.title}</h3><p id="user${allAlbums.userId}">Album by user with Id: 
        ${this.getData(Model.userUrl + `/${allAlbums.userId}`).then(user => {
            document.querySelector(`.album-list > #user${allAlbums.userId}`).textContent = 'Album by: ' + user.name;
        }) }
        </p></div>`;
        // displayDiv.innerHTML = `${filtername === ''? '<h2>All Allbums</h2>': filtername}`+albumList;
        View.show([displayDiv]);
        View.render(displayDiv,`${filtername === ''? '<div><h2>Filtered Allbums</h2></div>': '<div><h2>'+ filtername + ' Albums</h2></div>'}`+albumList);
        
            }
            
        });
        
        
        
        
        

    },
    
    async photos(url){
        View.hide([detailDisp]);
        this.filterReset();
        View.show([displayDiv]);
        await this.getData(url).then(allPhoto => {
            idList.innerHTML = `<option value="Select">Select Id</option>`
            if (this.isArray(allPhoto)){
                idDropDown.innerHTML += allPhoto.map(photo => `<option value="${photo.id}">${photo.id}</option>`).join('');
        let photoList =  allPhoto.map(photo =>  `<div class="photo-list list" id="${photo.id + ''}"><h3>${photo.title}</h3><div><img src="${photo.thumbnailUrl}" alt="Pics not found">
        </div></div>`).join('');
        displayDiv.innerHTML = '<div><h2>All Photo</h2></div>'+photoList;
            }else{
                let photoList =  `<div class="photo-list list" id="${allPhoto.id + ''}"><h3>${allPhoto.title}</h3><div><img src="${allPhoto.thumbnailUrl}" alt="Pics not found">
        </div></div>`;
        displayDiv.innerHTML = '<div><h2>Filtered Photo</h2></div>'+photoList;
            }
            
        });
        this.photoDetails();
    },

    photoDetails(){
        let photoList = document.querySelectorAll('#general-display > div');
        photoList.forEach(photo =>{
            photo.addEventListener('click',function(){
                    detailDisp.classList.add('active-display');
            Controller.getData(Model.photoUrl +'/' + photo.id).then(photoDetails => {
                let details = `<div>
                <h4>${(async ()=>{
                    let albumTitle = await Controller.getData(Model.albumUrl + `/${photoDetails.albumId}`).then(res => {
                        console.log(res.title);
                        return res.title})
                    return albumTitle;})()}</h4>

                <div style="text-align:center;">
                <img src="${photoDetails.url}" alt="picture not found">
                <h2>${photoDetails.title}</h2>
                </div>

                </div>`;

                detailDisp.innerHTML += details;
                View.show([detailDisp]);

                // adding maps to the details
                // Initialize and add the map
            

                document.querySelector('#detail-display > #closebtn').addEventListener('click', ()=>{
                    let initialDisp = detailDisp.firstElementChild;
                    detailDisp.innerHTML = '';
                    detailDisp.append(initialDisp);
                    View.hide([detailDisp]);
                    View.show([displayDiv]);
                })
                View.hide([displayDiv]);


                
    })})})

  

    },


    posts(url, filtername=''){
        View.hide([detailDisp]);
        this.filterReset();
        View.show([displayDiv]);
        this.getData(url).then(allPost => {
            idList.innerHTML = `<option value="Select">Select Id</option>`
            if(this.isArray(allPost)){
                idDropDown.innerHTML += allPost.map(post => `<option value="${post.id}">${post.id}</option>`).join('');
        let postList =  allPost.map(post =>  `<div class="list post-list" id="${post.id}"><h3>${post.title}</h3><p>Post by user with Id: 
        ${post.userId}
        </p>
        <div class="postdetails ${post.id}"><h4>${post.body}</h4></div>
        </div>`).join('');
        displayDiv.innerHTML = `${filtername === ''? '<div><h2>All Posts</h2></div>': '<div><h2>'+ filtername + '\'s Post</h2></div>'}`+postList;
            }else{
                let postList =  `<div class="list post-list" id="${allPost.id}"><h3>${allPost.title}</h3><p>Post by user with Id: 
        ${allPost.userId}
        </p>
        <div class="postdetails ${allPost.id}"><h4>${post.body}</h4></div>
        </div>`;
        displayDiv.innerHTML = `${filtername === ''? '<div><h2>Filtered Posts</h2></div>': '<div><h2>'+ filtername + '\'s Post</h2></div>'}`+postList;
            }

            this.postDetails();
            
        });
        
        
    },

    postDetails(){
        let postList = document.querySelectorAll('#general-display > div');
        console.log(postList);
        postList.forEach(post =>{
            post.addEventListener('click',function(clickedPost){
            Controller.getData(Model.postUrl +'/' + post.id + '/comments').then(postComments => {
                if(Controller.isArray(postComments)){
                   let comments = postComments.map(comment =>{
                        `<div>
                        <span>${comment.name}</span>
                        <span>${comment.email}</span>
                        <p>${comment.body}</p>
                        </div>`
                    }).join('');
                    let dicv = document.querySelector(`.postdetails ${post.id.toString()}`);
                    // dicv.append(comments);
                    dicv.innerHTML += comments;
                    dicv.classList.toggle('hidden');

                }else{
                    let comment =  `<div>
                        <span>${postComments.name}</span>
                        <span>${postComments.email}</span>
                        <p>${postComments.body}</p>
                        </div>`;
                        let dicv = document.querySelector(`.postdetails ${post.id.toString()}`);
                        dicv.append(comment);
                        dicv.classList.toggle('hidden');
                }
                

                // adding maps to the details
                // Initialize and add the map
            

                document.querySelector('#detail-display > #closebtn').addEventListener('click', ()=>{
                    let initialDisp = detailDisp.firstElementChild;
                    detailDisp.innerHTML = '';
                    detailDisp.append(initialDisp);
                    View.hide([detailDisp]);
                    View.show([displayDiv]);
                })
                View.hide([displayDiv]);


                
    })})})
    },
    comments(url){
        View.hide([detailDisp]);
        View.show([displayDiv]);
        this.getData(url).then(comment => {
            idList.innerHTML = `<option value="Select">Select Id</option>`
            if(this.isArray(comment)){
                idDropDown.innerHTML += comment.map(commentt => `<option value="${commentt.id}">${commentt.id}</option>`).join('');
                displayDiv.innerHTML = '<div><h2>All Comments</h2></div>'+ comment.map(comt =>  `<div class="list comments-list"><h3>${comt.name}</h3><div><span>${[comt.email,comt.postId].join('</span><span>From post with Id: ')}</span></div></div>`).join('');
            }else{
                displayDiv.innerHTML = '<div><h2>Filtered Comment</h2></div>'+  `<div class="list comments-list"><h3>${comment.name}</h3><div><span>${[comment.email,comment.postId].join('</span><span>From post with Id: ')}</span></div></div>`;
            }
            
        }).catch(error => console.log(error));
    },
    todos(url, filtername=''){
        View.hide([detailDisp]);
        View.show([displayDiv]);
        this.getData(url).then(allTodo => {
            idList.innerHTML = `<option value="Select">Select Id</option>`
            if (this.isArray(allTodo)){
                idDropDown.innerHTML += allTodo.map(todo => `<option value="${todo.id}">${todo.id}</option>`).join('');
                let todoList =  allTodo.map(todo =>  `<div class="todo-list list"><h3>${todo.title}</h3><span class="${todo.completed?'completed':'uncompleted'}">${todo.completed?'&check;':'&times;'}</span><p>Todos by user with Id: 
        ${todo.userId}
        </p></div>`).join('');
        displayDiv.innerHTML = `${filtername === ''? '<div><h2>All Todos</h2></div>': '<div><h2>'+ filtername + '\'s Todos</h2></div>'}`+todoList;//'<div><h2>All Todos</h2></div>'+todoList;  
            }else{
                let todoList =  `<div class="todo-list list"><h3>${allTodo.title}</h3><span class="${allTodo.completed?'completed':'uncompleted'}">${allTodo.completed?'&check;':'&times;'}</span><p>Todos by user with Id: 
        ${allTodo.userId}
        </p></div>`
        displayDiv.innerHTML = `${filtername === ''? '<div><h2>Filtered Todos</h2></div>': '<div><h2>'+ filtername + '\'s Todos</h2></div>'}`+todoList; 
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
        this.getData(Model.userUrl).then(users =>{
            userSelect = users.map(user => `<option value=${user.id}>${user.name}</option>`).join('');
            userDropDown.innerHTML += userSelect;
        })
        View.hide([userDropDown.parentElement, albumDropDown.parentElement, postDropDown.parentElement]);
        this.users(Model.userUrl);


    },
    
    
    async getData(url){
        
      let response = await fetch(url).then(e => e.json());
       return response;

    }

}

Controller.initialPageSetup();




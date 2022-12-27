
const form = get(".formulario");
const postID = get(".post-id");
const commentInput = get(".comment-input");
const usersActivos = get(".usersActivos");
const contenedorComments= get(".contenedor-comments");
const authUser2 = get(".auth-user");
let authUser;
let getUser;
let result = [];


window.onload = function () {
       
    axios.get('/auth/user').then(res => {
        authUser = res.data.authUser;
    }).then(() => {
        axios.get(`/posts/${postID.value}/get_comments`).then( res =>{
            /* console.log(authUser); */
            cargarComments(res.data.comments);
        })
    }).then(()=>{
        /* Echo se va a encargar de escuchar los eventos del lado del servidor */
        /* Nos unimos al canal */
        Echo.join(`post.${postID.value}`).listen('CommentEvent', (e) => {
   
            axios.get(`/users/${e.comment.user_id}/get_user`).then(res => {
                getUser = res.data.name;
            }).then(() =>{
                ingresarComentario(e.comment.content, getUser);
            });
            
        }).here((users) => {
            
                result = users.filter(user => user.id != authUser.id);
                console.log('Estoy en here');
                console.log(result);
                
                /* console.log(users); */
                if(result.length > 0){
                    result.forEach(usuario => {
                        ingresarUsuario(usuario.name);
                    });
                }
        
        }).joining((user) => {
            console.log('Estoy en Joining');
            console.log(user.name);
            console.log(authUser.name);
            if(user.id != authUser.id)
               ingresarUsuario(user.name);
            
           
        }).leaving((user) => {
            console.log('Estoy en leaving');
            console.log(user.name);
            console.log(authUser.name);
           
            /* if(user.id != authUser.id)
               ingresarUsuario(user.name); */
            
        });
        
    });
    
}



function cargarComments(comments){
    comments.forEach(comment => {
        ingresarComentario(comment.content, comment.user.name);
    });
}

function ingresarUsuario(name){
    const plantillaHTML = `
            <h4>${name}</h4> 
    `;
  
    usersActivos.insertAdjacentHTML("beforeend", plantillaHTML);
    /* scrollToBotton(); */
}

function ingresarComentario(text, name){
    const plantillaHTML = `
            <p>${text} ---> <strong>autor:</strong> ${name}</p> 
    `;
  
    contenedorComments.insertAdjacentHTML("beforeend", plantillaHTML);
    scrollToBotton();
}

function scrollToBotton(){
    contenedorComments.scrollTop = contenedorComments.scrollHeight;
}


form.addEventListener("submit", event => {
   /* para no recargar la pagina al enviar el formulario */
   event.preventDefault(); 
  
   if(!commentInput.value) return;
   
    axios.post('/comments/store', {
        content: commentInput.value,
        post_id: postID.value
    }).then( res => {
        ingresarComentario(res.data.content, authUser.name);
    }).catch(error => {
        console.log('Ha ocurrido un error');
        console.log(error);
    });

   commentInput.value = "";

});




/* Si quieres escuchar mas eventos lo púedes hacver
Echo.join(`post.${postID.value}`).listen('CommentEvent', (e) => {
    console.log(e);
}).listen(); Etc.... */


// Utils
function get(selector, root = document) {
    return root.querySelector(selector);
}
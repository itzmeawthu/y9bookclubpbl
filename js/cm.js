const submitBtn = document.querySelector('.submit__btn')
const userName = document.querySelector('#user')
const comment = document.querySelector('#comment')
const likeIcon = document.querySelector('.heart__icon')
const count = document.querySelector('.count')
const commentsCont = document.querySelector('.comments__container')

likeIcon.addEventListener('click', likeVideo)
submitBtn.addEventListener('click', submitFeedback)


feedbackArr = []
let positiveFeedback = false
let likesCount = 0

function submitFeedback(e){
    // get user name
    const userForm = userName.value 
    // get feedback
    const commentForm = comment.value 
    // if inputs are not empty
    if(userForm && commentForm !== ''){
        // create new feedback
        newFeedback = {
            "id": Math.floor((Math.random() * 1000)+ 1),
            "userName": userForm,
            "userComment": commentForm,
            "typeOfFeedback": positiveFeedback
        }
        // add new feedback to array
        feedbackArr.push(newFeedback)
        // if liked add to count
        if(positiveFeedback === true){
            addLikes()
        }
        // clear inputs 
        resetForm()
        // add feedback to list
        addFeedback(newFeedback)
    }


    e.preventDefault()
}

function likeVideo(){
    likeIcon.classList.toggle('liked')

    if(likeIcon.classList.contains('liked')){
        likeIcon.innerHTML = `<i class="fas fa-heart"></i>`
        // set feedback to liked
        positiveFeedback = true
    } else {
        likeIcon.innerHTML = `<i class="far fa-heart"></i>`
        // set feedback to not liked
        positiveFeedback = false
    }
}

// function addLikes(){
//     likesCount++
//     count.innerHTML = likesCount
// }

function resetForm(){
    userName.value = ''
    comment.value = ''
    likeIcon.innerHTML = `<i class="far fa-heart"></i>`
    positiveFeedback = false
}
function createInputBox() { 
    let div = document.createElement("div"); 
    div.setAttribute("class", "comment-details"); 
    div.innerHTML += `<input type="text"
                             placeholder="add text here"
                             class="input" /> `;
                     // ` <button class="btn submit"> 
                     //       Submit 
                     //  </button>`; 
    const subbtn = document.createElement("button");
    subbtn.classList.add('submit');
    // button.classList.add('btn');
    subbtn.textContent = "Submit";
    console.log(subbtn);
  // Append the button to the button-container div
 
    div.appendChild(subbtn);
    return div; 
} 
function addReply(text) { 
    let div = document.createElement("div"); 
    div.setAttribute("class", "all-comment"); 
    div.innerHTML += `<div class="card"> 
<span class="text"> 
                      ${text} 
</span> 
<span id="reply" class="reply"> 
                      Add Reply 
</span></div>`; 
    return div; 
}
 
function addFeedback(item){
    // select first letter of the user name
    const letter = (item.userName).charAt(0)
    // create new div
    const div = document.createElement('div')
    // add class
    div.classList = 'comment__card'
    // add id
    div.id = item.id 
    // add html
    div.innerHTML = `
    <div class="pic center__display">
                    ${letter}
                </div>
                <div class="comment__info">
                    <small class="nickname">
                        ${item.userName}
                    </small>
                    <p class="comment">
                        ${item.userComment}
                    </p>
                    <div class="comment__bottom">
                        <div class="heart__icon--comment">
                            ${item.typeOfFeedback ? `<i class="fas fa-heart positive"></i>` : `<i class="far fa-heart"></i>`}
                        </div>
                         <button class='reply' onclick="rep();">
                            Reply
                        </button>

                         
                    </div>
                </div>
    `
    
    // insert feedback into the list
    commentsCont.insertAdjacentElement('beforeend', div)


}


function rep(){
    // alert('myrep');
    commentsCont.addEventListener("click", function(e) {
        // alert('myeveent');
                      
                        let replyClicked = 
                            e.target.classList.contains("reply"); 
                        let submitClicked = 
                            e.target.classList.contains("submit"); 
                           
                        let closestCard = 
                            e.target.closest(".comments__container"); 
                        if (replyClicked) { 
                          console.log(replyClicked);
                            closestCard.appendChild(createInputBox()); 
                        } 
                        if (submitClicked) { 
                            const commentDetails = 
                                e.target.closest(".comment-details"); 
                            if (commentDetails.children[0].value) { 
                                closestCard.appendChild( 
                                    addReply(commentDetails.children[0].value)); 
                                commentDetails.remove(); 
                            } 
                        }
                    });
}
$(document).ready(function (){
    let allCards = [];
    fetch(baseURL)
        .then(res => res.json())
        .then(data => {
            allCards = data;
            console.log(data);
            $("#card").html(render(allCards[0]));
            hljs.initHighlighting();
        });

    function recallCards(){
        fetch(baseURL)
            .then( res => res.json())
            .then( data => {
                allCards = data;
            });
    }

    function createNewCard(title, question, answer, category, code){
        return {
            title: title,
            question: question,
            answer: answer,
            category: category,
            code: code
        }
    }

    function modalFadeOut(modalObj){
        modalObj.fadeOut(500);
    }

    let count = 0;
    $("#nextCard").on("click", function (){
        count++;
        if(count > allCards.length - 1) {
            count = 0;
        }
        $("#card").html((render(allCards[count])));
    });



    let setCurrentCardContent;
    function render(cardObj){
        if(cardObj.code === "undefined"){
            cardObj.code = null;
        }
        setCurrentCardContent = `<div class="flip-card">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                        <h6>${cardObj.category}</h6>
                                            <h1>${cardObj.title}</h1>
                                            <p>${cardObj.question}</p>
        <pre>
    <code>
${cardObj.code}
    </code>
        </pre>
                                        </div>
                                        <div class="flip-card-back">
                                            <h1>Answer</h1>
                                            <p>${cardObj.answer}</p>
                                        </div>
                                    </div>
                                </div>`;



        return `<div class="flip-card">
                   <div class="flip-card-inner">
                       <div class="flip-card-front">
                           <button id="edit">Edit</button>
                           <h6>${cardObj.category}</h6>
                           <h1>${cardObj.title}</h1>
                           <p>${cardObj.question}</p>
        <pre>
<code>
${cardObj.code}
<code>
        </pre>
                       </div>
                       <div class="flip-card-back">
                           <h1>Answer</h1>
                           <p>${cardObj.answer}</p>
                       </div>
                   </div>
                   <span id="hiddenID">${cardObj.id}</span>
               </div>`
    }


    $("#card").on("dblclick", function (){
        const flipCard = $(".flip-card-inner");
        if(!flipCard.hasClass("flip")){
            flipCard.addClass("flip");
        } else {
            flipCard.removeClass("flip");
        }
    });







    let addModalOpen = false;
    $("#addCard").on("click", function (){
        addModalOpen = true;
        $("#newCardModal").css("display", "flex");
        $("#closeNewCardModal").on("click", function (){
            modalFadeOut($("#newCardModal"));
        });
        let newCardTitle = $("#newCardTitle");
        let newCardCategory = $("#newCardCategory");
        let newCardQuestion = $("#newCardQuestion");
        let newCardAnswer = $("#newCardAnswer");
        let newCardCode = $("#newCardCode");
        $("#submitNewCard").on("click", function (){
            addCard(createNewCard(newCardTitle.val(), newCardQuestion.val(), newCardAnswer.val(), newCardCategory.val(), newCardCode.val())).then(recallCards);
            modalFadeOut($("#newCardModal"));
        });
    });



    //=======EDIT AND DELETE FUNCTIONS===========//
    let editModalOpen = false;
    $("body").on("click", "#edit", function () {
        editModalOpen = true;
        let currentID = $("#card").children()[0].lastChild.previousSibling.innerText;
        let currentCardHTML = $(this).parent();
        let currentCard = allCards[count];

        $("#deleteCard").on("click", function(){
           deleteCard(currentID).then( () => {
               recallCards();
               $("#card").html((render(allCards[count - 1])));
           });
           modalFadeOut($("#editCardModal"));
        });

        let editTitleInput = $("#editCardTitle");
        let editCategoryInput = $("#editCardCategory");
        let editCodeInput = $("#editCardCode");
        let editQuestionInput = $("#editCardQuestion");
        let editAnswerInput = $("#editCardAnswer");

        editTitleInput.val(currentCard.title);
        editCategoryInput.val(currentCard.category);
        editCodeInput.val(currentCard.code);
        editQuestionInput.val(currentCard.question);
        editAnswerInput.val(currentCard.answer);

        $("#editCardModal").css("display", "flex");
        $("#closeEditModal").on("click", function () {
            modalFadeOut($("#editCardModal"));
        });
        $("#submitEditCard").on("click", function () {
            let newCardObj = {
                title: editTitleInput.val(),
                category: editCategoryInput.val(),
                code: editCodeInput.val(),
                question: editQuestionInput.val(),
                answer: editAnswerInput.val(),
                id: currentID
            }
            currentCardHTML.html((render(newCardObj)));
            editCard(newCardObj).then( () => {
                allCards[count] = newCardObj;
                recallCards();
            });
            modalFadeOut($("#editCardModal"));
        });
    });






    window.addEventListener("keydown", function (e){
        if(e.key === "Escape" && addModalOpen){
            modalFadeOut($("#newCardModal"));
        } else if(e.key === "Escape" && editModalOpen){
            modalFadeOut($("#editCardModal"));
        }
    });






    let completedArea = document.getElementById("completed");
    $("#addToComplete").on("click", function(){
        completedArea.insertAdjacentHTML("beforeend", setCurrentCardContent);
    });

    let pinnedArea = document.getElementById("pinned");
    $("#addToPin").on("click", function (){
        pinnedArea.insertAdjacentHTML("beforeend", setCurrentCardContent);
    });



    function voiceReader(input, pitch) {
        return new Promise((res) => {
            const voice = new SpeechSynthesisUtterance(input);
            voice.pitch = pitch;
            voice.rate = .8;
            speechSynthesis.speak(voice);
            setTimeout(res, 1000);
        });
    }

    const readCard = () => {
        let text = $("#card").children()[0].innerText
        return voiceReader(text, 1.2);
    };

    let clickCountOfVoice = 0;
    document.getElementById('readCard').addEventListener('click', function (){
        clickCountOfVoice++;
        if(clickCountOfVoice % 2 !== 0) {
            readCard();
        } else {
            speechSynthesis.cancel();
        }
    });
});
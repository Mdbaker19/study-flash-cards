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

    let count = 0;
    $("#nextCard").on("click", function (){
        console.log(count);
        console.log(allCards[count]);
        hljs.initHighlighting();
        count++;
        if(count > allCards.length - 1) {
            count = 0;
        }
        $("#card").html((render(allCards[count])));
    });



    let setCurrentCardContent;
    function render(cardObj){
        if(cardObj.code === "undefined"){
            cardObj.code = "";
        }
        setCurrentCardContent = `<div class="flip-card">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                        <h6>${cardObj.category}</h6>
                                            <h1>${cardObj.title}</h1>
                                            <pre>${cardObj.question}</pre>
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
                           <pre>${cardObj.question}</pre>
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


    function modalFadeOut(jQObj){
        jQObj.fadeOut(500);
    }


    function editCardObj(title, question, answer, category, code, id){
        return {
            title: title,
            question: question,
            answer: answer,
            category: category,
            code: code,
            id: id
        }
    }


    //=======EDIT FUNCTIONS===========//
    let editModalOpen = false;
    $("body").on("click", "#edit", function () {
        editModalOpen = true;
        let currentID = $("#card").children()[0].lastChild.previousSibling.innerText;
        console.log(currentID);
        let currentCard = allCards[count];
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
        let currTitle = editTitleInput;
        let currCategory = editCategoryInput;
        let currCode = editCodeInput;
        let currQuestion = editQuestionInput;
        let currAnswer = editAnswerInput;
        $("#submitEditCard").on("click", function () {
            editCard(editCardObj(currTitle.val(), currQuestion.val(), currAnswer.val(), currCategory.val(), currCode.val(), currentID)).then(recallCards);
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
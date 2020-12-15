$(document).ready(function (){
    let allCards = [];
    let baseAllCards = [];
    let currentCardNumber = $("#currentCardNumber");
    let cardDeckSize = $("#deckSizeNumber");
    fetch(baseURL)
        .then(res => res.json())
        .then(data => {
            $("#loadingArea").fadeOut(100);
            allCards = data;
            baseAllCards = data;
            console.log(data);
            $("#card").html(render(allCards[0]));
            hljs.initHighlighting();
            currentCardNumber.text(1);
            cardDeckSize.text(allCards.length);
        });

    function recallCards(){
        fetch(baseURL)
            .then( res => res.json())
            .then( data => {
                allCards = data;
                cardDeckSize.text(allCards.length);
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
        currentCardNumber.text(count+1);
        $("#card").html((render(allCards[count])));
    });



    let setCurrentCardContent;
    function render(cardObj){
        if(cardObj.code === "undefined"){
            cardObj.code = "";
        }
        setCurrentCardContent = `<div id="currentCardCopy">
                                        <h6>${cardObj.category}</h6>
                                            <h1>${cardObj.title}</h1>
                                            <pre>${cardObj.question}</pre>
        <pre>
    <code>
  ${cardObj.code}
    </code>
        </pre>
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


    //=======SEARCH DECK==========//
    let searchDeckOpen = false;
    $("#searchDeck").on("click", function(){
        $(this).css("display", "none");// ADDED TEMPORARILY DUE TO FILTERING CAUSING SOME WEIRD ISSUES WHEN TRYING TO FILTER FOR A SECOND TIME
        let searchOptionsSet = [];
        searchDeckOpen = true;
        $("#searchDeckModal").css("display", "flex");
        $("#closeSearchDeck").on("click", function (){
           modalFadeOut($("#searchDeckModal"));
        });

        $(".languageOptions").on("click", function (){
           let languageSelection = $(this)[0].innerText;
            if($(this).hasClass("languageOptionsClicked")){
               $(this).removeClass("languageOptionsClicked");
           } else {
               $(this).addClass("languageOptionsClicked");
           }



           if(!searchOptionsSet.includes(languageSelection)){
               searchOptionsSet.push(languageSelection);
           } else {
               let index = searchOptionsSet.indexOf(languageSelection);
               searchOptionsSet.splice(index, 1);
           }
            console.log(searchOptionsSet);
        });


        $("#applyDeckFilter").on("click", function (){
            allCards = baseAllCards;
            let appliedCards = [];
            let searchOptionsArr = [];
            searchOptionsSet.forEach(item => {
                searchOptionsArr.push(item);
            });
            allCards.forEach(card => {
                for(let i = 0; i < searchOptionsArr.length; i++){
                    if(card.category.toLowerCase() === searchOptionsArr[i].toLowerCase()){
                        appliedCards.push(card);
                    }
                }
            });
            cardDeckSize.text(appliedCards.length);
            if(appliedCards.length < 1){
                currentCardNumber.text(0);
                $("#card").fadeOut(100);
                $("#cycle").css("marginTop", "0px");
            } else {
                $("#card").show();
                currentCardNumber.text(1);
                $("#cycle").css("marginTop", "-40px");
            }
            allCards = appliedCards;
            modalFadeOut($("#searchDeckModal"));
            searchDeckOpen = false;
        });
    });



    let addModalOpen = false;
    $("#addCard").on("click", function (){
        $(this).css("display", "none");//ADDED TEMPORARILY TO FORCE A REFRESH TO ADD ANOTHER CARD DUE TO THERE BEING ISSUES WITH CARDS DUPLICATING
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
            addCard(createNewCard(newCardTitle.val(), newCardQuestion.val(), newCardAnswer.val(), newCardCategory.val().replace(/</g, "&lt").replace(/>/g, "&lt"), newCardCode.val().replace(/</g, "&lt").replace(/>/g, "&lt"))).then(recallCards);
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
                code: editCodeInput.val().replace(/</g, "&lt").replace(/>/g, "&lt"),
                question: editQuestionInput.val().replace(/</g, "&lt").replace(/>/g, "&lt"),
                answer: editAnswerInput.val(),
                id: currentID
            }
            currentCardHTML.html((render(newCardObj)));
            editCard(newCardObj).then( () => {
                recallCards();
            });
            modalFadeOut($("#editCardModal"));
        });
    });






    window.addEventListener("keydown", function (e){
        if(e.key === "Escape"){
            if(addModalOpen){
                modalFadeOut($("#newCardModal"));
                addModalOpen = false;
            } else if(editModalOpen){
                modalFadeOut($("#editCardModal"));
                editModalOpen = false;
            } else if(searchDeckOpen){
                modalFadeOut($("#searchDeckModal"));
                searchDeckOpen = false;
            }
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
            voice.rate = 1;
            speechSynthesis.speak(voice);
            setTimeout(res, 1000);
        });
    }

    const readCard = () => {
        let textArr = $("#card").children()[0].innerText.split("\n");
        let text = textArr.slice(2, textArr.length -3);
        return voiceReader(text, 1.2);
    };

    let clickCountOfVoice = 0;
    document.getElementById('readCard').addEventListener('click', function (){
        clickCountOfVoice++;
        if(clickCountOfVoice % 2 !== 0) {
            readCard();
            $("#readCard").text("Stop Reader");
        } else {
            speechSynthesis.cancel();
            $("#readCard").text("Read Card");
        }
    });
});
$(document).ready(function (){


    let allCards = [];
    let setCurrentCardContent;
    let currentCardNumber = $("#currentCardNumber");
    let cardDeckSize = $("#deckSizeNumber");
    currentCardNumber.text(1);
    cardDeckSize.text(allCards.length);
    let baseAllCards = [];


    fetch(baseURL)
        .then(res => {
            res.json()
        .then(data => {
            $("#loadingArea").fadeOut(100);
            allCards = makeCardArr(data);
            baseAllCards = makeCardArr(data);
            // console.log(allCards);
            $("#card").html(render(allCards[0]));
            currentCardNumber.text(1);
            cardDeckSize.text(allCards.length);
        })}).catch(err => console.error(err));

    function recallCards(){
        fetch(baseURL)
            .then( res => res.json())
            .then( data => {
                allCards = makeCardArr(data);
                baseAllCards = makeCardArr(data);
                cardDeckSize.text(allCards.length);
            }).catch(err => console.error(err));
    }

    function makeCardArr(objSet) {
        let arr = [];
        for(const o in objSet) {
            arr.push(objSet[o]);
        }
        return arr;
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

















    function render(cardObj){
        if(!cardObj) return;
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



        return `<div class="flip-card card">
                   <div class="flip-card-inner">
                       <div class="flip-card-front">
<!--                           <button id="edit">Edit</button>-->
                           <h6>${cardObj.category}</h6>
                           <h1>${cardObj.title}</h1>
                           <pre>${cardObj.question}</pre>
                              <pre style="display: flex"><code style="width: 100%"><p style="text-align: left; display: inline-block;">${cardObj.code.trim()}</p></code></pre>
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
    let searchOptionsSet;
    let languageSelection;


    $("#searchDeck").on("click", function() {
        searchOptionsSet = [];
        $(".languageOptions").toArray().forEach(ele => {
            if(ele.classList.contains("languageOptionsClicked")){
                ele.classList.remove("languageOptionsClicked");
            }
        });
        searchDeckOpen = true;
        $("#searchDeckModal").css("display", "flex");
        $("#closeSearchDeck").on("click", function () {
            modalFadeOut($("#searchDeckModal"));
        });
    });
        $(".languageOptions").on("click", function () {
            languageSelection = $(this)[0].innerText;
            if ($(this).hasClass("languageOptionsClicked")) {
                $(this).removeClass("languageOptionsClicked");
            } else {
                $(this).addClass("languageOptionsClicked");
            }

            if (!searchOptionsSet.includes(languageSelection)) {
                searchOptionsSet.push(languageSelection);
            } else {
                let index = searchOptionsSet.indexOf(languageSelection);
                searchOptionsSet.splice(index, 1);
            }
            // console.log(searchOptionsSet);
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


    let addModalOpen = false;
    let newCardTitle;
    let newCardCategory;
    let newCardQuestion;
    let newCardAnswer;
    let newCardCode;
    $("#addCard").on("click", function (){
        let pass = prompt("Password...");
        if(pass === "js") addModalOpen = true;
        else return;
        $("#newCardModal").css("display", "flex");
        $("#closeNewCardModal").on("click", function (){
            modalFadeOut($("#newCardModal"));
        });
        newCardTitle = $("#newCardTitle");
        newCardCategory = $("#newCardCategory");
        newCardQuestion = $("#newCardQuestion");
        newCardAnswer = $("#newCardAnswer");
        newCardCode = $("#newCardCode");
    });

    $("#submitNewCard").on("click", () => {
        if((newCardQuestion.val().trim().length < 1 || newCardQuestion.val().trim().length < 1) || newCardAnswer.val().trim().length < 1) {
            Array.from($(".newInput")).forEach(ele => {
                if(ele.value.trim().length < 1) {
                    ele.classList.add("error");
                } else {
                    ele.classList.remove("error");
                }
            });
            $("#newCardCode").removeClass("error");
            return;
        }
        addCard(createNewCard(newCardTitle.val(), newCardQuestion.val(), newCardAnswer.val(),
            newCardCategory.val().replace(/</g, "&lt").replace(/>/g, "&gt"),
            newCardCode.val().replace(/</g, "&lt").replace(/>/g, "&gt")))
            .then(() => {
                recallCards();
                Array.from($(".newInput")).forEach(ele => {
                    ele.classList.remove("error");
                });
                modalFadeOut($("#newCardModal"));
            });
    });


    //=======EDIT AND DELETE FUNCTIONS===========//
    // let editModalOpen = false;
    // let currentID;
    // let currentCardHTML;
    // // let editTitleInput = $("#editCardTitle");
    // // let editCategoryInput = $("#editCardCategory");
    // // let editCodeInput = $("#editCardCode");
    // // let editQuestionInput = $("#editCardQuestion");
    // // let editAnswerInput = $("#editCardAnswer");
    // $("body").on("click", "#edit", function () {
    //     editModalOpen = true;
    //     currentID = $("#card").children()[0].lastChild.previousSibling.innerText;
    //     currentCardHTML = $(this).parent();
    //     let currentCard = allCards[count];
    //
    //     // editTitleInput.val(currentCard.title);
    //     // editCategoryInput.val(currentCard.category);
    //     // editCodeInput.val(currentCard.code);
    //     // editQuestionInput.val(currentCard.question);
    //     // editAnswerInput.val(currentCard.answer);
    //
    //     $("#editCardModal").css("display", "flex");
    //     $("#closeEditModal").on("click", function () {
    //         modalFadeOut($("#editCardModal"));
    //     });
    // });
    //
    // $("#submitEditCard").on("click", function () {
    //     let newCardObj = {
    //         title: editTitleInput.val(),
    //         category: editCategoryInput.val(),
    //         code: editCodeInput.val().replace(/</g, "&lt").replace(/>/g, "&gt"),
    //         question: editQuestionInput.val().replace(/</g, "&lt").replace(/>/g, "&gt"),
    //         answer: editAnswerInput.val(),
    //         id: currentID
    //     }
    //     currentCardHTML.html((render(newCardObj)));
    //     editCard(newCardObj).then( () => {
    //         recallCards();
    //     });
    //     modalFadeOut($("#editCardModal"));
    // });
    //
    // $("#deleteCard").on("click", function(){
    //     deleteCard(currentID).then( () => {
    //         $("#card").html((render(allCards[count - 1])));
    //     });
    //     modalFadeOut($("#editCardModal"));
    // });




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

    $(window).scroll(function () {
        const currentPos = $(this).scrollTop();
        if (currentPos >= parseFloat($('#doubleClick').css('height'))) {
            $('#header').css({position: 'fixed', 'background-color': 'rgba(0,0,0,.5)'});
            $('.side-bar').css({top: 0});
        } else {
            $('#header').css({position: 'static', 'background-color': '#0bd6d6'});
            $('.side-bar').offset({top: 10});
        }
    });







    let count = 0;
    let cardLoc = document.getElementsByClassName("cards");

    for(let i = 0; i < allCards.length; i++){
        cardLoc[0].insertAdjacentHTML( "afterbegin", render(allCards[i]));
    }
    Array.from(cardLoc).forEach(card => {
        Array.from(card.children).forEach((card, ind) => {
            if(ind > 0) {
                card.classList.add("hidden");
            }
                card.classList.add(ind.toString());
        });
    });

    let oldId = null;

    let slideCards = 0;
    $('#nextCard').click(function() {
        let currentId = slideCards;
        slideCards++;
        if(slideCards >= allCards.length){
            slideCards = 0;
        }
        $("#card").html(render(allCards[slideCards]));
        currentCardNumber.text(slideCards+1);
        oldId = currentId;
    });







    // if (currentId < oldId) { // item is hidden
    //     var timing = $('.card.hidden').length * 100;
    //     $('.card').each(function(index) {
    //         if (index > (currentId - 1 ) || index == (currentId - 1)) {
    //             window.setTimeout(function() {
    //                 $('.card').eq(index).removeClass('hidden');
    //             }, timing - (index * 100));
    //         }
    //     });
    // } else {
    //     $('.card').each(function(index) {
    //         if (index < (currentId - 1)) {
    //             window.setTimeout(function() {
    //                 $('.card').eq(index).addClass('hidden');
    //             }, index * 100);
    //         }
    //     });
    // }




















});
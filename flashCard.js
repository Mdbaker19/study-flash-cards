$(document).ready(function (){
    let allCards = [];
    fetch(baseURL)
        .then(res => res.json())
        .then(data => {
            allCards = data;
            console.log(data);
            $("#card").html(render(allCards[0]));
            clickCard();
        });

    function recallCards(){
        fetch(baseURL)
            .then( res => res.json())
            .then( data => {
                allCards = data;
            });
    }

    function createNewCard(title, question, answer, category){
        return {
            title: title,
            question: question,
            answer: answer,
            category: category
        }
    }

    let count = 0;
    $("#nextCard").on("click", function (){
        count++;
        if(count > allCards.length - 1) {
            count = 0;
        }
        $("#card").html(render(allCards[count]));
        clickCard();
        flipCardBack();
    });



    let currentCardContent;
    function render(cardObj){
        currentCardContent = `<div class="flip-card">
                                    <div class="flip-card-inner">
                                        <div class="flip-card-front">
                                            <h1>${cardObj.title}</h1>
                                            <pre>${cardObj.question}</pre>
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
                           <h1>${cardObj.title}</h1>
                           <pre>${cardObj.question}</pre>
                       </div>
                       <div class="flip-card-back">
                           <h1>Answer</h1>
                           <p>${cardObj.answer}</p>
                       </div>
                   </div>
               </div>`
    }

    let currentCardFlipped = false;
    function clickCard() {
        if(!currentCardFlipped) {
            $(".flip-card").on("click", function () {
                $(this).children().css("transform", "rotateY(180deg)");
                currentCardFlipped = true;
                flipCardBack();
            });
        }
    }
    function flipCardBack(){
        if(currentCardFlipped){
            $(".flip-card").on("click", function (){
                $(this).children().css("transform", "revert");
                currentCardFlipped = false;
                clickCard();
            })
        }
    }











    let modalOpen = false;
    $("#addCard").on("click", function (){
        modalOpen = true;
        $("#newCardModal").css("display", "flex");
        $("#closeNewCardModal").on("click", function (){
            modalFadeOut();
        });
        let newCardTitle = $("#newCardTitle");
        let newCardCategory = $("#newCardCategory");
        let newCardQuestion = $("#newCardQuestion");
        let newCardAnswer = $("#newCardAnswer");
        $("#submitNewCard").on("click", function (){
            addCard(createNewCard(newCardTitle.val(), newCardQuestion.val(), newCardAnswer.val(), newCardCategory.val())).then(recallCards);
            modalFadeOut();
        });
    });


    function modalFadeOut(){
        $("#newCardModal").fadeOut(500);
    }


    window.addEventListener("keydown", function (e){
        if(e.key === "Escape" && modalOpen){
            modalFadeOut();
        }
    });





    let completedArea = document.getElementById("completed");
    $("#addToComplete").on("click", function(){
        completedArea.insertAdjacentHTML("beforeend", currentCardContent);
    });

    let pinnedArea = document.getElementById("pinned");
    $("#addToPin").on("click", function (){
        pinnedArea.insertAdjacentHTML("beforeend", currentCardContent);
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
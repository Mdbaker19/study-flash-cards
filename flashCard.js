$(document).ready(function (){
   let allCards = [];
   fetch(baseURL)
       .then(res => res.json())
       .then(data => {
          allCards = data;
          $("#card").html(render(allCards[0]));
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
   });

   function render(cardObj){
      return `<div id="cardContent">
                   <h6 id="categoryOfCard">${cardObj.category}</h6>
                   <h1>${cardObj.title}</h1>
                   <hr>
                   <p>${cardObj.question}</p>
                   <hr>
              </div>`
   }











   let currentText;
   let currentCard;
   $("#card").hover( function (){
      currentCard = $("#cardContent");
      currentText = currentCard.html();
      $(this).css({
         "transform": "rotateY(180deg)",
         "transition": "transform 1s"
      });
      $(this).children().css({
         "transform": "rotateY(180deg)",
         "transition": "transform 1s"
      });
      setTimeout(function (){
         currentCard.html(allCards[count].answer);
      }, 250);
   }, function (){
      $(this).children().css({
         "transform": "revert",
         "transition": "transform 1s"
      });
      $(this).css({
         "transform": "revert",
         "transition": "transform 1s"
      });
      setTimeout(function (){
         currentCard.html(currentText);
      }, 250);
   });





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

   // to-do:
   //    add keypress event for esc key on the add new card modal
   window.addEventListener("keydown", function (e){
      if(e.key === "Escape" && modalOpen){
         modalFadeOut();
      }
   });





   let completedArea = document.getElementById("completed");
   $("#addToComplete").on("click", function(){
      completedArea.insertAdjacentHTML("beforeend", currentText);// need to use something other than currentText
   });

   let pinnedArea = document.getElementById("pinned");
   $("#addToPin").on("click", function (){
      pinnedArea.insertAdjacentHTML("beforeend", currentText);
   });



   function singLyrics(lyrics, pitch) {
      return new Promise((res) => {
         const lyric = new SpeechSynthesisUtterance(lyrics);
         lyric.pitch = pitch;
         lyric.rate = .8;
         speechSynthesis.speak(lyric);
         setTimeout(res, 1000);
      });
   }

   const singPromises = () => {
      let text = $("#card").children()[0].innerText
      return singLyrics(text, 1.2);
   };

   document.getElementById('readCard').addEventListener('click', singPromises);

});
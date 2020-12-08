$(document).ready(function (){
   let allCards = [];
   fetch(baseURL)
       .then(r => r.json())
       .then(d => {
          allCards = d;
          console.log(d)
       });

   function recallCards(){
      fetch(baseURL)
          .then( r => r.json())
          .then( d => console.log(d));
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
      $("#card").html(render(allCards[count]));//will work on this
      if(count < allCards.length) {
         count++;
      } else {
         count = 0;//not working right now
      }
   });

   function render(cardObj){
      return `<div id="cardContent">
                   <h6 id="categoryOfCard">${cardObj.category}</h6>
                   <h1>${cardObj.title}</h1>
                   <hr>
                   <p>${cardObj.question}</p>
                   <hr>
                   <p>${cardObj.answer}</p>
              </div>`
   }












   $("#cardContent").hover( function (){
      $(this).css({
         "transform": "rotateY(180deg)",
         "transition": "transform 2s"
      });
   }, function (){
      $(this).css({
         "transform": "revert",
         "transition": "transform 2s"
      });
   });

   $("#addCard").on("click", function (){
      $("#newCardModal").css("display", "flex");
      $("#closeNewCardModal").on("click", function (){
         $("#newCardModal").fadeOut(500);
      });
      let newCardTitle = $("#newCardTitle");
      let newCardCategory = $("#newCardCategory");
      let newCardQuestion = $("#newCardQuestion");
      let newCardAnswer = $("#newCardAnswer");
      $("#submitNewCard").on("click", function (){
         addCard(createNewCard(newCardTitle.val(), newCardQuestion.val(), newCardAnswer.val(), newCardCategory.val())).then(console.log);
         recallCards();
      });
   });





});
$(document).ready(function (){
   let allCards = [];
   fetch(baseURL)
       .then(r => r.json())
       .then(d => {
          allCards = d;
          console.log(d);
          $("#card").html(render(allCards[0]));
       });

   function recallCards(){
      fetch(baseURL)
          .then( r => r.json())
          .then( d => {
             allCards = d;
             console.log(d)
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
      $("#card").html(render(allCards[count]));//will work on this
      console.log(count);
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
   $("#card").hover( function (){
      currentText = $(this).children().html();
      $(this).css({
         "transform": "rotateY(180deg)",
         "transition": "transform 2s"
      });
      $(this).children().css({
         "transform": "rotateY(180deg)",
         "transition": "transform 2s"
      });
      $(this).children().html("answer here");//if i can find a way to pull that out from the current cards.answer
   }, function (){
      $(this).children().css({
         "transform": "revert",
         "transition": "transform 2s"
      });
      $(this).css({
         "transform": "revert",
         "transition": "transform 2s"
      });
      $(this).children().html(currentText);
   });




   $("#addCard").on("click", function (){
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


   $("#addToComplete").on("click", function(){
      console.log("click");
      console.log(currentText);
      // $("#completed").insertAdjacentHTML("afterbegin", currentText);// not working
      $("#completed").html(currentText);
   });












});
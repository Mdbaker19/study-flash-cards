$(document).ready(function (){
    // ====== UNTIL GLITCH SERVER ISSUE IS FIGURED OUT
    let cards = [
        {
            "title": "Java",
            "question": "Define Java Access\nModifiers, List the\ndifferent Types\n            ",
            "answer": "Specifies the visibility of the fields of a class Public, Private and Protected",
            "category": "Java",
            "code": "\n            ",
            "id": 23
        },
        {
            "title": "Java OOP",
            "category": "Java",
            "code": "\n            ",
            "question": "Define Inheritance\n            ",
            "answer": "A class may have a direct parent class it extends/inherits instance fields from, allows for subcategories of Java objects. Enables code reusability especially when we need to create slight variations of a specific class",
            "id": 24
        },
        {
            "title": "Java",
            "question": "How are child and \nparent classes\nreferred to\n            ",
            "answer": "A parent class may be referred to as a \"superclass\" or \"base class\", a child class may be referred to as a \"subclass\"",
            "category": "Java",
            "code": "\n            ",
            "id": 25
        },
        {
            "title": "Java",
            "question": "Can the value of \nan instance\nfield be changed\nin a subclass?\n            ",
            "answer": "Yes",
            "category": "Java",
            "code": "public class Dog{\n  public boolean isCute = false;\n}\n\npublic class Pug{\n  public boolean isCute = true;\n}\n            ",
            "id": 27
        },
        {
            "title": "Java Classes",
            "question": "Can a class have\nmore than one\nancestor?\n            ",
            "answer": "A class may extend from one and only one direct parent class. A class may extend from a class that in turn extends from another class, and may continue indefinitely",
            "category": "Java",
            "code": "\n            ",
            "id": 28
        },
        {
            "title": "Java Classes",
            "question": "Is a subclass stuck\nwith only what it\ninherits from \nits parent?\n            ",
            "answer": "No! A subclass may add any number of fields. Additionally, unless a method is marked as \"final\", a subclass may redefine the method (override it)",
            "category": "Java",
            "code": "\n            ",
            "id": 29
        },
        {
            "title": "Java OOP",
            "question": "What is polymorphism\nin Java?\n            ",
            "answer": "One thing, many forms.. 1. An object that may be of any type it extends or implements. 2. Static polymorphism (complie time) : method overloading. 3. Dynamic polymorphism (run time) : method overriding",
            "category": "Java",
            "code": "\n            ",
            "id": 30
        },
        {
            "title": "Java OOP",
            "question": "What are the \nbenefits of an OOP\nlanguage?\n            ",
            "answer": "Re-usability, If a user wants similar functionality in multiple classes, it can be done through inheritance, Code Maintenance, Security with the use of data hiding and abstraction mechanisms, Design Benefits through longer and extensive design phase resulting in better design and fewer flaws",
            "category": "Java",
            "code": "\n            ",
            "id": 32
        },
        {
            "title": "Static Keyword",
            "category": "Java",
            "code": "public class Maths{\n  public static double pie = 3.1415;\n    }   ",
            "question": "If you were writing code in a different class, \nhow would you access the property pie?\n            ",
            "answer": "Static variables belong to the entire class instead of any 1 instance of the class. You refer to the entire class and use dot notation to access the property. Maths.pie in this case.",
            "id": 33
        },
        {
            "title": "Java stuff",
            "question": "Remember this Javascript? What in Java effectively does the same thing?\n            ",
            "answer": "A constructor. You feed a constructor arguments(usually) it sets the properties of an object and returns that object.",
            "category": "Java",
            "code": "function createBook(bookTitle, bookAuthorFirstName, bookAuthorLastName) {\n        var bookStuff = {\n                title: bookTitle,\n                author: {\n            firstName: bookAuthorFirstName,\n                    lastName: bookAuthorLastName\n        }\n        };\n        return bookStuff;\n    }",
            "id": 35
        },
        {
            "title": "Inheritance ",
            "question": "Why does bob.sayHello() work but jim.doWork() doesn't?\n            ",
            "answer": "Inheritance flows one way. A subclass will inherit methods and properties from the parent class but the parent class does not inherit from classes that extend it.",
            "category": "Java",
            "code": "    public class Person{\n        public String name;\n\n        public void sayHello(){\n            System.out.println(this.name + \" says hello.\");\n        }\n    }\n\n    public class Employee extends Person{\n        public void doWork(){\n            System.out.println(this.name + \" writes code.\");\n        }\n    }\n    Person jim = new Person(\"Jim\");\n    Employee bob = new Employee(\"Bob\");\n            ",
            "id": 38
        },
        {
            "title": "Java OOP",
            "category": "Java",
            "code": "public class Person{\n        private String name;\n\n        public Person(String name) {\n            this.name = name;\n        }\n        public String getName() {\n            return name;\n        }\n    }\n    public class Employee extends Person{\n        public Employee(String name) {\n            super(name);\n        }\n        public void soutName(){\n            System.out.println(this.name);\n        }\n    }    ",
            "question": "In the employee class this.name doesn't work because of the private access modifier.\n How can you access the name property without changing the access modifier?\n            ",
            "answer": "this.getName(). name is private but the getter is public.",
            "id": 39
        },
        {
            "title": "Java OOP",
            "question": "Briefly describe the 4 pillars\nof OOP\n            ",
            "answer": "Inheritance: sharing of information, Encapsulation: Grouping of information, Abstraction: Hiding of information, Polymorphism: Redefining of information",
            "category": "Java",
            "code": "\n            ",
            "id": 40
        },
        {
            "title": "Java Constructor",
            "question": "What is a Constructor\n            ",
            "answer": "A method that is called when an object is created",
            "category": "Java",
            "code": "\n            ",
            "id": 41
        },
        {
            "title": "Java keywords",
            "question": "Define the \"super\" keyword\n            ",
            "answer": "The super keyword allows a subclass to use the parent class implementation of a given method",
            "category": "Java",
            "code": "\n            ",
            "id": 42
        },
        {
            "title": "Java OOP",
            "question": "Define Polymorphism\n            ",
            "answer": "Polymorphism is the concept of treating subclass objects as if they were of the superclass type. In other words an object that can be assigned to more than one class can be called polymorhpic. Provides flexibility, allows for the use of one class with multiple implementations.",
            "category": "Java",
            "code": "\n            ",
            "id": 43
        },
        {
            "title": "Java keywords",
            "question": "Define the \"Final\" keyword\n            ",
            "answer": "The final keyword can be used to prevent reassignment, inheritance or overriding. This keyword can also be used with method parameters",
            "category": "Java",
            "code": "\n            ",
            "id": 44
        },
        {
            "title": "HTML attributes",
            "category": "HTML",
            "code": "\n&ltform ____ action=\"liquorStore\"&gt       ",
            "question": "\nWhat would you put into this form tag to send a request in the URL header.           ",
            "answer": "method=\"POST\"",
            "id": 45
        },
        {
            "title": "Java ",
            "category": "Java",
            "code": "\n    1. Use the extends keyword\n2. Use the implements keyword\n  3. Use Super Keyword      ",
            "question": "\n       How can a subclass use the superclass \nimplementation of a method after it has been overridden     ",
            "answer": "3",
            "id": 46
        },
        {
            "title": "Java Lists",
            "question": "What is the output of the\nfollowing code?\n            ",
            "answer": "[1, 0, 4, 5]",
            "category": "Java",
            "code": "ArrayList&ltInteger&gt nums = new ArrayList&lt&gt(Arrays.asList(1, 0));\nnums.add(4);\nnums.add(5);            \nSystem.out.println(nums);",
            "id": 47
        },
        {
            "title": "Java",
            "question": "What is a Data Structure            ",
            "answer": "A way of storing and organizing data for effective access and modification",
            "category": "Java",
            "code": "",
            "id": 48
        },
        {
            "title": "Java",
            "question": "How would you link an Interface to another Interface?            ",
            "answer": "with the \"extends\" keyword",
            "category": "Java",
            "code": "",
            "id": 49
        },
        {
            "title": "Java Lists",
            "question": "What is the output of the following code?         ",
            "answer": "2",
            "category": "Java",
            "code": "ArrayList&ltInteger&gt numbers = new ArrayList&lt&gt();\nnumbers.add(10);\nnumbers.add(10);\nnumbers.add(11);\nnumbers.add(11);\nSystem.out.println(numbers.indexOf(11));",
            "id": 50
        },
        {
            "title": "Java Lists",
            "question": "How would you return the length of a Java Array List?",
            "answer": "\"arrayName\" . size()",
            "category": "Java",
            "code": "",
            "id": 51
        },
        {
            "title": "Java Lists",
            "category": "Java",
            "code": "",
            "question": "How would you add an element into a specific index of an Array List?",
            "answer": "with the .add method overloaded with the specified index followed by the element",
            "id": 52
        },
        {
            "title": "Java Lists",
            "question": "What is the return type of ArrayList.contains();?",
            "answer": "A boolean value, either true or false if the given element is in the ArrayList",
            "category": "Java",
            "code": "",
            "id": 53
        },
        {
            "title": "Java Lists",
            "question": "What are the different return types from ArrayList.remove();?",
            "answer": "A boolean if an object is passed in as a parameter, ArrayList.remove(\"this\"); And the removed item when an index is passed in. ArrayList.remove(1); returns the element at index 1",
            "category": "Java",
            "code": "",
            "id": 54
        },
        {
            "title": "Java Collections",
            "category": "Java",
            "code": "",
            "question": "What is a Hash Map?",
            "answer": "A hash map is a data structure for key-value pairs, implemented with the HashMap class in Java. HashMap&ltString, String&gt usernames = new HashMap&lt&gt(); (Similar to objects in JS)",
            "id": 55
        },
        {
            "title": "Java Collections",
            "question": "True or false:\nThe keys and values of a Hash map must \nbe of the same type, and all keys and all\n values must be of the same type",
            "answer": "False. the keys and values of a Hash map can be of different types. as long as all the keys themselves are the same type and all the values are of the same type themselves as well",
            "category": "Java",
            "code": "",
            "id": 56
        },
        {
            "title": "Java Collections",
            "category": "Java",
            "code": "HashMap&ltString, String&gt usernames = new HashMap&lt&gt();\nusernames.put();\nusernames.get();\nusernames.containsKey();\nusernames.containsValue();",
            "question": "Briefly describe these Hash map methods.",
            "answer": ".put() = set a key value pair. .get() => return the value associated with the given key or null, .containsKey() => check if a key exists in the map. .containsValue() => check if a value exists in the map",
            "id": 57
        },
        {
            "title": "Java Lists",
            "question": "Briefly describe the \nfollowing ArrayList Methods\n            ",
            "answer": ".set(0, \"this\"); => 'sets' \"this\" into index 0; .lastIndexOf(); returns the first found index of the given item, or -1; .remove(); => remove the first occurrence of an item or an item at a given index. isEmpty() => check if a list is empty",
            "category": "Java",
            "code": ".lastIndexOf();\n.remove();\n.isEmpty();\n.set();\n            ",
            "id": 58
        }
    ];







    let allCards = cards;
    let setCurrentCardContent;
    let currentCardNumber = $("#currentCardNumber");
    let cardDeckSize = $("#deckSizeNumber");
    currentCardNumber.text(1);
    cardDeckSize.text(allCards.length);
    let baseAllCards = cards;
    $("#card").html(render(allCards[0]));


    // fetch(baseURL)
    //     .then(res => {
    //         res.json()
    //     .then(data => {
    //         $("#loadingArea").fadeOut(100);
    //         allCards = data;
    //         baseAllCards = data;
    //         console.log(data);
    //         $("#card").html(render(allCards[0]));
    //         // hljs.initHighlighting();
    //         currentCardNumber.text(1);
    //         cardDeckSize.text(allCards.length);
    //     })}).catch(err => console.error(err));
    //
    // function recallCards(){
    //     fetch(baseURL)
    //         .then( res => res.json())
    //         .then( data => {
    //             allCards = data;
    //             cardDeckSize.text(allCards.length);
    //         }).catch(err => console.error(err));
    // }

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


    let addModalOpen = false;
    let newCardTitle;
    let newCardCategory;
    let newCardQuestion;
    let newCardAnswer;
    let newCardCode;
    $("#addCard").on("click", function (){
        addModalOpen = true;
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

    $("#submitNewCard").on("click", function (){
        addCard(createNewCard(newCardTitle.val(), newCardQuestion.val(), newCardAnswer.val(), newCardCategory.val().replace(/</g, "&lt").replace(/>/g, "&gt"), newCardCode.val().replace(/</g, "&lt").replace(/>/g, "&gt"))).then(recallCards);
        modalFadeOut($("#newCardModal"));
    });


    //=======EDIT AND DELETE FUNCTIONS===========//
    let editModalOpen = false;
    let currentID;
    let currentCardHTML;
    let editTitleInput = $("#editCardTitle");
    let editCategoryInput = $("#editCardCategory");
    let editCodeInput = $("#editCardCode");
    let editQuestionInput = $("#editCardQuestion");
    let editAnswerInput = $("#editCardAnswer");
    $("body").on("click", "#edit", function () {
        editModalOpen = true;
        currentID = $("#card").children()[0].lastChild.previousSibling.innerText;
        currentCardHTML = $(this).parent();
        let currentCard = allCards[count];

        editTitleInput.val(currentCard.title);
        editCategoryInput.val(currentCard.category);
        editCodeInput.val(currentCard.code);
        editQuestionInput.val(currentCard.question);
        editAnswerInput.val(currentCard.answer);

        $("#editCardModal").css("display", "flex");
        $("#closeEditModal").on("click", function () {
            modalFadeOut($("#editCardModal"));
        });
    });

    $("#submitEditCard").on("click", function () {
        let newCardObj = {
            title: editTitleInput.val(),
            category: editCategoryInput.val(),
            code: editCodeInput.val().replace(/</g, "&lt").replace(/>/g, "&gt"),
            question: editQuestionInput.val().replace(/</g, "&lt").replace(/>/g, "&gt"),
            answer: editAnswerInput.val(),
            id: currentID
        }
        currentCardHTML.html((render(newCardObj)));
        editCard(newCardObj).then( () => {
            recallCards();
        });
        modalFadeOut($("#editCardModal"));
    });

    $("#deleteCard").on("click", function(){
        deleteCard(currentID).then( () => {
            $("#card").html((render(allCards[count - 1])));
        });
        modalFadeOut($("#editCardModal"));
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

    $(window).scroll(function () {
        const currentPos = $(this).scrollTop();
        if (currentPos >= parseFloat($('#doubleClick').css('height'))) {
            $('#header').css({position: 'fixed', 'background-color': 'rgba(0,0,0,.5)'});
            $('.side-bar').css({top: 0});
        } else {
            $('#header').css({position: 'static', 'background-color': '#0bd6d6'});
            $('.side-bar').offset({top: 10});
        }
    })




});
function addCardstoPlayerScreen(hand, div) {
    hand.forEach(element => {
        div.append("<img class = 'small-cards' src =../assets/CARDS/"+element.id+".jpg></img>");
    });
};

function init() {
    function cleanse() {
        location.reload();
//     var deck = [];
//     var dealerhand = [];
//     var playerhand = [];
//     var playerTotal = 0;
//     var dealerTotal = 0;
//     $(".player-hand").empty().html("Player Hand");
//     $(".dealer-hand").empty().html("Dealer Hand");

//     var stay = false;
    };

    var deck = [];
    var dealerhand = [];
    var playerhand = [];
    var playerTotal = 0;
    var dealerTotal = 0;
    var playerDiv = $(".player-hand");
    var dealerDiv = $(".dealer-hand");
    var buttonDiv = $(".button-container");
    playerDiv.empty = "";
    dealerDiv.value = "";
    var stay = false;

    
    
    function drawCard(hand) {
        var drawnCard = deck.pop();
            //hand.push(drawnCard);
        if (drawnCard.rank == 'A') {
            if(checkWeight(hand)>10) {
                drawnCard.weight = 1;
            }
        }
        addCard(hand, drawnCard);
        return hand;
    };

    function addCard(hand, card) {    
        hand.push(card);
    };

    function checkWeight(hand) {
        var total = 0;
            for (i =0; i < hand.length; i++) {
                total += hand[i].weight;
            };
        return total;
    };

    function handWeight(hand, total, name, dealerTotal) {
        console.log("the name is"+ name);
        var total = 0;
        for (i =0; i < hand.length; i++) {
            total += hand[i].weight;
        };
        //total += card.weight;
        if(parseInt(total) > 21) {
            dealerTotal = total;
            endGame(dealerTotal, total, false);
        };
        return total;
    };

    function bust(name) {
        console.log(name + " has Busted. Loser");
    };
    
    function User(hand, total, name) {
        this.hand = hand;
        this.total = total;
        this.name = name;
        // this.draw = drawCard(hand);
        // this.weight = handWeight(hand);
    };
    
        // class Player extends User {
        //     this.name = name;
        // }
    
    function gameStart() {
        makeDeck();
        var playerOne = new User(playerhand, playerTotal, name);
        var dealer = new User(dealerhand, dealerTotal, name);
        drawCard(playerOne.hand);
        drawCard(dealer.hand);
        drawCard(playerOne.hand);
        drawCard(dealer.hand);
        addCardstoPlayerScreen(playerOne.hand, playerDiv);
        addCardstoPlayerScreen(dealer.hand, dealerDiv);

        $("#hit-but").on("click", function() {
            hitMe(playerOne.hand, playerOne.total, playerOne.name, playerDiv, dealer.total);
        });

        $("#stay-but").on("click", function() {
            handWeight(playerOne.hand, playerOne.total, playerOne.name, dealer.total);
            disableButton();
            endGame(dealer.total, playerOne.total, true, dealer.hand, dealer.name);
        });
        playerOne.total = handWeight(playerOne.hand, playerOne.total, playerOne.name, dealer.total);
        dealer.total = handWeight(dealer.hand, dealer.total, dealer.name, playerOne.Total);

        // console.log("dealer starting hand: ");
        // console.log(dealer.hand);
        // console.log("player starting hand: ");
        // console.log(playerOne.hand);
        // handWeight(playerOne.hand,playerOne.total,playerOne.name);
        // console.log("The player hit");
        // hitMe(playerOne.hand,playerOne.total);
        // console.log("the player stayed the dealer plays");
        // stay(dealer.hand,dealer.total,dealer.name,playerOne.total);
        //endGame(dealer.total,playerOne.total);
    };
        
        
    function hitMe(hand, total, name, div, totalTwo) {
        drawCard(hand);
        console.log(hand);
        var tempArr = [];
        tempArr.push(hand[hand.length-1]);
        addCardstoPlayerScreen(tempArr,div);
        // var newCard = hand.length-1;
        // console.log(drawCard(hand));
        return handWeight(hand, total, name, totalTwo);
    };
        
        // function stay(hand, total,name,playerTotal){
        //     while(total<17){
        //         total = hitMe(hand,total,name,dealerDiv);
        //         console.log("dealer hit: ");
        //         console.log((hand[hand.length-1]));
        //     }
        //    endGame(total,playerTotal);
        // }

    function disableButton() {
        $("#hit-but").prop("disabled", true);
        $("#stay-but").prop("disabled", true);
    };

    function endGame(dealerTotal, playerTotal, stay, hand, name) {
        console.log("Enter EndGame");

        if(stay == true) {
            while(dealerTotal < 17) {
                dealerTotal = hitMe(hand, dealerTotal, name, dealerDiv);
                console.log("dealer hit: ");
                console.log((hand[hand.length-1]));
            };
        };

        if(playerTotal > dealerTotal && playerTotal <= 21 || dealerTotal > 21) {
            alert("player wins");
            console.log("player total: "+ playerTotal);
            console.log("dealer total: "+ dealerTotal);
            console.log("player wins");
        } else {
            alert("dealer wins");
            console.log("player total: "+ playerTotal);
            console.log("dealer total: "+ dealerTotal);
            console.log("dealer wins");
        };

        buttonDiv.append("<button class = 'btn-lg btn-outline-dark' id = 'replay-but' type = 'submit'>Replay</button>");

        $("#replay-but").on("click",function() {
            cleanse();
            init();
        });
    };


    function makeDeck() {
        function Card(rank, suit, weight, id) {
            this.rank = rank;
            this.suit = suit;
            this.weight = weight;
            this.id = id;
        }

        ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        suits = ['hearts', 'spades', 'diamonds','clubs'];

        for(var s = 3; s>=0;s--) {
            for(var r = 12;r>=0;r--) {
                var weight = parseInt(ranks[r]);
                if(ranks[r] == 'J'|| ranks[r] == 'Q'|| ranks[r] == 'K') {
                    weight = 10;
                } else if(ranks[r]=='A') {
                    weight = 11;
                };

            if(suits[s]=='hearts') {
                id = ranks[r]+'H';
            } else if(suits[s]=='spades') {
                id = ranks[r]+'S';
            } else if(suits[s]=='diamonds') {
                id = ranks[r]+'D';
            } else if(suits[s]=='clubs') {
                id = ranks[r]+'C';
            };

            deck.push(new Card(ranks[r], suits[s], weight, id));
            };

        shuffle(deck);
        return deck;
        };
    
        function shuffle(array) {
            array.sort(()=>Math.random()-0.5);
        };
    };
    gameStart();
};

init();

import random
import time

class Card(object):
    def __init__(self, suit, val):
        self.suit = suit
        self.value = val

    # Implementing build in methods so that you can print a card object
    def __unicode__(self):
        return self.show()
    def __str__(self):
        return self.show()
    def __repr__(self):
        return self.show()
        
    def show(self):
        if self.value == 1:
            val = "Ace"
        elif self.value == 11:
            val = "Jack"
        elif self.value == 12:
            val = "Queen"
        elif self.value == 13:
            val = "King"
        else:
            val = self.value

        return "{} of {}".format(val, self.suit)


class Deck(object):
    def __init__(self):
        self.cards = []
        self.build()

    # Display all cards in the deck
    def show(self):
        for card in self.cards:
            print(card)

    # Generate 52 cards
    def build(self):
        self.cards = []
        for suit in ['Hearts', 'Clubs', 'Diamonds', 'Spades']:
            for val in range(1,14):
                self.cards.append(Card(suit, val))

    # Shuffle the deck
    def shuffle(self, num=1):
        length = len(self.cards)
        for _ in range(num):
            # This is the fisher yates shuffle algorithm
            for i in range(length-1, 0, -1):
                randi = random.randint(0, i)
                if i == randi:
                    continue
                self.cards[i], self.cards[randi] = self.cards[randi], self.cards[i]
            # You can also use the build in shuffle method
            # random.shuffle(self.cards)

    # Return the top card
    def deal(self):
        return self.cards.pop()


class Player(object):
    def __init__(self, name):
        self.name = name
        self.hand = []

    def sayHello(self):
        pstring = "Hi, my name is {}"
        print(pstring.format(self.name))
        return self

    # Draw n number of cards from a deck
    # Returns true in n cards are drawn, false if less then that
    def draw(self, deck, num=1):
        for _ in range(num):
            card = deck.deal()
            if card:
                self.hand.append(card)
            else: 
                return False
        return True

    # Display all the cards in the players hand
    def showHand(self):
        printHand = "{}'s hand: {}"
        print (printHand.format(self.name, self.hand))
        return self

    def discard(self):
        return self.hand.pop()
    
##
class RouletteSquare(object):
    def __init__(self, color, val):
        self.color = color
        self.value = val
        
    def show(self):
        return "{} {}".format(self.color, self.value)


class RouletteTable(object):
    def __init__(self):
        self.table = []
        self.build()

    def build(self):
        self.table = []
        self.table.append(RouletteSquare("Green", 0))
        for x in range(1, 10):
            if(x % 2 == 0):
                self.table.append(RouletteSquare("Black", x))
            else:
                self.table.append(RouletteSquare("Red", x))
        self.table.append(RouletteSquare("Black", 10))
        for x in range(11, 19):
            if(x % 2 == 0):
                self.table.append(RouletteSquare("Red", x))
            else:
                self.table.append(RouletteSquare("Black", x))
        for x in range(19,29):
            if(x % 2 == 0):
                self.table.append(RouletteSquare("Black", x))
            else:
                self.table.append(RouletteSquare("Red", x))
        self.table.append(RouletteSquare("Black", 29))
        for x in range(30,37):
            if(x % 2 == 0):
                self.table.append(RouletteSquare("Red", x))
            else:
                self.table.append(RouletteSquare("Black", x))
 
    def showTable(self):
        for square in self.table:
            print(square.show())

    def shuffle(self, num=1):
        length = len(self.table)
        for _ in range(num):
            # This is the fisher yates shuffle algorithm
            for i in range(length-1, 0, -1):
                randi = random.randint(0, i)
                if i == randi:
                    continue
                self.table[i], self.table[randi] = self.table[randi], self.table[i]

    # Return the top card
        

#### BLACK JACK ####
def BlackJack(pChips, pName):
    print("\nWelcome to Black Jack! ", pName)
    
    dealer = Player("Dealer")
    p1 = Player(pName)
    x = 'y'
    myDeck = Deck()
    myDeck.shuffle()
    #myDeck.show()
    
    while(x != 'n'):
        z = 0
        while(z != 1):
            pbet = int(input("Place a bet: "))
            if(pbet > pChips):
                print("you have exceeded your balance")
            else:
                z = 1


        print("\n")
        dealer.draw(myDeck, 1)
        p1.draw(myDeck, 1)
        dealer.draw(myDeck, 1)
        p1.draw(myDeck, 1)
        p1cards = 2
        dealercards = 2
        
        pinput = 0
        while(pinput != '2'):
            p1.showHand()
            pinput = input("hit(1), check(2), double(3): ")
            if(pinput == '1'):
                p1.draw(myDeck, 1)
                p1cards += 1
            elif(pinput == '3'):
                p1.draw(myDeck, 1)
                p1cards += 1
                pbet *= 2
                break
            elif(pinput == '2'):
                break
            else:
                break
            
## count players hand
        p1.showHand()
        pval = 0
        for x in range(0 , p1cards):
            if(p1.hand[x].value >= 10):
                pval += 10
            elif(p1.hand[x].value == 1):
                if((pval + 11) > 21):
                    pval += 1
                else:
                    pval += 11
            else:
                pval += p1.hand[x].value

## count dealers hand
        dval = 0
        for x in range(0 , dealercards):
            if(dealer.hand[x].value >= 10):
                dval += 10
            elif(dealer.hand[x].value == 1):
                if((dval + 11) > 21):
                    dval += 1
                else:
                    dval += 11
            else:
                dval += dealer.hand[x].value
        while(dval < 14):
            print("Dealer draws...")
            dealer.draw(myDeck, 1)
            dealercards += 1
            dval = 0
            for y in range(0, dealercards):
                if(dealer.hand[y].value >= 10):
                    dval += 10
                elif(dealer.hand[y].value == 1):
                    if((dval + 11) > 21):
                        dval += 1
                    else:
                        dval += 11
                else:
                    dval += dealer.hand[y].value
        dealer.showHand()
        
        if(dval < pval and pval < 22):
            print("Player wins!")
            print("+",pbet)
            pChips += pbet
        elif(pval < dval and dval < 22):
            print("Dealer wins.")
            print("-",pbet)
            pChips -= pbet
        elif( pval == dval ):
            print("Push")
            
        if(pval > 21):
            print("Player bust")
            print("Dealer wins.")
            print("-", pbet)
            pChips -= pbet
        elif(dval > 21):
            print("Dealer bust")
            print("Player wins!")
            print("+", pbet)
            pChips += pbet

        print(pName, "now has ", pChips, " chips")

        for y in range(0, p1cards):
            p1.discard()

        for y in range(0, dealercards):
            dealer.discard()

        x = input("\nplay again? (y/n):")
        myDeck = Deck()
        myDeck.shuffle()
        pbet = 0

    print("You have left the black jack table...") 
    return pChips

### Roulette ###
def Roulette(pChips, pName):
    print("Welcome to Roulette! ", pName)

    cont = "y"
    rtable = RouletteTable()
    while(cont != 'n'):
        betsize = 0
        pselect = int(input("1)Choose number\n2)Red\n3)black\n4)Odd\n5)Even\n6)1-12\n7)13-24\n8)25-36\n0)Exit\n: "))
        if(pselect == 1):
            pnum = int(input("Enter number(0-36): "))
            betsize = int(input("Place your bet: "))
            if(betsize > pChips):
                print("Insufficient funds")
                continue
            rtable.shuffle()
            randi = random.randint(0, 36)
            print("Table rolled", rtable.table[randi].show())
            if(rtable.table[randi].value == pnum):
                print("You win!")
                print("+", betsize*35)
                pChips += (betsize*35)
                print("You now have", pChips, "chips")
                
            else:
                print("You lose.")
                print("-", betsize)
                pChips -= betsize
                print("You now have", pChips, "chips")
        elif(pselect == 2):
            betsize = int(input("Place your bet: "))
            if(betsize > pChips):
                print("Insufficient funds")
                continue
            rtable.shuffle()
            randi = random.randint(0, 36)
            print("Table rolled", rtable.table[randi].show())
            if(rtable.table[randi].color == "Red"):
                print("You win!")
                print("+", betsize)
                pChips += betsize
                print("You now have", pChips, "chips")
                
            else:
                print("You lose.")
                print("-", betsize)
                pChips -= betsize
                print("You now have", pChips, "chips")
        elif(pselect == 3):
            betsize = int(input("Place your bet: "))
            if(betsize > pChips):
                print("Insufficient funds")
                continue
            rtable.shuffle()
            randi = random.randint(0, 36)
            print("Table rolled", rtable.table[randi].show())
            if(rtable.table[randi].color == "Black"):
                print("You win!")
                print("+", betsize)
                pChips += betsize
                print("You now have", pChips, "chips")
                
            else:
                print("You lose.")
                print("-", betsize)
                pChips -= betsize
                print("You now have", pChips, "chips")
        elif(pselect == 4):
            betsize = int(input("Place your bet: "))
            if(betsize > pChips):
                print("Insufficient funds")
                continue
            rtable.shuffle()
            randi = random.randint(0, 36)
            print("Table rolled", rtable.table[randi].show())
            if(rtable.table[randi].value %2 != 0):
                print("You win!")
                print("+", betsize)
                pChips += betsize
                print("You now have", pChips, "chips")
                
            else:
                print("You lose.")
                print("-", betsize)
                pChips -= betsize
                print("You now have", pChips, "chips")
        elif(pselect == 5):
            betsize = int(input("Place your bet: "))
            if(betsize > pChips):
                print("Insufficient funds")
                continue
            rtable.shuffle()
            randi = random.randint(0, 36)
            print("Table rolled", rtable.table[randi].show())
            if(rtable.table[randi].value %2 == 0):
                print("You win!")
                print("+", betsize)
                pChips += betsize
                print("You now have", pChips, "chips")
                
            else:
                print("You lose.")
                print("-", betsize)
                pChips -= betsize
                print("You now have", pChips, "chips")
        elif(pselect == 6):
            betsize = int(input("Place your bet: "))
            if(betsize > pChips):
                print("Insufficient funds")
                continue
            rtable.shuffle()
            randi = random.randint(0, 36)
            print("Table rolled", rtable.table[randi].show())
            if(rtable.table[randi].value > 0 and rtable.table[randi].value <= 12):
                print("You win!")
                print("+", betsize*2)
                pChips += (betsize*2)
                print("You now have", pChips, "chips")
                
            else:
                print("You lose.")
                print("-", betsize)
                pChips -= betsize
                print("You now have", pChips, "chips")
        elif(pselect == 7):
            betsize = int(input("Place your bet: "))
            if(betsize > pChips):
                print("Insufficient funds")
                continue
            rtable.shuffle()
            randi = random.randint(0, 36)
            print("Table rolled", rtable.table[randi].show())
            if(rtable.table[randi].value > 12 and rtable.table[randi].value <= 24):
                print("You win!")
                print("+", betsize*2)
                pChips += (betsize*2)
                print("You now have", pChips, "chips")
                
            else:
                print("You lose.")
                print("-", betsize)
                pChips -= betsize
                print("You now have", pChips, "chips")
        elif(pselect == 8):
            betsize = int(input("Place your bet: "))
            if(betsize > pChips):
                print("Insufficient funds")
                continue
            rtable.shuffle()
            randi = random.randint(0, 37)
            print("Table rolled", rtable.table[randi].show())
            if(rtable.table[randi].value > 24 and rtable.table[randi].value <= 36):
                print("You win!")
                print("+", betsize*2)
                pChips += (betsize*2)
                print("You now have", pChips, "chips")
                
            else:
                print("You lose.")
                print("-", betsize)
                pChips -= betsize
                print("You now have", pChips, "chips")
        cont = input("Play again? (y/n): ")
    return pChips

### Slots ###
def slotWinConditions(bet, num1, num2, num3):
    if(num1 == "7" and num2 == "7" and num3 == "7"):
        return bet * 25
    elif(num1 == "Lemon" and num2 == "Lemon" and num3 == "Lemon"):
        return bet * 5
    elif(num1 == "Orange" and num2 == "Orange" and num3 == "Orange"):
        return bet * 10
    elif(num1 == "Five" and num2 == "Five" and num3 == "Five"):
        return bet * 15
    elif(num1 == "Bar" and num2 == "Bar" and num3 == "Bar"):
        return bet * 20
    return bet * (-1)

def rollSlot(bet):
    slotArray = ["Lemon", "Orange", "7", "Five", "Bar"]
     
    print("\nSlot rolls...")
    time.sleep(.150)
    print(".")
    time.sleep(.150)
    print(".")
    time.sleep(.150)
    print(".")
    time.sleep(.500)
    A = random.randint(0,4)
    B = random.randint(0,4)
    C = random.randint(0,4)
    Result = slotWinConditions(bet, A,B,C)
    if(Result < 0):
        print("{}-{}-{}".format(slotArray[A], slotArray[B], slotArray[C]))
        print("You Lose!")
        time.sleep(.250)
    else:
        print("{}-{}-{}".format(slotArray[A], slotArray[B], slotArray[C]))
        print("You Win {}!".format(Result))
        time.sleep(.250)
        
    return Result

def SlotMachine(pChips):
    slotArray = ["Lemon", "Orange", "7", "Five", "Bar"]
    bprev = 0
    cont = 'y'
    
    print("Welcome to virtual Slot")

    
    while(cont != 'n'):
        pSelect = int(input("\n1)Bet 5, 2)Bet 25, 3)Bet 100, 4)Bet amount(1-5000), 5)Bet Previous: "))
        
        
        if(pSelect == 1):
            if(5 > pChips):
                print("Insufficient funds")
                continue
            result = rollSlot(5)
            bprev = 5
            pChips += result
        elif(pSelect == 2):
            if(25 > pChips):
                print("Insufficient funds")
                continue
            result = rollSlot(25)
            bprev = 25
            pChips += result
        elif(pSelect == 3):
            if(100 > pChips):
                print("Insufficient funds")
                continue
            result = rollSlot(100)
            bprev = 100
            pChips += result
        elif(pSelect == 4):
            amt = int(input("Enter amount: "))
            if(amt > pChips):
                print("Insufficient funds")
                continue
            result = rollSlot(amt)
            bprev = amt
            pChips += result
        elif(pSelect == 5):
            if(bprev > pChips):
                print("Insufficient funds")
                continue
            result = rollSlot(bprev)
            pChips += result
            
        print("You now have {} chips".format(pChips))
        cont = input("Play again? (y/n): ")
        
    return pChips

####### Main #######
##CASINO##
print("Welcome to python Casino")
pChips = int(input("Buy-in(0-5000): "))
pName = input("Enter player name: ")
print("Welcome, ", pName, "you have ", pChips, " chips")

exitgame = 'n'
while(exitgame != 'y'): 
    pselect = int(input("\nSelect what game you want to play\n1) Black Jack\n2) Roulette\n3) Slot Machine\n: "))

    if(pselect == 1):
        pChips = BlackJack(pChips, pName)
    elif(pselect == 2):
        pChips = Roulette(pChips, pName)
    elif(pselect == 3):
        pChips = SlotMachine(pChips)
    else:
        print("Selection is not available.")

    print(pName, " has ", pChips, " chips")
    exitgame = input("\nExit casino? (y/n):")




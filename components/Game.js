import React, { useState ,useEffect } from 'react';
import { View, Text, StyleSheet, Platform, ImageBackground, Image, TouchableOpacity,Alert,Modal } from 'react-native';
import { Button } from 'react-native-elements';
import { ScreenOrientation } from 'expo-screen-orientation';
import axios from 'axios';
import {IP} from '@env';
import { Audio } from 'expo-av';


const deck = [
  { name: 'Ace of Hearts', value: 14, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Playing_card_heart_A.svg/195px-Playing_card_heart_A.svg.png' },
  { name: '2 of Hearts', value: 2, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/English_pattern_2_of_hearts.svg/540px-English_pattern_2_of_hearts.svg.png' },
  { name: '3 of Hearts', value: 3, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Playing_card_heart_3.svg/300px-Playing_card_heart_3.svg.png' },
  { name: '4 of Hearts', value: 4, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/4_of_hearts.svg/1200px-4_of_hearts.svg.png' },
  { name: '5 of Hearts', value: 5, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Playing_card_heart_5.svg/1638px-Playing_card_heart_5.svg.png' },
  { name: '6 of Hearts', value: 6, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Playing_card_heart_6.svg/1200px-Playing_card_heart_6.svg.png' },
  { name: '7 of Hearts', value: 7, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Playing_card_heart_7.svg/819px-Playing_card_heart_7.svg.png' },
  { name: '8 of Hearts', value: 8, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_heart_8.svg/1200px-Playing_card_heart_8.svg.png' },
  { name: '9 of Hearts', value: 9, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_heart_9.svg/200px-Playing_card_heart_9.svg.png' },
  { name: '10 of Hearts', value: 10, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/10_of_hearts.svg/706px-10_of_hearts.svg.png' },
  { name: 'Jack of Hearts', value: 11, imageUrl: 'https://i.pinimg.com/564x/4d/2b/64/4d2b64c4d80126b47c5d7f38f6cb9aac.jpg' },
  { name: 'Queen of Hearts', value: 12, imageUrl: 'https://i.pinimg.com/736x/ae/0a/e6/ae0ae65bacdf7b8ae357b2340e0c2aca.jpg' },
  { name: 'King of Hearts', value: 13, imageUrl: 'https://m.media-amazon.com/images/I/71d4LRYo6uL._AC_UF1000,1000_QL80_.jpg' },
  
  
  { name: 'Ace of Diamonds', value: 14, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Ace_of_diamonds.svg/1200px-Ace_of_diamonds.svg.png' },
  { name: '2 of Diamonds', value: 2, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/2_of_diamonds.svg/530px-2_of_diamonds.svg.png' },
  { name: '3 of Diamonds', value: 3, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Playing_card_diamond_3.svg/1638px-Playing_card_diamond_3.svg.png' },
  { name: '4 of Diamonds', value: 4, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Playing_card_diamond_4.svg/819px-Playing_card_diamond_4.svg.png' },
  { name: '5 of Diamonds', value: 5, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Playing_card_diamond_5.svg/1200px-Playing_card_diamond_5.svg.png' },
  { name: '6 of Diamonds', value: 6, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/6_of_diamonds.svg/706px-6_of_diamonds.svg.png' },
  { name: '7 of Diamonds', value: 7, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Poker-sm-238-7d.png' },
  { name: '8 of Diamonds', value: 8, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Playing_card_diamond_8.svg/1638px-Playing_card_diamond_8.svg.png' },
  { name: '9 of Diamonds', value: 9, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Playing_card_diamond_9.svg/800px-Playing_card_diamond_9.svg.png' },
  { name: '10 of Diamonds', value: 10, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/10_of_diamonds.svg/1200px-10_of_diamonds.svg.png' },
  { name: 'Jack of Diamonds', value: 11, imageUrl: 'https://m.media-amazon.com/images/I/71O1j2XSzqL.jpg' },
  { name: 'Queen of Diamonds', value: 12, imageUrl: 'https://www.itiskismet.com/uploads/8/6/0/4/86046504/published/queen-of-diamonds_3.png' },
  { name: 'King of Diamonds', value: 13, imageUrl: 'https://m.media-amazon.com/images/I/71EkglvyWjL._AC_UF1000,1000_QL80_.jpg' },
 
 
  { name: 'Ace of Clubs', value: 14, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/2_of_clubs.svg/1200px-2_of_clubs.svg.png' },
  { name: '2 of Clubs', value: 2, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/2_of_clubs.svg/1200px-2_of_clubs.svg.png' },
  { name: '3 of Clubs', value: 3, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/3_of_clubs.svg/1200px-3_of_clubs.svg.png' },
  { name: '4 of Clubs', value: 4, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Playing_card_club_4.svg/1200px-Playing_card_club_4.svg.png' },
  { name: '5 of Clubs', value: 5, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/5_of_clubs.svg/1200px-5_of_clubs.svg.png' },
  { name: '6 of Clubs', value: 6, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Playing_card_club_6.svg/1200px-Playing_card_club_6.svg.png' },
  { name: '7 of Clubs', value: 7, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/7_of_clubs.svg/1200px-7_of_clubs.svg.png' },
  { name: '8 of Clubs', value: 8, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/8_of_clubs.svg/706px-8_of_clubs.svg.png' },
  { name: '9 of Clubs', value: 9, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Playing_card_club_9.svg/819px-Playing_card_club_9.svg.png' },
  { name: '10 of Clubs', value: 10, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/10_of_clubs.svg/1200px-10_of_clubs.svg.png' },
  { name: 'Jack of Clubs', value: 11, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/English_pattern_jack_of_clubs.svg/1200px-English_pattern_jack_of_clubs.svg.png' },
  { name: 'Queen of Clubs', value: 12, imageUrl: 'https://img.myloview.com.br/posters/queen-of-clubs-400-535652.jpg' },
  { name: 'King of Clubs', value: 13, imageUrl: 'https://ih1.redbubble.net/image.921155394.8729/flat,750x,075,f-pad,750x1000,f8f8f8.jpg' },
 
 
  { name: 'Ace of Spades', value: 14, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Aceofspades.svg/1540px-Aceofspades.svg.png' },
  { name: '2 of Spades', value: 2, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2_of_spades.svg/1200px-2_of_spades.svg.png' },
  { name: '3 of Spades', value: 3, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/3_of_spades.svg/1200px-3_of_spades.svg.png' },
  { name: '4 of Spades', value: 4, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Playing_card_spade_4.svg/1638px-Playing_card_spade_4.svg.png' },
  { name: '5 of Spades', value: 5, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Playing_card_spade_5.svg/1200px-Playing_card_spade_5.svg.png' },
  { name: '6 of Spades', value: 6, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Playing_card_spade_6.svg/1638px-Playing_card_spade_6.svg.png' },
  { name: '7 of Spades', value: 7, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Playing_card_spade_7.svg/1200px-Playing_card_spade_7.svg.png' },
  { name: '8 of Spades', value: 8, imageUrl: 'https://d29fhpw069ctt2.cloudfront.net/clipart/112443/preview/1396450608_preview_df00.png' },
  { name: '9 of Spades', value: 9, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Playing_card_spade_9.svg/1638px-Playing_card_spade_9.svg.png' },
  { name: '10 of Spades', value: 10, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/10_of_spades.svg/1200px-10_of_spades.svg.png' },
  { name: 'Jack of Spades', value: 11, imageUrl: 'https://www.keen.com/wp-content/uploads/sites/2/2022/08/Jack-of-Spades-Meaning.jpg' },
  { name: 'Queen of Spades', value: 12, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/51_Q_di_picche.jpg/800px-51_Q_di_picche.jpg' },
  { name: 'King of Spades',  value: 13, imageUrl: 'https://i.ebayimg.com/images/g/9bEAAOSwH-9ehtWo/s-l1600.jpg' },

  { name: 'back',  value: 0, imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Card_back_01.svg/1200px-Card_back_01.svg.png' },
  { name: 'blackBack',  value: 0, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREZ3qIa0nSP_Fyhih_dN6n_AcL2gQrQ55Dlw&s' },

];

const Game = ({ currUser }) => {

  const cardBack = deck.find(card => card.name === 'back');
  const [explanationText, setExplanationText] = useState("Tap play to start a new game");
  const [countCardsC, setCountCardsC] = useState(0);
  const [countCardsP, setCountCardsP] = useState(0);
  const [playerWinCards, setPlayerWinCard] = useState(0);
  const [computerWinCards, setComputerWinCards] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [turn, setTurn] = useState(null);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [computerDeck, setComputerDeck] = useState([]);
  const [playerCard, setPlayerCard] = useState(deck.find(card => card.name === 'blackBack'));
  const [computerCard, setComputerCard] = useState(deck.find(card => card.name === 'blackBack'));
  const [warValue, setWarValue] = useState(0);
  const [moves, setMoves] = useState([]);
  const [gameID, setGameID] = useState(null);


  const iosStyles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingBottom: 20,
    },
    topSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      alignItems: 'center',
      marginTop: 80,
    },
    computerArea: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    playerArea: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    deckPackageWrapper: {
      alignItems: 'center',
    },
    deckPackage: {
      width: 130,
      height: 190,
      borderRadius: 10,
      overflow: 'hidden',
    },
    cardCounter: {
      position: 'absolute',
      bottom: 10,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingHorizontal: 5,
      borderRadius: 5,
    },
    middleArea: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: -50,
    },
    warGame: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 45,
    },
    warCard: {
      width: 140,
      height: 200,
      marginHorizontal: -40,
      borderRadius: 10,
      marginLeft:80,
      marginBottom: 350,
      paddingBottom:40,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    turnExplanation: {
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 10,
      marginBottom: 140,
    },
    explanationText: {
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
    },
  });
  
  const webStyles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    topSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 40,
    },
    computerArea: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    playerArea: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    deckPackageWrapper: {
      alignItems: 'center',
    },
    deckPackage: {
      width: 180,
      height: 250,
      borderRadius: 10,
      overflow: 'hidden',
    },
    cardCounter: {
      position: 'absolute',
      bottom: 10,
      left: 0,
      right: 0,
      textAlign: 'center',
      fontSize: 14,
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingHorizontal: 5,
      borderRadius: 5,
    },
    middleArea: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    warGame: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    warCard: {
      width: 150,
      height: 220,
      marginHorizontal: 10,
      borderRadius: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    turnExplanation: {
      alignItems: 'center',
      padding: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 10,
      marginBottom: 20,
    },
    explanationText: {
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
    },
  });

  async function addNewGame() {
    try {
      const response = await axios.post(`http://${IP}:3000/api/games`, { username: currUser.username });
      const { _id } = response.data;
      console.log(response.data);
      setGameID(_id);
      return _id;
    } catch (error) {
      console.error('Error adding new game:', error);
      throw error;
    }
  }

  useEffect(() => {
    checkWinner();
  }, [countCardsP, countCardsC]);

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/card-pick.mp3')  
      );
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const playSound1 = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/card-shuffle.mp3')  
      );
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const playSoundWinner = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/claps.mp3')  
      );
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const playSoundLoser = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/loser.mp3')  
      );
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  function getRandomCard(deck) {
    let card = null;
    while (!card || card.value === 0 ) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      card = deck[randomIndex];
      deck.splice(randomIndex, 1);
    }

    return card;
    }

  function getRandomDeck() {
    const d = [];
    for (let i = 0; i < 26; i++) {
      let card = getRandomCard([...deck]);
      d.push(card);
    }
    return d;
  }

  function startGame() {
    playSound1();

    const playerDeck = getRandomDeck();
    const computerDeck = getRandomDeck();

    addNewGame()
    .then(newGame => {
      console.log('New game added:', newGame);
    })
    .catch(err => {
      console.error('Error adding new game:', err);
    });

    setMoves([]);

    setWarValue(0);

    setPlayerDeck(playerDeck);
    setComputerDeck(computerDeck);

    setPlayerCard(deck.find(card => card.name === 'blackBack'));
    setComputerCard(deck.find(card => card.name === 'blackBack'));

    setPlayerWinCard(0);
    setComputerWinCards(0);

    setCountCardsP(26);
    setCountCardsC(26);

    setGameRunning(true);

    setTurn("player");
    setExplanationText("New Game, you are first! Pick a card from your pack");
  }

  async function handleTurn() {
    if (turn === "player") {
      await playSound();
  
      let newPlayerCard;
      do {
        newPlayerCard = getRandomCard([...playerDeck]);
      } while (playerCard && newPlayerCard.name === playerCard.name);
  
      setPlayerCard(newPlayerCard);
      console.log("player: ", newPlayerCard.name);
      setCountCardsP(countCardsP - 1); 
      await sleep(300);
  
      let newComputerCard;
      do {
        newComputerCard = getRandomCard([...computerDeck]);
      } while (computerCard && newComputerCard.name === computerCard.name);
  
      setComputerCard(newComputerCard);
      console.log("computer: ", newComputerCard.name);
      setCountCardsC(countCardsC - 1); 
  
      if (newPlayerCard.value > newComputerCard.value) {
        setPlayerWinCard(playerWinCards + newPlayerCard.value + newComputerCard.value + warValue);
        setExplanationText("You won this round! Pick another card.");       
        setWarValue(0);
      } else if (newPlayerCard.value < newComputerCard.value) {
        setComputerWinCards(computerWinCards + newPlayerCard.value + newComputerCard.value + warValue);
        setExplanationText("Computer won this round! Pick another card.");
        setWarValue(0);
      } else {
        setExplanationText("It's a war! Pick another card.");
        setWarValue(newComputerCard.value + newPlayerCard.value);
      }
  
      // Save move
      setMoves(prevMoves => [
        ...prevMoves,
        {
          game: gameID,
          moveNumber: prevMoves.length + 1,
          username: currUser.username,
          playerCard: newPlayerCard,
          computerCard: newComputerCard,
        }
      ]);
  
      setTurn("player");
    }
  }

  
  function checkWinner() {
    if(gameRunning){
    if (countCardsC === 0 || countCardsP === 0) {
      let message = "";
      if (playerWinCards > computerWinCards){
        playSoundWinner();
        message = "You are the winner!";
        
        //set winner
        axios.put(`http://${IP}:3000/api/games/${gameID}`, { winnerUsername: currUser.username })
          .then(updatedGame => {
            console.log('Game winner updated:', updatedGame);
          })
          .catch(err => {
            console.error('Error setting game winner:', err);
          });

          //add cup
          axios.put(`http://${IP}:3000/api/users/cup/${currUser.username}`);
          console.log('User cups incremented:');
      }
      else if (playerWinCards < computerWinCards){
        message = "Computer is the winner! You lose.";
        playSoundLoser();
      }
      else
        message = "It's a tie!";
      
      setGameRunning(false);
      setExplanationText("Tap play to start a new game");

      let movesDisplay = moves.map((move, index) => {
        return `Move ${index + 1}: Player - ${move.playerCard.name}, Computer - ${move.computerCard.name}`;
      }).join("\n");

      alert(`${message}\nMoves Replay:\n${movesDisplay}`);

      return true;
    }
  }

    return false;
  }

  const handleDeckPress = () => {
    if (turn === "player" && gameRunning) {
      handleTurn();
    }
  };

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const styles = Platform.OS === 'ios' ? iosStyles : webStyles;


  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/premium-vector/poker-table-background-green-color_47243-1094.jpg' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.computerArea}>
            <View style={styles.deckPackageWrapper}>
              <ImageBackground source={{ uri: cardBack.imageUrl }} style={styles.deckPackage}>
                <Text style={styles.cardCounter}>Computer: {countCardsC} Cards, Wins pack value: {computerWinCards}</Text>
              </ImageBackground>
            </View>
          </View>

          <View style={styles.middleArea}>
            <View style={styles.warGame}>
              <Image source={{ uri: computerCard.imageUrl }} style={styles.warCard} />
              <Image source={{ uri: playerCard.imageUrl }} style={styles.warCard} />
            </View>
          </View>

          <View style={styles.playerArea}>
            <TouchableOpacity onPress={handleDeckPress}>
              <Image source={{ uri: cardBack.imageUrl }} style={styles.deckPackage} />
            </TouchableOpacity>
            <Text style={styles.cardCounter}>{currUser.username || 'Player'}: {countCardsP} Cards, Wins pack value: {playerWinCards}</Text>
          </View>
        </View>

        {!gameRunning && <Button title="Play" onPress={startGame} />}
        
        <View style={styles.turnExplanation}>
          <Text style={styles.explanationText}>{explanationText}</Text>
        </View>
      </View>

    </ImageBackground>
  );
};


export default Game;
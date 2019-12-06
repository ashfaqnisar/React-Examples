import React, {useEffect, useState} from 'react';
import './App.css';


const StarMatch = (props) => {
    const {stars, availableNumbers, candidateNumbers, secondsLeft, setGameState} = useGameState();

    const candidateAreWrong = utils.sum(candidateNumbers) > stars;

    // const gameIsWon = availableNumbers.length === 0;
    // const gameIsLost = secondsLeft === 0;

    const gameStatus =
        availableNumbers.length === 0
            ? 'won'
            : secondsLeft === 0
            ? 'lost'
            : 'active';


    // const resetTheStates = () => {
    //     setStars(utils.random(1, 9));
    //     setAvailableNumbers(utils.range(1, 9))
    //     setCandidateNumbers([])
    // };

    const numberStatus = (number) => {
        if (!availableNumbers.includes(number)) {
            return 'used'
        }
        if (candidateNumbers.includes(number)) {
            return candidateAreWrong
                ? 'wrong' : 'candidate'
        }
        return 'available'
    };

    const onNumberClick = (number, current_status) => {
        if (gameStatus !== 'active' || current_status === 'used') {
            return;
        }

        const newCandidateNumbers =
            current_status === 'available'
                ? candidateNumbers.concat(number)
                : candidateNumbers.filter(
                cn => cn !== number
                );

        setGameState(newCandidateNumbers)

    };

    const PlayGameAgain = props => {
        const isGameLost = props.gameStatus === 'lost';
        return (
            <div className={"game-done"}>
                <div className={"message"} style={{color: isGameLost ? "red" : "green"}}>
                    {isGameLost
                        ? 'Game Over'
                        : 'Won The Game '}
                </div>
                <button onClick={props.reset}>Play Again</button>
            </div>
        )
    };

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {gameStatus !== 'active'
                        ? <PlayGameAgain reset={props.startNewGame} gameStatus={gameStatus}/>
                        : <DisplayStars numberOfStars={stars}/>}

                </div>
                <div className="right">
                    {utils.range(1, 9).map(value => (
                        <NumbersInteraction
                            key={value}
                            number={value}
                            status={numberStatus(value)}
                            onClick={onNumberClick}
                        />
                    ))}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};

const NumbersInteraction = (props) => {
    let handleClick = () => {
        props.onClick(props.number, props.status)
    };
    return (
        <button onClick={handleClick}
                style={{backgroundColor: colors[props.status]}}
                className={"number"}>
            {props.number}
        </button>
    )
};

const useGameState=()=> {
    const [stars, setStars] = useState(utils.random(1, 9));
    //wrongNumbers
    //AvailableNumbers
    //UsedNumbers
    const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
    const [candidateNumbers, setCandidateNumbers] = useState([]);

    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        console.log("Updated");
        if (secondsLeft > 0 && availableNumbers.length > 0) {
            const timer = setTimeout(() => {
                setSecondsLeft(secondsLeft - 1)
            }, 1000);

            return () => clearTimeout(timer)
        }
    });
    const setGameState = (_newCandidateNumbers) => {
        if (utils.sum(_newCandidateNumbers) !== stars) {
            setCandidateNumbers(_newCandidateNumbers);
        } else {
            const newAvailableNumbers = availableNumbers.filter(
                n => !_newCandidateNumbers.includes(n)
            );
            setStars(utils.randomSumIn(newAvailableNumbers, 9));
            setAvailableNumbers(newAvailableNumbers);
            setCandidateNumbers([])
        }
    };
        return {stars, availableNumbers, candidateNumbers, secondsLeft, setGameState}
};

const DisplayStars = (props) => {
    return (
        <React.Fragment>
            {utils.range(1, props.numberOfStars).map(starId => (
                <div key={starId} className={"star"}/>
            ))}
        </React.Fragment>
    )
};

// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};

// Math science
const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({length: max - min + 1}, (_, i) => min + i),

    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
        const sets = [[]];
        const sums = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0, len = sets.length; j < len; j++) {
                const candidateSet = sets[j].concat(arr[i]);
                const candidateSum = utils.sum(candidateSet);
                if (candidateSum <= max) {
                    sets.push(candidateSet);
                    sums.push(candidateSum);
                }
            }
        }
        return sums[utils.random(0, sums.length - 1)];
    },
};

const App =() => {
    const [gameId, setGameId] = useState(1);
    const incrementTheGameId = (props) => {
        setGameId(gameId + 1);
    };
    return (
        <div className="App">
            <header className="App-header">
                <StarMatch key={gameId} startNewGame={incrementTheGameId}/>
            </header>
        </div>
    );
}

export default App;

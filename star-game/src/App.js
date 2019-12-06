import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

const StarMatch = () => {
    const [stars, setStars] = useState(utils.random(1, 9));
    //wrongNumbers
    //AvailableNumbers
    //UsedNumbers
    const [availableNumbers, setAvailableNumbers] = useState(utils.range(1, 9));
    const [candidateNumbers, setCandidateNumbers] = useState([]);

    const candidateAreWrong = utils.sum(candidateNumbers) > stars;

    const gameIsDone = availableNumbers.length === 0;

    const resetTheStates =() =>{
        setStars(utils.random(1,9));
        setAvailableNumbers(utils.range(1,9))
        setCandidateNumbers([])
    };

    const numberStatus = (number) => {
        if (!availableNumbers.includes(number)) {
            return 'used'
        }
        if (candidateNumbers.includes(number)) {
            return candidateAreWrong ? 'wrong' : 'candidate'
        }
        return 'available'
    };

    const onNumberClick = (number, current_status) => {
        if (current_status === 'used') {
            return;
        }

        const newCandidateNumbers =
            current_status === 'available'
                ? candidateNumbers.concat(number)
                : candidateNumbers.filter(
                    cn => cn !== number
                );


        if (utils.sum(newCandidateNumbers) !== stars) {
            setCandidateNumbers(newCandidateNumbers)
        } else {
            const newAvailableNumbers = availableNumbers.filter(
                n => !newCandidateNumbers.includes(n)
            );
            setStars(utils.randomSumIn(newAvailableNumbers, 9));
            setAvailableNumbers(newAvailableNumbers);
            setCandidateNumbers([])
        }
    };

    const PlayGameAgain = props =>{
        return(
            <div className={"game-done"}>
                <div>
                    Game Over
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
                    {gameIsDone
                    ? <PlayGameAgain reset = {resetTheStates}/>
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
            <div className="timer">Time Remaining: 10</div>
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

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <StarMatch/>
            </header>
        </div>
    );
}

export default App;

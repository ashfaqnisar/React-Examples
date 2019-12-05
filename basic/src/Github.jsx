import React, { PureComponent} from 'react';
import axios from 'axios'
import './App.css';



class Github extends PureComponent {
    state = {
        profiles: []
    };

    handleFetchedData = (newData)=>{
        this.setState(prevState => ({
            profiles:[...prevState.profiles,newData]
        }))
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div>The Card App</div>
                    <Form submitData = {this.handleFetchedData}/>
                    <CardList data={this.state.profiles}/>
                </header>
            </div>
        );
    }
}

class Card extends React.Component {
    render() {
        const profile = this.props;
        return (
            <div>
                <img src={profile.avatar_url}  alt={""}/>
                <div>
                    <div>{profile.name}</div>
                    <div>{profile.company}</div>
                </div>
            </div>
        );
    }
}

class Form extends React.Component {
    state = {
        username:''
    };
    handleSubmit = async (event) => {
        event.preventDefault();
        let fetchedResp  = await axios.get(`https://api.github.com/users/${this.state.username}`);

        this.props.submitData(fetchedResp.data)
        this.setState({username:''})
    };
    handleChange= (event)=>{
        this.setState({username:event.target.value})
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type={"text"}
                        placeholder={"Github Username"}
                        value={this.state.username}
                        onChange={this.handleChange}
                        required/>
                    <button>Add Card</button>
                </form>
            </div>
        );
    }

}


const CardList = (props) => {
    return (
        <div>

            {props.data.map(profile => <Card key={profile.id} {...profile}/>)}
            {/*Here the profile is one of the object and we are then spreading the profile as an prop
        to the card element*/}
        </div>
    );
};

export default Github;
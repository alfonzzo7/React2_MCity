import React, { Component } from 'react';
import { Fade } from 'react-reveal';
import { Promise } from 'core-js';
import CircularProgress from '@material-ui/core/CircularProgress';

import stripes from '../../Resources/images/stripes.png'
import PlayerdCard from './../ui/playerdCard';
import { firebasePlayers, firebase } from '../../firebase';
import { firebaseLooper } from '../ui/misc';

class TheTeam extends Component {
    state = {
        loading: true,
        players: [],
        categories: [
            {
                key: 'Keeper',
                title: 'Keepers'
            },
            {
                key: 'Defence',
                title: 'Defenders'
            },
            {
                key: 'Midfield',
                title: 'Midfielders'
            },
            {
                key: 'Striker',
                title: 'Strikers'
            },
        ]
    }

    componentDidMount() {
        firebasePlayers.once('value').then((snapshot) => {
            const players = firebaseLooper(snapshot);
            let promises = [];

            for (let key in players) {
                promises.push(
                    new Promise((resolve, reject) => {
                        firebase.storage().ref('players')
                            .child(players[key].image)
                            .getDownloadURL()
                            .then((url) => {
                                players[key].url = url;
                                resolve();
                            });
                    })
                );
            }

            Promise.all(promises).then(() => {
                this.setState({
                    loading: false,
                    players
                })
            })
        });
    }
    
    showPlayersByCategory = (category) => (
        this.state.players ?
            this.state.players.map((player, i) => {
                return player.position === category ?
                    <Fade left key={i} delay={i*20}>
                        <div className="item">
                            <PlayerdCard
                                number={player.number}
                                name={player.name}
                                lastName={player.lastName}
                                bck={player.url}
                            />
                        </div>
                    </Fade>
                : null
            })
        : null
    )

    renderPlayers = () => (
        this.state.categories.map((category) => (
            <div className="team_category_wrapper" key={category.key}>
                <div className="title">{category.title}</div>
                <div className="team_cards">
                    {this.showPlayersByCategory(category.key)}
                </div>
            </div>
        ))
    )

    render() {
        return (
            <div className='the_team_container' style={{background: `url(${stripes}) repeat`}}>
                {!this.state.loading ?
                    <div>
                        {this.renderPlayers()}
                    </div>
                    : 
                    <div className="progress">
                        {
                            this.state.loading ?
                            <CircularProgress thickness={5} style={{color: '#98c6e9'}}/>
                            : null
                        }
                    </div>
                }
            </div>
        );
    }
}

export default TheTeam;
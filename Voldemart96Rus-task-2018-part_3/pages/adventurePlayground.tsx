import React, {Component, Fragment} from 'react';
import {IScene} from 'types';

import Scene from '../components/adventurePlayground';
import Header from '../components/header';

export default class AdventurePlaygroundPage extends Component {
    state = {
        loading: true,
        scene: {},
        staticBasePath: '/'
    };

    getStaticBasePath = async () => {
        const url = '/staticBasePath?';
        await fetch(url)
            .then(res => res.json())
            .then(staticBasePath => {
                this.setState({staticBasePath});
            })
            .catch(error => {
                console.error(error);
            }
            );
    }

    getScene = async (data: any) => {
        const {adv, scene} = data;
        const url = `/getScene?adv=${adv}&scene=${scene}`;
        await fetch(url)
            .then(res => res.json())
            .then(sceneADV => {
                this.setState({scene: sceneADV, loading: false});
            })
            .catch(error => {
                console.error(error);
            }
            );
    }

    componentDidMount() {
        const tmp = document.URL.split('/');
        const scene = tmp[tmp.length - 1];
        const adv = tmp[tmp.length - 2];
        this.getScene({scene, adv});
        this.getStaticBasePath();
    }

    render() {
        const {staticBasePath, scene, loading} = this.state;
        if (loading) {
            return (
                <Fragment>
                    <Header staticBasePath={staticBasePath}/>
                    <div className="load">
                        <img src={`${staticBasePath}img/load.jpg`} alt="load" title="load"/>
                    </div>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <Header staticBasePath={staticBasePath}/>
                <Scene scene={scene as IScene} staticBasePath={staticBasePath}/>
            </Fragment>
        );
    }
}

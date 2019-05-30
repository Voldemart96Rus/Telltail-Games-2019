import React, {Component, Fragment} from 'react';

import Adventures from '../components/adventure';
import Header from '../components/header';

export default class TagsPage extends Component {
    state = {
        adventures: [],
        loading: true,
        staticBasePath: '',
        tag: ''
    };

    getStaticBasePath = async () => {
        const url = '/staticBasePath?';
        await fetch(url)
            .then(res => res.json())
            .then(staticBasePath => {
                this.setState({staticBasePath, loading: false});
            })
            .catch(error => {
                console.error(error);
            }
            );
    }

    getFilterAdventures = async (t: string) => {
        const tag = t;
        const url = `/filterAdventure?tag=${tag}`;
        await fetch(url)
            .then(res => res.json())
            .then(body => {
                const {adventures, hash} = body;
                this.setState({adventures, tag: hash});
                console.info(this.state);
            })
            .catch(error => {
                console.error(error);
            }
            );
    }

    componentDidMount() {
        const tag = document.URL.match(/tags\/.+/);
        if (tag) {
            const t = tag[0].replace('tags/', '');
            this.getFilterAdventures(t);
        }

        this.getStaticBasePath();
    }

    render() {
        const {adventures, staticBasePath, tag, loading} = this.state;
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
                <h1 className="hash-title">#{tag}</h1>
                <Adventures adventures={adventures} staticBasePath={staticBasePath}/>
            </Fragment>
        );
    }
}

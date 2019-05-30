import React, {Component, Fragment} from 'react';

import {IAdventure} from 'types';

import Adventures from '../components/adventure';
import Header from '../components/header';
import SearchBox from '../components/searchBox';

interface IData {
    adventures: IAdventure[];
    staticBasePath: string;
    pageConfig: IPageConfig;
    loading: boolean;
}

interface IPageConfig {
    countLoadAdv: number;
            limit: number;
            scroll: number;
            search: string;
            setTags: Set<string>;
}

export default class Adventure extends Component {
    state: IData = {
        adventures: [],
        loading: true,
        pageConfig: {
            countLoadAdv: 2,
            limit: 3,
            scroll: 0,
            search: '',
            setTags: new Set()
        },
        staticBasePath: ''
    };

    componentDidMount() {
        this.getAdventures();
        this.getStaticBasePath();
        window.addEventListener('scroll', this.loadNextAdventure);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.loadNextAdventure);
    }

    loadNextAdventure = () => {
        if (this.isScrolledDown()) {
            const {limit, countLoadAdv} = this.state.pageConfig;
            const newCountLoadAdv = limit + countLoadAdv;
            this.setState((prevState: IData) =>
                ({pageConfig: {...prevState.pageConfig, limit: newCountLoadAdv}}));
            this.getAdventures();
        }
    }

    isScrolledDown = () => {
        const canScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentlyScrolled = window.scrollY;
        const epsilon = 1;
        if (canScroll - currentlyScrolled < epsilon && this.state.pageConfig.scroll < currentlyScrolled) {
            this.setState((prevState: IData) =>
                ({pageConfig: {...prevState.pageConfig, scroll: currentlyScrolled}}));
            return true;
        }

        return false;
    }

     getAdventures = async () => {
         const {limit, search, setTags} = this.state.pageConfig;
         const url = `/adventures?limit=${limit}` +
            `&search=${search}&arrTags=${[...setTags].join(' ')}`;
         await fetch(url)
             .then(res => res.json())
             .then(adventures => {
                 this.setState({adventures, loading: false});
             })
             .catch(error => {
                 console.error(error);
             }
             );
     }

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

    finedTags = async (tag: string) => {
        const url = `/hashtags?fiendTags=${tag}`;
        const fiendTags = await fetch(url).then(res => {
            return res.json();
        }).catch(er => console.error(er));
        return fiendTags;
    }

    updateState = (s: string, set: Set<string>) => {
        const {pageConfig} = this.state;
        pageConfig.setTags = set;
        pageConfig.search = s;
        this.setState({pageConfig});
        this.getAdventures();
    }

    render() {
        const {adventures, staticBasePath, loading} = this.state;
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
                <SearchBox updateState={this.updateState} finedTags={this.finedTags}/>
                <Adventures adventures={adventures} staticBasePath={staticBasePath}/>
            </Fragment>
        );
    }
}

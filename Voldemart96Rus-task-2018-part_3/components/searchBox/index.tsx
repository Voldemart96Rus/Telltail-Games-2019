import React, {ChangeEvent, Component} from 'react';
import {ITag} from 'types';
import './searchBox.css';

interface IFunction {
    finedTags(tag: string): Promise<ITag[]>;
    updateState(search: string, setTags: Set<string>): void;
}

interface IData {
    search: string;
    searchTags: string;
    selectedTags: number;
    setTags: Set<string>;
}

export default class SearchBox extends Component<IFunction> {
    state: IData = {
        search: '',
        searchTags: '',
        selectedTags: -1,
        setTags: new Set()
    };

    // UpdateState('бой', '', -1);
    componentDidMount() {
        // This.props.updateState('бой', '', -1);
        const body = document.getElementsByTagName('body');
        body[0].addEventListener('click', this.closeListTags);
        const searchTags = document.querySelector('.search-tags');
        if (searchTags) {
            searchTags.addEventListener('keydown', this.handleKeystroke);
        }
    }

    componentWillUnmount() {
        const body = document.getElementsByTagName('body');
        body[0].removeEventListener('click', this.closeListTags);
        const searchTags = document.querySelector('.search-tags');
        if (searchTags) {
            searchTags.removeEventListener('keydown', this.handleKeystroke);
        }
    }

    handleKeystroke = (event: any) => {
        const listTags = document.querySelector('.list-tags');
        if (listTags) {
            const children = listTags.children;
            const newConst = this.state.selectedTags;
            switch (event.key) {
                case 'ArrowDown':
                    this.setState({selectedTags: newConst + 1});
                    this.arrowDown(children);
                    break;
                case 'ArrowUp':
                    this.setState({selectedTags: newConst - 1});
                    this.arrowUp(children);
                    break;
                case 'Enter':
                    event.preventDefault();
                    // Event.target.value = '';
                    this.selectTeg(children);
                    break;
                default:
            }
        }
    }

    selectTeg = (listTags: any) => {
        if (this.state.selectedTags === -1) {
            return;
        }

        const index = this.state.selectedTags;
        this.state.setTags.add(listTags[index].innerHTML);
        this.addTagsInView(listTags[index].innerHTML);
        this.closeListTags();
    }

    arrowUp = (listTags: any) => {
        if (this.state.selectedTags <= -1) {
            listTags[this.state.selectedTags + 1].classList.toggle('focused');
            this.setState({selectedTags: -1});
            return;
        }

        listTags[this.state.selectedTags + 1].classList.toggle('focused');
        listTags[this.state.selectedTags].classList.toggle('focused');
    }

    arrowDown = (listTags: any) => {
        if ([...listTags].length === this.state.selectedTags) {
            this.setState((previousState: IData) => ({selectedTags: previousState.selectedTags--}));
            return;
        }

        if (this.state.selectedTags !== 0) {
            listTags[this.state.selectedTags - 1].classList.toggle('focused');
        }

        listTags[this.state.selectedTags].classList.toggle('focused');
    }

    addTags = (event: ChangeEvent<HTMLInputElement>) => {
        const listTags = document.getElementById('list-tags');
        this.setState({searchTags: event.target.value});
        if (listTags) {
            listTags.hidden = false;
            listTags.innerHTML = '';
            this.setState({selectedTags: -1});
            this.props.finedTags(event.target.value).then(tags => {
                tags.forEach(el => {
                    if (!this.state.setTags.has(el.hash)) {
                        const li = document.createElement('li');
                        li.innerHTML = el.hash;
                        li.classList.add('item__tag');
                        li.onclick = () => {
                            this.choice(el.hash);
                        };

                        listTags.appendChild(li);
                    }
                });
            }
            );
        }
    }

    choice = (el: string) => {
        this.state.setTags.add(el);
        this.addTagsInView(el);
        this.closeListTags();
    }

    addTagsInView = (tag: string) => {
        const li = document.createElement('li');
        li.innerHTML = `#${tag}<span class="link link__tags">X</span>`;
        li.classList.add('tag');
        li.id = tag;
        li.onclick = () => {
            this.deleteTag(tag);
        };

        const tags = document.getElementById('selected-tags');
        if (tags) {
            tags.appendChild(li);
        }
    }

    deleteTag = (tag: string) => {
        this.state.setTags.delete(tag);
        const delTags = document.getElementById(tag);
        if (delTags) {
            delTags.remove();
        }
    }

    closeListTags = () => {
        const listTags = document.getElementById('list-tags');
        if (listTags) {
            listTags.hidden = true;
        }

        this.setState({searchTags: ''});
    }

    submit = () => {
        const {search, setTags} = this.state;
        this.props.updateState(search, setTags);
        this.setState({search: ''});
    }

    searchChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({search: event.target.value});
    }

    render() {
        const {searchTags, search} = this.state;

        return (
            <div className="wrap-search-box">
                <div className="search-box">
                    <input
                        type="search"
                        placeholder="Введите текст для поиска"
                        className="search-adventure"
                        value={search}
                        onChange={this.searchChange}
                    />
                    <button className="bt__search" type="button" onClick={this.submit}>Найти</button>
                </div>
                <form id="search-tags-form" className="search-tags-form">
                    <ul className="selected-tags" id="selected-tags"/>
                    <div className="search-box">
                        <input type="search" placeholder="Хештег" className="search-tags"
                            autoComplete="off"
                            value={searchTags}
                            onChange={this.addTags}/>
                        <ul hidden id="list-tags" className="list-tags"/>
                    </div>
                </form>
            </div>
        );
    }
}

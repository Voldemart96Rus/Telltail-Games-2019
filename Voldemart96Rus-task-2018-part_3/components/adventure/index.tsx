import React, {Component} from 'react';
import {IAdventure, IAdventureData, ITag} from 'types';

import './adventure.css';

export default class Adventures extends Component<IAdventureData> {
    render() {
        const {staticBasePath, adventures} = this.props;
        return (
            <div className="wrap-adventure">
                <ul id="adventure-list" className="adventure-list">
                    { adventures.map((element: IAdventure) => {
                        return (
                            <li key={element.id} className="adventure-list__item">
                                <a href={`/${element.titleEN}/start`} className="link">
                                    { element.img === undefined ? (
                                        <img src={`${staticBasePath}img/default-adv.png`}
                                            className="adventure__img"
                                            alt="картинка приключения"
                                            title={`${element.description}`}
                                        />) : (
                                        <img src={`${staticBasePath}img/${element.img}`}
                                            className="adventure__img"
                                            alt={`${element.img}`}
                                            title={`${element.description}`}
                                        />)
                                    }
                                </a>
                                <section className="adventure__item-description">
                                    <a href={`/${element.titleEN}/start`} className="link">{element.title}</a>
                                    <p className="item-description">{element.description}</p>
                                    <section className="item__tags">
                                        {element.tags.map((t: ITag) => {
                                            return (
                                                <a key={t.id} className="link link-tags" href={`/tags/${t.hashEN}`}>
                                                    <button className="bt__tags" type="button">#{ t.hash }</button>
                                                </a>
                                            );
                                        })}
                                    </section>
                                </section>
                            </li>
                        );
                    })
                    }
                </ul>
            </div>
        );
    }
}

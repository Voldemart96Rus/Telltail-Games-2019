import React, {Component} from 'react';
import {IAchievements, IButton, ISceneData} from 'types';

import './scene.css';

export default class Scene extends Component<ISceneData> {
    render() {
        const {staticBasePath, scene} = this.props;
        return (
            <div className="adventure-playground">
                <section className="adventure-playground__img-container">
                    { scene.image === undefined ? (
                        <img src={`${staticBasePath}img/404.png`}
                            alt="Данное приключение не имеет картики"
                            width="950px"
                            height="380px"
                        />
                    ) : (
                        <img src={`${staticBasePath}img/${scene.image}`}
                            alt="Изображение приключения/действия"
                            width="950px"
                            height="380px"
                        />
                    )
                    }
                    { scene.description === '' ? (<div/>) : (
                        <pre
                            className={`adventure-playground__description ${scene.positionDescription}
                                description_background_dark`}
                        >{ scene.description }
                        </pre>)
                    }
                </section>
                { scene.achievements === undefined ? (<div/>) : (
                    scene.achievements.map((a: IAchievements) => {
                        return (
                            <section key={a.medal} className="medal-items">
                                <img src={`${staticBasePath}img/${a.image}`}
                                    className="medal-items__img_round" alt="medal-img" width="147px"
                                    height="147px"
                                />
                                <section className="medal-item__description">
                                    <p className="medal-description">Достижение получено</p>
                                    <p className="medal-description description_font-size_medium"> { a.medal } </p>
                                </section>
                            </section>
                        );
                    }))}
                <section className="action-buttons">
                    { scene.buttons === undefined ? (<div/>) : (
                        scene.buttons.map((b: IButton) => {
                            return (
                                <a key={b.nextAction} className="link" href={`/${b.nextAction}`}>
                                    <button className="action-button__item" type="button">{ b.name }</button>
                                </a>
                            );
                        }))}
                </section>
            </div>
        );
    }
}

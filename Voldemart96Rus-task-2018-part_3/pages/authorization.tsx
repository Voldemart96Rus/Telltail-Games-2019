import React, {Component} from 'react';

import {IUserData} from 'types';
import Authorization from '../components/authorization';
import Header from '../components/header';

interface IAuthorizationPage {
    login(user: IUserData): void;
}

export default class AuthorizationPage extends Component<IAuthorizationPage> {
    state = {
        bad: '',
        staticBasePath: ''
    };

    getUser = (login: string) => {
        return fetch(`/user?login=${login}`)
            .then(res => {
                return res.json();
            })
            .then((user: any) => {
                if (user !== null) {
                    return user.salt;
                }
            });
    }

    submit = (user: IUserData) => {
        const {login, password} = user;
        fetch('/authorization', {
            body: JSON.stringify({login, password}),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        }).then((response: Response) => {
            if (response.status === 403) {
                this.setState({bad: 'Неверный логин или пароль.'});
            } else {
                response.json().then(t => {
                    console.info(t);
                    this.props.login({login, password: t.result});
                    this.return();
                });
                this.return();
            }
        });
    }

    return = () => {
        const a = document.createElement('a');
        a.setAttribute('href', '/');
        a.click();
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

    componentWillMount() {
        this.getStaticBasePath();
    }

    render() {
        const {staticBasePath, bad} = this.state;
        return (
            <div>
                <Header staticBasePath={staticBasePath}/>
                <Authorization onSubmit={this.submit}/>
                <p>{bad}</p>
            </div>
        );
    }
}

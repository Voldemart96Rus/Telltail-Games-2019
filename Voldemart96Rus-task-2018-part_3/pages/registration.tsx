import React, {Component} from 'react';

import {IRegistrationData, IUserData} from 'types';
import Header from '../components/header';
import Registration from '../components/registration';

interface IRegistrationPage {
    login(user: IUserData): void;
}

export default class RegistrationPage extends Component<IRegistrationPage> {
    state = {
        bad: '',
        staticBasePath: ''
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

    componentWillMount() {
        this.getStaticBasePath();
    }

    submit = (user: IRegistrationData) => {
        fetch('/api/reg', {
            body: JSON.stringify(user),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        }).then((response: Response) => {
            if (response.status === 201) {
                this.props.login({login: user.login, password: user.password});
                this.return();
            } else if (response.status === 403) {
                this.setState({bad: 'Логин занят!!!'});
            }
        });
    }

    return = () => {
        const a = document.createElement('a');
        a.setAttribute('href', '/');
        a.click();
    }

    render() {
        const {staticBasePath, bad} = this.state;

        return (
            <div>
                <Header staticBasePath={staticBasePath}/>
                <Registration onSubmit={this.submit}/>
                <p>{bad}</p>
            </div>
        );
    }
}

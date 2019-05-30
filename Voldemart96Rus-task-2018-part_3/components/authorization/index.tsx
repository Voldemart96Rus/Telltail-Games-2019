import React, {ChangeEvent, Component} from 'react';

import {IUserData} from 'types';
import './index.css';

interface IUserLoginFormProps {
    onSubmit(authorization: IUserData): void;
}

interface IUserLoginFormState {
    error: string;
    login: string;
    password: string;
}

export class UserLoginForm extends Component<IUserLoginFormProps> {
    state: IUserLoginFormState = {
        error: '',
        login: '',
        password: ''
    };

    handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
        const login = event.target.value;
        this.setState({login});
    }

    handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({password: event.target.value});
    }

    handleSubmit = () => {
        const {login, password} = this.state;
        this.props.onSubmit({login, password});

        this.setState({login: '', password: ''});
    }

    render() {
        const {login, password, error} = this.state;
        const isButtonDisabled = !login || !password || Boolean(error);

        return (
            <form className="authorization-form">
                <h1 className="authorization-form__title">Вход</h1>
                <input
                    className="authorization-form__input"
                    placeholder="Логин"
                    value={login}
                    onChange={this.handleLoginChange}
                />
                <input
                    className="authorization-form__input"
                    placeholder="Пароль"
                    type="password"
                    value={password}
                    onChange={this.handlePasswordChange}
                />
                <button
                    className={`authorization-form__button ${isButtonDisabled ? 'button_disabled' : ''}`}
                    disabled={isButtonDisabled}
                    type="submit"
                    onClick={this.handleSubmit}
                >
                    Войти
                </button>
            </form>
        );
    }
}

export default UserLoginForm;

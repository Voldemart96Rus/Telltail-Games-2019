import React, {ChangeEvent, Component} from 'react';

import md5 from 'md5';
import {IRegistrationData} from 'types';
import './index.css';

interface IRegistrationProps {
    onSubmit(user: IRegistrationData): void;
}

interface IRegistrationState {
    avatar: string;
    login: string;
    badLogin: string;
    password: string;
    badPassword: string;
}

export class Registration extends Component<IRegistrationProps> {
    state: IRegistrationState = {
        avatar: '',
        badLogin: '',
        badPassword: '',
        login: '',
        password: ''
    };

    checkLogin = (event: ChangeEvent<HTMLInputElement>) => {
        const login = event.target.value;
        const badLogin = /^[A-Za-z0-9-]+$/.test(login) ?
            '' :
            'Логин может содержать только символы «a-Z», «0-9» и «-»';
        this.setState({badLogin, login});
    }

    checkPassword = (event: ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;
        const badPassword = password.length > 0 ? '' : 'Введите пароль';
        this.setState({password, badPassword});
    }

    loadFileInput = (event: any) => {
        if (event.target.files.length === 0) {
            this.setState({avatar: ''});

            return;
        }

        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = ((_file: File) => {
            return (e: any) => {
                this.setState({avatar: e.target.result});
            };
        })(file);

        reader.readAsDataURL(file);
    }

    submit = () => {
        const {avatar, login, password} = this.state;
        const salt = Math.random().toString(16).substring(2, 20);
        const hashPass = md5(password + salt);
        this.props.onSubmit({avatar, login, password: hashPass, salt});
        this.setState({avatar: '', login: '', password: ''});
    }

    render() {
        const {login, badLogin, password, badPassword} = this.state;
        const isButtonDisabled = !login || !password || Boolean(badLogin) || Boolean(badPassword);

        return (
            <section className="registration-form">
                <h1 className="registration-form__title">Регистрация</h1>
                <input
                    className="registration-form__input"
                    placeholder="Логин"
                    value={login}
                    onChange={this.checkLogin}
                />
                {badLogin && <p className="error-message">{badLogin}</p>}
                <input
                    className="registration-form__input"
                    placeholder="Пароль"
                    type="password"
                    value={password}
                    onChange={this.checkPassword}
                />
                {badPassword && <p className="error-message">{badPassword}</p>}
                <input className="registration-form__file-selection" type="file" onInput={this.loadFileInput}/>
                <button
                    className={`registration-form__button ${isButtonDisabled ? 'button_disabled' : ''}`}
                    disabled={isButtonDisabled}
                    type="submit"
                    onClick={this.submit}
                >
                    Зарегистрироваться и войти
                </button>
            </section>
        );
    }
}

export default Registration;

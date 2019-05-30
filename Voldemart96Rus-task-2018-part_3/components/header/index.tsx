import React, {Component} from 'react';

import './header.css';
interface IData {
    staticBasePath: string;
}
export default class Header extends Component<IData> {
    state: any = {
        avatar: '',
        login: ''
    };

    componentDidMount() {
        const login = this.getCookie('login');
        const password = this.getCookie('password');
        if (login !== undefined && password !== undefined) {
            this.getAvatar(login, password);
        } else {
            this.setState({avatar: '', login: ''});
        }
    }

    getAvatar = async (login: string, password: string) => {
        await fetch(`/user?login=${login}`)
            .then(res => {
                return res.json();
            })
            .then(user => {
                if (user !== null && user.password === password) {
                    this.setState({avatar: user.avatar, login});
                }
            });
    }

    getCookie = (name: string) => {
        const matches = document.cookie.match(new RegExp(
            '(?:^|; )' + name.replace(/([.$?*|{}()[\]+^])/g, '\\$1') + '=([^;]*)'
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    exitClick = () => {
        this.setState({login: '', avatar: ''});
        const date = (new Date(0)).toUTCString();
        document.cookie = `login=; expires=${date}`;
        document.cookie = `password=; expires=${date}`;
    }

    render() {
        const {staticBasePath} = this.props;
        const {avatar, login} = this.state;

        return (
            <div>
                <header className="wrap-header">
                    <section className="header">
                        <a href="/" className="root">
                            <img src={`${staticBasePath}img/path2996.png`}
                                alt="path2996" title="path2996" className="path2996"
                            />
                            <span className="header-title">Telltail</span>Games
                        </a>
                    </section>
                    <section>
                        { login === '' ? (
                            <div className="authorization">
                                <a href="/authorization"><button className="bt__auth" type="button">Вход</button></a>
                                <a href="/registration">
                                    <button className="bt__auth" type="button">Регистрация</button>
                                </a>
                            </div>
                        ) : (
                            <div className="authorization">
                                <img src={avatar === '' ? `${staticBasePath}img/bober.jpg` : avatar}
                                    alt="user"
                                    width="40"
                                    height="40"
                                    className="img__auth"/>
                                <p className="user-name">{login}</p>
                                <button className="bt__auth" type="button" onClick={this.exitClick}>Выход</button>
                            </div>
                        )}
                    </section>
                </header>
                <div className="line"/>
            </div>
        );
    }
}

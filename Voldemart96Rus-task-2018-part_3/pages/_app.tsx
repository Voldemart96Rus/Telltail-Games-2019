import App, {Container, NextAppContext} from 'next/app';
import React from 'react';

import {IUserData} from 'types';

import './app.css';

export default class MyApp extends App {
    static async getInitialProps({Component, ctx}: NextAppContext) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return {pageProps};
    }

    login = (user: IUserData) => {
        document.cookie = `login=${user.login}`;
        document.cookie = `password=${user.password}`;
    }

    render() {
        const {Component, pageProps} = this.props;

        return (
            <Container>
                <Component {...pageProps} login={this.login}/>
            </Container>
        );
    }
}

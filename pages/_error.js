import React from 'react'
import Head from 'next/head'

export default class Error extends React.Component {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return { statusCode }
    }

    render() {
        return (
            <div>
                <Head>
                    <title>Turnie.re - Error {this.props.statusCode}</title>
                </Head>
                <p>
                  {this.props.statusCode
                    ? `An error ${this.props.statusCode} occurred on server`
                    : 'An error occurred on client'}
                </p>
            </div>
        )
    }
}

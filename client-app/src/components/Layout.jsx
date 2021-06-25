import React, { Component } from 'react'
import { Container } from 'reactstrap';
import { Nav } from './Nav';
import Footer from './Footer';
export class Layout extends Component {
    static displayName = Layout.name;
    render() {
        return (
            <div>
                <Nav loggedInStatus={this.props.loggedInStatus} user={this.props.user} />
                <Container>
                    {this.props.children}
                </Container>
                <Footer></Footer>
            </div>
        )
    }
}

export default Layout;


import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './LandingPage.css';
const LandingPage = ({history}) =>
{
    useEffect(() =>
    {
        const userInfo = localStorage.getItem("userInfo");

        if (userInfo)
        {
            history.push("/mynotes");
        }
    },[history])
    return (
        <div className="main">
            <Container>
                <Row>
                    <Col md="6"></Col>
                    <Col md="6">
                        <div className='intro-text'>
                        <div>
                            <h className="title">Welcome to Your Note Book</h>
                            <p className='subtitle'>One Safe place for all your Notes</p>
                        </div>
                        <div className='buttonContainer'>
                            <a href='/login'>
                                <Button size='lg' className="landingbutton">Login</Button>
                            </a>
                            <a href='/register'><Button size="lg" variant="outline-primary">Sign-up</Button></a>
                        </div>
                    </div>
                    </Col>
                    
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage

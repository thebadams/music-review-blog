import React from 'react';
import styled from "styled-components";
import Container from '@material-ui/core/Container';

const ScrollStyle = styled.div`
body {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #333;
}


.container {
    position: relative;
    width: 24px;
    height: 124px;
}

.chevron {
position: absolute;
width: 28px;
height: 8px;
opacity: 0;
transform: scale3d(0.5, 0.5, 0.5);
animation: move 3s ease-out infinite;
}

.chevron:first-child {
animation: move 3s ease-out 1s infinite;
}

.chevron:nth-child(2) {
animation: move 3s ease-out 2s infinite;
}

.chevron:before,
.chevron:after {
content: ' ';
position: absolute;
top: 0;
height: 100%;
width: 51%;
background: #fff;
}

.chevron:before {
left: 0;
transform: skew(0deg, 30deg);
}

.chevron:after {
right: 0;
width: 50%;
transform: skew(0deg, -30deg);
}

@keyframes move {
    25% {
        opacity: 1;

    }
    33% {
        opacity: 1;
        transform: translateY(30px);
    }
    67% {
        opacity: 1;
        transform: translateY(40px);
    }
    100% {
        opacity: 0;
        transform: translateY(55px) scale3d(0.5, 0.5, 0.5);
    }
}

.text {
display: block;
margin-top: 75px;
margin-left: -30px;
font-family: "Helvetica Neue", "Helvetica", Arial, sans-serif;
font-size: 12px;
color: #fff;
text-transform: uppercase;
white-space: nowrap;
opacity: .25;
animation: pulse 2s linear alternate infinite;
}

    @keyframes pulse {
    to {
        opacity: 1;
    }
}
`;

const ScrollAnimation = () => {
    return (
        <ScrollStyle>
            <Container className="container">
                <div class="chevron"></div>
                <div class="chevron"></div>
                <div class="chevron"></div>
                <span class="text">Scroll down</span>
            </Container>
        </ScrollStyle>
    )
};

export default ScrollAnimation;
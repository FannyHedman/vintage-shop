import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import heroImageStart from '../assets/white-blue-chairs2.jpg'
import heroImageLamps from '../assets/herosectionlight.jpg'
import heroImageChairs from '../assets/herosectionchairs.jpg'

const HeroSection = () => {
    const location = useLocation()

    const getImageForUrl = () => {
        if (location.pathname === '/lamps') {
            return heroImageLamps
        }
        if (location.pathname === '/chairs') {
            return heroImageChairs
        }
        return heroImageStart
    }

    return (
        <CenteredContainer>
            {location.pathname === '/' && (
                <Link to="/chairs">
                    <OverlayLink>Explore Chairs</OverlayLink>
                </Link>
            )}
            <div>
                <img src={getImageForUrl()} alt="item-images" />
            </div>
        </CenteredContainer>
    )
}

export default HeroSection

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: auto; */
    margin-top: 300px;
`

const OverlayLink = styled.div`
    position: absolute;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    text-decoration: none;
    color: #000;
    font-weight: bold;
    font-size: 18px;
    transition: background-color 0.3s;

    &:hover {
        background-color: rgba(255, 255, 255, 1);
    }
`

import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import heroImageWomen from '../assets/womenHeroImage.jpg'
import heroWomen from '../assets/womenHero1.jpg'

const HeroSection = () => {
    const location = useLocation()

    const getImageForUrl = () => {
        if (location.pathname === '/women') {
            return heroWomen
        }
        if (location.pathname === '/men') {
            return heroWomen
        }
        return heroWomen
    }

    return (
        <CenteredContainer>
            {location.pathname === '/' && (
                <Link to="/women">
                    <OverlayLink>Explore our new collection</OverlayLink>
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
    margin-top: 100px;
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

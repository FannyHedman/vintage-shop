import React, {useState} from 'react'
import styled from 'styled-components'
import { primaryColor, secondaryColor, textColor } from '../styles/colors'
import { Link } from 'react-router-dom'


const ItemsNav = () => {

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
      setMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
      <NavbarContainer>
          <BrandName></BrandName>
          <NavLinks className={isMobileMenuOpen ? 'open' : ''}>
              <NavLink to="/women">Women</NavLink>
              <NavLink to="/men">Men</NavLink>
              <NavLink to="/">All</NavLink>

          </NavLinks>
          <MobileMenuIcon
              onClick={toggleMobileMenu}
              className={isMobileMenuOpen ? 'open' : ''}
          >
              <div></div>
              <div></div>
              <div></div>
          </MobileMenuIcon>
      </NavbarContainer>
  )
}

export default ItemsNav;

const NavbarContainer = styled.nav`
  /* position: fixed; */
  width: 100%;
  height: 5vh;
  max-width: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #fff;
  padding: 20px 20px;
  z-index: 100;
  margin-top: 100px;
  margin-bottom: 50px;

  @media (max-width: 767px) {
      height: 15px;
  }
`

const BrandName = styled.a`
  font-family: 'Open Sans', sans-serif;
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
  color: ${textColor};
  letter-spacing: 2px;
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5%;
  font-size: 20px;
  letter-spacing: 2px;

  @media (max-width: 767px) {
      margin-top: 100px;
      flex-direction: column;
      align-items: flex-start;
      max-height: ${(props) => (props.className === 'open' ? '200px' : '0')};
      overflow: hidden;
      transition: max-height 0.4s;
      text-align: center;
      font-size: 18px;
      background-color: ${primaryColor};
      border-radius: 8px;
  }
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${textColor};
  margin: 0 15px;
  transition: transform 0.2s ease-in-out;

  &:hover {
      text-decoration: none;
      transform: scale(1.1);
  }

  @media (max-width: 767px) {
      padding: 1%;
  }
`

const MobileMenuIcon = styled.div`
  display: none;

  @media (max-width: 767px) {
      display: block;
      cursor: pointer;
      padding-left: 20px;
  }

  div {
      width: 35px;
      height: 5px;
      background-color: white;
      margin: 4px 60px;
      transition: 0.4s;
  }

  &.open div:nth-child(1) {
      transform: rotate(45deg) translate(3px, 3px);
  }

  &.open div:nth-child(2) {
      opacity: 0;
  }

  &.open div:nth-child(3) {
      transform: rotate(-45deg) translate(3px, -3px);
  }
`

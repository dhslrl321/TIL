import React from 'react'
import {
  FooterContainer, FooterWrap, FooterLinksContainer,
  FooterLinksWrapper, FooterLinkItems, FooterLinksTitle,
  FooterLink, SocialIconLink, SocialLogo, SocialMediaWrap,
  SocialIcons, SocialMedia, WebsiteRights
} from "./FooterElements";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrap>
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinksTitle>About</FooterLinksTitle>
              <FooterLink to="/signin">Testimonials</FooterLink>
              <FooterLink to="/signin">Carrers</FooterLink>
              <FooterLink to="/signin">Investors</FooterLink>
              <FooterLink to="/signin">Terms of service</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinksTitle>About</FooterLinksTitle>
              <FooterLink to="/signin">Testimonials</FooterLink>
              <FooterLink to="/signin">Carrers</FooterLink>
              <FooterLink to="/signin">Investors</FooterLink>
              <FooterLink to="/signin">Terms of service</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
          <FooterLinksWrapper>
            <FooterLinkItems>
              <FooterLinksTitle>About</FooterLinksTitle>
              <FooterLink to="/signin">Testimonials</FooterLink>
              <FooterLink to="/signin">Carrers</FooterLink>
              <FooterLink to="/signin">Investors</FooterLink>
              <FooterLink to="/signin">Terms of service</FooterLink>
            </FooterLinkItems>
            <FooterLinkItems>
              <FooterLinksTitle>About</FooterLinksTitle>
              <FooterLink to="/signin">Testimonials</FooterLink>
              <FooterLink to="/signin">Carrers</FooterLink>
              <FooterLink to="/signin">Investors</FooterLink>
              <FooterLink to="/signin">Terms of service</FooterLink>
            </FooterLinkItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/">
              dolla
            </SocialLogo>
            <WebsiteRights>doaal * 2020{new Date().getFullYear()}All rights reversed.</WebsiteRights>
            <SocialIcons>
              <SocialIconLink href="/" target="_blank" aria-label="Facebook">
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank" aria-label="Instagram">
                <FaInstagram />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank" aria-label="Youtube">
                <FaYoutube />
              </SocialIconLink>
              <SocialIconLink href="/" target="_blank" aria-label="Twitter">
                <FaTwitter />
              </SocialIconLink>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>
    </FooterContainer>
  )
}

export default Footer

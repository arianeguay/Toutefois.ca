'use client';

import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.headerBackground};
  color: ${({ theme }) => theme.colors.lightText};
  padding: ${({ theme }) => theme.spacing.lg}px;
`;

const FooterContent = styled.div`
  max-width: ${({ theme }) => theme.content.maxWidth}px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.lg}px;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 250px;
`;

const FooterTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.subtitle}px;
  margin-bottom: ${({ theme }) => theme.spacing.md}px;
  color: ${({ theme }) => theme.colors.buttonPrimaryBackground};
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: ${({ theme }) => theme.spacing.lg}px;
  padding-top: ${({ theme }) => theme.spacing.md}px;
  text-align: center;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>À propos de Toutefois</FooterTitle>
          <p>Toutefois est une entreprise spécialisée dans la création de contenu et la conception de projets innovants.</p>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Contact</FooterTitle>
          <p>Courriel: info@toutefois.ca</p>
          <p>Téléphone: +1 (123) 456-7890</p>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Suivez-nous</FooterTitle>
          <p>Réseaux sociaux</p>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; {currentYear} Toutefois. Tous droits réservés.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;

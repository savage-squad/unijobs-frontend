import styled from 'styled-components';


export const ContainerRoot = styled.div`
  margin: 0 auto;
  background: #fbfbfb;

  display: grid;
  box-sizing: border-box;
  grid-template-columns: minmax(100px, 280px) minmax(280px, 1fr);
  grid-template-areas:
    'sidebar formgrid'
    'footer footer';

  gap: 0;

  color: #3e3e3e;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'sidebar'
      'formgrid'
      'footer';
  }

  Sidebar {
    grid-area: sidebar;
  }
`;

export const Foot = styled.div`
  grid-area: footer;
`
;
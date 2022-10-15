import styled from 'styled-components/macro';

// import Arrow from '../assets/icons/arrow-down.svg';
// console.log('🚀 ~ file: styles.tsx ~ line 4 ~ Arrow', Arrow);

export const LayerComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  height: 100%;
`;

export const EditorWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1em;
  padding: 1rem;
  background-color: var(--light-2);
  border-radius: 0 0 var(--radius-8) var(--radius-8);
  box-sizing: border-box;
`;

export const Select = styled.select`
  appearance: none;
  background-image: url('../assets/icons/arrow-down.svg');
  background-color: var(--light-1);
  border: 1px solid var(--shade-3);
  border-radius: var(--radius-4);
  padding: 0 1em;
  height: 2em;
`;

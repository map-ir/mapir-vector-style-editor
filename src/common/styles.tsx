import styled from 'styled-components/macro';

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
  padding: 1rem;
  background-color: var(--light-2);
  border-radius: 0 0 var(--radius-8) var(--radius-8);
  box-sizing: border-box;
  & > div:not(:last-of-type) {
    border-bottom: 1px solid var(--shade-4);
  }
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

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;

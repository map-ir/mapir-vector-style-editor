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
  gap: 1em;
  padding: 1rem;
  background-color: var(--light-2);
  border-radius: 0 0 var(--radius-8) var(--radius-8);
  box-sizing: border-box;
`;

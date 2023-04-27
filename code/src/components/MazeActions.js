import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { moveForward } from 'reducers/maze';
import { Loading } from 'components/Loading';
import styled from 'styled-components';
import { Button } from './global-style/Button';
import { Wrapper } from './global-style/Wrapper';
import { DescriptionHeader, BodyText } from './global-style/Text';
import { Background } from './global-style/Background';

export const MazeActions = () => {
  const isLoading = useSelector((state) => state.ui.isLoading)
  const coordinates = useSelector((store) => store.maze.coordinates);
  const actions = useSelector((store) => store.maze.actions);
  const description = useSelector((store) => store.maze.description);
  const dispatch = useDispatch();

  const handleDirectionButton = (moveDirection) => {
    dispatch(moveForward(moveDirection))
  };

  return (
    <>
      {isLoading && (<Loading />)}
      {!isLoading && (
        <Background coordinates={coordinates}>
          <Wrapper>
            <DescriptionHeader>{description}</DescriptionHeader>
            <InnerWrapper>
              {actions.map((eachAction) => {
                return (
                  <ButtonWrapper key={eachAction.description}>
                    <Button buttonWidth="130px" type="button" onClick={() => handleDirectionButton(eachAction.direction)}>
                      {eachAction.direction}
                    </Button>
                    <BodyText>{eachAction.description}</BodyText>
                  </ButtonWrapper>
                )
              })}
            </InnerWrapper>
          </Wrapper>
        </Background>
      )}
    </>
  )
};

export const InnerWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  justify-items: center;
  align-items: flex-start;
  margin: 20px 0;
`

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`
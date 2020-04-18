import { Link, RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { Routes } from '../../App';
import { AssetProvider, intersection } from '../../utils';
import Styles from './NewGameContainer.module.sass';

const possibleWins = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

type PlayerType = 'p1' | 'p2';

interface PlayerMove {
  player: PlayerType;
  tile: number;
}

const playerAssets = {
  p1: AssetProvider.Images.XIcon,
  p2: AssetProvider.Images.OIcon,
};

export const NewGameContainer: React.FC<RouteComponentProps> = (props) => {
  // Props

  const { p1Name = 'Player 1', p2Name = 'Player 2' } = props.location!
    .state as any;

  // State Hooks

  const [currentPlayer = 'p1', setCurrentPlayer] = useState<PlayerType>();
  const [gameProgress = [], setGameProgress] = useState<PlayerMove[]>();
  const [winner, setWinner] = useState<string>();
  const [winningCombinationIndex = -1, setWinningCombinationIndex] = useState<
    number
  >();
  const [strikeStyle = '', setStrikeStyle] = useState<string>();

  // Life cycle methods

  useEffect(() => {
    if (winningCombinationIndex < 3) {
      setStrikeStyle('horizontal');
      return;
    }
    if (winningCombinationIndex < 6) {
      setStrikeStyle('vertical');
      return;
    }
    if (winningCombinationIndex === 6) {
      setStrikeStyle('left');
      return;
    }
    setStrikeStyle('right');
  }, [winningCombinationIndex]);

  useEffect(() => {
    const p1Moves = gameProgress
      .filter((move) => move.player === 'p1')
      .map((move) => move.tile);
    const p2Moves = gameProgress
      .filter((move) => move.player === 'p2')
      .map((move) => move.tile);

    possibleWins.forEach((winningMove, index) => {
      const p1Intersections = intersection(p1Moves, winningMove);
      if (p1Intersections.length === 3) {
        setWinningCombinationIndex(index);
        setTimeout(() => {
          setWinner('p1');
        }, 2000);
        return;
      }
      const p2Intersections = intersection(p2Moves, winningMove);
      if (p2Intersections.length === 3) {
        setWinningCombinationIndex(index);
        setTimeout(() => {
          setWinner('p2');
        }, 2000);
        return;
      }
    });
  }, [currentPlayer, gameProgress]);

  // Render methods

  const renderTile = (tileNumber: number) => {
    const markedPlayerMove = gameProgress.filter(
      (move) => move.tile === tileNumber
    );

    const updateGameProgress = () => {
      if (gameProgress.map((move) => move.tile).includes(tileNumber)) {
        return;
      }
      setGameProgress([
        ...gameProgress,
        { tile: tileNumber, player: currentPlayer },
      ]);
      setCurrentPlayer(currentPlayer === 'p1' ? 'p2' : 'p1');
    };

    return (
      <div
        onClick={updateGameProgress}
        key={tileNumber.toString()}
        className={Styles.tile}>
        <img
          width="100%"
          data-marked={markedPlayerMove.length !== 0 ? 'true' : 'false'}
          src={
            (markedPlayerMove.length !== 0 &&
              playerAssets[markedPlayerMove[0].player]) ||
            playerAssets[currentPlayer]
          }
          alt="pad"
        />
        {winningCombinationIndex !== -1 &&
          possibleWins[winningCombinationIndex].includes(tileNumber) && (
            <div className={Styles.winOverlay}>
              <div
                data-strike-style={strikeStyle}
                className={Styles.strike}></div>
            </div>
          )}
      </div>
    );
  };

  const renderGameBoard = () => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].map(renderTile);
  };

  return (
    <Container className="px-5 my-auto" fluid>
      <Modal centered dialogClassName={Styles.winnerModal} show={!!winner}>
        <Modal.Body>
          <Container>
            <Row>
              <Col
                className={[
                  'd-flex justify-content-center mb-4',
                  Styles.title,
                ].join(' ')}
                xs={12}>
                Victory to Player {winner === 'p1' ? p1Name : p2Name}!
              </Col>
              <Col className="d-flex justify-content-center mb-4" xs={12}>
                <img
                  width="64px"
                  alt="winner"
                  src={(playerAssets as any)[winner || '']}
                />
                <img
                  width="64px"
                  src={AssetProvider.Images.VictoryIcon}
                  alt="victory"
                />
              </Col>
              <Col className="d-flex" xs={12}>
                <button
                  onClick={() => {
                    setGameProgress([]);
                    setWinner(undefined);
                    setCurrentPlayer('p1');
                    setWinningCombinationIndex(-1);
                  }}
                  data-size="small">
                  Restart
                </button>
                <Link to={Routes.Home}>
                  <button data-size="small">Quit</button>
                </Link>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      <Row>
        <Col>
          <img src={AssetProvider.Images.Logo} alt="Logo" width="100%" />
        </Col>
        <Col className="ml-4">
          <Row className={Styles.playerData}>
            <img src={AssetProvider.Images.XIcon} alt="p1-icon" />
            <span>Player 1</span>
            <span
              data-active={currentPlayer === 'p1' ? 'true' : 'false'}
              className={Styles.playerName}>
              {p1Name}
            </span>
          </Row>
          <Row className={Styles.playerData}>
            <img src={AssetProvider.Images.OIcon} alt="p2-icon" />
            <span>Player 1</span>
            <span
              data-active={currentPlayer === 'p2' ? 'true' : 'false'}
              className={Styles.playerName}>
              {p2Name}
            </span>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8}>
          <div className={Styles.gameBoard}>{renderGameBoard()}</div>
        </Col>
      </Row>
    </Container>
  );
};

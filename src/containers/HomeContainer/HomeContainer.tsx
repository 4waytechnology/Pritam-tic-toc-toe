import { Link, RouteComponentProps } from '@reach/router';
import React, { useState } from 'react';
import { Col, Container, Modal, Row } from 'react-bootstrap';
import { Routes } from '../../App';
import { AssetProvider } from '../../utils';
import Styles from './HomeContainer.module.sass';

export const HomeContainer: React.FC<RouteComponentProps> = (props) => {
  // Props

  const { navigate } = props;

  // State Hooks

  const [showNewGameOptions = false, setShowingNewGameOptions] = useState();
  const [p1Name, setP1Name] = useState<string>();
  const [p2Name, setP2Name] = useState<string>();

  // Validation

  const validateNames = () => {
    if (
      !p1Name ||
      !p2Name ||
      p1Name.trim().length === 0 ||
      p2Name.trim().length === 0
    ) {
      alert('Please enter both names');
      return;
    }
    navigate && navigate(Routes.NewGame, { state: { p1Name, p2Name } });
  };

  // Render methods

  return (
    <Container className="px-5 my-auto" fluid>
      <Modal
        dialogClassName={Styles.modalContainer}
        centered
        onHide={() => setShowingNewGameOptions(false)}
        show={showNewGameOptions}>
        <Modal.Body>
          <Container>
            <Row>
              <Col
                className={[
                  'd-flex justify-content-center mb-4',
                  Styles.title,
                ].join(' ')}
                xs={12}>
                Start a New Game
              </Col>
              <Col
                className="d-flex align-items-center justify-content-center mb-1"
                xs={12}>
                <div className={Styles.playerData}>
                  <img src={AssetProvider.Images.XIcon} alt="p1-icon" />
                  <span>Player 1</span>
                  <input
                    placeholder="Player 1"
                    onChange={(e) => setP1Name(e.target.value.trim())}
                    className={Styles.playerName}></input>
                </div>
              </Col>
              <Col
                className="d-flex align-items-center justify-content-center mb-5"
                xs={12}>
                <div className={Styles.playerData}>
                  <img src={AssetProvider.Images.OIcon} alt="p2-icon" />
                  <span>Player 1</span>
                  <input
                    placeholder="Player 2"
                    onChange={(e) => setP2Name(e.target.value.trim())}
                    className={Styles.playerName}></input>
                </div>
              </Col>
              <Col className="d-flex justify-content-center mb-4" xs={12}>
                <button onClick={validateNames} data-size="small">
                  Start!
                </button>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
      <Row>
        <Col className="mx-auto" md={12} lg={8}>
          <img width="100%" src={AssetProvider.Images.Logo} alt="Logo" />
        </Col>
      </Row>
      <Row>
        <Col
          className={['d-flex mt-5 mx-5', Styles.buttonsContainer].join(' ')}>
          <button onClick={() => setShowingNewGameOptions(true)}>
            New Game
          </button>
          <Link to={Routes.Credits}>
            <button>Credit</button>
          </Link>
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer">
            <button>
              Exit{' '}
              <img width="12px" src={AssetProvider.Images.LogoutIcon} alt="" />
            </button>
          </a>
        </Col>
      </Row>
    </Container>
  );
};

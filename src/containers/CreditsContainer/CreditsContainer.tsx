import { Link, RouteComponentProps } from '@reach/router';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Routes } from '../../App';
import { AssetProvider } from '../../utils';
import Styles from './CreditsContainer.module.sass';

export const CreditsContainer: React.FC<RouteComponentProps> = () => {
  // State Hooks

  const [credits, setCredits] = useState<string[]>();

  // Life cycle methods

  useEffect(() => {
    fetch('http://api.tvmaze.com/people/1/castcredits')
      .then((res) => res.json())
      .then((json) => {
        return Promise.all(
          json.map((val: any) =>
            fetch(val._links.character.href).then((res) => res.json())
          )
        );
      })
      .then((data) => {
        setCredits(data.map((val: any) => val.name));
      });
  }, []);

  // Render methods

  return (
    <Container className="px-5 my-auto" fluid>
      <Row>
        <Col className="mx-auto" md={12} lg={8}>
          <img width="100%" src={AssetProvider.Images.Logo} alt="Logo" />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3 className={Styles.heading}>Credit</h3>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <div className={Styles.credits}>
            {!credits
              ? 'Loading Credits...'
              : credits.map((credit) => {
                  return <div key={credit}>{credit}</div>;
                })}
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center mt-4">
          <Link to={Routes.Home}>
            <button className={Styles.backButton}>Back</button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

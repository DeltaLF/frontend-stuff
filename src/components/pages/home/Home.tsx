import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import './home.scss';

const Home = () => {
  const navigate = useNavigate();
  function handleStartButton(): void {
    navigate('/rtk');
  }

  return (
    <Container className="Home">
      <h1>About this website</h1>
      <h4>consists of various frontend techniques for practicing purposes</h4>
      <Button onClick={handleStartButton}>get started</Button>
    </Container>
  );
};

export default Home;

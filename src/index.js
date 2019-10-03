import React from 'react';
import { render } from 'react-dom';

const Home = () => <h1>Hello from out frontend!</h1>

const root = document.querySelector('#root');
render(<Home />, root);

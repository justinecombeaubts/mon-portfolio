// Page mentions légales : styles du portfolio + année à jour.
import './styles/main.css';
import { renderDigitalBackground } from './components/digitalBackground.js';

document.body.insertAdjacentHTML('afterbegin', renderDigitalBackground());
document.getElementById('year').textContent = new Date().getFullYear();

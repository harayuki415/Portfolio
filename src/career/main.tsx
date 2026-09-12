import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Career from './Career';
import './career.css';

createRoot(document.getElementById('career-root')!).render(<StrictMode><Career /></StrictMode>);

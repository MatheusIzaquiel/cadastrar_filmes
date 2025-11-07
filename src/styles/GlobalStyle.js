import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }

  body {
    background: radial-gradient(circle at 20% 20%, #1a1a1d, #0d0d0f 70%);
    color: #f5f5f5;
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* HEADER */
  .header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(18, 18, 18, 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .header-container {
    max-width: 1200px;
    margin: 0 auto;
    height: 70px;
    padding: 0 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* LOGO */
  .logo {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 700;
    font-size: 1.3rem;
    background: linear-gradient(90deg, #00d4ff, #007bff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: opacity 0.3s ease;
  }

  .logo:hover {
    opacity: 0.8;
  }

  /* NAV */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 500;
    font-size: 0.95rem;
    padding: 8px 12px;
    border-radius: 8px;
    transition: background 0.3s ease, transform 0.2s ease;
  }

  .nav-item:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }

  .highlight {
    background: linear-gradient(90deg, #ff004c, #ff2d74);
    font-weight: 600;
  }

  .highlight:hover {
    background: linear-gradient(90deg, #ff2d74, #ff004c);
    transform: scale(1.05);
  }

  /* MAIN */
  .content {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1.5rem;
  }
`;

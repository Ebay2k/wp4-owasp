import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(true); // Always show for testing

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert('Om de app te installeren:\n\nChrome/Edge: Klik op het installatie icoon (⊕) in de adresbalk rechts\nFirefox: Menu → Installeren\nSafari: Deel → Zet op beginscherm');
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  return (
    <nav className="navbar">
      <h1>Dashboard</h1>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/SavedProjects">Opgeslagen</Link></li>
        {showInstallButton && (
          <li>
            <a onClick={handleInstallClick}>Download App</a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

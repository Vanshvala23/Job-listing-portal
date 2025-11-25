import "./LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="loading-wrapper">
      <div className="loader-circle"></div>
      <h2 className="loading-text">JobVerse is loading…</h2>
    </div>
  );
}

export default function OfflinePage() {
  return (
    <div className="app-shell">
      <div className="confirm-wrap">
        <div className="confirm-icon">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2">
            <path d="M1 9a15 15 0 0122 0M5 13a10 10 0 0114 0M8.5 17a5 5 0 017 0" />
            <line x1="2" y1="2" x2="22" y2="22" />
          </svg>
        </div>
        <div className="confirm-title">İnternet bağlantısı yok</div>
        <div className="confirm-sub">
          Bu sayfa çevrimdışıyken açılamıyor. Bağlantın geri geldiğinde NailMaps kaldığın
          yerden devam edecek.
        </div>
      </div>
    </div>
  );
}

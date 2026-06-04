import '../styles/components/Footer.css'

const TEAM = [
  'D. Lanza', 'W. Vargas', 'R. Izaguirre',
  'K. Urbina', 'M.E. Calix',
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          Shop<span className="footer-logo-gray">Easy</span>
        </div>
        <div className="footer-right">
          <div>Prototipo académico · Sala 14 · Planteamiento #8</div>
          <div className="footer-team">
            {TEAM.map(m => <span key={m} className="footer-member">{m}</span>)}
          </div>
        </div>
      </div>
    </footer>
  )
}

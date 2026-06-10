import '../styles/components/PiePagina.css'

const EQUIPO = [
  'D. Lanza', 'W. Vargas', 'R. Izaguirre',
  'K. Urbina', 'M.E. Calix',
]

export default function PiePagina() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-logo">
          Shop<span className="footer-logo-gray">Easy</span>
        </div>
        <div className="footer-right">
          <div className="footer-team">
            {EQUIPO.map(m => <span key={m} className="footer-member">{m}</span>)}
          </div>
        </div>
      </div>
    </footer>
  )
}

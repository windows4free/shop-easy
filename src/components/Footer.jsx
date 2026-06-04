const styles = {
  footer: {
    borderTop: '1px solid #e5e5e5',
    padding: '2rem',
    marginTop: '4rem',
  },
  inner: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  left: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '1.1rem',
    color: '#0f0f0f',
  },
  gray: { color: '#a3a3a3' },
  right: {
    fontSize: '12px',
    color: '#a3a3a3',
    lineHeight: '1.8',
    textAlign: 'right',
  },
  team: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '4px',
    justifyContent: 'flex-end',
  },
  member: { fontSize: '11px', color: '#a3a3a3' },
}

const TEAM = [
  'D. Lanza', 'W. Vargas', 'R. Izaguirre',
  'K. Urbina', 'M.E. Calix', 
]

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.inner}>
        <div style={styles.left}>
          Shop<span style={styles.gray}>Easy</span>
        </div>
        <div style={styles.right}>
          <div>Prototipo académico · Sala 14 · Planteamiento #8</div>
          <div style={styles.team}>
            {TEAM.map(m => <span key={m} style={styles.member}>{m}</span>)}
          </div>
        </div>
      </div>
    </footer>
  )
}

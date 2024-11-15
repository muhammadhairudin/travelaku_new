import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'
import PropTypes from 'prop-types'

// Konfigurasi tema Mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'neutral',
  securityLevel: 'loose',
  themeVariables: {
    primaryColor: '#4F46E5',
    primaryTextColor: '#fff',
    primaryBorderColor: '#4338CA',
    lineColor: '#94A3B8',
    secondaryColor: '#64748B',
    tertiaryColor: '#F1F5F9',
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis',
    rankSpacing: 80,
    nodeSpacing: 50,
    padding: 15,
    useMaxWidth: false, // Penting untuk centering
  }
})

export default function Mermaid({ chart }) {
  const elementRef = useRef(null)

  useEffect(() => {
    if (elementRef.current) {
      // Reset konten sebelum render ulang
      elementRef.current.removeAttribute('data-processed')
      mermaid.contentLoaded()
    }
  }, [chart])

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-full overflow-x-auto">
        <div 
          className="mermaid flex justify-center" 
          ref={elementRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            minWidth: '100%'
          }}
        >
          {chart}
        </div>
      </div>
    </div>
  )
}

Mermaid.propTypes = {
  chart: PropTypes.string.isRequired,
} 
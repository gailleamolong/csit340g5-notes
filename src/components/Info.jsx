import { useContext, useEffect } from 'react'
import { SettingsContext } from './SettingsContext.jsx'

function Info({ name }) {
  const { largeText, setLargeText } = useContext(SettingsContext)

  useEffect(() => {
    localStorage.getItem('largeText') === 'true' ? setLargeText(true) : setLargeText(false)
  }, [])

  return (
    <footer className="fixed bottom-7 left-8 z-10 text-[13px] text-[#949494]">
      <button type="button"
        onClick={() => {
          setLargeText((prev) => !prev)
          localStorage.setItem('largeText', JSON.stringify(!largeText))
        }}
        className="mb-1 cursor-pointer underline hover:text-[#b83f45]"
      >
        {largeText ? 'Normal Text' : 'Large Text'}
      </button>
      <p>Created by {name}</p>
    </footer>
  )
}
 
export default Info
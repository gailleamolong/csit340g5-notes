import { useState } from 'react' 
import { SettingsContext } from './components/SettingsContext.jsx'
import Notes from './components/Notes.jsx'
import Info from './components/Info.jsx'
 
function App() {
  const [largeText, setLargeText] = useState(false)

  return (
    <SettingsContext.Provider value={{largeText, setLargeText}}>
      <div className="bg-[#f5f5f5] font-light text-[#111]">
        <Notes />
        <Info name="Gaille Amolong" />
      </div>
    </SettingsContext.Provider>
  )
}
 
export default App
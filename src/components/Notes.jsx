import NoteCard from './NoteCard.jsx'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

const startingNotes = [
  {
    id: 1,
    title: 'Review map and filter',
    body: 'Redo the TodoMVC steps without looking at the guide.',
  },
  {
    id: 2,
    title: 'Prepare for the quiz',
    body: 'Practice writing one handler for many inputs.',
  },
]
 
function Notes() {
  const [notes, setNotes] = useState(() => {
      const savedNotes = localStorage.getItem('notes')
      return savedNotes ? JSON.parse(savedNotes) : startingNotes
  });
  const [newNote, setNewNote] = useState({ title: '', body: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const titleRef = useRef(null)

  useEffect(() => {
      const id = setTimeout(() => {
        localStorage.setItem('draft', JSON.stringify(newNote))
        console.log('draft saved: ', newNote)
      }, 1000)

      return () => clearTimeout(id)
  }, [newNote])

  useEffect(() => {
     localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes]) 


  const filteredNotes = useMemo(() => {
    return notes.filter((note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [notes, searchTerm])


  function handleChange(event) {
    const { name, value } = event.target
    setNewNote((previousNote) => ({
      ...previousNote,
      [name]: value,
    }))
  }

  function addNote(event) {
    event.preventDefault()
    if (newNote.title.trim() === '' || newNote.body.trim() === '') {
      return
    }
    const noteToAdd = {
      id: crypto.randomUUID(),
      title: newNote.title.trim(),
      body: newNote.body.trim()
    }
    setNotes((previousNotes) => [...previousNotes, noteToAdd])
    setNewNote({ title: '', body: '' })
    titleRef.current?.focus()
  }

  const handleDelete = useCallback((id) => {
    setNotes((previousNotes) => previousNotes.filter((note) => note.id !== id))
  }, [])
  
  function handleSearch(event) {
    setSearchTerm(event.target.value)
  }
  return (
    <div className="grid min-h-screen grid-cols-[420px_1fr]">
      <aside className="sticky top-0 flex h-screen flex-col gap-5 bg-white px-8 py-9 shadow-[0_2px_4px_0_rgba(0,0,0,0.2),0_25px_50px_0_rgba(0,0,0,0.1)]">
        <h1 className="text-[72px] leading-none font-extralight text-[#b83f45]">
          notes
        </h1>

        <div>
          <p className="mb-2 text-[13px] font-normal tracking-wide text-[#949494]">SEARCH</p>
          <input
            placeholder="Search by title"
            onChange={handleSearch}
            className="h-[52px] w-full border border-[#e6e6e6] px-4 text-lg outline-none placeholder:text-black/40 placeholder:italic focus:border-[#cf7d7d]"
          />
        </div>

        <form className="grid gap-3" onSubmit={addNote}>
          <p className="text-[13px] font-normal tracking-wide text-[#949494]">NEW NOTE</p>
          <input
            name="title"
            ref={titleRef}
            value={newNote.title}
            onChange={handleChange}
            placeholder="Title"
            className="h-[52px] w-full border border-[#e6e6e6] px-4 text-lg outline-none placeholder:text-black/40 placeholder:italic focus:border-[#cf7d7d]"
          />
          <textarea
            name="body"
            value={newNote.body}
            onChange={handleChange}
            placeholder="Write your note"
            className="h-[120px] w-full resize-none py-3 border border-[#e6e6e6] px-4 text-lg outline-none placeholder:text-black/40 placeholder:italic focus:border-[#cf7d7d]"
          />
          <button
            type="submit"
            className="h-[50px] cursor-pointer bg-[#b83f45] text-[17px] font-normal text-white hover:bg-[#a33439]"
          >
            Add note
          </button>
        </form>
      </aside>

      <section className="px-12 py-11">
        <h2 className="mb-6 text-3xl">All notes</h2>

        {filteredNotes.length > 0 ? (
            <ul className="grid grid-cols-3 items-start gap-5">
            {filteredNotes.map((note) => (
                <li key={note.id} className="relative min-h-32 bg-white px-6 py-5 shadow-[0_2px_4px_0_rgba(0,0,0,0.2),0_25px_50px_0_rgba(0,0,0,0.1)]">
                <NoteCard
                    id={note.id}
                    title={note.title}
                    body={note.body}
                    onDelete={handleDelete}
                />
            </li>
            ))}
            </ul>
        ) : (
            <p className="text-lg text-[#949494]">No notes found</p>
        )}

      </section>
    </div>
  )
}
 
export default Notes
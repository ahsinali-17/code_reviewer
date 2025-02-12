import { useState, useEffect } from 'react'
import 'prismjs/themes/prism-tomorrow.css'
import Editor from 'react-simple-code-editor'
import axios from 'axios'
import MDEditor from "@uiw/react-md-editor";
import Prism from 'prismjs'
import './App.css'

function App() {
  const [code, setCode] = useState('function add(a, b) {\n  return a + b\n}')
  const [review, setReview] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    Prism.highlightAll()
  }, [])

  return (
    <>
      <main className='flex gap-2 h-screen w-screen p-2 bg-black'>
        <div className="left w-1/2 h-full bg-gray-900 rounded-lg relative">
          <div className="code text-white h-full">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              backgroundColor: '#1E1E1E',
              borderRadius: '0.5rem',     //10px
              height: '100%',
              overflow: 'auto',
              margin: 0
            }}
          />
          </div>
          <button className="review absolute bottom-5 right-5 bg-blue-300 px-4 py-1 rounded-lg font-semibold cursor-pointer hover:text-blue-600 hover:ring-2 ring-blue-500 text-center z-index-10 select-none"
          onClick={async ()=>{
            setLoading(true)
            const res = await axios.post('http://localhost:3000/ai/get-review', {code})
            setReview(res.data)
            setLoading(false)
          }}>{loading?<img src='./load.svg' alt='loading...'/>:'Review'}</button>
        </div>
        <MDEditor.Markdown source={loading?'generating review...':review} className={`right w-1/2 h-full bg-green-400 rounded-lg text-black p-3 overflow-auto ${loading && 'text-center'}`}/>
      </main>
    </>
  )
}

export default App

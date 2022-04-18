import {useState, useEffect} from 'react'
import api from './services/api'

import {Header} from './components/Header'

import "./app.css"
import backGroundImage from './assets/background.jpg'


export const App = () => {
  const [projects, setProjects] = useState([])

  function handleAddProject(){
    // setProjects([...projects, 'Novo projeto'])
    api.post('projects',{
      title:"Mobile com react-native",
      owner:"Anderson B. Silva"
    }).then(resp => {
      setProjects([...projects, resp.data])
    })

   
  }

  function renderProjects(el,index){
    return <li key={`${el.title}${index}`}>{el.title}</li>
  }

  useEffect(() =>{
    const init =  () => {
       api.get('/projects').then(resp => {
         console.log(resp)
         setProjects(resp.data)
       })

      // console.log(data)
      // setProjects(data)
    }
    init()
  },[])

  return (
    <>
    {/* <img src={backGroundImage} alt="" width={300}/> */}
      <Header title="ReactJs"/>

      <ul>
        {projects.map(renderProjects)}
      </ul>

      <button onClick={handleAddProject}>Adicionar projeto</button>
    </>
  )
}


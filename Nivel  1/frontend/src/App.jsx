import {useState} from 'react'
import {Header} from './components/Header'
export const App = () => {
  const [projects, setProjects] = useState(['GoBarbaer', 'GoFinances'])

  function handleAddProject(){
    setProjects([...projects, 'Novo projeto'])
    console.log(projects)
  }

  function renderProjects(el,index){
    return <li key={`${el}${index}`}>{el}</li>
  }

  return (
    <>
      <Header title="ReactJs"/>

      <ul>
        {projects.map(renderProjects)}
      </ul>

      <button onClick={handleAddProject}>Adicionar projeto</button>
    </>
  )
}


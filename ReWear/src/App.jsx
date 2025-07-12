import { useState } from 'react'
import './App.css'
import UserDashboard from './components/UserDashboard/UserDashboard.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <UserDashboard />
      </div>
    </>
  );
}

export default App

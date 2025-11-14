import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector (state => state.auth );

    useEffect(() => {
        if (!user) {
         
        }
    })


  return (
    <div className='flex justify-center'>
    <h1>Where u can absolutely controll everything in your project😈😈</h1>
    </div>
  )
}

export default Dashboard
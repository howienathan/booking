import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector (state => state.auth );

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    })


  return (
    <div className='flex justify-center'>d</div>
  )
}

export default Dashboard
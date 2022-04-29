import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../src'

export default function AuthCallback() {
  const { auth } = useAuth()
  const navigate = useNavigate()

  async function handleCallback() {
    await auth?.loginCallback()
    navigate('/')
  }

  useEffect(() => {
    handleCallback()
  }, [])

  return null
}

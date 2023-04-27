import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="container">
        <section className="heading mt-5">
          <h1>
            <FaSignInAlt /> Login
          </h1>
          <p>Login and start adding and completing tasks!</p>
        </section>
        <section className="form">
          <form className="was-validated" onSubmit={onSubmit}>
            <div className="form-group row mb-3">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Enter your email"
                  required
                  onChange={onChange}
                />
                <div className="invalid-feedback">
                  Please enter a valid email.
                </div>
              </div>
            </div>
            <div className="form-group row mb-3">
              <label htmlFor="password" className="col-sm-2 col-form-label">
                Password
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  placeholder="Enter password"
                  required
                  onChange={onChange}
                />
                <div className="invalid-feedback">
                  Please enter a password.
                </div>
              </div>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Submit
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}

export default Login

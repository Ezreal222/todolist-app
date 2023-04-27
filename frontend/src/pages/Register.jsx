import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

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

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="container">
        <section className="heading mt-5">
          <h1>
            <FaUser /> Register
          </h1>
          <p>Please create an account</p>
        </section>
        <section className="form">
          <form className="was-validated" onSubmit={onSubmit}>
            <div className="form-group row mb-3">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={name}
                  placeholder="Enter your name"
                  required
                  onChange={onChange}
                />
                <div className="invalid-feedback">
                  Please enter your name.
                </div>
              </div>
            </div>
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
        <div className="form-group row mb-3">
          <label htmlFor="password2" className="col-sm-2 col-form-label">
            Confirm Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              required
              onChange={onChange}
            />
            <div className="invalid-feedback">
              Please confirm your password.
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
)}

export default Register
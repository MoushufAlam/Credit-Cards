import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isValidPhoneNumber } from '../utils/ValidateNumber'
import { MdOutlineReportGmailerrorred, MdKeyboardArrowLeft } from 'react-icons/md'
// import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store'
import { setUserData } from '../features/userSlice'

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleError = () => setIsValid(isValidPhoneNumber(phone))
  const [isValid, setIsValid] = useState(true)

  const { activeName } = useSelector((state: RootState) => state.user)

  const [checked1, setChecked1] = useState(false)
  const [checked2, setChecked2] = useState(false)
  const [phone, setPhone] = useState('')

  const handleSubmit = async () => {
    try {
      // await axios.post('/.netlify/functions/sendOTP', { phone })
      dispatch(setUserData({ phoneNumber: phone, activeName: activeName || '' }))
      navigate('/otp-verification')
    } catch (error) {
      console.log('Error is:', error)
    }
  }

  return (
    <div className="container d-flex align-items-center justify-content-center bg-light min-vh-100 pt-5 mt-5 min-vw-100">
      <div className="col-12 col-md-8 col-lg-5 bg-white p-0 m-0 align-items-center rounded d-flex flex-column" style={{ maxHeight: '90vh' }}>
        <div className="overflow-auto p-4 m-4 w-100" style={{ maxHeight: 'calc(90vh - 100px)', maxWidth: '400px' }}>
          <div className="text-center">
            <img
              src={activeName}
              alt=""
              className="img-fluid rounded shadow"
              style={{ maxWidth: '200px', height: 'auto' }}
            />
            <h1 className="h2 mt-3 fw-semibold fs-3 p-2">Please provide your mobile number</h1>
          </div>

          <div className={`form-floating ${!isValid ? 'mb-0' : 'mb-3'} w-100`}>
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Enter mobile number"
              pattern="[0-9]{10}"
              maxLength={10}
              value={phone}
              inputMode="numeric"
              onChange={(e) => {
                const numbersOnly = e.target.value.replace(/\D/g, '')
                setPhone(numbersOnly)
                setIsValid(true)
              }}
              style={{ boxShadow: 'none', outline: 'none' }}
              onBlur={handleError}
              required
            />
            <label htmlFor="floatingInput">Enter 10 digit Mobile Number</label>
          </div>

          {!isValid && (
            <div className="card bg-light p-1 border-0 rounded w-100 mb-3">
              <div className="d-flex align-items-center">
                <MdOutlineReportGmailerrorred className="me-2" color="red" />
                <small style={{ fontSize: '0.8rem', color: '#555' }}>
                  Please enter a valid phone number
                </small>
              </div>
            </div>
          )}

          <div className="form-check align-self-start text-start mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="checkDefault1"
              checked={checked1}
              onChange={(e) => setChecked1(e.target.checked)}
            />
            <label className="form-check-label small text-muted" htmlFor="checkDefault1">
              I hereby consent and authorize the bank to make inquiries with relevant credit reporting agencies and employment verification services.
            </label>
          </div>

          <div className="form-check align-self-start text-start">
            <input
              className="form-check-input"
              type="checkbox"
              id="checkDefault2"
              checked={checked2}
              onChange={(e) => setChecked2(e.target.checked)}
            />
            <label className="form-check-label small text-muted" htmlFor="checkDefault2">
              I authorize the bank to send communications and notifications to me via a messaging service (optional).
            </label>
          </div>
        </div>

        <div className="position-sticky bottom-0 bg-white pt-3 pb-5 px-4 border-top w-100" style={{ zIndex: 10 }}>
          <div className="position-relative w-100">
            <button className="btn text-muted position-relative z-1" onClick={() => navigate('/')}>
              <MdKeyboardArrowLeft /> Back
            </button>

            <div className="position-absolute start-50 top-0 translate-middle-x z-1">
              <button
                className="btn btn-danger"
                disabled={!(isValid && checked1 && checked2 && phone.length === 10)}
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup

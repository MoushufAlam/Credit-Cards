import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isValidOtp } from '../utils/ValidateOtp'
import { MdKeyboardArrowLeft, MdOutlineReportGmailerrorred } from 'react-icons/md'
import { CgDanger } from 'react-icons/cg'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import type { RootState } from '../store'
import axios from 'axios'

function OtpVerifiction() {
  const navigate = useNavigate()
  const phoneNumber = useSelector((state: RootState) => state.user.phoneNumber)
  const activeName = useSelector((state: RootState) => state.user.activeName)
  const hiddenPhoneNumber = phoneNumber?.replace(/^(\d{2})\d{4}(\d{4})$/, '$1****$2')

  const [otp, setOtp] = useState<string>('')
  const [isValid, setIsValid] = useState<boolean>(true)
  const [timer, setTimer] = useState<number>(30)
  const [failedAttempts, setFailedAttempts] = useState<number>(0)
  const [attemptError, setAttemptError] = useState<boolean>(true)
  const [showOtp, setShowOtp] = useState<boolean>(false)

  // const handleOtpVerify = async () => {
  //   if (otp.length !== 6 || !isValidOtp(otp)) {
  //     setIsValid(false)
  //     return
  //   }
  //
  //   try {
  //     const response = await axios.post('', {
  //       phone: phoneNumber,
  //       otp: otp
  //     })
  //     console.log('OTP Verified:', response.data)
  //     navigate('/profile')
  //   } catch (error) {
  //     console.error('OTP validation failed:', error)
  //     setAttemptError(false)
  //     setFailedAttempts(prev => prev + 1)
  //   }
  // }
  console.log(setFailedAttempts);
  

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  useEffect(() => {
    const input = document.getElementById('otp')
    input?.focus()
  }, [])

  useEffect(() => {
    if ('OTPCredential' in window) {
      const ac = new AbortController()
      navigator.credentials
        .get({
          otp: { transport: ['sms'] },
          signal: ac.signal
        } as any)
        .then((otp: any) => {
          setOtp(otp.code)
          setIsValid(true)
          setAttemptError(true)
          ac.abort()
        })
        .catch(() => ac.abort())
    }
  }, [])

  const handleError = () => {
    setIsValid(isValidOtp(otp))
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/.netlify/functions/sendOTP', {
        phone: phoneNumber
      })
      console.log(response.data)
    } catch (error) {
      console.log('Error is:', error)
    }
  }

  return (
    <div className="container d-flex align-items-center justify-content-center bg-light min-vh-100 pt-5 mt-5 min-vw-100">
      <div
        className="col-12 col-md-8 col-lg-5 bg-white p-0 m-0 align-items-center rounded d-flex flex-column"
        style={{ maxHeight: '90vh' }}
      >
        {failedAttempts >= 3 && (
          <div
            className="position-absolute top-0 start-0 w-100 h-100 row m-0 align-items-center p-5 justify-content-center"
            style={{ zIndex: 1, pointerEvents: 'none' }}
          >
            <div className="bg-light row align-items-center rounded p-2">
              <CgDanger
                className="col-3 fs-lg"
                color="red"
                style={{ width: '50px', height: '50px' }}
              />
              <div className="col-9 text-start fw-bold">
                Uh oh!<br />
                You have exceeded the maximum number of OTP request attempts. Please try after sometime.
              </div>
            </div>
          </div>
        )}

        <form
          onSubmit={e => e.preventDefault()}
          className="overflow-auto p-4 m-4"
          style={{
            maxHeight: 'calc(90vh - 100px)',
            maxWidth: '400px',
            filter: failedAttempts >= 3 ? 'blur(4px)' : 'none',
            pointerEvents: failedAttempts >= 3 ? 'none' : 'auto',
            userSelect: failedAttempts >= 3 ? 'none' : 'auto',
            transition: 'filter 0.3s ease'
          }}
        >
          <div className="text-center mb-4">
            <img
              src={activeName}
              alt=""
              className="img-fluid rounded shadow"
              style={{ maxWidth: '200px', height: 'auto' }}
            />
            <h1 className="h2 mt-3 fw-semibold fs-3">Verify your mobile number</h1>
            <small className="text-muted">
              We have sent an SMS with a 6-digit OTP to {hiddenPhoneNumber}
            </small>
          </div>

          <div
            className={`form-floating ${
              !isValid || !attemptError ? 'mb-0' : 'mb-3'
            } w-100 position-relative`}
          >
            <input
              id="otp"
              type={showOtp ? 'text' : 'password'}
              className="form-control pe-5"
              placeholder="Enter OTP"
              autoComplete="one-time-code"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              style={{ boxShadow: 'none' }}
              onChange={e => {
                const numbersOnly = e.target.value.replace(/\D/g, '')
                setOtp(numbersOnly)
                setIsValid(true)
                setAttemptError(true)
              }}
              onBlur={handleError}
              required
            />
            <label htmlFor="otp">OTP</label>
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: 'pointer', zIndex: 10 }}
              onClick={() => setShowOtp(prev => !prev)}
            >
              {showOtp ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {(!isValid || !attemptError) && (
            <div className="card bg-light p-1 rounded w-100 mb-3 border-0">
              <div className="d-flex align-items-center">
                <MdOutlineReportGmailerrorred className="me-2" color="red" />
                <small style={{ fontSize: '0.8rem', color: '#555' }}>
                  {!isValid ? 'Please enter a valid OTP' : 'OTP is incorrect'}
                </small>
              </div>
            </div>
          )}

          {timer > 0 ? (
            <div className="d-flex justify-content-end w-100 mb-2">
              <small
                className="text-muted"
                style={{ fontSize: '0.8rem', color: '#555' }}
              >
                You can request the OTP via other medium in {timer} sec(s)
              </small>
            </div>
          ) : (
            <div className="d-flex justify-content-end w-100 mb-2">
              <small className="text-muted">Resend OTP via&nbsp;</small>
              <span
                className="text-primary"
                role="button"
                onClick={() => {
                  setTimer(30)
                  handleSubmit()
                }}
              >
                SMS
              </span>
            </div>
          )}
        </form>

        <div className="position-sticky bottom-0 bg-white pt-3 mb-4 pb-4 border-top rounded-bottom w-100">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <button
                className="btn text-muted"
                onClick={() => navigate('/')}
              >
                <MdKeyboardArrowLeft /> Back
              </button>
            </div>
            <div className="position-absolute start-50 translate-middle-x">
              {failedAttempts >= 3 ? (
                <button
                  className="btn btn-danger"
                  onClick={() => navigate('/')}
                >
                  Restart Process
                </button>
              ) : (
                <button
                  className="btn btn-danger"
                  disabled={otp.length !== 6}
                  onClick={() => navigate('/profile')}
                >
                  Verify
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OtpVerifiction

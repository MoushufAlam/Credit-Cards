import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { MdOutlineReportGmailerrorred } from 'react-icons/md'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { setUserProfile } from '../features/userSlice'
import { useNavigate } from 'react-router-dom'

interface FormData {
  pan: string
  dob: string
  email: string
  otp?: string
}

export default function Profile() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    setError,
    formState: { errors, isValid }
  } = useForm<FormData>({ mode: 'onBlur' })

  const [showPan, setShowPan] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [gender, setGender] = useState('')
  const [emailVerified, setEmailVerified] = useState(false)
  const [timer, setTimer] = useState<number>(30)

  const pan = watch('pan') || ''
  const dob = watch('dob') || ''
  const email = watch('email') || ''
  const otp = watch('otp') || ''

  const navigate = useNavigate();

  useEffect(() => {
    if (emailVerified && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [emailVerified, timer])

  useEffect(() => {
    document.getElementById('pan')?.focus()
  }, [])

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '')
    if (v.length <= 2) v = v
    else if (v.length <= 4) v = v.slice(0, 2) + '-' + v.slice(2)
    else v = v.slice(0, 2) + '-' + v.slice(2, 4) + '-' + v.slice(4, 8)
    setValue('dob', v)
    if (errors.dob) clearErrors('dob')
  }

  const handleEmailBlur = async () => {
    if (errors.email) return
    try {
      const response = await axios.post('/.netlify/functions/sendEmailOTP', { email: email })
      setEmailVerified(true)
      setTimer(30)
      console.log(response.data)
      clearErrors('email')
    } catch {
      setEmailVerified(false)
      setError('email', { type: 'manual' })
    }
  }

  const handleOtpValidation = async () => {
    try {
      const response = await axios.post('/.netlify/functions/validateEmailOTP', { email: email, otp: otp })
      console.log(response.data)
      return true
    } catch {
      setError('otp', { type: 'manual' })
      return false
    }
  }

  const onSubmit = async (data: FormData) => {
    if (emailVerified) {
      const valid = await handleOtpValidation()
      if (!valid) return
    }

    dispatch(setUserProfile({ pan: data.pan, dob: data.dob, email: data.email, gender }))
    console.log({ ...data, gender })
    navigate('/Additional-details')
  }

  const allFilled = pan && dob && email && gender && (!emailVerified || otp)

  return (
    <div className="container d-flex align-items-center justify-content-center bg-light min-vh-100 pt-5 mt-5 min-vw-100">
      <div className="col-12 col-md-8 col-lg-5 bg-white p-0 m-0 align-items-center rounded d-flex flex-column" style={{ maxHeight: '90vh' }}>

        <form className="overflow-auto p-4 m-4" style={{ maxHeight: 'calc(90vh - 100px)', maxWidth: '400px' }} onSubmit={handleSubmit(onSubmit)}>

          <div className="text-center mb-4">
            <h1 className="h2 fw-semibold fs-3 p-2">Provide your personal details</h1>
          </div>

          <div className={`form-floating ${errors.pan ? 'mb-0' : 'mb-3'} w-100 position-relative`}>
            <input
              id="pan"
              type={showPan ? 'text' : 'password'}
              className="form-control border"
              placeholder="ABCDE1234F"
              maxLength={10}
              style={{ boxShadow: 'none' }}
              {...register('pan', {
                required: true,
                pattern: /^[A-Z]{5}[0-9]{4}[A-Z]$/
              })}
              onChange={e => {
                setValue('pan', e.target.value.toUpperCase())
                if (errors.pan) clearErrors('pan')
              }}
            />
            <label htmlFor="pan">PAN</label>
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
              role="button"
              onClick={() => setShowPan(v => !v)}
            >
              {showPan ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.pan && (
            <div className="card bg-light p-1 rounded w-100 mb-3 border-0">
              <div className="d-flex align-items-center">
                <MdOutlineReportGmailerrorred className="me-2" color="red" />
                <small style={{ fontSize: '0.8rem', color: '#555' }}>Please enter a valid PAN</small>
              </div>
            </div>
          )}

          <div className={`form-floating ${errors.dob ? 'mb-0' : 'mb-3'} w-100`}>
            <input
              id="dob"
              type="text"
              className="form-control border"
              placeholder="DD-MM-YYYY"
              maxLength={10}
              style={{ boxShadow: 'none' }}
              {...register('dob', {
                required: true,
                pattern: /^\d{2}-\d{2}-\d{4}$/
              })}
              onChange={handleDobChange}
            />
            <label htmlFor="dob">Date of Birth</label>
          </div>
          {errors.dob && (
            <div className="card bg-light p-1 rounded w-100 mb-3 border-0">
              <div className="d-flex align-items-center">
                <MdOutlineReportGmailerrorred className="me-2" color="red" />
                <small style={{ fontSize: '0.8rem', color: '#555' }}>Please enter DOB</small>
              </div>
            </div>
          )}

          <div className={`form-floating ${errors.email ? 'mb-0' : 'mb-3'} w-100`}>
            <input
              id="email"
              type="email"
              className="form-control border"
              placeholder="you@example.com"
              style={{ boxShadow: 'none' }}
              {...register('email', {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              })}
              onChange={e => {
                setValue('email', e.target.value)
                if (errors.email) clearErrors('email')
                setEmailVerified(false)
              }}
              onBlur={handleEmailBlur}
            />
            <label htmlFor="email">Email</label>
          </div>
          {errors.email && (
            <div className="card bg-light p-1 rounded w-100 mb-3 border-0">
              <div className="d-flex align-items-center">
                <MdOutlineReportGmailerrorred className="me-2" color="red" />
                <small style={{ fontSize: '0.8rem', color: '#555' }}>Please enter a valid email</small>
              </div>
            </div>
          )}

          {emailVerified && (
            <>
              <div className={`form-floating ${errors.otp ? 'mb-0' : 'mb-3'} w-100 position-relative`}>
                <input
                  id="otp"
                  type={showOtp ? 'text' : 'password'}
                  inputMode="numeric"
                  className="form-control border"
                  placeholder="OTP"
                  maxLength={6}
                  value={otp}
                  style={{ boxShadow: 'none' }}
                  {...register('otp', {
                    required: true,
                    pattern: /^\d{6}$/
                  })}
                  onChange={e => {
                    const numbersOnly = e.target.value.replace(/\D/g, '')
                    setValue('otp', numbersOnly)
                    if (errors.otp) clearErrors('otp')
                  }}
                />
                <label htmlFor="otp">OTP</label>
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                  role="button"
                  onClick={() => setShowOtp(v => !v)}
                >
                  {showOtp ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.otp && (
                <div className="card bg-light p-1 rounded w-100 mb-3 border-0">
                  <div className="d-flex align-items-center">
                    <MdOutlineReportGmailerrorred className="me-2" color="red" />
                    <small style={{ fontSize: '0.8rem', color: '#555' }}>Enter valid OTP</small>
                  </div>
                </div>
              )}
              {timer > 0 ? (
                <div className="d-flex justify-content-end w-100 mb-2">
                  <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                    You can request the OTP via other medium in {timer} sec(s)
                  </small>
                </div>
              ) : (
                <div className="d-flex justify-content-end w-100 mb-2">
                  <small className="text-muted" style={{ fontSize: '0.8rem' }}>
                    Resend OTP via&nbsp;
                  </small>
                  <small className="text-primary" role="button" onClick={() => {
                    handleEmailBlur()
                    setTimer(30)
                  }}>
                    SMS
                  </small>
                </div>
              )}
            </>
          )}

          <div className="mb-3">
            <label className="form-label fs-5">Gender</label>
            <div className="d-flex justify-content-between gap-2">
              {['Male', 'Female', 'Transgender'].map(opt => (
                <button
                  key={opt}
                  type="button"
                  className={`btn ${gender === opt ? 'btn-outline-primary' : 'border text-dark bg-white'}`}
                  style={{ width: '120px', height: '54px', fontSize: '0.85rem', padding: '6px 4px' }}
                  onClick={() => setGender(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

        </form>

        <div className="position-sticky bottom-0 bg-white pt-3 mb-4 pb-4 border-top rounded-bottom w-100">
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <button
                className="btn btn-danger"
                onClick={handleSubmit(onSubmit)}
                disabled={!(allFilled && isValid)}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardArrowLeft, MdOutlineReportGmailerrorred } from 'react-icons/md'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

export default function Profile() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors, isValid }
  } = useForm({ mode: 'onBlur' })

  const [showPan, setShowPan] = useState(false)
  const [gender, setGender] = useState('')

  const pan = watch('pan') || ''
  const dob = watch('dob') || ''
  const email = watch('email') || ''

  useEffect(() => {
    document.getElementById('pan')?.focus()
  }, [])

  const handleDobChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/\D/g, '')
    if (v.length <= 2) {
      v = v
    } else if (v.length <= 4) {
      v = v.slice(0, 2) + '-' + v.slice(2)
    } else {
      v = v.slice(0, 2) + '-' + v.slice(2, 4) + '-' + v.slice(4, 8)
    }
    setValue('dob', v)
    if (errors.dob) clearErrors('dob')
  }

  const onSubmit = (data: any) => {
    if (!gender) return
    console.log({ ...data, gender })
  }

  const allFilled = pan && dob && email && gender

  return (
    <div className="container d-flex align-items-center w-100 justify-content-center bg-light min-vh-100 pt-5 mt-5" style={{ minHeight: 'calc(100vh - 3rem)' }}>
      <div className="col-12 col-md-8 col-lg-6 bg-white p-5 rounded d-flex flex-column position-relative" style={{ maxHeight: '90vh' }}>
        <form className="overflow-auto p-2" style={{ maxHeight: 'calc(90vh - 80px)' }} onSubmit={handleSubmit(onSubmit)}>

          <div className="text-center mb-4">
            <h1 className="h2 fw-bolder">Please enter your personal details</h1>
          </div>

          <div className="form-floating mb-3 w-100 position-relative">
            <input
              id="pan"
              type={showPan ? 'text' : 'password'}
              className="form-control"
              placeholder="ABCDE1234F"
              maxLength={10}
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
            <div className="card bg-light p-1 border rounded w-100 mb-3">
              <div className="d-flex align-items-center">
                <MdOutlineReportGmailerrorred className="me-2" color="red" />
                <span>Please enter a valid PAN</span>
              </div>
            </div>
          )}

          <div className="form-floating mb-3 w-100">
            <input
              id="dob"
              type="text"
              className="form-control"
              placeholder="DD-MM-YYYY"
              maxLength={10}
              {...register('dob', {
                required: true,
                pattern: /^\d{2}-\d{2}-\d{4}$/
              })}
              onChange={handleDobChange}
            />
            <label htmlFor="dob">Date of Birth</label>
          </div>
          {errors.dob && (
            <div className="card bg-light p-1 border rounded w-100 mb-3">
              <div className="d-flex align-items-center">
                <MdOutlineReportGmailerrorred className="me-2" color="red" />
                <span>Please enter DOB</span>
              </div>
            </div>
          )}

          <div className="form-floating mb-3 w-100">
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="you@example.com"
              {...register('email', {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
              })}
              onChange={e => {
                setValue('email', e.target.value)
                if (errors.email) clearErrors('email')
              }}
            />
            <label htmlFor="email">Email</label>
          </div>
          {errors.email && (
            <div className="card bg-light p-1 border rounded w-100 mb-3">
              <div className="d-flex align-items-center">
                <MdOutlineReportGmailerrorred className="me-2" color="red" />
                <span>Please enter a valid email</span>
              </div>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label fw-semibold">Gender</label>
            <div className="d-flex gap-3">
              {['Male', 'Female', 'Transgender'].map(opt => (
                <button
                  key={opt}
                  type="button"
                  className={`btn ${gender === opt ? 'btn-outline-primary' : 'btn-outline-secondary'}`}
                  onClick={() => setGender(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </form>

        <div className="position-sticky bottom-0 bg-white pt-3 border-top rounded-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn text-muted" onClick={() => navigate('/')}>
              <MdKeyboardArrowLeft /> Back
            </button>
            <div className="position-absolute start-50 translate-middle-x">
              <button
                className="btn btn-danger"
                onClick={handleSubmit(onSubmit)}
                disabled={!(allFilled && isValid)}
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

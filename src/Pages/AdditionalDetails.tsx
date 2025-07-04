import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { MdOutlineReportGmailerrorred } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setAdditionalDetails } from '../features/userSlice'

interface FormData {
  personalName: string
  motherName: string
  fatherName: string
}

export default function AdditionalDetails() {
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

  const [maritalStatus, setMaritalStatus] = useState('')

  const personalName = watch('personalName') || ''
  const motherName = watch('motherName') || ''
  const fatherName = watch('fatherName') || ''

  const allFilled =
    personalName.length > 0 &&
    motherName.length > 0 &&
    fatherName.length > 0

  useEffect(() => {
    document.getElementById('personalName')?.focus()
  }, [])

  const handleNameBlur = async () => {
    if (errors.personalName) return
    try {
      const { data } = await axios.post(
        '/.netlify/functions/nameMatch',
        { bcifValue: personalName }
      )
      const scoreStr =
      data?.response?.data?.response?.losCheck?.score
      const score = scoreStr ? parseInt(scoreStr, 10) : 0
      console.log(score);
      if (score < 65) {
        setError('personalName', {
          type: 'manual',
          message: 'Name is Invalid'
        })
      } else {
        clearErrors('personalName')
      }
    } catch {
      setError('personalName', {
        type: 'manual',
        message: 'Error validating name'
      })
    }
  }

  const onSubmit = (data: FormData) => {
    dispatch(setAdditionalDetails({ ...data, maritalStatus }))
    console.log({ ...data, maritalStatus })
  }

  return (
    <div className="container d-flex align-items-center justify-content-center bg-light min-vh-100 pt-5 mt-5 min-vw-100">
      <div
        className="col-12 col-md-8 col-lg-5 bg-white p-0 m-0 align-items-center rounded d-flex flex-column"
        style={{ maxHeight: '90vh' }}
      >
        <form
          className="overflow-auto p-4 m-4"
          style={{
            maxHeight: 'calc(90vh - 100px)',
            maxWidth: '400px'
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-center mb-4">
            <h1 className="fs-5">Name that you want printed on the card</h1>
          </div>

          <div
            className={`form-floating ${
              errors.personalName ? 'mb-0' : 'mb-1'
            } w-100`}
          >
            <input
              id="personalName"
              type="text"
              className="form-control border"
              placeholder="Name on card"
              style={{ boxShadow: 'none' }}
              {...register('personalName', { required: true })}
              onChange={(e) => {
                setValue('personalName', e.target.value)
                if (errors.personalName) clearErrors('personalName')
              }}
              onBlur={handleNameBlur}
            />
            <label htmlFor="personalName">Name on the card</label>
          </div>

          <div className="card bg-light p-3 rounded w-100 mb-2 border-0">
            <div className="d-flex align-items-center">
              <small
                className="fw-medium"
                style={{ fontSize: '0.8rem', color: '#555' }}
              >
                Preferred name must be the same name as on your application
              </small>
            </div>
          </div>

          {errors.personalName && (
            <div className="card bg-light p-1 rounded w-100 mb-3 border-0">
              <div className="d-flex align-items-center">
                <MdOutlineReportGmailerrorred
                  className="me-2"
                  color="red"
                />
                <small style={{ fontSize: '0.8rem', color: '#555' }}>
                  {errors.personalName.message ||
                    'Name on the card is required'}
                </small>
              </div>
            </div>
          )}

          <hr className="my-4" />

          <div
            className={`form-floating ${
              errors.motherName ? 'mb-0' : 'mb-3'
            } w-100`}
          >
            <input
              id="motherName"
              type="text"
              className="form-control border"
              placeholder="Mother's Name"
              style={{ boxShadow: 'none' }}
              {...register('motherName', { required: true })}
              onChange={(e) => {
                setValue('motherName', e.target.value)
                if (errors.motherName) clearErrors('motherName')
              }}
            />
            <label htmlFor="motherName">Mother's Name</label>
          </div>

          {errors.motherName && (
            <div className="card bg-light p-1 rounded w-100 mb-3 border-0">
              <div className="d-flex align-items-center">
                <MdOutlineReportGmailerrorred
                  className="me-2"
                  color="red"
                />
                <small style={{ fontSize: '0.8rem', color: '#555' }}>
                  Mother's Name is required
                </small>
              </div>
            </div>
          )}

          <div
            className={`form-floating ${
              errors.fatherName ? 'mb-0' : 'mb-3'
            } w-100`}
          >
            <input
              id="fatherName"
              type="text"
              className="form-control border"
              placeholder="Father's Name"
              style={{ boxShadow: 'none' }}
              {...register('fatherName', { required: true })}
              onChange={(e) => {
                setValue('fatherName', e.target.value)
                if (errors.fatherName) clearErrors('fatherName')
              }}
            />
            <label htmlFor="fatherName">Father's Name</label>
          </div>

          {errors.fatherName && (
            <div className="card bg-light p-1 rounded w-100 mb-3 border-0">
              <div className="d-flex align-items-center">
                <MdOutlineReportGmailerrorred
                  className="me-2"
                  color="red"
                />
                <small style={{ fontSize: '0.8rem', color: '#555' }}>
                  Father's Name is required
                </small>
              </div>
            </div>
          )}

          {allFilled && (
            <div className="mb-3">
              <label className="form-label fs-5">Marital Status</label>
              <div className="d-flex justify-content-between gap-2">
                {['Single', 'Married', 'Divorced'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className={`btn ${
                      maritalStatus === opt
                        ? 'btn-outline-primary'
                        : 'border text-dark bg-white'
                    }`}
                    style={{
                      width: '120px',
                      height: '54px',
                      fontSize: '0.85rem',
                      padding: '6px 4px'
                    }}
                    onClick={() => setMaritalStatus(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </form>

        <div className="position-sticky bottom-0 bg-white pt-3 mb-4 pb-4 border-top rounded-bottom w-100">
          <button
            className="btn btn-danger w-100"
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  )
}

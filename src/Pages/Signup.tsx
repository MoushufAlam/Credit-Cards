import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isValidPhoneNumber } from '../utils/ValidateNumber'
import { MdOutlineReportGmailerrorred, MdKeyboardArrowLeft } from "react-icons/md";
import axios from 'axios';

function Signup() {
    const navigate = useNavigate();
    const handleError = () => {
        setIsValid(isValidPhoneNumber(phone))
    }
    const [isValid, setIsValid] = useState<boolean>(true)
    const { state } = useLocation()
    const { activeName } = (state as { activeName?: string }) || {}

    const [checked1, setChecked1] = useState<boolean>(false)
    const [checked2, setChecked2] = useState<boolean>(false)
    const [phone, setPhone] = useState<string>('')

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                'https://otp-api-final-v2-2led60.5sc6y6-1.usa-e2.cloudhub.io/api/generateOTP',
                {
                    mobNo: phone,
                },
            )
            navigate('/otp-verification', {
                state: {
                    phoneNumber: phone,
                    activeName: activeName
                }
            })
            console.log(response.data)
        } catch (error) {
            console.log("Error is:", error);
        }
    }

    return (
        <div className="container d-flex align-items-center w-100 justify-content-center bg-light min-vh-100 pt-5 mt-5" style={{ minHeight: 'calc(100vh - 3rem)' }}>
            <div className="col-12 col-md-8 col-lg-6 bg-white p-5 rounded d-flex flex-column position-relative" style={{ maxHeight: '90vh' }}>
                <div className="overflow-auto p-2" style={{ maxHeight: 'calc(90vh - 80px)' }}>
                    <div className="text-center">
                        <img
                            src={activeName}
                            alt=""
                            className="img-fluid rounded shadow"
                            style={{ maxWidth: '200px', height: 'auto' }}
                        />
                        <h1 className="h2 mt-3 fw-bolder">Please provide your mobile number</h1>
                    </div>

                    <div className="form-floating mb-3 w-100 mt-3">
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
                            onBlur={handleError}
                            required
                        />
                        <label htmlFor="floatingInput">Enter 10 digit Mobile Number</label>
                    </div>
                    {!isValid && (
                        <div className="card bg-light p-1 border rounded w-100 mb-3">
                            <div className="d-flex align-items-center">
                                <MdOutlineReportGmailerrorred className="me-2" color='red' />
                                <span>Please enter a valid phone number</span>
                            </div>
                        </div>
                    )}
                    <div className={`form-check align-self-start text-start mb-2 ${checked1 ? '' : 'text-muted'}`}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="checkDefault1"
                            checked={checked1}
                            onChange={(e) => setChecked1(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="checkDefault1">
                            I hereby consent and authorize the bank to make inquiries with relevant credit reporting agencies and employment verification services.                        </label>
                    </div>
                    <div className={`form-check align-self-start text-start ${checked2 ? '' : 'text-muted'}`}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="checkDefault2"
                            checked={checked2}
                            onChange={(e) => setChecked2(e.target.checked)}
                        />
                        <label className="form-check-label" htmlFor="checkDefault2">
                            I authorize the bank to send communications and notifications to me via a messaging service (optional).                        </label>
                    </div>
                </div>
                <div className='position-sticky bottom-0 bg-white pt-3 border-top rounded-bottom'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <button className='btn' onClick={() => navigate('/')}>
                                <MdKeyboardArrowLeft />
                                Back</button>
                        </div>
                        <div className='position-absolute start-50 translate-middle-x'>
                            <button className='btn btn-danger' disabled={!(isValid && checked1 && checked2)} onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Signup
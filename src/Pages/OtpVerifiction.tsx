import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { isValidOtp } from '../utils/ValidateOtp';
import { MdKeyboardArrowLeft, MdOutlineReportGmailerrorred } from 'react-icons/md';
import axios from 'axios';
import { CgDanger } from 'react-icons/cg';

function OtpVerifiction() {
    const navigate = useNavigate()
    const { state } = useLocation();
    const { phoneNumber, activeName } = (state as { phoneNumber: string; activeName: string }) || {}
    const hiddenPhoneNumber = phoneNumber?.replace(/^(\d{2})\d{4}(\d{4})$/, '$1****$2')

    const [otp, setOtp] = useState<string>('')
    const [isValid, setIsValid] = useState<boolean>(true);
    const [timer, setTimer] = useState<number>(30)
    const [failedAttempts, setFailedAttempts] = useState<number>(0);
    const [attemptError, setAttemptError] = useState<boolean>(true);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1)
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [timer])

    useEffect(() => {
        const input = document.getElementById('floatingInput');
        input?.focus();
    }, []);

    useEffect(() => {
        if ('OTPCredential' in window) {
            const ac = new AbortController();
            navigator.credentials
                .get({
                    otp: { transport: ['sms'] },
                    signal: ac.signal
                } as any)
                .then((otp: any) => {
                    setOtp(otp.code);
                    setIsValid(true);
                    setAttemptError(true);
                    ac.abort();
                })
                .catch((err: any) => {
                    ac.abort();
                    console.log('WebOTP Error:', err);
                });
        }
    }, []);

    const handleError = () => {
        setIsValid(isValidOtp(otp))
    }

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/.netlify/functions/sendOTP', {
                phone: phoneNumber
            });
            console.log(response.data);
        } catch (error) {
            console.log("Error is:", error);
        }
    }

    const handleVerify = async () => {
        try {
            const response = await axios.post(
                'https://otp-api-proxy-5h0hm3.5sc6y6-4.usa-e2.cloudhub.io/otp/validate',
                {
                    mobileNumber: phoneNumber,
                    otp: otp,
                }
            )
            console.log(response.data)
        } catch (error) {
            setAttemptError(false);
            setFailedAttempts(prev => prev + 1)
            console.log("Error is:", error);
        }
    }

    return (
        <div className="container d-flex align-items-center w-100 justify-content-center bg-light min-vh-100 pt-5 mt-5" style={{ minHeight: 'calc(100vh - 3rem)' }}>
            <div className="col-12 col-md-8 col-lg-6 bg-white p-5 rounded d-flex flex-column position-relative" style={{ maxHeight: '90vh' }}>
                {failedAttempts >= 3 && (
                    <div className="position-absolute top-0 start-0 w-100 h-100 row m-0 align-items-center p-5 justify-content-center" style={{ zIndex: 1, pointerEvents: 'none' }}>
                        <div className='bg-light row align-items-center rounded p-2'>
                            <CgDanger className='col-3 fs-lg' color='red' style={{ width: '50px', height: '50px' }} />
                            <div className="col-9 text-start fw-bold">
                                Uh oh!<br />
                                You have exceeded the maximum number
                                of OTP request attempts. Please try after sometime.
                            </div>
                        </div>
                    </div>
                )}

                <div className="overflow-auto p-2" style={{
                    maxHeight: 'calc(90vh - 80px)',
                    filter: failedAttempts >= 3 ? 'blur(4px)' : 'none',
                    pointerEvents: failedAttempts >= 3 ? 'none' : 'auto',
                    userSelect: failedAttempts >= 3 ? 'none' : "auto",
                    transition: 'filter 0.3s ease'
                }}>
                    <div className="text-center">
                        <img src={activeName} alt="" className="img-fluid rounded shadow" style={{ maxWidth: '200px', height: 'auto' }} />
                        <h1 className="h2 mt-3 fw-bolder">Verify your mobile number</h1>
                        <p className='text-muted'>We have sent an SMS with a 6-digit OTP to {hiddenPhoneNumber}</p>
                    </div>
                    <div className="form-floating mb-3 w-100 mt-3">
                        <input
                            type="password"
                            className="form-control"
                            id="floatingInput"
                            name="otp"
                            placeholder="Enter OTP"
                            autoComplete="one-time-code"
                            inputMode="numeric"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => {
                                const numbersOnly = e.target.value.replace(/\D/g, '')
                                setOtp(numbersOnly)
                                setIsValid(true)
                                setAttemptError(true)
                            }}
                            onBlur={handleError}
                            required
                        />
                        <label htmlFor="floatingInput">OTP</label>
                    </div>
                    {timer > 0 ? (
                        <div className="d-flex justify-content-end w-100 mb-2">
                            <span className="small text-muted">
                                You can request the OTP via other medium in {timer} sec(s)
                            </span>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-end w-100 mb-2">
                            <span className="small text-muted">Resend OTP via&nbsp;</span>
                            <span className="text-primary" role="button" onClick={() => {
                                setTimer(30)
                                handleSubmit()
                            }}>SMS</span>
                        </div>
                    )}
                    {!isValid && (
                        <div className="card bg-light p-1 border rounded w-100 mb-3">
                            <div className="d-flex align-items-center">
                                <MdOutlineReportGmailerrorred className="me-2" color='red' />
                                <span>Please enter a valid OTP</span>
                            </div>
                        </div>
                    )}
                    {!attemptError && (
                        <div className="card bg-light p-1 border rounded w-100 mb-3">
                            <div className="d-flex align-items-center">
                                <MdOutlineReportGmailerrorred className="me-2" color='red' />
                                <span>OTP is incorrect</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className='position-sticky bottom-0 bg-white pt-3 border-top rounded-bottom'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <button className='btn text-muted' onClick={() => navigate('/')}>
                            <MdKeyboardArrowLeft /> Back
                        </button>
                        <div className='position-absolute start-50 translate-middle-x'>
                            {failedAttempts >= 3 ? (
                                <button className='btn btn-danger' onClick={() => navigate('/')}>
                                    Restart Process
                                </button>
                            ) : (
                                <button className='btn btn-danger' disabled={otp.length !== 6} onClick={handleVerify}>
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

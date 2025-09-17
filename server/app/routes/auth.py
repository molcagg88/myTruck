from fastapi import Depends, APIRouter
from app.db.requestModels import SendOTPRequest, VerifyOTPRequest,SetDetialsRequest, SigninRequest
from app.services.authService import signin_svc
from app.services.otpService import send_otp_svc, verify_otp_svc
from app.services.userExistenceService import set_details_svc

auth_router = APIRouter(prefix="/auth")

@auth_router.post("/send-otp")
async def send_otp(request: SendOTPRequest, otpServiceResponse = Depends(send_otp_svc)):
     
    return otpServiceResponse

@auth_router.post("/verify-otp")
async def verify_otp(request: VerifyOTPRequest, verifyServiceResponse = Depends( verify_otp_svc)):
    return verifyServiceResponse

@auth_router.post('/setdetails')
async def setDetails(request: SetDetialsRequest, DetailsServiceResponse = Depends(set_details_svc)):
    return DetailsServiceResponse

@auth_router.post('/signin')
async def signin(request: SigninRequest, signinServiceResponse = Depends(signin_svc)):
    return signinServiceResponse

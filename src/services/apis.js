const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + '/auth/sendOtp',
    SIGNUP_API: BASE_URL + '/auth/signup',
    LOGIN_API: BASE_URL + '/auth/login',
    CHANGE_PASSWORD_API: BASE_URL + '/auth/changepassword',
}

// CONTENT ENDPOINTS
export const contentEndpoints = {
    GET_ALL_CONTENT_NAME: BASE_URL + '/content/getAllContentsName',
    GET_ALL_GENRE: BASE_URL + '/content/getAllGenre'
}



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
    GET_ALL_GENRE: BASE_URL + '/content/getAllGenre',
    CREATE_CONTENT: BASE_URL + '/content/createContent',
    EDIT_CONTENT: BASE_URL + '/content/editContent',
    DELETE_CONTENT: BASE_URL + '/content/deleteContent',
    GET_CONTENT_DETAILS: BASE_URL + '/content/getContentDetails',
    GET_ALL_CONTENT: BASE_URL + '/content/getAllContents',
    GET_ARTIST_CONTENT: BASE_URL + '/content/getArtistContents',
    CREATE_SECTION: BASE_URL + '/content/createSection',
    EDIT_SECTION: BASE_URL + '/content/editSection',
    DELETE_SECTION: BASE_URL + '/content/deleteSection',
    CREATE_SUBSECTION: BASE_URL + '/content/createSubSection',
    EDIT_SUBSECTION: BASE_URL + '/content/editSubSection',
    DELETE_SUBSECTION: BASE_URL + '/content/deleteSubSection',
}



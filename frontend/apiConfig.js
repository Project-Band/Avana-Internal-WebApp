const API_BASE_URL = 'http://127.0.0.1:8000';

export const ENROLL_REQUESTS_API = `${API_BASE_URL}/enroll_requests`;
export const REGISTER_INFO_API = `${API_BASE_URL}/register_info`;
export const LOGIN_API = `${API_BASE_URL}/login/`;
export const HOME_API = `${API_BASE_URL}`;
export const USER_API = (username) => `${API_BASE_URL}/${username}/`;
export const APPLICATIONS_API = `${API_BASE_URL}/application`;
export const ACCEPT_APPLICATION_API = `${API_BASE_URL}/accept_application`;
export const REJECT_APPLICATION_API = `${API_BASE_URL}/reject_application`;
export const UPGRADE_PP_API = `${API_BASE_URL}/upgrade`;
export const DELETE_PP_API = `${API_BASE_URL}/delete`;
export const MAIL_PP_API = `${API_BASE_URL}/sendpersonalmail`;
export const GET_ENROLL_REQUESTS_API = `${API_BASE_URL}/get_enroll_requests`;
export const ACCEPT_ENROLLMENT_API = `${API_BASE_URL}/accept_enrollment`;
export const REJECT_ENROLLMENT_API = `${API_BASE_URL}/reject_enrollment`;
export const CREATE_PROJECT_API = `${API_BASE_URL}/create_project`;
export const VIEW_PROJECT_API = `${API_BASE_URL}/view_project`;
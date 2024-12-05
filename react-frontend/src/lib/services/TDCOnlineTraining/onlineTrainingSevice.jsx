import axiosInstance from '@/lib/axios/axios';
const BASE_URL = '/api';

// Get CSRF Token
export const getCsrfToken = async () => {
    try {
        await axiosInstance.get('/sanctum/csrf-cookie');
    } catch (error) {
        console.error('Error getting CSRF token:', error.message);
        throw new Error('Failed to get CSRF token');
    }
};

export const startExam = async () => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/start-lecture`);
        return response.data;
    } catch (error) {
        console.error('Start Exam Error', error.message);
        throw error;
    }
};

export const updateUserAccount = async (userData) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/update-account`, {
            currentPassword: userData.currentPassword,
            newPassword: userData.newPassword
        });
        return response.data;
    }
    catch (error) {
        console.error('Update User Account Error', error.message);
        throw error;
    }
}
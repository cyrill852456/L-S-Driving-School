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

export const rescheduleBooking = async (bookingId, bookingData) => {
    try {
        const response = await axiosInstance.put(`${BASE_URL}/staff/reschedule-booking/${bookingId}`, {
            date_booked: bookingData.date_booked,
            time_booked: bookingData.time_booked
        });
        return response.data;
    }
    catch (error) {
        console.error('Reschedule Booking Error:', error.message);
        throw error;
    }
}

// And for fetching the booking requests:
export const getBookingRequests = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/staff/booking-requests`);
        return response.data;
    }
    catch (error) {
        console.error('Get Booking Requests Error:', error.message);
        throw error;
    }
}
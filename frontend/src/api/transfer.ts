// src/api/transfer.ts
import api from "./api";

// Interface untuk response transfer API
export interface TransferResponse {
    amount_eth: string;
    amount_wei: string;
    message: string;
    to_address: string;
    tx_hash: string;
}

// Interface untuk request transfer
export interface TransferRequest {
    to_address: string;
    amount_wei: string;
}

// Fungsi untuk mengkonversi ETH ke Wei
export const ethToWei = (ethAmount: number): string => {
    // 1 ETH = 10^18 Wei
    const weiAmount = ethAmount * Math.pow(10, 18);
    return weiAmount.toString();
};

// Fungsi untuk mengkonversi Wei ke ETH (jika diperlukan)
export const weiToEth = (weiAmount: string): number => {
    return parseFloat(weiAmount) / Math.pow(10, 18);
};

// Fungsi untuk melakukan transfer dana
export const transferFunds = async (
    recipientAddress: string, 
    amountInEth: number
): Promise<TransferResponse> => {
    try {
        // Konversi ETH ke Wei
        const amountInWei = ethToWei(amountInEth);
        
        const transferData: TransferRequest = {
            to_address: recipientAddress,
            amount_wei: amountInWei
        };

        console.log('=== TRANSFER API DEBUG INFO ===');
        console.log('Original amount (ETH):', amountInEth);
        console.log('Converted amount (Wei):', amountInWei);
        console.log('Transfer request data:', transferData);
        console.log('API Base URL:', api.defaults.baseURL);
        console.log('Current token:', localStorage.getItem('token') ? 'Token exists' : 'No token found');

        const response = await api.post<TransferResponse>('/api/transfer', transferData);
        
        console.log('Transfer API response status:', response.status);
        console.log('Transfer API response data:', response.data);
        console.log('=== TRANSFER SUCCESS ===');
        
        return response.data;
    } catch (error: any) {
        console.error('=== TRANSFER API ERROR ===');
        console.error('Full error object:', error);
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        
        // Handle different types of errors
        if (error.response) {
            // Server responded with error status
            const status = error.response.status;
            const responseData = error.response.data;
            
            console.error('Response status:', status);
            console.error('Response data:', responseData);
            console.error('Response headers:', error.response.headers);
            
            let errorMessage = responseData?.message || responseData?.error || error.message;
            
            switch (status) {
                case 401:
                    throw new Error('Sesi telah berakhir. Silakan login kembali.');
                case 403:
                    throw new Error('Anda tidak memiliki izin untuk melakukan transfer.');
                case 400:
                    throw new Error(`Data transfer tidak valid: ${errorMessage}`);
                case 500:
                    // Tampilkan detail error 500 untuk debugging
                    const detailedError = responseData ? 
                        `Server error: ${JSON.stringify(responseData)}` : 
                        'Terjadi kesalahan pada server';
                    console.error('Server 500 error details:', responseData);
                    throw new Error(detailedError);
                default:
                    throw new Error(`Transfer gagal (${status}): ${errorMessage}`);
            }
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received:', error.request);
            throw new Error('Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
        } else {
            // Something else happened
            console.error('Request setup error:', error.message);
            throw new Error(`Transfer gagal: ${error.message}`);
        }
    }
};

// Fungsi untuk validasi address Ethereum
export const isValidEthereumAddress = (address: string): boolean => {
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    return ethAddressRegex.test(address);
};

// Fungsi untuk validasi amount
export const isValidAmount = (amount: number): boolean => {
    return amount > 0 && !isNaN(amount) && isFinite(amount);
};

// Fungsi untuk testing koneksi API
export const testApiConnection = async (): Promise<boolean> => {
    try {
        console.log('Testing API connection...');
        const response = await api.get('/api/health'); // atau endpoint lain yang ada
        console.log('API connection test result:', response.status);
        return response.status === 200;
    } catch (error) {
        console.error('API connection test failed:', error);
        return false;
    }
};

// Fungsi untuk debugging - cek apakah server bisa dijangkau
export const debugServerConnection = async (): Promise<void> => {
    try {
        console.log('=== SERVER CONNECTION DEBUG ===');
        console.log('Checking server at:', api.defaults.baseURL);
        
        // Test basic connection
        const response = await fetch('http://localhost:8080/api/transfer', {
            method: 'OPTIONS', // preflight request
        });
        
        console.log('OPTIONS request status:', response.status);
        console.log('CORS headers:', {
            'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
            'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
            'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers'),
        });
        
    } catch (error) {
        console.error('Server connection debug error:', error);
    }
};




const ERROR_RESPONSE = (error?: string) => {
    throw error ? new Error(error) : new Error('khong tim thay ban ghi ')
}
    
export {
    ERROR_RESPONSE
}
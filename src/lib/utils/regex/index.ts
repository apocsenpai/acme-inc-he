export const phoneMatch = /\([1-9]{2}\) 9[1-9]\d{3}-\d{4}/
export const nameMatch = /^[a-záàâãéèêíïóôõöúçñ ]+$/i
export const emailMatch = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
export const passwordMatch =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
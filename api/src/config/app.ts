export const NODE_ENV = process.env.NODE_ENV!
export const APP_PORT =  process.env.PORT || 5000; 
export const IN_PROD = NODE_ENV === 'production';
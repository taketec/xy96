export default function generateId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const currentTime = new Date().toISOString(); // ISO format includes the date and time
    const prefix = 'receipt_';

    return `${prefix}${currentTime}${result}`;
}
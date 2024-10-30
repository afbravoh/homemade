
const phoneNumber = '+15513443877'; // Replace with your actual phone number, e.g., '1234567890'
const messageText = 'Hello, I would like to learn more about your services!'; // Customize your message

const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;
export const getWhatsappText = () => {
    return whatsappLink
}
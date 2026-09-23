import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export const isEmailJSConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

/**
 * Send an email notification for a new order or digital service inquiry
 * @param {Object} data - Details of the order/inquiry
 */
export async function sendOrderNotificationEmail(data) {
  if (!isEmailJSConfigured) {
    console.log('ℹ️ EmailJS is not fully configured yet. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in .env to enable email alerts.');
    return { success: false, reason: 'not_configured' };
  }

  try {
    const templateParams = {
      to_email: 'amjad.atassi@outlook.com',
      order_id: data.id || 'N/A',
      order_type: data.type || 'جديد',
      customer_name: data.customerName || data.clientName || data.companyName || 'عميل جديد',
      customer_phone: data.customerPhone || data.clientPhone || data.contactPhone || 'غير محدد',
      total_price: data.price ? `$${data.price}` : (data.budget ? `$${data.budget}` : 'حسب الاتفاق'),
      order_details: data.details || JSON.stringify(data, null, 2),
      order_date: data.date || new Date().toLocaleDateString('ar-EG')
    };

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    console.log('✅ Email notification sent successfully:', response.status, response.text);
    return { success: true, response };
  } catch (error) {
    console.error('❌ Failed to send email notification via EmailJS:', error);
    return { success: false, error };
  }
}

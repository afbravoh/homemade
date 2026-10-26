import React, { useState } from "react";
import emailjs from "emailjs-com";
import { getWhatsappText } from "../utils/whatsappCode";

const initialState = { name: "", email: "", message: "" };
const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const isConfigured = [serviceId, templateId, publicKey].every(
  (value) => value && !value.startsWith("YOUR_")
);

export const Contact = () => {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const whatsappUrl = getWhatsappText();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isConfigured || sending) return;

    setSending(true);
    setStatus("");
    try {
      await emailjs.sendForm(serviceId, templateId, event.currentTarget, publicKey);
      setValues(initialState);
      setStatus("Thank you! Your message was sent.");
    } catch (error) {
      // Do not log submitted contact details or third-party error payloads.
      setStatus("We couldn't send your message. Please try again or contact us on WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <section id="contact">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <h2>Contact us</h2>
              {isConfigured ? (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="contact-name">Name</label>
                    <input id="contact-name" name="name" type="text" className="form-control"
                      autoComplete="name" maxLength={100} required value={values.name} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Email</label>
                    <input id="contact-email" name="email" type="email" className="form-control"
                      autoComplete="email" maxLength={254} required value={values.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-message">Message</label>
                    <textarea id="contact-message" name="message" className="form-control"
                      rows="5" maxLength={3000} required value={values.message} onChange={handleChange} />
                  </div>
                  <button className="btn btn-custom btn-lg" type="submit" disabled={sending}>
                    {sending ? "Sending..." : "Send message"}
                  </button>
                  {status && <p role="status" aria-live="polite">{status}</p>}
                </form>
              ) : (
                <p>For inquiries, please contact us using WhatsApp.</p>
              )}
              {whatsappUrl && (
                <div className="social">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                    aria-label="Contact Homemade Cooking for You on WhatsApp">
                    <i className="fa fa-whatsapp" aria-hidden="true"></i> WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <footer id="footer">
        <div className="container text-center">
          <p>&copy; {new Date().getFullYear()} Homemade Cooking for You LLC.</p>
        </div>
      </footer>
    </div>
  );
};

import { useMemo, useState } from "react";
import API from "../services/api";
import "../styles/contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const fullName = useMemo(() => {
    return `${form.firstName} ${form.lastName}`.trim().replace(/\s+/g, " ");
  }, [form.firstName, form.lastName]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setSubmitting(true);

    try {
      await API.post("/contact", {
        name: fullName || "Anonymous",
        email: form.email,
        message: form.message,
        firstName: form.firstName,
        lastName: form.lastName,
      });
      setStatus({ type: "success", message: "Message sent successfully." });
      setForm({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Error sending message. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact">
      <div className="contact-container">
        {/* LEFT */}
        <div className="contact-left">
          <p className="contact-tag">GET IN TOUCH</p>
          <h2>
            Let's Work <br /> Together
          </h2>
          <p className="contact-desc">
            Have a project idea, opportunity, or just want to say hello?
            Feel free to reach out. I'm always open to discussing new ideas.
          </p>

          <div className="contact-details">
            <p>Email: sr9022069@gmail.com</p>
            <p>Phone: +91 899384703</p>
          </div>
        </div>

        {/* RIGHT */}
        <form className="contact-form" onSubmit={submitHandler}>
          {status.message && (
            <div className={`form-status ${status.type}`} role="status">
              {status.message}
            </div>
          )}

          <div className="row">
            <input
              type="text"
              placeholder="First Name"
              value={form.firstName}
              autoComplete="given-name"
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              value={form.lastName}
              autoComplete="family-name"
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />
          </div>

          <input
            type="email"
            placeholder="Email Address"
            required
            value={form.email}
            autoComplete="email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <textarea
            placeholder="Your Message"
            rows="4"
            required
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          <button type="submit" disabled={submitting}>
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

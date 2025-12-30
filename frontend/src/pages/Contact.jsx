import { useState } from "react";
import API from "../services/api";
import "../styles/contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await API.post("/contact", form);
    alert("Message Sent Successfully!");
  };

  return (
    <section className="contact">
      <div className="contact-container">
        {/* LEFT */}
        <div className="contact-left">
          <p className="contact-tag">GET IN TOUCH</p>
          <h2>
            Let’s Work <br /> Together
          </h2>
          <p className="contact-desc">
            Have a project idea, opportunity, or just want to say hello?
            Feel free to reach out. I’m always open to discussing new ideas.
          </p>

          <div className="contact-details">
            <p>📧 sr9022069@gmail.com</p>
            <p>📞 +91 899384703</p>
          </div>
        </div>

        {/* RIGHT */}
        <form className="contact-form" onSubmit={submitHandler}>
          <div className="row">
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />
          </div>

          <input
            type="email"
            placeholder="Email Address"
            required
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <textarea
            placeholder="Your Message"
            rows="4"
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
          />

          <button type="submit">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default Contact;

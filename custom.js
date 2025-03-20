document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();
        const responseMessage = document.getElementById("responseMessage");

        if (!name || !email || !subject || !message) {
            responseMessage.textContent = "All fields are required.";
            responseMessage.style.color = "red";
            return;
        }

        const formData = { name, email, subject, message };

        try {
            const response = await fetch("http://127.0.0.1:5000/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            responseMessage.textContent = result.message;
            responseMessage.style.color = response.ok ? "green" : "red";

            if (response.ok) form.reset(); // Reset form on success
        } catch (error) {
            responseMessage.textContent = "An error occurred. Try again.";
            responseMessage.style.color = "red";
        }
    });
});

/*
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

# Configure Flask-Mail (Replace with your email details)
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = "your-email@gmail.com"
app.config["MAIL_PASSWORD"] = "your-email-password"
app.config["MAIL_DEFAULT_SENDER"] = "your-email@gmail.com"

mail = Mail(app)

@app.route("/contact", methods=["POST"])
def contact():
    try:
        data = request.get_json()
        name = data["name"]
        email = data["email"]
        subject = data["subject"]
        message = data["message"]

        if not name or not email or not subject or not message:
            return jsonify({"message": "All fields are required!"}), 400

        # Send email
        msg = Message(subject=f"New Contact Form: {subject}",
                      sender=email,
                      recipients=["your-email@gmail.com"],  # Change to your recipient email
                      body=f"Name: {name}\nEmail: {email}\nMessage: {message}")
        mail.send(msg)

        return jsonify({"message": "Message sent successfully!"}), 200

    except Exception as e:
        return jsonify({"message": "Error sending message", "error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

*/
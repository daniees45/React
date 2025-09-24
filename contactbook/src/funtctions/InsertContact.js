import { useState } from "react";
import { insertContact } from "../components/Api";

export default function InsertContact() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        profile: null,
        phone: '',
        address: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "profile" && files && files[0]) {
            // Read file as base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    profile: reader.result.split(",")[1] // base64 string
                }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        // Validate form data
        const validation = validateFormData(formData);
        if (!validation.valid) {
            setMessage(validation.message);
            setIsSuccess(false);
            setLoading(false);
            setTimeout(
                () => setMessage(""), 2000
            )
            return;
        }
        
        const result = await insertContact(formData);
        if (result.statusCode === "E001" || result.error) {
            
            setMessage(result.message);
            setIsSuccess(false)
            setTimeout(
                ()=> setMessage(""), 2000
            ) 
        } else {
            setMessage(result.message);
            setIsSuccess(true);
            setTimeout(
                ()=> setMessage(""), 2000
            ) 
            
            setFormData({
                firstname: '',
                lastname: '',
                profile: null,
                phone: '',
                address: '',
                email: ''
            });
        }
        setLoading(false);
    };

    const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


    return (
        <div className=" component-container">
            <h2>Add New Contact</h2>
            <div className="contact-form">
                <form className="form-group" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstname" className="form-label">First Name:</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            className="form-control"
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastname">Last Name:</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            className="form-control"
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="profileImage">Profile Image:</label>
                        <input
                            type="file"
                            id="profileImage"
                            name="profile"
                            className="form-control"
                            onChange={handleChange}
                            accept="image/*"
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-control"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            className="form-control"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? "Adding..." : "Add Contact"}
                    </button>
                </form>
                {message && <div className={isSuccess ? "message success" : "message error"}>{message}</div>}
            </div>
        </div>
    );
}

function validateFormData(formData) {
    if (!formData.firstname || !formData.lastname || !formData.phone || !formData.address || !formData.email) {
        return { valid: false, message: "All fields except profile image are required." };
    }
    if (!validateEmail(formData.email)) {
        return { valid: false, message: "Invalid email format." };
    }
    if (formData.phone.length !== 10 || formData.phone.length !== 13) {
        return { valid: false, message: "Phone number must be 10 or 13 digits long." };
    }
    return { valid: true };
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


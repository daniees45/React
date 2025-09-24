import { useEffect, useState } from "react";
import { getContacts , updateContact, deleteContact} from "../components/Api";


const ViewContacts = () => {
  const [contact, setContacts] =useState([]);
   const [selectedContact, setSelectedContact] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  //set loading state
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    const result = await getContacts();
    if(result && !result.error){
              
              setContacts(result.data);
              setAllContacts(result.data);
          } else {
              console.error("Error fetching contacts:", result.error);
          }
  };

  const deleteContacts = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");
    if (confirmDelete) {
      const result = await deleteContact(id);
      if (result && !result.error) {
        alert(result.message);
        fetchContacts();
      } else {
        console.error("Error deleting contact:", result.error);
      }
    }
  }

  useEffect(() => {
    
    fetchContacts();
     setLoading(false);
    const timer = setTimeout(fetchContacts, 100);
        return() => clearTimeout(timer)
  }, []);

    //search contacts
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        if (query === "") {
          setContacts(allContacts);
        }else{
          const filteredContacts = contact.filter(c =>
            c.firstname.toLowerCase().includes(query) ||
            c.lastname.toLowerCase().includes(query) ||
            c.phone.toLowerCase().includes(query) ||
            c.email.toLowerCase().includes(query) ||
            c.address.toLowerCase().includes(query)
        );
        setContacts(filteredContacts);
        }
    };

  //modal functions 

   const openModal = (contact) => {
    setSelectedContact(contact);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedContact(null);
    setShowModal(false);
  };
  return (
  <>
    {loading ? (
      <div className="loading">Loading...</div>
    ) : (
      <div>
        <h2 className="h22">All Contacts</h2>
        
        <input
          type="text"
          placeholder="Search Contact"
          className="form-control mb-3"
          onChange={handleSearch}
        />

        <div className="table-responsive">
          <table
            border="1"
            cellPadding="8"
            style={{ borderCollapse: "collapse", width: "100%" }}
            className="table table-striped"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Profile</th>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contact.map((c, i) => (
                <tr key={c.id}>
                  <td>{i + 1}</td>
                  <td>
                    <img
                      src={`data:image/png;base64,${c.profile}`}
                      alt="profile"
                      style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                    />
                  </td>
                  <td>{c.firstname}</td>
                  <td>{c.lastname}</td>
                  <td>{c.phone}</td>
                  <td>{c.email}</td>
                  <td>{c.address}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => openModal(c)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteContacts(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal appears only if state is set */}
        {showModal && selectedContact && (
          <ContactModal
            contact={selectedContact}
            onClose={closeModal}
            fetch={fetchContacts}
          />
        )}
      </div>
    )}
  </>
);

};

export default ViewContacts;

const ContactModal = ({ contact, onClose, fetch }) => {
  const [formData, setFormData] = useState(contact);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Updated Contact:", formData);
    const result = updateContact(formData);
    if (result && !result.error) {
      alert(result );
    }
    fetch();
    onClose();
  };

  return (
    <div style={styles.modalOverlay}>
      <div className="modal-content" style={styles.modalContent}>
        <h3>Edit Contact</h3>
        <img
          src={`data:image/png;base64,${formData.profile}`}
          alt="profile"
          style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          
        />

        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="Firstname"
          style={styles.inputStyle}
        />
        <input
          type="text"
          name="firstname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Firstname"
          style={styles.inputStyle}
        />
        
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          style={styles.inputStyle}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          style={styles.inputStyle}
        />
        <input
          type="textarea"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          style={styles.inputStyle}
        />

        <div style={{ marginTop: "10px" }}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  modalContent: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  inputStyle: {
    width: "100%",
    padding: "8px",
    margin: "5px 0",
    boxSizing: "border-box",
  },
};
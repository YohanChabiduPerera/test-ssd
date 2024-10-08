import List from "@mui/material/List";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import PropTypes from "prop-types";
import ContactListItem from "./ContactListItem";
import styles from "./ContactList.module.css";
import { SendReferralMail } from "../utils/sendReferralMail";
import { UseUserContext } from "../context/useUserContext";

export default function ContactList({
  contactList,
  fetchingContactsUpdateStatus,
  item,
  handleClose,
}) {
  const [receipientList, setReceipientList] = useState([]);
  const { user1 } = UseUserContext();

  // Toggle contact selection
  const toggleContact = (value) => {
    setReceipientList((list) =>
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value]
    );
  };

  // Send referral mail
  const sendMail = async () => {
    const result = await SendReferralMail({
      to_email: receipientList.join(", "),
      sender_email: user1[0].userName,
      store_name: item.storeName,
      product_name: item.productName,
      product_image_url: item.image,
    });

    handleMailResult(result);
  };

  // Handle mail sending result
  const handleMailResult = (result) => {
    if (result.toLowerCase() === "ok") {
      alert("Mail sent successfully");
      handleClose();
    } else {
      alert(result);
    }
  };

  // Render the list of contacts
  const renderContactList = () => {
    return contactList.map((value) => (
      <ContactListItem
        key={value}
        value={value}
        checked={receipientList}
        handleToggle={toggleContact}
      />
    ));
  };

  return (
    <List
      dense
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: 500,
        bgcolor: "background.paper",
        p: 0,
        m: 0,
        gap: 1,
      }}
    >
      {contactList?.length ? (
        <>
          <div className={styles.selectContactsTitleContainer}>
            Select Contacts
            {receipientList.length > 0 && (
              <div className={styles.sendMailIconContainer}>
                <IoIosSend
                  title="Send Mail"
                  size={24}
                  onClick={sendMail}
                />
              </div>
            )}
          </div>
          {renderContactList()}
        </>
      ) : (
        <p>{fetchingContactsUpdateStatus}</p>
      )}
    </List>
  );
}

// Define prop types
ContactList.propTypes = {
  contactList: PropTypes.array.isRequired,
  fetchingContactsUpdateStatus: PropTypes.string.isRequired, 
  item: PropTypes.object.isRequired, 
  handleClose: PropTypes.func.isRequired, 
};
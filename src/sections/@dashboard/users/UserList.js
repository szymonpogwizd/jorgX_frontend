import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchField from "./SearchField";
import SelectType from "./SelectType";
import AlertMessage from '../common/AlertMessage';

export default function UserList({ refreshKey, setNameValue, setIdValue, setIsUpdateMode, setEmailValue, setRoleValue, setActiveValue }) {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState("");
  const [userType, setUserType] = useState("");

  const headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  };

  useEffect(() => {
    fetch("http://localhost:8080/dashboard/users", { headers })
      .then((response) => response.json())
      .then((data) => {
        setData(data);

        if (itemToDelete !== null) {
          setData((prevState) => {
            const index = prevState.findIndex((item) => item.id === itemToDelete);
            if (index !== -1) {
              prevState.splice(index, 1);
              return [...prevState];
            }
            return prevState;
          });
          setItemToDelete(null);
        }
      });
  }, [itemToDelete, refreshKey]);

  const handleDelete = (id) => () => {
    const item = data.find((item) => item.id === id);
    if (!item) {
      return;
    }

    fetch(`http://localhost:8080/dashboard/users/${id}`, {
      method: "DELETE",
      headers
    })
      .then((response) => {
        if (response.ok) {
          setItemToDelete(id);
          setSuccessAlertMessage(`Pomyślnie usunięto użytkownika ${item.name}`);
          setShowSuccessAlert(true);
        } else if (response.status === 417) {
          response.text().then((errorMessage) => {
            setAlertMessage(errorMessage);
            setShowAlert(true);
          });
        } else {
          throw new Error("Wystąpił błąd");
        }
      })
      .catch((error) => {
        setAlertMessage(`${error.message}`);
        setShowAlert(true);
      });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  const resetAlert = () => {
    setAlertMessage("");
  };

  const handleToggle = (id) => () => {
    const item = data.find((item) => item.id === id);
    if (item) {
      setIdValue(item.id);
      setNameValue(item.name);
      setEmailValue(item.email);
      setRoleValue(item.userType);
      setActiveValue(item.active);
      setIsUpdateMode(true);
    }
  };

  const handleSearch = (newSearchText) => {
    setSearchText(newSearchText);
  };

  return (
    <div>
      <SearchField handleSearch={handleSearch} />

      {showAlert && (
        <AlertMessage
          severity="error"
          title="Błąd"
          message={alertMessage}
          onClose={handleCloseAlert}
        />
      )}

      {showSuccessAlert && (
        <AlertMessage
          severity="success"
          title="Sukces"
          message={successAlertMessage}
          onClose={handleCloseSuccessAlert}
          resetAlert={resetAlert}
        />
      )}

      <SelectType setUserType={setUserType} />
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          height: "46vh",
          overflow: "auto",
        }}
      >
        {data.map((item) => {
          const labelId = `checkbox-list-label-${item.id}`;

          if (
            (searchText && !item.name.toLowerCase().includes(searchText.toLowerCase())) ||
            (userType && item.userType !== userType)
          ) {
            return null;
          }

          return (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={handleDelete(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              sx={{ p: 0 }}
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(item.id)}
              >
                <ListItemText id={labelId} primary={item.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
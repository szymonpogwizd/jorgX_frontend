import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchField from "./SearchField";
import AlertMessage from '../common/AlertMessage';

export default function PlaceList({ refreshKey, setNameValue, setIdValue, setIsUpdateMode, setCityValue, setStreetValue, setOpenHoursValue }) {
    const [searchText, setSearchText] = useState("");
    const [data, setData] = useState([]);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successAlertMessage, setSuccessAlertMessage] = useState("");

    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    useEffect(() => {
        fetch("http://localhost:8080/dashboard/place", { headers })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }, [refreshKey]);

    useEffect(() => {
        if (itemToDelete !== null) {
            setData((prevState) => prevState.filter((item) => item.id !== itemToDelete));
            setItemToDelete(null);
        }
    }, [itemToDelete]);

    const handleDelete = (id) => () => {
      fetch(`http://localhost:8080/dashboard/opinion/place/${id}`, {
          method: 'DELETE',
          headers
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to delete opinions');
          }
          return fetch(`http://localhost:8080/dashboard/place/${id}`, {
              method: 'DELETE',
              headers
          });
      })
      .then(response => {
          if (response.ok) {
              setItemToDelete(id);
              setSuccessAlertMessage(`Pomyślnie usunięto miejsce`);
              setShowSuccessAlert(true);
          } else if (response.status === 417) {
              response.text().then((errorMessage) => {
                  setAlertMessage(errorMessage);
                  setShowAlert(true);
              });
          } else {
              throw new Error('Wystąpił błąd');
          }
      })
      .catch((error) => {
          setAlertMessage(error.message);
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
          if (!item.name.trim()) {
            setAlertMessage("Nazwa miejsca nie może być pusta.");
            setShowAlert(true);
            return;
          }
          setIdValue(item.id);
          setNameValue(item.name);
          setStreetValue(item.street);
          setOpenHoursValue(item.openingHours);
          setIsUpdateMode(true);
          
          fetch(`http://localhost:8080/dashboard/place/city/${id}`, {
            headers
          })
            .then((response) => response.json())
            .then((cityIdData) => {
              return fetch(`http://localhost:8080/dashboard/city/${cityIdData}`, {
                headers
              });
            })
            .then((response) => response.json())
            .then((cityData) => {
              setCityValue(cityData.name);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
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

                    if (searchText && !item.name.toLowerCase().includes(searchText.toLowerCase())) {
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

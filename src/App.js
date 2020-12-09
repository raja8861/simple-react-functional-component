import "./App.css";
import React, { useState } from "react";
import {
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  FormHelperText,
} from "@material-ui/core";

function App() {
  // this is functional component
  //TEST DATA FOR CITIES
  const citysArray = [
    {
      cityId: 1,
      cityName: "Minneapolis",
    },
    {
      cityId: 2,
      cityName: "Rochester",
    },
    {
      cityId: 3,
      cityName: "Bloomington",
    },
    {
      cityId: 4,
      cityName: "Duluth",
    },
    {
      cityId: 5,
      cityName: "Saint Paul",
    },
  ];

  // Declartion of state variable and  handler
  const [name, setName] = useState("");
  const [selectedCity, setSelectedCity] = useState([]);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState();
  const [notification, setNotification] = useState("");
  const [nameError, setNameError] = useState(false);
  const [selectedCityError, setSelectedCityError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [notificationError, setNotificationError] = useState(false);
  const [isFormSubmitted, handleFormSubmit] = useState(false);

  // onChange event handler for name field.
  const handleNameOnChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.value !== "") {
      setNameError(false);
      setName(event.target.value);
    }
  };

  // onChange event handler for City field.
  const handleCityOnChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.value !== "") {
      setSelectedCityError(false);
      setSelectedCity(event.target.value);
    }
  };

  // onChange event handler for Email field.
  const handleEmailOnChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.value !== "") {
      setEmail(event.target.value);
      const pattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (pattern.test(event.target.value)) {
        console.log("test");
        setEmailError(false);
        setIsValidEmail(false);
      } else {
        setEmailError(true);
        setIsValidEmail(true);
      }
    }
  };

  // onChange event handler for Notification field.
  const handleNotificationChange = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.value !== "") {
      if (event.target.value === "yes" || event.target.value === "no") {
        setNotificationError(false);
        setNotification(event.target.value);
      } else {
        setNotificationError(true);
      }
    }
  };

  // The onblur event occurs when an object loses focus. The onblur event is most often used with form validation code (e.g. when the user leaves a form field).
  const handleNameOnBlur = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const hasError = !event.target.value ? true : false;
    setNameError(hasError);
  };

  // The onblur event occurs when an object loses focus. The onblur event is most often used with form validation code (e.g. when the user leaves a form field).
  const handleCityOnClose = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const hasError = !event.target.value ? true : false;
    setSelectedCityError(hasError);
  };

  // The onblur event occurs when an object loses focus. The onblur event is most often used with form validation code (e.g. when the user leaves a form field).
  const handleEmailOnBlur = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.target.value !== "") {
      setEmail(event.target.value);
      const pattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (pattern.test(event.target.value)) {
        setEmailError(false);
        setIsValidEmail(false);
      } else {
        setEmailError(true);
        setIsValidEmail(true);
      }
    }
    if (event.target.value === "") {
      setEmailError(true);
    }
  };

  // this function helps to reset all the form data to initial state
  const formRest = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setName("");
    setSelectedCity("");
    setEmail("");
    setNotification("");
    setIsValidEmail(false);
    setNotificationError(false);
    setEmailError(false);
    setSelectedCityError(false);
    setNameError(false);
    handleFormSubmit(false);
  };

  // this is formn submit handler, which helps trigger summary setion, if there are no erron on the form
  const submitForm = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleFormSubmit(true);
  };

  // this function helps to enable and disable a Submit button
  const checkIsDisabled = (name, selectedCity, email, notification) => {
    // if any of the form fields are having erro, then i am returning true, so that i can disable submit button.
    // if there are no errors,
    if (
      name === "" ||
      selectedCity.length === 0 ||
      email === "" ||
      notification === "" ||
      isValidEmail
    ) {
      return true;
    }
  };

  return (
    // React.Fragment help to wrap all the child elements, without rendering any extra DOM in Node.
    <React.Fragment>
      <header className="App-header">Sample Form</header>
      <Container maxWidth="sm">
        <form className={"sampleForm"} autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                error={nameError}
                required
                id="nameInput"
                label="Name"
                value={name}
                helperText="Please enter your name"
                onChange={handleNameOnChange}
                onBlur={handleNameOnBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                required
                className={"citySelection"}
                error={selectedCityError}
              >
                <InputLabel id="cityLable">City</InputLabel>
                <Select
                  labelId="cityLable"
                  id="citySelection"
                  value={selectedCity}
                  onChange={handleCityOnChange}
                  onClose={handleCityOnClose}
                >
                  {citysArray.map((cityInfo) => (
                    <MenuItem key={cityInfo.cityId} value={cityInfo.cityName}>
                      {cityInfo.cityName}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Please select a city</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={emailError}
                required
                id="emailInput"
                label="Email"
                value={email}
                defaultValue=""
                helperText={
                  isValidEmail && emailError
                    ? `Please enter valid email`
                    : `Please enter email`
                }
                onChange={handleEmailOnChange}
                onBlur={handleEmailOnBlur}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                component="fieldset"
                required
                error={notificationError}
              >
                <FormLabel component="legend">Receive notifications</FormLabel>
                <RadioGroup
                  aria-label="ReciveNotification"
                  name="Recive notification"
                  value={notification}
                  onChange={handleNotificationChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
                {notificationError && (
                  <FormHelperText>{`Please select Yes or No`}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6} spacing={5}>
              <Button
                className={"resetBtn"}
                variant="contained"
                onClick={formRest}
              >
                Reset
              </Button>
              <Button
                className={"submitBtn"}
                variant="contained"
                color="primary"
                onClick={submitForm}
                disabled={checkIsDisabled(
                  name,
                  selectedCity,
                  email,
                  notification,
                  isValidEmail
                )}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      {isFormSubmitted &&
        !(
          nameError ||
          selectedCityError ||
          emailError ||
          notificationError
        ) && (
          <Container className={"summary"} maxWidth="sm">
            <div
              className={"formDataReview"}
            >{` ** Summary of submited Form Data **`}</div>
            <div className={"formDataReview"}>{` Name   : ${name}`}</div>
            <div
              className={"formDataReview"}
            >{` City   : ${selectedCity}`}</div>
            <div className={"formDataReview"}>{` Email  : ${email}
`}</div>
            <div
              className={"formDataReview"}
            >{` Recive Notification  : ${notification} `}</div>
          </Container>
        )}
    </React.Fragment>
  );
}

export default App;

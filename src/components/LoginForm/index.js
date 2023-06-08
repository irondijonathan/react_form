import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';
import { validate } from 'email-validator';


export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [lengthError, setLengthError] = useState("");
  const [specialCharacterError, setSpecialCharacterError] = useState("");
  const [numericError, setNumericError] = useState("");
  const [caseCheckError, setCaseCheckError] = useState("")
  const [emailError, setEmailError] = useState("");
  const validateForm = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    const email = data.get('email');
    const password = data.get('password');

    // Add validation code here

    const emailValidation = () => {
      const isValidEmail = validate(email); // Use the validate function to check email format
      console.log(isValidEmail)

      if (isValidEmail) {
        setIsValidEmail(true);
        handleSubmit();
      
      } else {
        setIsValidEmail(false);
        setEmailError("Email format is not correct");
      }
    };


    //password validator
    const specialCharacters = ["!", "@", "£", "$", "%"]


    const passwordLengthCheck = () => {

      if (password.length >= 8) {
        setIsValidPassword(true)
        handleSubmit();
       
      } else {
        setIsValidPassword(false)
        setLengthError("Password must be greater than 8 characters")
      }

    };


    const passwordCharacterCheck = () => {
      if (password.includes(specialCharacters.some)) {
        setIsValidPassword(true)
        handleSubmit();
       
      } else {
        setIsValidPassword(false);
        setSpecialCharacterError("Password must contain a special character")
      }
    }

    const passwordNumericCheck = () => {
      if (password.includes(Number())) {
        setIsValidPassword(true)
        handleSubmit();
        
      } else {
        setIsValidPassword(false);
        setNumericError("Password must contain a numeric character")
      }

    }

    const caseCheck = () => {
      if (/^(?=.[a-z])(?=.[A-Z]).+$/.test(password)) {
        setIsValidPassword(true);
        handleSubmit();
      } else {
        setIsValidPassword(false);
        setCaseCheckError("Password must contain at least one uppercase and one lowercase character");
      }
    };

    const finalCheck = () => {
      if(isValidEmail === true && isValidPassword === true) {
        setShowAlert("Login Successful")
        handleSubmit()
      }
    }

    emailValidation();
    passwordLengthCheck();
    passwordCharacterCheck();
    passwordNumericCheck();
    caseCheck();
    finalCheck();
    
    

  }




  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    validateForm(e);
    if(isValidEmail && isValidPassword) {
      setShowAlert(true)
    }

  };



  return (
    <>

      {showAlert &&
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert>{showAlert}</Alert>
        </Snackbar>
      }
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            my: 2
          }}>
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {lengthError && <p style={{
              color: "red",
            }}>{lengthError}</p>}
            {specialCharacterError && <p style={{
              color: "red",
            }}>{specialCharacterError}</p>}
            {numericError && <p style={{
              color: "red",
            }}>{numericError}</p>}
            {caseCheckError && <p style={{
              color: "red",
            }}>{caseCheckError}</p>}
            {emailError && <p style={{
              color: "red",
            }}>{emailError}</p>}
          </Box>
        </Box>
      </Grid>
    </>
  );
}
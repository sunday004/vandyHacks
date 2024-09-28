  // pages/_app.js
  import '../styles/globals.css'
  import 'tailwindcss/tailwind.css'
 
  // Import Material-UI dependencies
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// Create your MUI theme (customize if necessary)
const theme = createTheme({
  palette: {
    mode: 'light', // You can change this to 'dark' if needed
  },
});

   function MyApp({ Component, pageProps }) {
     return <Component {...pageProps} />
   }
 
   export default MyApp
   
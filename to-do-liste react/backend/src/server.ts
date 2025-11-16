// Nur zum starten des Servers notwendig
import app from './app'; 
const port = 3001;

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
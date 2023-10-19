import app from './app';

const port = 8000;

app.listen(port, () => {
  console.log('Server is running');
  console.log(`http://localhost:${port}`);
});

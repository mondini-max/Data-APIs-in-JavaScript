import './App.css';

function App() {
  const catchRainbow = async () => {
    try {
      const response = await fetch(
        'https://upload.wikimedia.org/wikipedia/commons/f/f7/Double_rainbow.jpg'
      );
      const blob = await response.blob();
      document.getElementById('rainbow').src = URL.createObjectURL(blob);
    } catch (error) {
      console.log(error);
    }
  };

  catchRainbow();
  return (
    <div className='App'>
      <h1>hello world</h1>
      <img src='' id='rainbow' alt='rainbow' height='400' />
    </div>
  );
}

export default App;

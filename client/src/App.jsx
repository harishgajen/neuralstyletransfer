import { Form } from './components/Form'
function App() {

  return (
    <div className="App">
      <div>
        <h1 className="text-white font-mono text-center p-5">Neural Style Transfer</h1>
      </div>
      
      <h2 className="text-white mx-auto text-center px-2 max-w-xl">Start by uploading an image with the style you want to capture (the Style Image), then upload the image you 
        want to apply the style to (the Transfer Image), and finally, click the Apply Style Transfer button to see the results! (Note: Please upload .jpg images only.)
      </h2>
      <Form/>
    </div>
  )
}

export default App

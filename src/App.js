import React, { useEffect } from "react"; // Import React
import axios from "axios"
import { Html5QrcodeScanner } from "html5-qrcode";

function App() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 300,
        height: 300,
      },
      fps: 5,
    });

    scanner.render(success, error);

    async function success(result) { 
      console.log("Scan successful:", result); 
      try {
        // Gửi yêu cầu PATCH đến API khi quét thành công
        const response = await axios.patch(`http://localhost:8000/bills/checkinBill?billId=${result}`);
        console.log("Check-in successful:", response.data);
      } catch (error) {
        console.error("An error occurred while checking in:", error);
      }
    }

    function error(err) { // Fix: Define 'err' parameter
      // console.log(err);
    }
  }, []);

  return (
    <div className="App">
      <h1>QRCode Scanning in React</h1>
      <div id="reader"></div>
    </div>
  );
}

export default App;

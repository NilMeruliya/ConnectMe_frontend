import React, { useEffect, useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const Donate = () => {

    const paypalOptions = {
        "client-id": "AY4lVY5Y97MY4EJFHRMvciWw2TqO6yjdMj9dDcaCRc4NtWa3nKTc9zcywCwrresnvFcZc7C-Gik7rSjx",
        currency: "CAD",
      };
    
      const [donationAmount, setDonationAmount] = useState('');
      const [donorName, setDonorName] = useState('');
      const [paymentCompleted, setPaymentCompleted] = useState(false);
      const [error, setError] = useState('');
    
      useEffect(() => {
        if (donationAmount && donorName && paymentCompleted) {
          generatePDF();
        }
        // eslint-disable-next-line
      }, [donationAmount, donorName, paymentCompleted]);
    
      const handleInputChange = (e) => {
        const value = e.target.value;
    
        if (/^[0-9.]*$/.test(value)) {
          setDonationAmount(value);
          setError('');
        } else {
          setError('Please enter a valid numeric value');
        }
      };
    
      const handlePaymentComplete = (_, actions) => {
        setPaymentCompleted(true);
        actions.order.capture().then((details) => {
          // Handle payment details if needed
        });
      };
    
      const generatePDF = async () => {
        try {
          const pdfDoc = await PDFDocument.create();
          const page = pdfDoc.addPage([600, 300]);
          const { width, height } = page.getSize();
          const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      
          page.drawText('ConnectMe Charity Trust', {
            x: 20,
            y: height - 30,
            size: 16,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
      
          page.drawText('123 Main Street', {
            x: 20,
            y: height - 50,
            size: 8,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
      
          page.drawText('Kitchener, Ontario', {
            x: 20,
            y: height - 70,
            size: 8,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
      
          page.drawText('Email: info@yourcharity.org', {
            x: 20,
            y: height - 90,
            size: 8,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
      
          const donationMessage = `  Thank you, ${donorName}, for your generous donation! Your support is helping 
      us to make a positive impact on the lives of many.`;
      
          page.drawText(donationMessage, {
            x: 70,
            y: height - 120,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
      
          const receiptText = `You have contributed ${donationAmount} $ CAD.`;
      
          page.drawText(receiptText, {
            x: 80,
            y: height - 180,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
      
          page.drawText('___________', {
            x: 30,
            y: height - 200,
            size: 12,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
      
          // Add a date
          const currentDate = new Date().toLocaleDateString();
          page.drawText(`Date: ${currentDate}`, {
            x: 30,
            y: height - 220,
            size: 10,
            font: helveticaFont,
            color: rgb(0, 0, 0),
          });
      
          const pdfBytes = await pdfDoc.save();
      
          const blob = new Blob([pdfBytes], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        } catch (error) {
          console.error("Error generating PDF receipt:", error);
        }
      };
      
  return (
    <div className="h-screen dark:bg-dark_bg1 text-white flex items-center justify-center py-20 overflow-hidden">
      
      <div className="flex justify-center w-11/12 h-full dark:bg-dark_bg4">    
      <div>
      <h2 className="text-center text-2xl mt-20 mb-20">
        Your Contribution, May Change The Life Of Many People
      </h2>
      <PayPalScriptProvider options={paypalOptions}>
        <div className="mb-4">
          <label htmlFor="donationAmount" className="block text-white-700 text-sm font-bold mb-2">
            Enter Donation Amount:
          </label>
          <input
            type="text"
            id="donationAmount"
            step="0.01"
            className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 ${
              error ? 'border-red-500' : ''
            }`}
            value={donationAmount}
            onChange={handleInputChange}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="donorName" className="block text-white-700 text-sm font-bold mb-2">
            Your Name:
          </label>
          <input
            type="text"
            id="donorName"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
          />
        </div>

        <PayPalButtons
          createOrder={(data, actions) => {
            if (/^[0-9.]*$/.test(donationAmount)) {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: document.getElementById("donationAmount").value || "20.00",
                    },
                  },
                ],
              });
            } else {
              setError('Please enter a valid numeric value before proceeding with PayPal.');
              return null;
            }
          }}
          onApprove={handlePaymentComplete}
        />
      </PayPalScriptProvider>
    </div>
      </div>
    </div>
  )
}

export default Donate

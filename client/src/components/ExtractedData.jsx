import React from 'react'
import DataExtractionForm from './DataExtractionForm'
import { useState } from 'react'
import '../App.css'
import Navbar from './Navbar'

const ExtractedData = () => {
  const [extractedData, setExtractedData] = useState(null)

  const onExtractData = async text => {
    try {
      const response = await fetch('http://127.0.0.1:8080/extract-data/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      })
      console.log(response)

      if (response.ok) {
        const data = await response.json()
        // Set the extracted data in the state
        setExtractedData(data)
      } else {
        console.error('Error extracting data')
      }
    } catch (error) {
      console.error('API request error:', error)
    }
  }

  return (
    <>
      <Navbar />
      <h1 className='flex items-center justify-center mb-6 mt-20 sm:mt-30 text-2xl font-semibold text-gray-900 dark:text-white'>
        Data Extraction
      </h1>
      <DataExtractionForm onExtractData={onExtractData} />

      {/* Display the extracted data */}
      {extractedData && (
        <>
        <h2 className='flex items-center justify-center mb-6 mt-0 sm:mt-30 text-2xl font-semibold text-gray-900 dark:text-white'>Extracted Data:</h2>
      <div className='flex text-center space-x-3 px-20 rounded-lg bg-gray-50 dark:bg-gray-700 '>
          

          <a
            href='#'
            class='flex-1 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
          >
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              Start Date:{' '}
            </h5>
            <p className='font-normal text-gray-700 dark:text-gray-400'>
              {extractedData.start_date}
            </p>
          </a>
          <a
            href='#'
            className='flex-1 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
          >
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              End Date:{' '}
            </h5>
            <p className='font-normal text-gray-700 dark:text-gray-400'>
              {extractedData.end_date}
            </p>
          </a>
          <a
            href='#'
            className='flex-1 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
          >
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              Min:{' '}
            </h5>
            <p className='font-normal text-gray-700 dark:text-gray-400'>
              {extractedData.min_contribution}
            </p>
          </a>
          <a
            href='#'
            className='flex-1 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700'
          >
            <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
              Max:{' '}
            </h5>
            <p className='font-normal text-gray-700 dark:text-gray-400'>
              {extractedData.max_contribution}
            </p>
          </a>
          </div>
          </>
      )}
    </>
  )
}

export default ExtractedData

import React from 'react';

function InputSection({ 
  inputMethod, 
  setInputMethod, 
  urls, 
  handleUrlChange, 
  handleCsvUpload, 
  addUrlField, 
  removeUrlField, 
  handleSubmit, 
  loading 
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      {/* Input Method Toggle */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          type="button"
          onClick={() => setInputMethod('manual')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            inputMethod === 'manual' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Manual Input
        </button>
        <button
          type="button"
          onClick={() => setInputMethod('csv')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            inputMethod === 'csv' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          CSV Upload
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {inputMethod === 'manual' ? (
          <div className="space-y-4">
            {urls.map((url, index) => (
              <div key={index} className="flex gap-4">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  placeholder="Enter LinkedIn Profile URL"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {urls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeUrlField(index)}
                    className="p-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addUrlField}
              className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Another URL
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">CSV file with LinkedIn URLs</p>
                </div>
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleCsvUpload}
                />
              </label>
            </div>
            {urls.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">
                  Found {urls[0]!='' ? urls.length : '0'} LinkedIn URLs:
                </p>
                <ul className="text-sm text-gray-500 list-disc pl-5 max-h-40 overflow-y-auto">
                  {urls.slice(0, 5).map((url, index) => (
                    <li key={index} className="truncate">{url}</li>
                  ))}
                  {urls.length > 5 && (
                    <li className="text-blue-600">...and {urls.length - 5} more</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={loading || urls.length === 0}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                <span>Processing...</span>
              </>
            ) : (
              'Get Profiles'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputSection;
"use client"
import { useAppContext } from '@/utils/GlobalContext'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const KYCPage = () => {
  const { uploadKYCData, getUserKYCData, user } = useAppContext()
  const [formData, setFormData] = useState({
    aadharCard: null,
    panCard: null,
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    upiId: ''
  })
  const [previews, setPreviews] = useState({
    aadharCard: null,
    panCard: null
  })
  const [loading, setLoading] = useState(true)
  const [existingData, setExistingData] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false);
  const [isVerified, setIsVerified] = useState(false);


  useEffect(() => {
    const fetchKYCData = async () => {
      if (user) {
        try {
          const data = await getUserKYCData()
          if (data) {
            setExistingData(data)
            setFormData(prevState => ({
              ...prevState,
              bankName: data.bankName || '',
              accountNumber: data.accountNumber || '',
              ifscCode: data.ifscCode || '',
              upiId: data.upiId || ''
            }))
            setPreviews({
              aadharCard: data.aadharCardUrl || null,
              panCard: data.panCardUrl || null
            })
            
            // Check if all document fields are present
            const allFieldsPresent = data.aadharCardUrl && data.panCardUrl && 
                                     data.bankName && data.accountNumber && 
                                     data.ifscCode && data.upiId
            setIsVerified(allFieldsPresent)
          }
        } catch (error) {
          console.error('Error fetching KYC data:', error)
        } finally {
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    fetchKYCData()
  }, [user, getUserKYCData])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({ ...prev, [e.target.name]: file }))

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviews(prev => ({ ...prev, [e.target.name]: reader.result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await uploadKYCData(formData)
      alert('KYC data uploaded successfully!')
      const updatedData = await getUserKYCData()
      setExistingData(updatedData)
    } catch (error) {
      console.error('Error uploading KYC data:', error)
      alert('Error uploading KYC data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Please log in to access the KYC page.</div>
  }
  const handleUpdateClick = () => {
    setIsUpdating(true);
  };

  return (
    <div className="container mx-auto p-4">
      {isVerified && (
        <div className="absolute top-24 right-10 bg-green-500 text-white px-4 py-2 rounded">
          All documents are verified
        </div>
      )}
      <h1 className="text-2xl font-bold mb-4">KYC Information</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {(!existingData || isUpdating) && (
          <div className="bg-gray-100 p-4 rounded-lg ">
            <h2 className="text-xl font-semibold mb-2">Document Upload</h2>
            <div className="flex flex-row">
              <div>
                <label htmlFor="aadharCard" className="block mb-1">Aadhar Card</label>
                <input type="file" id="aadharCard" name="aadharCard" onChange={handleFileChange} className="w-full" />
                {previews.aadharCard && (
                  <div className="mt-2">
                    <Image src={previews.aadharCard} alt="Aadhar Card Preview" width={200} height={200} objectFit="contain" />
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="panCard" className="block mb-1">PAN Card</label>
                <input type="file" id="panCard" name="panCard" onChange={handleFileChange} className="w-full" />
                {previews.panCard && (
                  <div className="mt-2">
                    <Image src={previews.panCard} alt="PAN Card Preview" width={200} height={200} objectFit="contain" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {existingData && !isUpdating && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Uploaded Documents</h2>
            <div className="flex flex-row">
              {existingData.aadharCardUrl && (
                <div className="mr-4">
                  <p>Aadhar Card</p>
                  <Image src={existingData.aadharCardUrl} alt="Aadhar Card" width={200} height={200} objectFit="contain" />
                </div>
              )}
              {existingData.panCardUrl && (
                <div>
                  <p>PAN Card</p>
                  <Image src={existingData.panCardUrl} alt="PAN Card" width={200} height={200} objectFit="contain" />
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-zinc-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Bank Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="bankName" className="block mb-1">Bank Name</label>
              <input
                type="text"
                id="bankName"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${!!formData.bankName ? 'bg-zinc-200' : 'bg-white'}`}
                required
                disabled={!!formData.bankName}
              />
            </div>
            <div>
              <label htmlFor="accountNumber" className="block mb-1">Account Number</label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${!!formData.accountNumber ? 'bg-zinc-200' : 'bg-white'}`}
                required
                disabled={!!formData.accountNumber}
              />
            </div>
            <div>
              <label htmlFor="ifscCode" className="block mb-1">IFSC Code</label>
              <input
                type="text"
                id="ifscCode"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${!!formData.ifscCode ? 'bg-zinc-200' : 'bg-white'}`}
                required
                disabled={!!formData.ifscCode}
              />
            </div>
            <div>
              <label htmlFor="upiId" className="block mb-1">UPI ID</label>
              <input
                type="text"
                id="upiId"
                name="upiId"
                value={formData.upiId}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded ${!!formData.upiId ? 'bg-zinc-200' : 'bg-white'}`}
                required
                disabled={!!formData.upiId}
              />
            </div>
          </div>
        </div>

        {existingData && !isUpdating ? (
          <button type="button" onClick={handleUpdateClick} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Update KYC Information
          </button>
        ) : (
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" disabled={loading}>
            {loading ? 'Uploading...' : existingData ? 'Submit Updated KYC Information' : 'Submit KYC Information'}
          </button>
        )}
      </form>
    </div>
  )
}

export default KYCPage
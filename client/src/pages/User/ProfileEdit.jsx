import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/Host'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast";

function ProfileEdit({ onUpdated }) {
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    skill: '',
    designation: '',
    resume: '',
    profilePicture: '',
  })

  // File states
  const [profilePictureFile, setProfilePictureFile] = useState(null)
  const [resumeFile, setResumeFile] = useState(null)

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${USER_API_END_POINT}/profile`, {
          withCredentials: true,
        })
        const user = data.user
        setFormData({
          username: user?.username || '',
          bio: user?.profile?.bio || '',
          skill: Array.isArray(user?.profile?.skill)
            ? user.profile.skill.join(', ')
            : user?.profile?.skill || '',
          designation: user?.profile?.designation || '',
          resume: user?.profile?.resume || '',
          profilePicture: user?.profile?.profilePicture || '',
        })
      } catch (err) {
        setError(
          err.response?.data?.message || 'Could not load profile. Please try again.'
        )
      } finally {
        setFetching(false)
      }
    }

    fetchProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      if (name === 'profilePicture') {
        setProfilePictureFile(files[0])
      } else if (name === 'resume') {
        setResumeFile(files[0])
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Use FormData to support binary file uploads
      const dataToSend = new FormData()
      dataToSend.append('username', formData.username)
      dataToSend.append('bio', formData.bio)
      dataToSend.append('designation', formData.designation)

      // Format skills as comma-separated string or array strings
      const skillsArray = formData.skill
        ? formData.skill.split(',').map((s) => s.trim()).filter(Boolean)
        : []
      
      skillsArray.forEach((skill) => dataToSend.append('skill', skill))

      // Append files if selected, otherwise pass existing URLs as fallback
      // if (profilePictureFile) {
      //   dataToSend.append('profilePicture', profilePictureFile)
      // } else {
      //   dataToSend.append('profilePicture', formData.profilePicture)
      // }

      // if (resumeFile) {
      //   dataToSend.append('resume', resumeFile)
      // } else {
      //   dataToSend.append('resume', formData.resume)
      // }

      // Upload files only if user selected new ones
if (profilePictureFile) {
  dataToSend.append("profilePicture", profilePictureFile);
}

if (resumeFile) {
  dataToSend.append("resume", resumeFile);
}

      const { data } = await axios.patch(
        `${USER_API_END_POINT}/profile/update`,
        dataToSend,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      setSuccess(data.message || 'Profile updated successfully')
      if (onUpdated) onUpdated(data.user)
      toast.success(data.message || 'Profile updated successfully');  
      navigate(-1)
    } catch (err) {
      setError(
        
        err.response?.data?.message || 'Something went wrong. Please try again.'
      )
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">Edit profile</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Designation</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Skills (comma separated)
          </label>
          <input
            type="text"
            name="skill"
            value={formData.skill}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* File Upload Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            {formData.profilePicture && !profilePictureFile && (
              <p className="text-xs text-gray-500 mt-1 truncate">
                Current: <a href={formData.profilePicture} target="_blank" rel="noreferrer" className="text-blue-600 underline">View Picture</a>
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Resume (PDF / DOC)</label>
            <input
              type="file"
              name="resume"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />
            {formData.resume && !resumeFile && (
              <p className="text-xs text-gray-500 mt-1 truncate">
                Current: <a href={formData.resume} target="_blank" rel="noreferrer" className="text-blue-600 underline">View Resume</a>
              </p>
            )}
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto self-start rounded-md bg-blue-600 px-5 py-2.5 text-sm sm:text-base font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Saving...' : 'Save changes'}
        </button>
      </form>
    </div>
  )
}

export default ProfileEdit
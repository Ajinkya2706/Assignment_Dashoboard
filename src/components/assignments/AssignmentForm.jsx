import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Select } from '../ui/select'

export const AssignmentForm = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    deadline: initialData?.deadline || '',
    driveLink: initialData?.driveLink || '',
    type: initialData?.type || 'individual'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="deadline">Deadline</Label>
        <Input
          id="deadline"
          type="datetime-local"
          value={formData.deadline}
          onChange={(e) => setFormData({...formData, deadline: e.target.value})}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="driveLink">OneDrive Link</Label>
        <Input
          id="driveLink"
          type="url"
          value={formData.driveLink}
          onChange={(e) => setFormData({...formData, driveLink: e.target.value})}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Submission Type</Label>
        <Select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value})}
        >
          <option value="individual">Individual</option>
          <option value="group">Group</option>
        </Select>
      </div>
      <div className="flex gap-3 pt-4">
        <Button type="submit" className="flex-1">
          {initialData ? 'Update' : 'Create'} Assignment
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  )
}




import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export const CreateCourseModal = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    semester: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ name: '', code: '', semester: '' })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Course</DialogTitle>
          <DialogClose onClose={onClose} />
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Course Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="code">Course Code</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="semester">Semester</Label>
            <Input
              id="semester"
              value={formData.semester}
              onChange={(e) => setFormData({...formData, semester: e.target.value})}
              placeholder="e.g., Fall 2025"
              required
            />
          </div>
          <div className="flex gap-3">
            <Button type="submit" className="flex-1">Create</Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}




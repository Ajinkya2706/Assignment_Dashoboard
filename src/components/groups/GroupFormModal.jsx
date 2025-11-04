import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export const GroupFormModal = ({ open, onClose, onSubmit, members = [] }) => {
  const [groupName, setGroupName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(groupName)
    setGroupName('')
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogClose onClose={onClose} />
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="groupName">Group Name</Label>
            <Input
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Team Alpha"
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




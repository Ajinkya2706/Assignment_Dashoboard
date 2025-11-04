import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '../ui/dialog'
import { Button } from '../ui/button'
import { AlertCircle } from 'lucide-react'

export const ConfirmDialog = ({ open, onClose, onConfirm, title, message, confirmText = "Confirm" }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-5 h-5 text-black" />
            <DialogTitle>{title}</DialogTitle>
          </div>
          <DialogClose onClose={onClose} />
        </DialogHeader>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}



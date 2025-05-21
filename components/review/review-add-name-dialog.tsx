import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { toast } from 'sonner'

interface ReviewAddNameDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  onStartQuiz: () => void
}

const nameSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .max(50, 'Name must be at most 50 characters.'),
})

type NameSchema = z.infer<typeof nameSchema>

const ReviewAddNameDialog = ({
  open,
  setOpen,
  onStartQuiz,
}: ReviewAddNameDialogProps) => {
  const form = useForm<NameSchema>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = (values: NameSchema) => {
    try {
      localStorage.setItem('@unstuckquiz:name', values.name)

      onStartQuiz()
      setOpen(false)
    } catch {
      toast('Failed to set name and start quiz')
    }
  }

  useEffect(() => {
    if (open) {
      const savedName = localStorage.getItem('@unstuckquiz:name')

      if (savedName) {
        form.setValue('name', savedName)
      }
    }
  }, [open, form])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter your name to start</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ReviewAddNameDialog

import Image from 'next/image'
import Me from '@/assets/images/me.jpeg'
import { Copy, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'

const UpgradeDialog = () => {
  const paypalLink =
    'https://www.paypal.com/donate/?hosted_button_id=JFB4A7ATZMLF2'

  const handleCopy = () => {
    toast('Link copied to clipboard!')

    navigator.clipboard.writeText(paypalLink)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-black hover:bg-black/70">
          <Zap className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Upgrade</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md text-center [&>button]:hidden">
        <div className="absolute -top-13 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            <Image
              src={Me}
              alt="me"
              width={100}
              height={100}
              className="rounded-full border-4 border-background shadow-md"
            />
          </div>
        </div>

        <DialogHeader className="mt-10">
          <DialogTitle className="text-xl font-semibold text-center">
            No Premium Plan Available Yet
          </DialogTitle>

          <DialogDescription className="text-sm mt-2 text-muted-foreground text-center">
            But you can support the development of this project with a donation
            🚀.
            <br />
            Any amount helps and is truly appreciated!
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <a href={paypalLink} target="_blank" rel="noopener noreferrer">
            <Button className="bg-yellow-500 hover:bg-yellow-600 font-bold px-6 py-2 w-full">
              Donate via PayPal
            </Button>
          </a>
        </div>

        <div className="flex flex-row items-center gap-4">
          <div className="flex flex-1 h-0.5 rounded-full bg-gray-200" />

          <span className="text-[10px] text-muted-foreground">OR</span>

          <div className="flex flex-1 h-0.5 rounded-full bg-gray-200" />
        </div>

        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>

            <Input id="link" defaultValue={paypalLink} readOnly />
          </div>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={handleCopy}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        <DialogFooter className="sm:justify-center mt-4">
          <DialogClose asChild>
            <Button variant="ghost" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { UpgradeDialog }

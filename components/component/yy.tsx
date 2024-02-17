/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Knip0DvSODJ
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function yy() {
  return (
    <Card className="max-w-sm w-full mx-auto">
      <CardHeader>
        <CardTitle>Contact us</CardTitle>
        <CardDescription>Enter your information below and we'll get back to you as soon as possible.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Enter your first name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Enter your last name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea className="min-h-[100px]" id="message" placeholder="Enter your message" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto">Submit</Button>
      </CardFooter>
    </Card>
  )
}
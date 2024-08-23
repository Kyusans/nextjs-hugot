import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import Spinner from "@/components/ui/spinner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  username: z.string().min(1, {
    message: "This field is required",
  }),
  password: z.string().min(1, {
    message: "This field is required",
  }),
})

export default function Signup() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (values) => {
    try {
      const url = localStorage.getItem("url") + "signup.php";
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);
      const res = await axios.post(url, formData);
      if (res.data !== 0) {
        toast.success("Your account has been created");
        localStorage.setItem("userId", res.data.user_id);
        router.push("/")
      } else {
        toast.error("Invalid username or password");
      }

    } catch (error) {
      toast.error("Network error")
      console.log("error ni login: " + error);
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center">
              <Button type="submit" className="w-full">Signup</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

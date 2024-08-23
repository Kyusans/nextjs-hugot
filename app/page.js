"use client";
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useEffect, useState } from "react"
import Spinner from "@/components/ui/spinner"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import Hugot from "./dashboard/components/Hugot";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import Signup from "./Signup";

const formSchema = z.object({
  username: z.string().min(1, {
    message: "This field is required",
  }),
  password: z.string().min(1, {
    message: "This field is required",
  }),
})



export default function Home() {
  const router = useRouter();
  // isLoading para rani sa loading2 sa button hehe
  const [isLoading, setIsloading] = useState(false);
  // while kaning loading nako kay ang whole page
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(33);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })


  const onSubmit = async (values) => {
    setIsloading(true);
    try {
      const url = localStorage.getItem("url") + "login.php";
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);
      const res = await axios.post(url, formData);
      console.log("res onsubmit sa login", res);
      if (res.data !== 0) {
        toast.success("Login successfully");
        localStorage.setItem("userId", res.data.user_id);
        router.push("/dashboard")
      } else {
        toast.error("Invalid username or password");
      }

    } catch (error) {
      toast.error("Network error")
      console.log("error ni login: " + error);
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    setProgress(95);

    setTimeout(() => {
      setLoading(false);
      setProgress(33);
    }, 500);
  }, [router])

  useEffect(() => {
    if (localStorage.getItem("url") !== "http://localhost/schooling/api/") {
      localStorage.setItem("url", "http://localhost/schooling/api/")
    }
  }, [])

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <>
          <Progress value={progress} className="w-80 md:w-96" />
        </>
      ) : (
        <>
          <Tabs defaultValue="login" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <Form {...form}>
                <Card shadow="lg">
                  <CardHeader>
                    <CardTitle className="text-center text-3xl">Hugot mo to</CardTitle>
                  </CardHeader>
                  <CardContent>
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
                        <Button type="submit" className="w-full" disabled={isLoading}> {isLoading && <Spinner />} Login</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </Form>
            </TabsContent>
            <TabsContent value="signup">
              <Signup />
            </TabsContent>
          </Tabs>
        </>
      )
      }
    </div>
  )
}

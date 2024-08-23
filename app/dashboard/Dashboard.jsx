"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import Spinner from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Hugot from './components/Hugot'
import { Label } from '@/components/ui/label'
import { CornerDownLeft } from 'lucide-react'

function Dashboard() {
  const [allHugots, setAllHugots] = useState([])
  const [isLoading, setIsloading] = useState(false);
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [hugotInput, setHugotInput] = useState("")
  const [hugot, setHugot] = useState([])
  const [selectFilter, setSelectFilter] = useState(0);

  const getCategories = async () => {
    setIsloading(true);
    try {
      const url = localStorage.getItem("url") + "get_categories.php";
      const res = await axios.get(url);
      if (res.data !== 0) {
        setCategories(res.data)
      }
    } catch (error) {
      toast.error("Network error")
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }

  const getHugot = async () => {
    setIsloading(true);
    try {
      const url = localStorage.getItem("url") + "get_hugot.php";
      const res = await axios.get(url);
      if (res.data !== 0) {
        setAllHugots(res.data);
      } else {
        setHugot([]);
      }
    } catch (error) {
      toast.error("Network error")
      console.log(error);
      setHugot([]);
    } finally {
      setIsloading(false);
    }
  }

  const addHugot = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!category) {
      toast.error("Category is required");
      return;
    } else if (hugotInput === "") {
      toast.error("Hugot is required");
      return;
    } else if (hugotInput.length < 3) {
      toast.error("Hugot must be at least 3 characters");
      return;
    }
    setIsloading(true);
    try {
      const url = localStorage.getItem("url") + "add_hugot.php";
      const formData = new FormData();
      formData.append("userId", localStorage.getItem("userId"));
      formData.append("categoryId", category);
      formData.append("hugot", hugotInput);
      const res = await axios.post(url, formData);
      if (res.data !== 0) {
        toast.success("Hugot successfully added")
        setHugotInput("");
        setCategory("");
        getHugot();
      } else {
        toast.error("Hugot mo waa")
      }
    } catch (error) {
      toast.error("Network error")
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    getCategories();
    getHugot()
  }, [])

  useEffect(() => {
    console.log("selectFilter", selectFilter);
    console.log("allHugots", allHugots);
    if (selectFilter === 0) {
      setHugot(allHugots);
    } else {
      const filteredHugot = allHugots.filter((hugot) => {
        return hugot.post_categoryId === selectFilter
      })
      setHugot(filteredHugot)
    }
  }, [allHugots, selectFilter])

  return (
    <>
      {isLoading ?
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div> :
        <>
          <div className="flex justify-center items-center">
            <Card className="w-80 md:w-1/2 mt-3">
              <CardHeader>
                <CardTitle>Hugot mo to</CardTitle>
              </CardHeader>
              <CardContent>
                <Separator />
                <div className='mb-3 mt-3'>
                  <Select onValueChange={(e) => setCategory(e)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {categories.map((category, index) => (
                          <SelectItem className="cursor-pointer" key={index} value={category.categ_id}>
                            {category.categ_name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="relative flex h-full flex-col rounded-xl p-4 lg:col-span-2">

                  <div className="flex-1" />
                  <form
                    className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
                    onSubmit={addHugot}
                  >
                    <Label htmlFor="message" className="sr-only">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                      placeholder="Enter your hugot here...."
                      value={hugotInput}
                      onChange={(e) => setHugotInput(e.target.value)}
                    />
                    <div className="flex items-center p-3 pt-0">
                      <Button type="submit" size="sm" className="ml-auto gap-1.5">
                        Submit Hugot
                        <CornerDownLeft className="size-3.5" />
                      </Button>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
          <Separator className="my-6" />
          <div className='mt-8 ml-96 px-32'>
            <Select onValueChange={(e) => setSelectFilter(e)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem className="cursor-pointer" value={0}>All</SelectItem>
                  {categories.map((category, index) => (
                    <SelectItem className="cursor-pointer" key={index} value={category.categ_id}>
                      {category.categ_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center">
            <div className='w-80 md:w-full mt-6'>
              {hugot.length > 0 ? hugot.map((hugot, index) => (
                <Hugot username={hugot.user_username} hugot={hugot.post_hugot} hugotId={hugot.post_id} key={index} className="text-center" />
              )) :
                <>
                  <p className="text-center p-6 text-disabled italic text-lg">No hugot yet</p>
                </>
              }
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Dashboard

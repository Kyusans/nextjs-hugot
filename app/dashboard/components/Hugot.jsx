"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import axios from 'axios';
import { Badge, CornerDownLeft, Mic, Paperclip } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner';

function Hugot({ username, hugot, hugotId }) {
  const [comments, setComments] = useState([])
  const [commentInput, setCommentInput] = useState("")

  const getComments = useCallback(async () => {
    try {
      const url = localStorage.getItem("url") + "get_comments.php";
      const res = await axios.get(url, { params: { hugotId } });
      if (res.data !== 0) {
        setComments(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [hugotId])

  const addComment = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!commentInput) {
      toast.error("Please type a comment");
      return;
    }
    try {
      const url = localStorage.getItem("url") + "add_comment.php";
      const formData = new FormData();
      formData.append("message", commentInput);
      formData.append("hugotId", hugotId);
      formData.append("userId", localStorage.getItem("userId"));
      const res = await axios.post(url, formData);
      if (res.data !== 0) {
        toast.success("Comment added successfully");
        setCommentInput("");
        getComments();
      }
    } catch (error) {
      toast.error("Network error");
      console.log(error);
    }
  }

  useEffect(() => {
    getComments();
  }, [getComments])
  return (
    <Card className="w-80 md:w-1/2 mx-auto mb-4 py-10">
      <CardHeader>
        <CardTitle>{username}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <p>{hugot}</p>
        </div>
      </CardContent>
      <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">

        <div className="flex-1" />
        <ScrollArea className="h-96 w-full rounded-md border mb-3">
          {comments && comments.map((comment, index) => (
            <div key={index} className="relative flex items-center gap-3 border-b p-3">
              <p>{comment.user_username}: 
                <span className='ml-1'>
                  {comment.comment_message}
                </span> </p>

            </div>
          ))}
        </ScrollArea>
        <form
          className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
          onSubmit={addComment}
        >
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <Textarea
            id="message"
            placeholder="Type your comment here..."
            className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <div className="flex items-center p-3 pt-0">
            <Button type="submit" size="sm" className="ml-auto gap-1.5">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </Card>
  )
}

export default Hugot

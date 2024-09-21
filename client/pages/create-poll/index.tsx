"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm, useFieldArray } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Loader2, Plus, Trash2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import createPoll from "@/utils/createPoll"
import { fetchPoll } from "@/utils/fetchPoll"
import { publicClient } from "@/utils/client"
// import { getPollCreationEvent } from "@/utils/getPollCreationEvent"
import { MACIWrapper } from "@/contracts/MACIWrapper"
import { hexToNumber } from "viem"

interface FormData {
  name: string
  description: string
  options: { value: string }[]
  startDate: Date
  endDate: Date
  image: FileList
}

export default function CreateElectionPoll() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()
  const { register, control, setValue, handleSubmit, formState: { errors }, watch, reset } = useForm<FormData>({
    defaultValues: {
      options: [{ value: "" }, { value: "" }]
    }
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options"
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    console.log(data)
  //   useEffect(() => {
  //     if (typeof window !== "undefined") {
  //       createPoll('American Election', ['D', 'K'], '', 3600, 1);
  //     }
  // }, []);
    // const tx = await createPoll(data.name, data.options, `1`, BigInt(3600), 1);
    const tx = await createPoll(data.name, [`1`, `2`], `1`, BigInt(3600), 1);
    try {
        const transactionReceipt = await publicClient.waitForTransactionReceipt({ hash: tx });

        console.log(transactionReceipt);

        if (transactionReceipt && transactionReceipt.status == 'reverted') {
          return 'Transaction failed';
        }

        if (transactionReceipt?.status === 'success') {
          console.log(transactionReceipt);
          const pollId = hexToNumber(transactionReceipt.logs[7].topics[1]!);
          // Data returns
          // id: pollId,
          // name: _name,
          // encodedOptions: encodedOptions,
          // numOfOptions: _options.length,
          // metadata: _metadata,
          // startTime: block.timestamp,
          // endTime: endTime,
          // pollContracts: pollContracts,
          // options: _options,
          // tallyJsonCID: ""
          const data = fetchPoll(BigInt(pollId));
          console.log(data);
          toast({
            title: "Poll Created!",
            description: "Your election poll has been successfully created.",
            duration: 5000,
    })
    setIsSubmitted(true)
  }
} catch(error) {
    console.log(error);
}
    reset()
  }

  const watchOptions = watch("options")

  const handleCreateOther = () => {
    setIsSubmitted(false)
    reset({
      options: [{ value: "" }, { value: "" }]
    })
  }

  return (
    <div className="container mx-auto px-4 pt-12 pb-24">
      <Card className="max-w-2xl mx-auto bg-black/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Election Poll</CardTitle>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div>
                  <Label htmlFor="name">Poll Name</Label>
                  <Input id="name" className="mt-2" {...register("name", { required: "Poll name is required" })} />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" className="mt-2" {...register("description", { required: "Description is required" })} />
                  {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>

                <div>
                  <Label>Options (2-10)</Label>
                  {fields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center space-x-2 mt-2"
                    >
                      <Input
                        {...register(`options.${index}.value` as const, { required: "Option is required" })}
                        placeholder={`Option ${index + 1}`}
                      />
                      {index > 1 && (
                        <Button type="button" variant="outline" size="icon" onClick={() => remove(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </motion.div>
                  ))}
                  {watchOptions.length < 10 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => append({ value: "" })}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Option
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full mt-2 justify-start text-left font-normal",
                            !watch("startDate") && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {watch("startDate") ? format(watch("startDate"), "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={watch("startDate")}
                          onSelect={(date) => setValue("startDate", date as Date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full mt-2 justify-start text-left font-normal",
                            !watch("endDate") && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {watch("endDate") ? format(watch("endDate"), "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={watch("endDate")}
                          onSelect={(date) => setValue("endDate", date as Date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">Upload Image</Label>
                  <Input className="mt-2" id="image" type="file" accept="image/*" {...register("image")} />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Poll...
                    </>
                  ) : (
                    "Create Poll"
                  )}
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <p className="text-center text-lg">Your poll has been successfully created!</p>
                <div className="flex justify-center space-x-4">
                  <Button onClick={handleCreateOther}>Create Other</Button>
                  <Link href="/polls">
                    <Button variant="outline">See other polls</Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
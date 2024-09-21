"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { createDbPoll } from "@/database/dbApi"; // Ensure this is correctly imported
import createPoll from "@/utils/createPoll"
import { fetchPoll } from "@/utils/fetchPoll"
import { publicClient } from "@/utils/client"
// import { getPollCreationEvent } from "@/utils/getPollCreationEvent"
import { MACIWrapper } from "@/contracts/MACIWrapper"
import { hexToNumber } from "viem"
import { pinFileWithPinata } from "@/utils/pinata";

const PINATA_GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY;

interface FormData {
  title: string;
  description: string;
  image: FileList;
  isQuadraticVoting: boolean;
  startDate: Date;
  endDate: Date;
  options: { value: string }[];
}

export default function CreateElectionPoll() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      options: [{ value: "" }, { value: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const durationInSeconds = Math.floor(
        (data.endDate.getTime() - data.startDate.getTime()) / 1000
      );

      const IpfsHash = data.image && data.image.length > 0 ? await pinFileWithPinata(data.image[0]) : "";
      const imageUrl = `${PINATA_GATEWAY}/ipfs/${IpfsHash}`;
      console.log("Image URL:", imageUrl);

      const votingOptions = data.options.map((option, index) => String(index + 1));

      const metadata = imageUrl;

      const tx = await createPoll(
        data.title,
        ['1','2'], // have no idea what this is
        metadata,
        BigInt(durationInSeconds), 
        data.isQuadraticVoting ? 1 : 0
      );

      // Wait for transaction receipt and handle the rest of the process
      const transactionReceipt = await publicClient.waitForTransactionReceipt({ hash: tx });

      if (transactionReceipt?.status === 'success') {
        const pollId = hexToNumber(transactionReceipt.logs[7].topics[1]!);
        console.log(`Poll created on-chain with ID: ${pollId}`);

        // Proceed with creating the poll in the database
        await createDbPoll({
          title: data.title,
          description: data.description,
          image: imageUrl,
          isQuadraticVoting: data.isQuadraticVoting,
          creator: "0x3", // Replace with actual creator wallet
          startDate: data.startDate.toISOString(),
          endDate: data.endDate.toISOString(),
          votingOptions: data.options.map((option, index) => ({
            id: index + 1,
            option: option.value,
          })),
          status: "ongoing", // Default status
          results: "", // Placeholder for results
          questionaire: "", // Placeholder for questionaire
          userIDs: [], // Placeholder for userIDs
        });

        toast({
          title: "Poll Created!",
          description: "Your election poll has been successfully created.",
          duration: 5000,
        });
        setIsSubmitted(true);
        reset();
      } else {
        console.log('Transaction failed or reverted.');
        toast({
          title: "Error",
          description: "There was an issue creating the poll on-chain. Please try again.",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Failed to create poll:", error);
      toast({
        title: "Error",
        description: "There was an issue creating the poll. Please try again.",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const watchOptions = watch("options");

  const handleCreateOther = () => {
    setIsSubmitted(false);
    reset({
      options: [{ value: "" }, { value: "" }],
    });
  };

  return (
    <div className="container mx-auto px-4 pt-12 pb-24">
      <Card className="max-w-2xl mx-auto bg-black/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Create Election Poll
          </CardTitle>
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
                  <Label htmlFor="title">Poll Title</Label>
                  <Input
                    id="title"
                    className="mt-2"
                    {...register("title", { required: "Poll title is required" })}
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    className="mt-2"
                    {...register("description", {
                      required: "Description is required",
                    })}
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="isQuadraticVoting">Is Quadratic Voting</Label>
                  <Input
                    type="checkbox"
                    id="isQuadraticVoting"
                    className="mt-2"
                    {...register("isQuadraticVoting")}
                  />
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
                        {...register(`options.${index}.value` as const, {
                          required: "Option is required",
                        })}
                        placeholder={`Option ${index + 1}`}
                      />
                      {index > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => remove(index)}
                        >
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
                          {watch("startDate")
                            ? format(watch("startDate"), "PPP")
                            : "Pick a date"}
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
                          {watch("endDate")
                            ? format(watch("endDate"), "PPP")
                            : "Pick a date"}
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
                  <Input
                    className="mt-2"
                    id="image"
                    type="file"
                    accept="image/*"
                    {...register("image")}
                  />
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
                <p className="text-center text-lg">
                  Your poll has been successfully created!
                </p>
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
  );
}

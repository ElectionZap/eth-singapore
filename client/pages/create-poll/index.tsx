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
import { createDbPoll } from "@/database/dbApi";
import createPoll from "@/utils/createPoll";
import { fetchPoll } from "@/utils/fetchPoll";
import { publicClient } from "@/utils/client";
import { hexToNumber } from "viem";
import { pinFileWithPinata } from "@/utils/pinata";
import { useWallet } from "@/contexts/Wallet";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1); // State for managing form steps
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

      const tx = await createPoll({
        name: data.title,
        options: ['1', '2'],
        metadata: metadata,
        duration: BigInt(durationInSeconds),
        isQv: data.isQuadraticVoting ? 1 : 0
    });

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
        setImagePreview(null); // Reset the image preview
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
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
              <motion.div
                key={`form-step-${currentStep}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {currentStep === 1 && (
                    <>
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

                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                              ${watch("isQuadraticVoting")
                              ? "bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 text-white hover:brightness-110 active:brightness-125"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300 active:bg-gray-400"
                            }`}
                          onClick={() => setValue("isQuadraticVoting", !watch("isQuadraticVoting"))}
                        >
                          {watch("isQuadraticVoting") ? "Quadratic Voting Enabled" : "Enable Quadratic Voting"}
                        </button>
                        <input
                          type="hidden"
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
                                className="hover:bg-red-500"
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
                            <Plus className="h-4 w-4 mr-1" />
                            Add Option
                          </Button>
                        )}
                      </div>

                      <Button
                        type="button"
                        className="mt-4"
                        onClick={handleNextStep}
                      >
                        Next
                      </Button>
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
                      <div className="space-y-6">
                        {/* Date Pickers */}
                        <div className="flex space-x-4">
                          {/* Start Date */}
                          <div className="flex-1">
                            <Label htmlFor="startDate">Start Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal mt-2",
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
                                  disabled={(date) => date < new Date() || date >= watch("endDate")}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            {errors.startDate && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.startDate.message}
                              </p>
                            )}
                          </div>

                          {/* End Date */}
                          <div className="flex-1">
                            <Label htmlFor="endDate">End Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal mt-2",
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
                                  disabled={(date) =>
                                    date <= watch("startDate") || date < new Date()
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            {errors.endDate && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.endDate.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Image Upload */}
                        <div className="">
                          <Label htmlFor="image">Poll Image</Label>
                          <Input
                            type="file"
                            id="image"
                            className="mt-2"
                            accept="image/*"
                            {...register("image")}
                            onChange={handleImageChange}
                          />
                          {imagePreview && (
                            <div className="mt-4 flex justify-center">
                              <div className="relative group w-full max-w-md">
                                {/* Remove button on hover */}
                                <button
                                  type="button"
                                  onClick={() => setValue("image", new DataTransfer().files)}
                                  className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 hover:bg-red-600 focus:outline-none 
                                            focus:ring-2 focus:ring-red-500 focus:ring-offset-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                  aria-label="Remove image"
                                >
                                  ✕
                                </button>
                                {/* Image Preview */}
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="w-full h-72 object-cover rounded-md shadow-lg cursor-pointer"
                                  onClick={() => setValue("image", new DataTransfer().files)} // Remove image on click
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-4">
                          <Button type="button" variant="outline" onClick={handlePreviousStep}>
                            Back
                          </Button>

                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              "Create Poll"
                            )}
                          </Button>
                        </div>
                      </div>

                    </>
                  )}
                </form>
              </motion.div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold">Poll Created!</h2>
                <p className="mt-2">Your election poll has been successfully created.</p>
                <Button
                  className="mt-4"
                  onClick={handleCreateOther}
                >
                  Create Another Poll
                </Button>
              </div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

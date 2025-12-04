"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ResumeUploaderProps {
    onUpload: (file: File) => void;
    file: File | null;
    setFile: (file: File | null) => void;
}

export function ResumeUploader({ onUpload, file, setFile }: ResumeUploaderProps) {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles.length > 0) {
                const selectedFile = acceptedFiles[0];
                setFile(selectedFile);
                onUpload(selectedFile);
            }
        },
        [onUpload, setFile]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "text/plain": [".txt"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
                ".docx",
            ],
        },
        maxFiles: 1,
    });

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFile(null);
    };

    return (
        <div className="w-full">
            <div
                {...getRootProps()}
                className={cn(
                    "border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer relative overflow-hidden group",
                    isDragActive
                        ? "border-primary bg-primary/10"
                        : "border-white/10 hover:border-primary/50 hover:bg-white/5",
                    file ? "bg-primary/5 border-primary/50" : ""
                )}
            >
                <input {...getInputProps()} />

                <AnimatePresence mode="wait">
                    {!file ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center text-center space-y-4"
                        >
                            <div className="p-4 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                                <UploadCloud className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <div>
                                <p className="text-lg font-medium">
                                    {isDragActive ? "Drop your resume here" : "Upload your resume"}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    PDF, DOCX, or TXT (Max 5MB)
                                </p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="file"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex items-center justify-between w-full"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-lg bg-primary/20">
                                    <FileText className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium truncate max-w-[200px] md:max-w-md">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {(file.size / 1024).toFixed(0)} KB
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <button
                                    onClick={removeFile}
                                    className="p-2 hover:bg-red-500/20 rounded-full text-muted-foreground hover:text-red-500 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

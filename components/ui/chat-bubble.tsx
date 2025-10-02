"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageLoading } from "@/components/ui/message-loading";
import { cn } from "@/lib/utils";
import Image from "next/image";
import * as React from "react";

interface ChatBubbleProps {
  variant?: "sent" | "received";
  className?: string;
  children: React.ReactNode;
}

export function ChatBubble({
  variant = "received",
  className,
  children,
}: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-2",
        variant === "sent" && "flex-row-reverse",
        className
      )}
    >
      {children}
    </div>
  );
}

interface ChatBubbleMessageProps {
  variant?: "sent" | "received";
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function ChatBubbleMessage({
  variant = "received",
  isLoading,
  className,
  children,
}: ChatBubbleMessageProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-1.5 px-3 relative",
        variant === "sent" ? "bg-[#278EFF] text-white" : "bg-[#26252A]",
        className
      )}
    >
      {variant === "sent" ? (
        <Image
          src="/icons/chat-bubble-tail-right.svg"
          alt="Chat bubble tail"
          width={20}
          height={20}
          style={{ height: "100%" }}
          className="absolute bottom-0 w-fit h-full aspect-square -right-6"
        />
      ) : (
        <Image
          src="/icons/chat-bubble-tail-left.svg"
          alt="Chat bubble tail"
          width={20}
          height={20}
          style={{ height: "100%" }}
          className="absolute bottom-0 w-fit h-full aspect-square -left-6"
        />
      )}

      {isLoading ? (
        <div className="flex items-center space-x-2">
          <MessageLoading />
        </div>
      ) : (
        children
      )}
    </div>
  );
}

interface ChatBubbleAvatarProps {
  src?: string;
  fallback?: string;
  className?: string;
}

export function ChatBubbleAvatar({
  src,
  fallback = "AI",
  className,
}: ChatBubbleAvatarProps) {
  return (
    <Avatar className={cn("h-8 w-8", className)}>
      {src && <AvatarImage src={src} />}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}

interface ChatBubbleActionProps {
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ChatBubbleAction({
  icon,
  onClick,
  className,
}: ChatBubbleActionProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-6 w-6", className)}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}

export function ChatBubbleActionWrapper({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex items-center gap-1 mt-2", className)}>
      {children}
    </div>
  );
}
